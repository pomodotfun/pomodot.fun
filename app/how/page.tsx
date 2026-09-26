import type { Metadata } from 'next'
import { HowItWorks } from '@/components/how-it-works'
import { LatestLaunches } from '@/components/latest-launches'
import { getTokens } from '@/lib/token-data'

export const metadata: Metadata = {
  title: 'How it works — Pump Fomo',
  description: 'How launches and first buys work on POMO.',
}

export const revalidate = 30

export default async function HowPage() {
  const tokens = await getTokens()
  return (
    <main className="pt-6">
      <HowItWorks />
      <LatestLaunches initialTokens={tokens} />
    </main>
  )
}
