'use client'

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { formatMarketCap, pumpFunUrl, type Token } from '@/lib/tokens'

function shortAddress(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function TokenCard({ token }: { token: Token }) {
  const [copied, setCopied] = useState(false)

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(token.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {}
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand/60 focus-within:border-brand">
      <div className="aspect-[3/2] w-full overflow-hidden bg-secondary">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={token.image || '/placeholder.svg'}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="truncate font-mono text-xs text-muted-foreground">${token.ticker}</p>
        <h3 className="line-clamp-2 text-base font-bold leading-snug text-balance">
          <a
            href={pumpFunUrl(token.address)}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {token.name}
          </a>
        </h3>
        <p className="mt-auto pt-3 text-xl font-bold">
          {formatMarketCap(token.marketCap)} <span className="text-xs font-normal text-muted-foreground">MC</span>
        </p>

        <button
          type="button"
          onClick={copyAddress}
          aria-label={copied ? 'Contract address copied' : `Copy contract address of ${token.name}`}
          className="relative z-10 mt-2 flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-secondary/60 px-2.5 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-brand/60 hover:text-foreground"
        >
          <span className="flex items-center gap-1.5 truncate">
            <span className="rounded bg-brand/15 px-1 py-0.5 text-[10px] font-semibold text-brand">CA</span>
            {shortAddress(token.address)}
          </span>
          {copied ? <Check className="size-3.5 text-brand" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        </button>
      </div>
    </article>
  )
}
