'use client'

import { usePrequalStore } from '@/lib/store'
import { MapPin } from 'lucide-react'

export default function BookingWidget() {
  const openModal = usePrequalStore((s) => s.openModal)

  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault()
    openModal(undefined, 'hero-get-started')
  }

  return (
    <form
      onSubmit={handleGetStarted}
      className="bg-white rounded-card shadow-2xl p-5 md:p-6 w-full max-w-lg"
      aria-label="Quick booking form"
    >
      <div className="space-y-4">
        {/* County Select Trigger */}
        <div>
          <label htmlFor="county-select-trigger" className="block text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1.5">
            Select Your County
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft pointer-events-none" />
            <button
              id="county-select-trigger"
              type="button"
              onClick={() => openModal(undefined, 'hero-county-attempt')}
              className="w-full pl-9 pr-8 py-3 text-sm border border-border-color rounded-lg text-left text-ink-soft bg-white focus:outline-none focus:ring-2 focus:ring-accent flex items-center justify-between"
            >
              <span>Select location...</span>
              <span className="text-xs text-ink-soft">▼</span>
            </button>
          </div>
        </div>

        {/* Orange Get Started Button */}
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-hover text-white font-semibold text-base px-6 py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[56px]"
        >
          Get Started
        </button>
      </div>

      {/* Trust micro-copy */}
      <p className="text-center text-xs text-ink-soft mt-4 flex items-center justify-center gap-3 flex-wrap">
        <span>⚡ Instant quote</span>
        <span>✓ Free cancellation</span>
        <span>🔒 No hidden fees</span>
      </p>
    </form>
  )
}
