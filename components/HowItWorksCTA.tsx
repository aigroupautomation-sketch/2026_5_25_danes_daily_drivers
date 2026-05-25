'use client'

import { usePrequalStore } from '@/lib/store'

export default function HowItWorksCTA() {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <button
      onClick={() => openModal(undefined, 'how-it-works-page')}
      className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[48px]"
    >
      Start the 60-second form
    </button>
  )
}
