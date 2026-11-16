'use client'

import { useState } from 'react'

export default function ShareButton({
  ideaTitle,
  hypeScore,
}: {
  ideaTitle: string
  hypeScore: number
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API can fail in non-HTTPS or some browser contexts.
      // Silently no-op. The X share button still works as a fallback.
    }
  }

  const handleShareOnX = () => {
    const text = `Got a Hype Score of ${hypeScore}/100 for my idea: "${ideaTitle}"\n\nValidate yours:`
    const url = window.location.href
    const intent = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(intent, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleCopy}
        className="border border-rule-strong bg-surface px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink transition-colors hover:border-ink"
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <button
        onClick={handleShareOnX}
        className="border border-ink bg-ink px-3 py-1.5 font-mono text-[11.5px] uppercase tracking-[0.08em] text-paper transition-colors hover:bg-ink-soft"
      >
        Share on X
      </button>
    </div>
  )
}
