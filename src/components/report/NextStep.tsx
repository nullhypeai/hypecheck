export default function NextStep({
  action,
  rationale,
  successSignal,
}: {
  action: string
  rationale: string
  successSignal?: string
}) {
  return (
    <section className="bg-ink px-6 py-7 text-paper sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-accent-soft">Do this next</p>
      <p className="mt-3 font-serif text-[22px] leading-snug sm:text-[24px]">{action}</p>
      <p className="mt-3 text-[14px] leading-relaxed text-paper/70">{rationale}</p>
      {successSignal && (
        <div className="mt-5 border-t border-paper/20 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-paper/60">How to read the result</p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-paper/90">{successSignal}</p>
        </div>
      )}
    </section>
  )
}
