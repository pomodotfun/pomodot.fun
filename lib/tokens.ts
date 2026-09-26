// Add token contract addresses (CA) here, newest first.
// Name, ticker, image and market cap are fetched live from pump.fun and DexScreener.
export const TOKEN_ADDRESSES: string[] = [
  '7TopJi5V8Q7WJFgsnNAiGL7w8UVp1JHUqHJx518X1owW',
  '5RRKcvyF6p5BBwv5FVuzvmRrsSdZdbVJHBxkSej3pump',
  'eEGktGMDRroy52GyvBRcGofSMU7xSMdLN5hsKWh16ip',
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
