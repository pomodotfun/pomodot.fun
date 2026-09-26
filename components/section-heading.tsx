export function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        <span aria-hidden="true" className="h-px w-14 bg-border" />
        {eyebrow}
        <span aria-hidden="true" className="h-px w-14 bg-border" />
      </p>
      <h2 id={id} className="mt-3 text-balance text-4xl font-bold tracking-tighter md:text-5xl">
        {title}
      </h2>
    </div>
  )
}
