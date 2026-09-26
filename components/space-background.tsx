import Image from 'next/image'

export function SpaceBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <Image src="/space-bg.png" alt="" fill priority sizes="100vw" className="object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
    </div>
  )
}
