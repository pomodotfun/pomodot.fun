import { getTokens } from '@/lib/token-data'

export async function GET() {
  const tokens = await getTokens()
  return Response.json(tokens, {
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' },
  })
}
