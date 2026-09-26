import { SectionHeading } from '@/components/section-heading'

const steps = [
  {
    title: 'Launch a token',
    description:
      'Pick a name, upload a logo and set your POMO window. Your token is minted the moment you launch, with zero dev allocation.',
  },
  {
    title: 'First buyers',
    description:
      'Early buys go through POMO only. Every purchase lands on the launch curve in order, so everyone gets a fair shot.',
  },
  {
    title: 'Tokens',
    description:
      'Buyers receive their tokens on POMO, and trading opens up for everyone as soon as the buy window closes.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="border-t border-border/60 px-4 py-20">
      <div className="mx-auto max-w-[948px]">
        <SectionHeading id="how-heading" eyebrow="How it works" title="First buys on POMO" />

        <ol className="mt-8 border-t border-foreground/80">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-[40px_1fr] gap-x-4 gap-y-2 border-b border-border py-7 md:grid-cols-[60px_220px_1fr]"
            >
              <span className="pt-0.5 font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="font-bold">{step.title}</h3>
              <p className="col-start-2 max-w-md text-sm leading-relaxed text-muted-foreground md:col-start-3">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
