import type { Metadata } from 'next'
import { LaunchForm } from '@/components/launch-form'

export const metadata: Metadata = {
  title: 'Launch a token — Pump Fomo',
  description: 'Create your token on Solana with Pump Fomo.',
}

export default function LaunchPage() {
  return (
    <main className="px-4 pb-24 pt-14">
      <div className="mx-auto max-w-[720px]">
        <div className="mb-8 text-center">
          <h1 className="text-balance text-5xl font-bold tracking-tighter md:text-[52px]">Launch a token</h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">Every token starts on POMO</p>
        </div>
        <LaunchForm />
      </div>
    </main>
  )
}
