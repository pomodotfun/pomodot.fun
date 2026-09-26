'use client'

import { useWallet } from '@/components/wallet-provider'

function shorten(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`
}

export function ConnectWalletButton() {
  const { address, connecting, connect, disconnect } = useWallet()

  if (address) {
    return (
      <button
        type="button"
        onClick={disconnect}
        title="Disconnect wallet"
        className="ml-1 flex items-center gap-2 rounded-full border border-border bg-accent px-4 py-3 font-mono text-sm font-semibold transition-colors hover:bg-secondary"
      >
        <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
        {shorten(address)}
        <span className="sr-only">Connected. Click to disconnect.</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={connect}
      disabled={connecting}
      className="ml-1 rounded-full border border-border bg-accent px-5 py-3 text-sm font-semibold transition-colors hover:bg-secondary disabled:opacity-60"
    >
      {connecting ? 'Connecting…' : 'Connect wallet'}
    </button>
  )
}
