'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { track } from '@vercel/analytics'
import { createClient } from '@/lib/supabase/client'
import { UpgradePrompt } from '@/components/UpgradePrompt'
import SiteHeader from '@/components/site/SiteHeader'
import SiteFooter from '@/components/site/SiteFooter'
import ResearchProgress, { type SearchLine, type StageId } from '@/components/check/ResearchProgress'

const PLACEHOLDER = `Example: Two-way SMS reminders for independent dental clinics. When a patient cancels, we text the waitlist and fill the slot automatically. Integrates with Dentrix and Open Dental. $149/month per clinic.`

const PROMPTS = [
  'Who is the customer, as specifically as you can say it?',
  'What do they use today instead?',
  'How would you charge, and roughly how much?',
]

type StreamEvent =
  | { type: 'phase'; phase: 'researching' | 'writing' | 'saving' }
  | { type: 'search'; query: string }
  | { type: 'results'; count: number; domains: string[] }
  | { type: 'done'; slug: string }
  | { type: 'error'; message: string }

export default function CheckPage() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false)
  const [stage, setStage] = useState<StageId>('checking')
  const [searches, setSearches] = useState<SearchLine[]>([])
  const [startedAt, setStartedAt] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('purchased') === 'true') {
      track('purchase_succeeded', { product: 'hypecheck' })
    }
  }, [])

  async function handleSignOut() {
    await createClient().auth.signOut()
    router.push('/login')
  }

  const characterCount = idea.length
  const isValid = idea.trim().length >= 10
  const isNearLimit = characterCount > 1800

  function fail(message: string) {
    setError(message)
    setLoading(false)
  }

  function applyEvent(event: StreamEvent): string | null {
    switch (event.type) {
      case 'phase':
        setStage(event.phase === 'researching' ? 'planning' : event.phase)
        return null
      case 'search':
        setStage((s) => (s === 'planning' || s === 'checking' ? 'searching' : s))
        setSearches((prev) =>
          prev.some((line) => line.query === event.query) ? prev : [...prev, { query: event.query }],
        )
        return null
      case 'results':
        setSearches((prev) => {
          // Attach to the latest search that has no results yet.
          const idx = prev.findLastIndex((line) => line.count === undefined)
          if (idx === -1) return prev
          const next = [...prev]
          next[idx] = { ...next[idx], count: event.count, domains: event.domains }
          return next
        })
        return null
      case 'done':
        return event.slug
      case 'error':
        throw new Error(event.message)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isValid || loading) return

    setLoading(true)
    setError('')
    setStage('checking')
    setSearches([])
    setStartedAt(Date.now())

    let response: Response
    try {
      response = await fetch('/api/hypecheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      })
    } catch {
      fail('Network error. Please check your connection and try again.')
      return
    }

    // Checks that fail before research starts come back as plain JSON.
    if (!response.ok || !response.body || response.headers.get('content-type')?.includes('application/json')) {
      const data = await response.json().catch(() => ({}))
      if (response.status === 403 && data.error === 'FREE_TIER_EXHAUSTED') {
        track('paywall_shown', { product: 'hypecheck' })
        setShowUpgradePrompt(true)
        setLoading(false)
        return
      }
      fail(data.error || 'Something went wrong. Please try again.')
      return
    }

    // Research has started: read NDJSON progress events until we get a slug or an error.
    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let slug: string | null = null

    try {
      while (!slug) {
        const { done, value } = await reader.read()
        if (value) buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''
        for (const line of lines) {
          if (!line.trim()) continue
          slug = applyEvent(JSON.parse(line) as StreamEvent) ?? slug
        }
        if (done) break
      }
    } catch (err) {
      track('scan_failed', { product: 'hypecheck' })
      fail(err instanceof Error && err.message ? err.message : 'Something went wrong. Please try again.')
      return
    }

    if (!slug) {
      fail('The connection dropped before the report finished. If it completed, it will appear in My reports in a minute.')
      return
    }

    track('scan_run', { product: 'hypecheck' })
    document.title = 'Report ready · HypeCheck'
    router.push(`/report/${slug}`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {showUpgradePrompt && <UpgradePrompt onClose={() => setShowUpgradePrompt(false)} />}

      <SiteHeader>
        <Link href="/reports" className="text-muted transition-colors hover:text-ink">
          My reports
        </Link>
        <button onClick={handleSignOut} className="text-muted transition-colors hover:text-ink">
          Sign out
        </button>
      </SiteHeader>

      <main className="mx-auto w-full max-w-[720px] flex-1 px-4 py-12 sm:px-6 sm:py-16">
        {loading ? (
          <ResearchProgress stage={stage} searches={searches} startedAt={startedAt} idea={idea.trim()} />
        ) : (
          <>
            <p className="kicker">New report</p>
            <h1 className="mt-2 font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-ink sm:text-[44px]">
              What are you thinking of building?
            </h1>
            <p className="mt-4 max-w-[560px] text-[16px] leading-relaxed text-ink-soft">
              HypeCheck researches competitors, pricing and real discussions on the web, then tells you whether the idea is
              worth your next few months, and what to test first.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3">
              <label htmlFor="idea" className="kicker">
                Your idea
              </label>
              <textarea
                id="idea"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder={PLACEHOLDER}
                rows={8}
                maxLength={2000}
                className="w-full resize-y border border-faint bg-surface px-4 py-3.5 text-[16px] leading-relaxed text-ink placeholder:text-faint focus:border-ink"
              />
              <div className="flex items-start justify-between gap-4">
                <ul className="flex flex-col gap-1 text-[12.5px] text-muted">
                  {PROMPTS.map((p) => (
                    <li key={p} className="before:mr-2 before:text-accent before:content-['/']">
                      {p}
                    </li>
                  ))}
                </ul>
                <p className={`shrink-0 font-mono text-[11px] ${isNearLimit ? 'text-validate' : 'text-faint'}`}>
                  {characterCount}/2000
                </p>
              </div>

              {error && (
                <div role="alert" className="border-l-2 border-nobuild bg-nobuild-soft px-4 py-3 text-[14px] text-nobuild">
                  {error}
                </div>
              )}

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="bg-ink px-6 py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-35"
                >
                  Run HypeCheck
                </button>
                <p className="text-[12.5px] text-muted">Usually ready in under 2 minutes. You will see the research as it happens.</p>
              </div>
            </form>
          </>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
