// Add token contract addresses (CA) here, newest first.
// Name, ticker, image and market cap are fetched live from pump.fun and DexScreener.
export const TOKEN_ADDRESSES: string[] = [

]

export type TokenStatus = 'new' | 'migrated'

export type Token = {
  address: string
  ticker: string
  name: string
  image: string
  marketCap: number | null
  createdAt: number | null
  status: TokenStatus | null
}

export function pumpFunUrl(address: string) {
  return `https://pump.fun/coin/${address}`
}

export function formatMarketCap(value: number | null) {
  if (value === null) return '—'
  return `$${new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)}`
}
