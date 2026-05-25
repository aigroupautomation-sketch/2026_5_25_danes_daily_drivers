'use client'

import { usePrequalStore } from '@/lib/store'

export default function StickyCTA() {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden px-4 pb-4 pt-2 bg-gradient-to-t from-white/95 to-transparent">
      <button
        onClick={() => openModal(undefined, 'sticky-mobile-cta')}
        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold text-base px-6 py-4 rounded-pill shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[56px]"
      >
        See My Price — 60 seconds
      </button>
    </div>
  )
}
