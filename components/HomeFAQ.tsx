'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'Do I need auto insurance to qualify?',
    a: 'No. Your quote includes unlimited miles, maintenance, and insurance. We also offer a Collision Damage Waiver.',
  },
  {
    q: 'Do I need to own a vehicle?',
    a: 'No. You only need a valid driver’s license issued in the United States and proof of verifiable income (such as weekly earnings as a gig worker or W-2 income proof) to rent a vehicle.',
  },
  {
    q: 'Can I use the car for DoorDash, Uber, Lyft, or other platforms?',
    a: 'Yes. We accept proof of weekly earnings as a gig worker as verifiable income to qualify for renting our vehicles.',
  },
  {
    q: 'How fast can I get a vehicle?',
    a: 'Reservations can be scheduled and vehicles can be picked up during our standard hours of 8:00 AM – 4:00 PM, subject to vehicle availability.',
  },
  {
    q: 'What do I need to qualify?',
    a: 'You need a valid driver’s license issued in the United States and proof of verifiable income (e.g., weekly earnings as a gig worker or W-2 income proof). The minimum driver age is 21, and additional drivers are not permitted at this time.',
  },
  {
    q: 'Where do you operate?',
    a: 'Pickup is located in North County, San Diego. Vehicles must stay within San Diego County, Orange County, and Riverside County (you must request approval from the owner before leaving these counties).',
  },
  {
    q: 'Do you accept debit cards?',
    a: 'No, we do not accept credit or debit cards. We accept cash, Venmo, Cash App, Zelle, and Apple Pay. No security deposits are required if verifiable income is provided.',
  },
  {
    q: "What's your cancellation policy?",
    a: 'Reservations can be modified via the booking link or by contacting us by phone or email. Changes are subject to availability and rate differences.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-color last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 text-left gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
        aria-expanded={open}
      >
        <span className="font-medium text-ink">{q}</span>
        <ChevronDown className={`w-5 h-5 text-ink-soft flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-4 text-ink-soft text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

export default function HomeFAQ() {
  return (
    <section className="py-20 md:py-28 bg-bg" aria-labelledby="faq-home-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Questions</p>
          <h2 className="font-display text-ink" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="faq-home-heading">
            Common questions
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-accent hover:text-accent-hover font-semibold text-sm transition-colors">
            See all questions →
          </Link>
        </div>
      </div>
    </section>
  )
}
