import { HypeCheckReport } from '@/lib/types'

export const mockReport: HypeCheckReport = {
  ideaTitle: 'AI-Powered Code Review Copilot for Solo Developers',
  hypeScore: 74,
  verdict: 'Build',
  oneLinerSummary:
    'Strong developer tool market with proven willingness to pay, but crowded space means execution and distribution quality will determine success.',
  marketOpportunity: {
    metrics: [
      {
        label: 'Market Size',
        insight: 'Developer tooling market exceeded $28B in 2024 with 27M+ developers globally actively seeking productivity tools.',
        strength: 'strong',
      },
      {
        label: 'Growth Signal',
        insight: 'AI coding tools grew 340% YoY in adoption. GitHub Copilot alone crossed 1.3M paid users — demand is structurally validated.',
        strength: 'strong',
      },
      {
        label: 'Timing',
        insight: 'Market is maturing but not saturated at the solo developer segment. Niche positioning is still viable and defensible.',
        strength: 'moderate',
      },
    ],
  },
  competitiveLandscape: {
    competitors: [
      {
        name: 'GitHub Copilot',
        description: 'Microsoft-backed AI pair programmer with deep IDE integration and 1M+ users.',
        threatLevel: 'High',
      },
      {
        name: 'CodeRabbit',
        description: 'Automated AI code review tool focused on PRs, growing rapidly in the startup segment.',
        threatLevel: 'High',
      },
      {
        name: 'Sourcery',
        description: 'Python-focused AI refactoring and review tool with a small but loyal user base.',
        threatLevel: 'Medium',
      },
      {
        name: 'CodiumAI',
        description: 'AI test generation and code integrity tool with free tier and growing community.',
        threatLevel: 'Medium',
      },
    ],
    competitiveAdvantage:
      'Solo developer focus with async, non-blocking review flow is underserved — incumbents are optimised for team workflows.',
  },
  demandSignals: {
    signals: [
      {
        quote:
          'I spend more time reviewing my own code than writing it. I need something that catches what I miss at 11pm.',
        source: 'r/ExperiencedDevs',
        platform: 'Reddit',
      },
      {
        quote:
          'Solo devs who ship fast need async code review. There is no tool built specifically for us — everything assumes a team.',
        source: 'r/SideProject',
        platform: 'Reddit',
      },
      {
        quote:
          'Just shipped a bug that a code reviewer would have caught in 30 seconds. Solo dev life. Need an AI reviewer that actually understands context.',
        source: '@levelsio-style thread on X',
        platform: 'X',
      },
    ],
    overallDemandStrength: 'strong',
  },
  monetisationViability: {
    score: 4,
    recommendedModel: 'Freemium SaaS subscription',
    pricingSuggestion:
      'Free tier at 50 reviews/month, Pro at $12/month unlimited, Team at $24/seat/month.',
    keyRisk:
      'GitHub Copilot bundles basic review features — free tier must be meaningfully better to justify switching cost.',
  },
  executionRisk: {
    factors: [
      {
        factor: 'API Cost Margin',
        severity: 'Medium',
        mitigation:
          'Cap context window per review to 4K tokens and cache repeated patterns to keep per-review cost under $0.008.',
      },
      {
        factor: 'GitHub Integration Complexity',
        severity: 'Medium',
        mitigation:
          'Use GitHub Webhooks for PR events — no OAuth complexity needed for the MVP. Full app integration is Phase 2.',
      },
      {
        factor: 'Distribution Against Incumbents',
        severity: 'High',
        mitigation:
          'Do not compete on features. Compete on distribution — solo developer X community and r/SideProject are underserved by Copilot marketing.',
      },
    ],
    overallRiskLevel: 'Medium',
  },
  nextStep: {
    action:
      'Post in r/SideProject with the title "Solo devs — how do you do code review when you have no team?" and measure the response volume and language people use to describe the pain.',
    rationale:
      'Demand signals exist in training data but real-time validation costs nothing and takes 20 minutes. If the post gets 50+ upvotes, the pain is real and current.',
  },
}
