import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative flex flex-col items-center px-4 pb-24 pt-20 text-center md:pt-28">
      <Image
        src="/logo.png"
        alt="Pump Fomo logo"
        width={192}
        height={192}
        priority
        className="size-40 object-contain drop-shadow-[0_0_60px_rgba(53,116,217,0.45)] md:size-48"
      />

      <h1 id="hero-heading" className="mt-10 text-balance text-6xl font-bold tracking-tighter md:text-7xl">
        <span className="text-brand">Pump</span> <span className="text-foreground">Fomo</span>
      </h1>
      <p className="mt-5 text-lg text-muted-foreground md:text-xl">Every token starts on POMO</p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/launch"
          className="rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90"
        >
          Launch a token
        </Link>
        <Link
          href="/how"
          className="rounded-full border border-border bg-card/70 px-7 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-secondary"
        >
          How it works
        </Link>
      </div>
    </section>
  )
}
