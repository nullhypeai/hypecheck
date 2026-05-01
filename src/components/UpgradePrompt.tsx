'use client'

import { useState } from 'react'

interface UpgradePromptProps {
  onClose?: () => void
}

export function UpgradePrompt({ onClose }: UpgradePromptProps) {
  const [loading, setLoading] = useState<'single' | 'pack' | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handlePurchase = async (tier: 'single' | 'pack') => {
    setLoading(tier)
    setError(null)

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

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-2xl p-8 max-w-lg w-full text-center shadow-2xl">

        <div className="text-5xl mb-4">⚡</div>

        <h2 className="text-2xl font-bold text-[#F5F5F5] mb-2">
          You've used your 3 free reports
        </h2>
        <p className="text-[#999999] mb-6">
          Buy more reports — one-time payment, no recurring plans, no recurring charges.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Single report */}
          <div className="bg-[#0F0F0F] border border-[#222222] rounded-xl p-5 flex flex-col items-center">
            <div className="text-3xl font-bold text-[#F5F5F5]">$5</div>
            <div className="text-[#999999] text-sm mt-1">1 report</div>
            <ul className="text-[#888888] text-xs mt-3 space-y-1 text-left">
              <li>✓ Full validation report</li>
              <li>✓ Competitor analysis</li>
              <li>✓ Shareable link</li>
            </ul>
            <button
              onClick={() => handlePurchase('single')}
              disabled={loading !== null}
              className="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              {loading === 'single' ? 'Redirecting...' : 'Buy 1 report'}
            </button>
          </div>

          {/* 10-pack */}
          <div className="bg-[#0F0F0F] border border-[#2563EB] rounded-xl p-5 flex flex-col items-center relative">
            <div className="absolute -top-3 bg-[#2563EB] text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <div className="text-3xl font-bold text-[#F5F5F5]">$8.99</div>
            <div className="text-[#999999] text-sm mt-1">10 reports</div>
            <ul className="text-[#888888] text-xs mt-3 space-y-1 text-left">
              <li>✓ Everything in single</li>
              <li>✓ 10x the reports</li>
              <li>✓ $0.90 per report</li>
            </ul>
            <button
              onClick={() => handlePurchase('pack')}
              disabled={loading !== null}
              className="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            >
              {loading === 'pack' ? 'Redirecting...' : 'Buy 10 reports'}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {onClose && (
          <button
            onClick={onClose}
            className="text-[#555555] hover:text-[#888888] text-sm transition-colors"
          >
            Maybe later
          </button>
        )}

        <p className="text-[#555555] text-xs mt-4">
          One-time payment · No subscriptions · Secure checkout via Dodo Payments
        </p>
      </div>
    </div>
  )
}
