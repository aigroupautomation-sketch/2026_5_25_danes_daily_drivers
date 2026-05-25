'use client'

import { ClipboardList, Receipt, Key } from 'lucide-react'
import { usePrequalStore } from '@/lib/store'

const steps = [
  {
    icon: ClipboardList,
    title: 'Answer 5 quick questions',
    description:
      "Tell us your pickup location, dates, and driver info. We confirm you qualify on the spot — no auto insurance required, no vehicle ownership needed.",
    number: '01',
  },
  {
    icon: Receipt,
    title: 'See your all-in total',
    description:
      'Every fee shown upfront — base rate, taxes, and any extras. No surprises. Approved for DoorDash, Uber, Lyft, Amazon Flex, Instacart, and more.',
    number: '02',
  },
  {
    icon: Key,
    title: 'Pick up and start earning',
    description:
      'Contactless pickup. The exact car from your confirmation — clean, fueled, and ready. Get on the road the same day and start making money.',
    number: '03',
  },
]

export default function HowItWorksSection() {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <section className="py-20 md:py-28 bg-bg-soft" aria-labelledby="how-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Process</p>
          <h2 className="font-display text-ink mb-4" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="how-heading">
            On the road in three steps
          </h2>
          <p className="text-ink-soft text-lg max-w-md mx-auto">
            Fast onboarding designed for workers who need to move quickly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="bg-white rounded-card p-6 border border-border-color relative overflow-hidden">
                <span
                  className="absolute top-4 right-4 text-6xl font-bold text-gray-50 select-none"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-ink text-lg mb-2">{step.title}</h3>
                <p className="text-ink-soft text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => openModal(undefined, 'how-it-works')}
            className="bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[52px]"
          >
            Check my eligibility — it&apos;s free
          </button>
        </div>
      </div>
    </section>
  )
}
