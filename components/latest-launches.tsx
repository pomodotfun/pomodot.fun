'use client'

import Link from 'next/link'
import { SectionHeading } from '@/components/section-heading'
import { TokenCard } from '@/components/token-card'
import { useTokens } from '@/hooks/use-tokens'
import type { Token } from '@/lib/tokens'

export function LatestLaunches({ initialTokens }: { initialTokens: Token[] }) {
  const tokens = useTokens(initialTokens)
  const latest = [...tokens].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)).slice(0, 6)

  return (
    <section aria-labelledby="launches-heading" className="border-t border-border/60 px-4 py-20">
      <div className="mx-auto max-w-[948px]">
        <SectionHeading id="launches-heading" eyebrow="Launches" title="Latest launches" />

        {latest.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {latest.map((token) => (
              <TokenCard key={token.address} token={token} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center backdrop-blur">
            <p className="font-mono text-xs text-muted-foreground">$POMO</p>
            <p className="mt-2 text-lg font-bold">No tokens launched yet</p>
            <p className="mt-1 text-sm text-muted-foreground">New launches will show up here.</p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/coins"
            className="rounded-full border border-border bg-card/70 px-6 py-3 text-sm font-semibold transition-colors hover:bg-secondary"
          >
            View all coins
          </Link>
        </div>
      </div>
    </section>
  )
}
