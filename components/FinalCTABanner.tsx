'use client'

import { usePrequalStore } from '@/lib/store'

export default function FinalCTABanner() {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <section
      className="py-20 md:py-28"
      style={{ background: 'linear-gradient(135deg, #E55A3C 0%, #C94A30 100%)' }}
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-white mb-4" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="final-cta-heading">
          Ready to start earning?
        </h2>
        <p className="text-white/85 text-lg mb-8 max-w-md mx-auto">
          Qualify in minutes. No auto insurance required. No vehicle ownership needed. Get on the road today.
        </p>
        <button
          onClick={() => openModal(undefined, 'final-cta-banner')}
          className="bg-white text-accent hover:bg-gray-50 font-semibold text-lg px-10 py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent min-h-[56px] shadow-lg"
        >
          Check My Eligibility
        </button>
        <p className="text-white/60 text-xs mt-5">
          Free to check · No credit card required · Same-day availability
        </p>
      </div>
    </section>
  )
}
