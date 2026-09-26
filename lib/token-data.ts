import 'server-only'
import { TOKEN_ADDRESSES, type Token } from '@/lib/tokens'

const REVALIDATE_SECONDS = 30
const DEXSCREENER_BATCH_SIZE = 30
const NEW_TOKEN_WINDOW_MS = 24 * 60 * 60 * 1000

type PumpFunCoin = {
  mint: string
  name?: string
  symbol?: string
  image_uri?: string
  usd_market_cap?: number
  created_timestamp?: number
  complete?: boolean
}

type DexScreenerPair = {
  baseToken: { address: string; name: string; symbol: string }
  marketCap?: number
  fdv?: number
  liquidity?: { usd?: number }
  pairCreatedAt?: number
  info?: { imageUrl?: string }
}

async function fetchPumpFunCoin(address: string): Promise<PumpFunCoin | null> {
  try {
    const res = await fetch(`https://frontend-api-v3.pump.fun/coins-v2/${address}`, {
      headers: { accept: 'application/json' },
      next: { revalidate: REVALIDATE_SECONDS },
    })
    if (!res.ok) return null
    return (await res.json()) as PumpFunCoin
  } catch {
    return null
  }
}

async function fetchDexScreenerPairs(addresses: string[]): Promise<Map<string, DexScreenerPair>> {
  const best = new Map<string, DexScreenerPair>()
  const batches: string[][] = []
  for (let i = 0; i < addresses.length; i += DEXSCREENER_BATCH_SIZE) {
    batches.push(addresses.slice(i, i + DEXSCREENER_BATCH_SIZE))
  }

  await Promise.all(
    batches.map(async (batch) => {
      try {
        const res = await fetch(`https://api.dexscreener.com/tokens/v1/solana/${batch.join(',')}`, {
          next: { revalidate: REVALIDATE_SECONDS },
        })
        if (!res.ok) return
        const pairs = (await res.json()) as DexScreenerPair[]
        for (const pair of pairs) {
          const key = pair.baseToken.address
          const current = best.get(key)
          if (!current || (pair.liquidity?.usd ?? 0) > (current.liquidity?.usd ?? 0)) {
            best.set(key, pair)
          }
        }
      } catch {
        // DexScreener is optional; pump.fun data is used as fallback.
      }
    }),
  )

  return best
}

const IPFS_GATEWAY = 'https://pump.mypinata.cloud/ipfs/'

// ipfs.io and ipfs:// URIs from pump.fun are rate limited or unrenderable, so route them through Pinata.
function ipfsToGateway(url: string | undefined) {
  if (!url) return ''
  return url.replace(/^ipfs:\/\//, IPFS_GATEWAY).replace(/^https:\/\/ipfs\.io\/ipfs\//, IPFS_GATEWAY)
}

export async function getTokens(): Promise<Token[]> {
  const addresses = [...new Set(TOKEN_ADDRESSES.map((a) => a.trim()).filter(Boolean))]
  if (addresses.length === 0) return []

  const [pumpCoins, dexPairs] = await Promise.all([
    Promise.all(addresses.map(fetchPumpFunCoin)),
    fetchDexScreenerPairs(addresses),
  ])

  return addresses.map((address, index) => {
    const pump = pumpCoins[index]
    const dex = dexPairs.get(address)
    const createdAt = pump?.created_timestamp ?? dex?.pairCreatedAt ?? null
    const migrated = pump?.complete ?? false

    return {
      address,
      ticker: (pump?.symbol ?? dex?.baseToken.symbol ?? '???').trim(),
      name: (pump?.name ?? dex?.baseToken.name ?? 'Unknown token').trim(),
      image: ipfsToGateway(pump?.image_uri) || dex?.info?.imageUrl || '',
      marketCap: dex?.marketCap ?? dex?.fdv ?? pump?.usd_market_cap ?? null,
      createdAt,
      status: migrated ? 'migrated' : createdAt && Date.now() - createdAt < NEW_TOKEN_WINDOW_MS ? 'new' : null,
    }
  })
}
