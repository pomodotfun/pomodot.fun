'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { TokenCard } from '@/components/token-card'
import { useTokens } from '@/hooks/use-tokens'
import type { Token, TokenStatus } from '@/lib/tokens'
import { cn } from '@/lib/utils'

type Filter = 'all' | TokenStatus

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'New', value: 'new' },
  { label: 'Migrated', value: 'migrated' },
]

export function TokenExplorer({ initialTokens }: { initialTokens: Token[] }) {
  const tokens = useTokens(initialTokens)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement
      const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable
      if (event.key === '/' && !isTyping) {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const visibleTokens = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tokens.filter((token) => {
      if (filter !== 'all' && token.status !== filter) return false
      if (!q) return true
      return (
        token.name.toLowerCase().includes(q) ||
        token.ticker.toLowerCase().includes(q) ||
        token.address.toLowerCase().includes(q)
      )
    })
  }, [tokens, query, filter])

  return (
    <section id="explore" aria-labelledby="explore-heading" className="mx-auto max-w-[1184px] px-4 pb-20 pt-11">
      <div className="flex flex-col items-center text-center">
        <h1 id="explore-heading" className="text-5xl font-bold tracking-tighter md:text-[52px]">
          Every token launched
        </h1>
        <p className="mt-3 text-sm text-muted-foreground md:text-base">Every token launched through Pump Fomo</p>

        <label className="relative mt-8 flex w-full max-w-[470px] items-center">
          <span className="sr-only">Search tokens</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-5 size-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, ticker or address"
            className="h-11 w-full rounded-full border border-border bg-card pl-11 pr-14 text-sm text-foreground placeholder:text-muted-foreground focus:border-brand/60 focus:outline-none"
          />
          <kbd className="pointer-events-none absolute right-2 flex size-7 items-center justify-center rounded-md border border-border bg-secondary font-mono text-xs text-muted-foreground">
            /
          </kbd>
        </label>

        <div role="tablist" aria-label="Filter tokens" className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                'rounded-full px-4 py-2 text-sm transition-colors',
                filter === f.value
                  ? 'border border-border bg-accent font-semibold text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {visibleTokens.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {visibleTokens.map((token) => (
            <TokenCard key={token.address} token={token} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 px-6 py-20 text-center">
          <p className="font-mono text-xs text-muted-foreground">$POMO</p>
          <p className="mt-2 text-lg font-bold">
            {tokens.length === 0 ? 'No tokens launched yet' : 'No tokens match your search'}
          </p>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            {tokens.length === 0
              ? 'Tokens launched through Pump Fomo will appear here.'
              : 'Try a different name, ticker or address.'}
          </p>
        </div>
      )}
    </section>
  )
}
