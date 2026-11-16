'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'

interface UpgradePromptProps {
  onClose?: () => void
}

export function UpgradePrompt({ onClose }: UpgradePromptProps) {
  const [loading, setLoading] = useState<'single' | 'pack' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (tier: 'single' | 'pack') => {
    setLoading(tier)
    setError(null)
    track('checkout_started', { product: 'hypecheck', tier })

    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Could not start checkout. Please try again.')
      setLoading(null)
    }
  }

  const tiers = [
    {
      id: 'single' as const,
      price: '$5',
      name: 'Single report',
      note: 'One more idea to check.',
      cta: 'Buy 1 report',
    },
    {
      id: 'pack' as const,
      price: '$8.99',
      name: '10 reports',
      note: '$0.90 per report. Credits never expire.',
      cta: 'Buy 10 reports',
      featured: true,
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-[2px]">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upgrade-title"
        className="max-h-[calc(100vh-2rem)] w-full max-w-lg overflow-y-auto border border-ink bg-paper p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-8"
      >
        <p className="kicker">Free reports used</p>
        <h2 id="upgrade-title" className="mt-2 font-serif text-[28px] font-medium leading-tight text-ink">
          You&apos;ve used your 3 free reports
        </h2>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
          Every report includes live web research, sourced competitors and demand evidence, a verdict, and a next step
          with a pass or fail target. One-time payments, no subscription.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`flex flex-col border p-5 ${t.featured ? 'border-ink bg-surface' : 'border-rule-strong'}`}
            >
              <p className="kicker">{t.featured ? 'Best value' : 'One-off'}</p>
              <p className="mt-2 font-serif text-[34px] font-medium leading-none text-ink">{t.price}</p>
              <p className="mt-2 text-[14px] font-medium text-ink">{t.name}</p>
              <p className="mt-1 text-[12.5px] text-muted">{t.note}</p>
              <button
                onClick={() => handlePurchase(t.id)}
                disabled={loading !== null}
                className={`mt-5 px-4 py-2.5 text-[14px] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  t.featured ? 'bg-ink text-paper hover:bg-ink-soft' : 'border border-ink text-ink hover:bg-surface'
                }`}
              >
                {loading === t.id ? 'Redirecting...' : t.cta}
              </button>
            </div>
          ))}
        </div>

        {error && <p className="mt-4 text-[13px] text-nobuild">{error}</p>}

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4">
          <p className="text-[12px] text-muted">Secure checkout via Dodo Payments.</p>
          {onClose && (
            <button onClick={onClose} className="text-[13px] text-muted underline-offset-2 hover:text-ink hover:underline">
              Maybe later
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
