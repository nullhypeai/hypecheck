export type ScoreStrength = 'strong' | 'moderate' | 'weak'
export type ThreatLevel = 'Low' | 'Medium' | 'High'
export type Verdict = 'Build' | "Don't Build" | 'Validate First'

export interface SubMetric {
  label: string
  insight: string
  strength: ScoreStrength
}

export interface Competitor {
  name: string
  url?: string | null
  description: string
  threatLevel: ThreatLevel
}

export interface DemandSignal {
  quote: string
  source: string
  platform: 'Reddit' | 'X' | 'Hacker News' | 'Reviews' | 'Forum' | 'General'
  url?: string | null
}

export interface Source {
  title: string
  url: string
}

export interface RiskFactor {
  factor: string
  severity: ThreatLevel
  mitigation: string
}

export interface HypeCheckReport {
  ideaTitle: string
  hypeScore: number
  verdict: Verdict
  oneLinerSummary: string
  // Fields marked optional were added with web research (Nov 2026); older saved reports lack them.
  keyAssumption?: string
  marketOpportunity: {
    metrics: SubMetric[]
  }
  competitiveLandscape: {
    competitors: Competitor[]
    competitiveAdvantage: string
  }
  demandSignals: {
    signals: DemandSignal[]
    summary?: string
    overallDemandStrength: ScoreStrength
  }
  monetisationViability: {
    score: number
    recommendedModel: string
    pricingSuggestion: string
    keyRisk: string
  }
  executionRisk: {
    factors: RiskFactor[]
    overallRiskLevel: ThreatLevel
  }
  nextStep: {
    action: string
    rationale: string
    successSignal?: string
  }
  sources?: Source[]
}
