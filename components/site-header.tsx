'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from '@/components/logo'
import { ConnectWalletButton } from '@/components/connect-wallet-button'
import { SOCIAL_LINKS } from '@/lib/site'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Launch', href: '/launch' },
  { label: 'Coins', href: '/coins' },
  { label: 'How it works', href: '/how' },
]

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-current">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}


export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/60 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1184px] items-center justify-between gap-4 px-4">
        <Logo />

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-border bg-card/60 p-1 md:flex"
        >
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-full border-2 px-5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'border-brand bg-accent font-semibold text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pump Fomo on X"
            className="hidden size-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground sm:flex"
          >
            <XIcon />
          </a>
          <ConnectWalletButton />
        </div>
      </div>
    </header>
  )
}
