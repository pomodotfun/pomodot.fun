import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { LatestLaunches } from '@/components/latest-launches'
import { getTokens } from '@/lib/token-data'

export const revalidate = 30

export default async function Page() {
  const tokens = await getTokens()
  return (
    <main>
      <Hero />
      <HowItWorks />
      <LatestLaunches initialTokens={tokens} />
    </main>
  )
}
