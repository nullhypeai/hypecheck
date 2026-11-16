'use client'

import { useEffect, useState } from 'react'

export type StageId = 'checking' | 'planning' | 'searching' | 'writing' | 'saving'

export interface SearchLine {
  query: string
  count?: number
  domains?: string[]
}

// Rotating hints for the stretches where the server sends no events. Each line describes work the
// model is actually instructed to do in that phase; none claims a specific event happened.
const SILENT_HINTS: Partial<Record<StageId, string[]>> = {
  planning: [
    'Working out who the customer is and what they use today.',
    'Deciding which competitors and prices to look up.',
    'Choosing where people would talk about this problem: Reddit, HN, reviews, forums.',
  ],
  writing: [
    'Checking which claims the sources actually support.',
    'Scoring the idea against the evidence it found.',
    'Picking the one assumption most likely to be wrong.',
    'Designing a test you can run this week, with a pass or fail target.',
  ],
}

const STAGES: { id: StageId; label: string; hint: string }[] = [
  { id: 'checking', label: 'Reading your idea', hint: 'Making sure there is a business idea to analyse.' },
  {
    id: 'planning',
    label: 'Planning the research',
    hint: 'Deciding what to look up: competitors, pricing, and where people talk about this problem.',
  },
  { id: 'searching', label: 'Searching the web', hint: 'Looking for real competitors, prices, market numbers and quotes.' },
  { id: 'writing', label: 'Weighing the evidence', hint: 'Scoring the idea and writing the verdict, risks and next step.' },
  { id: 'saving', label: 'Saving your report', hint: 'Almost there.' },
]

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function ResearchProgress({
  stage,
  searches,
  startedAt,
  idea,
}: {
  stage: StageId
  searches: SearchLine[]
  startedAt: number
  idea: string
}) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000))
  const activeIndex = STAGES.findIndex((s) => s.id === stage)
  const sourceCount = searches.reduce((sum, s) => sum + (s.count ?? 0), 0)

  // Tab title doubles as a progress indicator when the user switches tabs.
  useEffect(() => {
    const previous = document.title
    return () => {
      document.title = previous
    }
  }, [])
  useEffect(() => {
    document.title = `(${formatElapsed(elapsed)}) ${STAGES[activeIndex]?.label ?? 'Working'}… · HypeCheck`
  }, [elapsed, activeIndex])

  const reassurance =
    elapsed >= 150
      ? 'This one needs more research than most. Still working, please keep this tab open.'
      : elapsed >= 120
        ? 'Taking a little longer than usual. Thorough research beats a fast guess.'
        : 'Usually ready in under 2 minutes. Keep this tab open.'

  const stageHints = SILENT_HINTS[stage]
  const searchingHint =
    stage === 'searching' && searches.length > 0
      ? `Looked at ${sourceCount || 'several'} pages so far. Reading them for competitors, prices and quotes.`
      : null
  // Changes every 4 seconds while the stage is quiet, so the screen never sits still.
  const rotatingHint = stageHints ? stageHints[Math.floor(elapsed / 4) % stageHints.length] : null

  const announcement = `Step ${activeIndex + 1} of ${STAGES.length}: ${STAGES[activeIndex]?.label ?? ''}.${
    searches.length > 0 ? ` ${searches.length} searches run.` : ''
  }`

  return (
    <section className="animate-hc-rise">
      {/* Only stage changes are announced; the ticking timer stays out of the live region. */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </p>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-ink pb-3">
        <div>
          <p className="kicker">
            Step {activeIndex + 1} of {STAGES.length}
          </p>
          <p className="mt-1 font-serif text-[22px] font-medium leading-tight text-ink sm:text-[26px]">
            Researching your idea
          </p>
        </div>
        <div className="text-right" aria-hidden>
          <p className="font-mono text-[22px] tabular-nums leading-none text-ink sm:text-[26px]">{formatElapsed(elapsed)}</p>
          <p className="kicker mt-1">elapsed</p>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-muted">{reassurance}</p>

      <ol className="mt-6 flex flex-col">
        {STAGES.map((s, i) => {
          const state = i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending'
          return (
            <li
              key={s.id}
              aria-current={state === 'active' ? 'step' : undefined}
              className="grid grid-cols-[28px_1fr] gap-x-2 py-2.5"
            >
              <span className="pt-[5px]" aria-hidden>
                {state === 'done' && <span className="block h-[9px] w-[9px] bg-ink" />}
                {state === 'active' && <span className="block h-[9px] w-[9px] bg-accent animate-hc-pulse" />}
                {state === 'pending' && <span className="block h-[9px] w-[9px] border border-faint" />}
              </span>
              <div>
                <p
                  className={`text-[15px] ${
                    state === 'pending' ? 'text-faint' : state === 'active' ? 'font-semibold text-ink' : 'text-ink-soft'
                  }`}
                >
                  {s.label}
                  {s.id === 'searching' && searches.length > 0 && (
                    <span className="ml-2 font-mono text-[11px] font-normal text-muted">
                      {searches.length} {searches.length === 1 ? 'search' : 'searches'}
                      {sourceCount > 0 ? `, ${sourceCount} pages` : ''}
                    </span>
                  )}
                  <span className="sr-only">
                    {state === 'done' ? ' (done)' : state === 'active' ? ' (in progress)' : ' (not started)'}
                  </span>
                </p>
                {state === 'active' && (
                  <p key={rotatingHint ?? searchingHint ?? s.hint} className="mt-0.5 animate-hc-rise text-[13px] text-muted">
                    {rotatingHint ?? searchingHint ?? s.hint}
                  </p>
                )}

                {s.id === 'searching' && searches.length > 0 && (
                  <ul className="mt-3 flex flex-col gap-2 border-l border-rule pl-4">
                    {searches.map((line, j) => (
                      <li key={j} className="animate-hc-rise text-[13px] leading-snug">
                        <span className="text-ink">&ldquo;{line.query}&rdquo;</span>
                        {line.domains && line.domains.length > 0 && (
                          <span className="mt-0.5 block font-mono text-[11px] text-faint">
                            {line.count ?? line.domains.length} results: {line.domains.join(', ')}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-6 border-t border-rule pt-4">
        <p className="kicker">Your idea</p>
        <p className="mt-1.5 line-clamp-3 font-serif text-[15px] italic leading-relaxed text-ink-soft">{idea}</p>
      </div>
    </section>
  )
}
