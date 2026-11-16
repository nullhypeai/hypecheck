import { RiskFactor, ThreatLevel } from '@/lib/types'
import SectionCard from './SectionCard'
import { LevelTag } from './levels'

export default function ExecutionRisk({
  factors,
  overallRiskLevel,
  number,
}: {
  factors: RiskFactor[]
  overallRiskLevel: ThreatLevel
  number?: string
}) {
  return (
    <SectionCard number={number} title="Execution risk" aside={<LevelTag level={overallRiskLevel} suffix="overall" />}>
      <ol className="flex flex-col">
        {factors.map((f, i) => (
          <li key={i} className="grid gap-2 border-b border-rule py-4 first:pt-0 last:border-0 last:pb-0 sm:grid-cols-[1fr_1fr] sm:gap-6">
            <div className="flex items-start justify-between gap-3">
              <p className="text-[15px] font-semibold leading-snug text-ink">{f.factor}</p>
              <LevelTag level={f.severity} />
            </div>
            <p className="text-[14px] leading-relaxed text-ink-soft">
              <span className="kicker mr-1.5">Mitigate</span>
              {f.mitigation}
            </p>
          </li>
        ))}
      </ol>
    </SectionCard>
  )
}
