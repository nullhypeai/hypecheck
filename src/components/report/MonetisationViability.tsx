import SectionCard from './SectionCard'

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-2.5 w-2.5 rounded-full ${
            i < score ? 'bg-[#7C3AED]' : 'bg-[#2A2A2A]'
          }`}
        />
      ))}
    </div>
  )
}

export default function MonetisationViability({
  score,
  recommendedModel,
  pricingSuggestion,
  keyRisk,
}: {
  score: number
  recommendedModel: string
  pricingSuggestion: string
  keyRisk: string
}) {
  return (
    <SectionCard title="Monetisation Viability">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <ScoreDots score={score} />
          <p className="text-[13px] text-[#888888]">
            {score}/5 monetisation potential
          </p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555555]">
            Recommended Model
          </p>
          <p className="mt-1 text-[14px] text-[#F5F5F5]">{recommendedModel}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555555]">
            Pricing Suggestion
          </p>
          <p className="mt-1 text-[14px] text-[#F5F5F5]">{pricingSuggestion}</p>
        </div>
        <div className="rounded-lg border border-[#F59E0B]/20 bg-[#F59E0B]/5 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B]">
            Key Risk
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-[#888888]">
            {keyRisk}
          </p>
        </div>
      </div>
    </SectionCard>
  )
}
