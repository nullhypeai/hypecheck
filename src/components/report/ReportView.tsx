import { HypeCheckReport } from '@/lib/types'
import ReportHeader from './ReportHeader'
import MarketOpportunity from './MarketOpportunity'
import CompetitiveLandscape from './CompetitiveLandscape'
import DemandSignals from './DemandSignals'
import MonetisationViability from './MonetisationViability'
import ExecutionRisk from './ExecutionRisk'
import NextStep from './NextStep'
import Sources from './Sources'
import { sanitizeReportText } from '@/lib/sanitizeText'

export default function ReportView({ report }: { report: HypeCheckReport }) {
  const r = sanitizeReportText(report)
  const sources = r.sources ?? []

  return (
    <article className="flex flex-col gap-12">
      <ReportHeader
        ideaTitle={r.ideaTitle}
        hypeScore={r.hypeScore}
        verdict={r.verdict}
        oneLinerSummary={r.oneLinerSummary}
        keyAssumption={r.keyAssumption}
        sourceCount={sources.length}
      />
      <NextStep action={r.nextStep.action} rationale={r.nextStep.rationale} successSignal={r.nextStep.successSignal} />
      <MarketOpportunity number="01" metrics={r.marketOpportunity.metrics} />
      <CompetitiveLandscape
        number="02"
        competitors={r.competitiveLandscape.competitors}
        competitiveAdvantage={r.competitiveLandscape.competitiveAdvantage}
      />
      <DemandSignals
        number="03"
        signals={r.demandSignals.signals}
        summary={r.demandSignals.summary}
        overallDemandStrength={r.demandSignals.overallDemandStrength}
      />
      <MonetisationViability
        number="04"
        score={r.monetisationViability.score}
        recommendedModel={r.monetisationViability.recommendedModel}
        pricingSuggestion={r.monetisationViability.pricingSuggestion}
        keyRisk={r.monetisationViability.keyRisk}
      />
      <ExecutionRisk number="05" factors={r.executionRisk.factors} overallRiskLevel={r.executionRisk.overallRiskLevel} />
      {sources.length > 0 && <Sources number="06" sources={sources} />}
    </article>
  )
}
