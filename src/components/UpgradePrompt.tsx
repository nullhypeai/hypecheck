'use client'

import { useState } from 'react'

interface UpgradePromptProps {
  onClose?: () => void
}

export function UpgradePrompt({ onClose }: UpgradePromptProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpgrade = async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/payments/checkout', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to Stripe hosted checkout page
      window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Could not start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl">
        
        {/* Icon */}
        <div className="text-5xl mb-4">🚀</div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-white mb-2">
          You've used your 3 free reports
        </h2>
        <p className="text-gray-400 mb-6">
          Upgrade to HypeCheck Pro for unlimited idea validation. 
          One subscription, unlimited clarity.
        </p>

        {/* Pricing card */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="text-4xl font-bold text-white">
            $9
            <span className="text-lg font-normal text-gray-400">/month</span>
          </div>
          <ul className="text-gray-400 text-sm mt-3 space-y-1">
            <li>✓ Unlimited validation reports</li>
            <li>✓ Full competitor analysis</li>
            <li>✓ Real demand signals</li>
            <li>✓ Cancel anytime</li>
          </ul>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* CTA button */}
        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-colors mb-3"
        >
          {loading ? 'Redirecting to checkout...' : 'Upgrade to Pro — $9/month'}
        </button>

        {/* Dismiss option */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-400 text-sm transition-colors"
          >
            Maybe later
          </button>
        )}

        {/* Trust signal */}
        <p className="text-gray-600 text-xs mt-4">
          Secure payment via Dodo Payments · No card stored on our servers
        </p>
      </div>
    </div>
  )
}
