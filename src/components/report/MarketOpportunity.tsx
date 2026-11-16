import { SubMetric } from '@/lib/types'
import SectionCard from './SectionCard'
import { StrengthMeter } from './levels'

export default function MarketOpportunity({ metrics, number }: { metrics: SubMetric[]; number?: string }) {
  return (
    <SectionCard number={number} title="Market opportunity">
      <div className="grid gap-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-rule">
        {metrics.map((m, i) => (
          <div key={i} className="sm:px-5 sm:first:pl-0 sm:last:pr-0">
            <p className="kicker">{m.label}</p>
            <div className="mt-2">
              <StrengthMeter strength={m.strength} />
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{m.insight}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
