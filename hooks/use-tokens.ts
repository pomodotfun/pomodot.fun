'use client'

import useSWR from 'swr'
import type { Token } from '@/lib/tokens'

const fetcher = (url: string) => fetch(url).then((res) => res.json() as Promise<Token[]>)

export function useTokens(fallbackData: Token[]) {
  const { data } = useSWR('/api/tokens', fetcher, {
    fallbackData,
    refreshInterval: 30_000,
    revalidateOnMount: false,
  })
  return data ?? fallbackData
}
