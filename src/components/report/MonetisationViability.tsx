import SectionCard from './SectionCard'

function Pips({ score }: { score: number }) {
  const clamped = Math.max(0, Math.min(5, Math.round(score)))
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex gap-[3px]" aria-hidden>
        {[1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={`h-[10px] w-[10px] rounded-full ${i <= clamped ? 'bg-ink' : 'bg-rule'}`} />
        ))}
      </span>
      <span className="font-mono text-[11px] text-muted">{clamped}/5</span>
    </span>
  )
}

export default function MonetisationViability({
  score,
  recommendedModel,
  pricingSuggestion,
  keyRisk,
  number,
}: {
  score: number
  recommendedModel: string
  pricingSuggestion: string
  keyRisk: string
  number?: string
}) {
  return (
    <SectionCard number={number} title="Monetisation" aside={<Pips score={score} />}>
      <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-[140px_1fr]">
        <dt className="kicker pt-[3px]">Model</dt>
        <dd className="text-[15px] font-medium text-ink">{recommendedModel}</dd>
        <dt className="kicker pt-[3px]">Pricing</dt>
        <dd className="text-[14px] leading-relaxed text-ink-soft">{pricingSuggestion}</dd>
        <dt className="kicker pt-[3px] text-nobuild!">Key risk</dt>
        <dd className="text-[14px] leading-relaxed text-ink-soft">{keyRisk}</dd>
      </dl>
    </SectionCard>
  )
}
