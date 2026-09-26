'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type PhantomProvider = {
  isPhantom?: boolean
  publicKey?: { toString(): string } | null
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString(): string } }>
  disconnect: () => Promise<void>
  on: (event: string, handler: (...args: unknown[]) => void) => void
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void
}

declare global {
  interface Window {
    phantom?: { solana?: PhantomProvider }
    solana?: PhantomProvider
  }
}

type WalletContextValue = {
  address: string | null
  connecting: boolean
  connect: () => Promise<void>
  disconnect: () => Promise<void>
}

const WalletContext = createContext<WalletContextValue | null>(null)

function getProvider(): PhantomProvider | null {
  if (typeof window === 'undefined') return null
  const provider = window.phantom?.solana ?? window.solana
  return provider?.isPhantom ? provider : null
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    const provider = getProvider()
    if (!provider) return

    provider
      .connect({ onlyIfTrusted: true })
      .then((res) => setAddress(res.publicKey.toString()))
      .catch(() => {})

    const handleAccountChanged = (...args: unknown[]) => {
      const key = args[0] as { toString(): string } | null
      setAddress(key ? key.toString() : null)
    }
    const handleDisconnect = () => setAddress(null)

    provider.on('accountChanged', handleAccountChanged)
    provider.on('disconnect', handleDisconnect)
    return () => {
      provider.removeListener?.('accountChanged', handleAccountChanged)
      provider.removeListener?.('disconnect', handleDisconnect)
    }
  }, [])

  const connect = useCallback(async () => {
    const provider = getProvider()
    if (!provider) {
      window.open('https://phantom.app/', '_blank', 'noopener,noreferrer')
      return
    }
    setConnecting(true)
    try {
      const res = await provider.connect()
      setAddress(res.publicKey.toString())
    } catch {
      // User rejected the connection request.
    } finally {
      setConnecting(false)
    }
  }, [])

  const disconnect = useCallback(async () => {
    await getProvider()?.disconnect()
    setAddress(null)
  }, [])

  return (
    <WalletContext.Provider value={{ address, connecting, connect, disconnect }}>{children}</WalletContext.Provider>
  )
}

export function useWallet() {
  const ctx = useContext(WalletContext)
  if (!ctx) throw new Error('useWallet must be used within WalletProvider')
  return ctx
}
