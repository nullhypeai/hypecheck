import { SubMetric, ScoreStrength } from '@/lib/types'
import SectionCard from './SectionCard'

function StrengthDot({ strength }: { strength: ScoreStrength }) {
  const colour =
    strength === 'strong'
      ? 'bg-[#22C55E]'
      : strength === 'moderate'
      ? 'bg-[#F59E0B]'
      : 'bg-[#EF4444]'
  return <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colour}`} />
}

function MetricRow({ metric }: { metric: SubMetric }) {
  return (
    <div className="flex items-start gap-3">
      <StrengthDot strength={metric.strength} />
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-wide text-[#888888]">
          {metric.label}
        </p>
        <p className="mt-0.5 text-[14px] leading-relaxed text-[#F5F5F5]">
          {metric.insight}
        </p>
      </div>
    </div>
  )
}

export default function MarketOpportunity({
  metrics,
}: {
  metrics: SubMetric[]
}) {
  return (
    <SectionCard title="Market Opportunity">
      <div className="flex flex-col gap-5">
        {metrics.map((m, i) => (
          <MetricRow key={i} metric={m} />
        ))}
      </div>
    </SectionCard>
  )
}
