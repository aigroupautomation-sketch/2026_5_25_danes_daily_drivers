'use client'

import { usePrequalStore } from '@/lib/store'

export default function HeroCTA() {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <button
      onClick={() => openModal(undefined, 'hero-cta')}
      className="bg-accent hover:bg-accent-hover text-white font-semibold text-base px-8 py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink min-h-[56px]"
    >
      Get Started
    </button>
  )
}
