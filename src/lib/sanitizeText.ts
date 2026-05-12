import { HypeCheckReport } from './types'

export function sanitizeDashes(value: string) {
  return value.replace(/\s+[\u2014\u2013]\s+/g, ', ').replace(/[\u2014\u2013]/g, '-')
}

export function sanitizeReportText(report: HypeCheckReport): HypeCheckReport {
  return {
    ...report,
    ideaTitle: sanitizeDashes(report.ideaTitle),
    oneLinerSummary: sanitizeDashes(report.oneLinerSummary),
    marketOpportunity: {
      metrics: report.marketOpportunity.metrics.map((metric) => ({
        ...metric,
        label: sanitizeDashes(metric.label),
        insight: sanitizeDashes(metric.insight),
      })),
    },
    competitiveLandscape: {
      competitors: report.competitiveLandscape.competitors.map((competitor) => ({
        ...competitor,
        name: sanitizeDashes(competitor.name),
        description: sanitizeDashes(competitor.description),
      })),
      competitiveAdvantage: sanitizeDashes(report.competitiveLandscape.competitiveAdvantage),
    },
    demandSignals: {
      ...report.demandSignals,
      signals: report.demandSignals.signals.map((signal) => ({
        ...signal,
        quote: sanitizeDashes(signal.quote),
        source: sanitizeDashes(signal.source),
      })),
    },
    monetisationViability: {
      ...report.monetisationViability,
      recommendedModel: sanitizeDashes(report.monetisationViability.recommendedModel),
      pricingSuggestion: sanitizeDashes(report.monetisationViability.pricingSuggestion),
      keyRisk: sanitizeDashes(report.monetisationViability.keyRisk),
    },
    executionRisk: {
      ...report.executionRisk,
      factors: report.executionRisk.factors.map((factor) => ({
        ...factor,
        factor: sanitizeDashes(factor.factor),
        mitigation: sanitizeDashes(factor.mitigation),
      })),
    },
    nextStep: {
      action: sanitizeDashes(report.nextStep.action),
      rationale: sanitizeDashes(report.nextStep.rationale),
    },
  }
}
