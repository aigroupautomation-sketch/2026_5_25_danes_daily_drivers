'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const faqs = [
  {
    q: 'Do I need auto insurance to qualify?',
    a: 'No. You do not need your own auto insurance policy to rent with us. This is one of the biggest advantages we offer gig workers — we handle coverage so you can qualify and get started without it.',
  },
  {
    q: 'Do I need to own a vehicle?',
    a: "No vehicle ownership required. Whether you're between cars, just starting out, or scaling up your gig income, you can qualify regardless of whether you own a vehicle.",
  },
  {
    q: 'Can I use the car for DoorDash, Uber, Lyft, or other platforms?',
    a: 'Yes. All of our vehicles are approved for use across major gig platforms including DoorDash, Uber Eats, Grubhub, Uber, Lyft, Instacart, Amazon Flex, Roadie, Spark, and medical courier work.',
  },
  {
    q: 'How fast can I get a vehicle?',
    a: 'Same-day availability is common. Complete the quick qualification form, confirm your dates, and pick up the same day in most cases.',
  },
  {
    q: 'What do I need to qualify?',
    a: "A valid driver's license, a credit or debit card in your name, and meeting the minimum age requirement (21+). No auto insurance required. No vehicle ownership required.",
  },
  {
    q: 'Where do you operate?',
    a: 'We serve San Diego County, Orange County, and Riverside County only. Delivery is available within these service areas.',
  },
  {
    q: 'Do you accept debit cards?',
    a: 'Yes. Debit cards are accepted with a security deposit ($300–500 depending on the vehicle). The deposit is fully refunded on return with no damage.',
  },
  {
    q: "What's your cancellation policy?",
    a: "Free cancellation up to 48 hours before pickup. Cancellations within 48 hours are charged one day's base rate.",
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
