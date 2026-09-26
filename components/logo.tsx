import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Pump Fomo home">
      <span className="flex size-10 items-center justify-center rounded-full border border-border bg-card">
        <Image src="/logo.png" alt="" width={28} height={28} className="size-7 object-contain" priority />
      </span>
      <span className="text-lg font-bold tracking-tight">
        <span className="text-brand">Pump</span> <span className="text-foreground">Fomo</span>
      </span>
    </Link>
  )
}
