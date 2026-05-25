import type { Metadata } from 'next'
import { ClipboardList, Receipt, Key, ChevronRight } from 'lucide-react'
import FinalCTABanner from '@/components/FinalCTABanner'
import HowItWorksCTA from '@/components/HowItWorksCTA'

export const metadata: Metadata = {
  title: 'How It Works — Transparent Car Rental Process',
  description:
    'Qualify in 60 seconds, see your all-in price, and drive away in the exact car you booked. No counter lines. No hidden fees.',
}

const steps = [
  {
    icon: ClipboardList,
    number: '01',
    title: 'Answer 5 quick questions',
    description:
      "Our prequalification form takes 60 seconds. We ask about your trip dates, driver age, license, payment method, and insurance preference. This isn't gatekeeping — it's the opposite. We use your answers to show you the exact, all-in price before you ever commit.",
    qa: [
      {
        q: 'Why do you ask about my age?',
        a: "Nevada law and our insurance policy require a minimum age of 21. Drivers 21–24 pay a $25/day young-driver fee. We show this upfront — not at the counter.",
      },
      {
        q: 'What if I have a foreign license?',
        a: 'International licenses are accepted. If your license is not in English, please bring an International Driving Permit.',
      },
    ],
  },
  {
    icon: Receipt,
    number: '02',
    title: 'See your real total',
    description:
      "After you complete the form, you'll see a quote with every single line item: base rate, young-driver fee (if applicable), additional driver, insurance, taxes, and fees. The number you see is the number you pay. We built this because every horror story about rental cars starts with a counter surprise.",
    qa: [
      {
        q: 'Are there any fees not shown in the quote?',
        a: "No. The quote includes everything: base rate, all taxes, young-driver surcharge if applicable, insurance selection, additional driver, and facility fees. The only variable is fuel — we require you return the car full.",
      },
      {
        q: 'What if I want to add insurance after I see the quote?',
        a: "No problem. You can update your selection any time before pickup by contacting us directly.",
      },
    ],
  },
  {
    icon: Key,
    number: '03',
    title: 'Drive away',
    description:
      "Pickup is contactless. You'll receive the car's location, access instructions, and a digital key delivery — no counter, no paperwork line, no upsell. The car is the exact model, color, and trim from your confirmation. If for any reason the confirmed vehicle is unavailable, we'll contact you before pickup — never surprise you at the lot.",
    qa: [
      {
        q: 'Where do I pick up the car?',
        a: "We deliver to the Strip, Harry Reid Airport (LAS), and Henderson. Delivery is $25 within the Las Vegas Valley. Self-pickup is also available at our main lot.",
      },
      {
        q: 'What if I need to extend my rental?',
        a: 'Text or call us and we\'ll extend if the car is available. Same all-in daily rate applies.',
      },
    ],
  },
]

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)' }}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Process</p>
          <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}>
            How it works
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Qualify. See your price. Drive. Three steps — the first one takes 60 seconds.
          </p>
        </div>
      </section>

      {/* Steps */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {steps.map((step, i) => {
          const Icon = step.icon
          const isLast = i === steps.length - 1
          return (
            <div key={step.number} className="grid md:grid-cols-[80px_1fr] gap-6 md:gap-10 mb-16 last:mb-0">
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-border-color mt-4 hidden md:block" />
                )}
              </div>

              {/* Content */}
              <div className="pb-12 border-b border-border-color last:border-0 last:pb-0">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Step {step.number}</span>
                <h2 className="font-display font-semibold text-ink text-2xl md:text-3xl mt-1 mb-4">{step.title}</h2>
                <p className="text-ink-soft leading-relaxed text-base mb-6 max-w-2xl">{step.description}</p>

                {/* Q&A */}
                <div className="space-y-4">
                  {step.qa.map((item) => (
                    <div key={item.q} className="bg-bg-soft rounded-card p-5">
                      <p className="font-semibold text-ink text-sm mb-1.5 flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-accent flex-shrink-0" />
                        {item.q}
                      </p>
                      <p className="text-ink-soft text-sm leading-relaxed pl-6">{item.a}</p>
                    </div>
                  ))}
                </div>

                {i === 0 && (
                  <div className="mt-6">
                    <HowItWorksCTA />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <FinalCTABanner />
    </>
  )
}
