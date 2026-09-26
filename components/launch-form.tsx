'use client'

import { useEffect, useState } from 'react'
import { Plus } from 'lucide-react'
import { useWallet } from '@/components/wallet-provider'
import { SOCIAL_LINKS } from '@/lib/site'

const fieldClass =
  'w-full rounded-xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30'
const labelClass = 'mb-2 block text-xs font-semibold tracking-wide text-muted-foreground'

export function LaunchForm() {
  const { address, connect, connecting } = useWallet()
  const [preview, setPreview] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!address) {
      await connect()
      return
    }
    setSubmitted(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-border bg-gradient-to-br from-brand/10 via-card/90 to-card/90 p-5 shadow-2xl backdrop-blur-md md:p-7"
    >
      <div className="mb-7 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-brand/15 font-mono text-xs font-bold text-brand">
            01
          </span>
          <h2 className="text-xl font-bold tracking-tight">Create your token</h2>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-brand">
          <span className="size-1.5 rounded-sm bg-brand" aria-hidden="true" />
          Solana
        </span>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <label className="group relative flex aspect-square w-full shrink-0 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-border bg-[radial-gradient(circle_at_center,var(--color-brand)/0.12,transparent_70%)] bg-background/80 transition-colors hover:border-brand sm:w-[130px]">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Token image preview" className="absolute inset-0 size-full object-cover" />
          ) : (
            <>
              <Plus className="size-5 text-muted-foreground" aria-hidden="true" />
              <span className="text-xs font-semibold text-muted-foreground">Token image</span>
            </>
          )}
          <input type="file" accept="image/*" onChange={handleImage} className="sr-only" aria-label="Token image" />
        </label>

        <div className="flex flex-1 flex-col gap-4">
          <div>
            <label htmlFor="token-name" className={labelClass}>
              Token name
            </label>
            <input id="token-name" name="name" required maxLength={32} placeholder="e.g. Save Mochi" className={fieldClass} />
          </div>
          <div>
            <label htmlFor="token-symbol" className={labelClass}>
              Symbol
            </label>
            <input id="token-symbol" name="symbol" required maxLength={10} placeholder="$MOCHI" className={fieldClass} />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="token-description" className={labelClass}>
          Description
        </label>
        <textarea
          id="token-description"
          name="description"
          rows={4}
          placeholder="Tell traders what this launch is supporting..."
          className={`${fieldClass} resize-y`}
        />
      </div>

      <div className="mt-4">
        <label htmlFor="token-dev-buy" className={labelClass}>
          Developer buy (maximum 1 SOL)
        </label>
        <input
          id="token-dev-buy"
          name="devBuy"
          type="number"
          inputMode="decimal"
          min={0}
          max={1}
          step={0.01}
          defaultValue={0}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        disabled={connecting}
        className="mt-7 w-full rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {address ? 'Launch token' : connecting ? 'Connecting…' : 'Connect wallet to launch'}
      </button>

      {submitted && (
        <p role="status" className="mt-4 text-center text-sm text-muted-foreground">
          Launches open soon. Follow{' '}
          <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline-offset-4 hover:underline">
            @pomodotfun
          </a>{' '}
          for updates.
        </p>
      )}
    </form>
  )
}
