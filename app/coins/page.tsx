import type { Metadata } from 'next'
import { TokenExplorer } from '@/components/token-explorer'
import { getTokens } from '@/lib/token-data'

export const metadata: Metadata = {
  title: 'Coins — Pump Fomo',
  description: 'Every token launched through Pump Fomo.',
}

export const revalidate = 30

export default async function CoinsPage() {
  const tokens = await getTokens()
  return (
    <main>
      <TokenExplorer initialTokens={tokens} />
    </main>
  )
}
