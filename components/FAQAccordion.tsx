'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { usePrequalStore } from '@/lib/store'

interface FAQItem {
  q: string
  a: string
}

interface FAQCategoryProps {
  category: {
    category: string
    items: FAQItem[]
  }
}

function FAQItem({ q, a }: FAQItem) {
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
        <div className="pb-5 text-ink-soft text-sm leading-relaxed pr-8">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQAccordion({ category }: FAQCategoryProps) {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <section className="mb-12" aria-labelledby={`faq-cat-${category.category}`}>
      <h2
        id={`faq-cat-${category.category}`}
        className="font-display font-semibold text-ink text-xl mb-4 pb-2 border-b-2 border-accent inline-block"
      >
        {category.category}
      </h2>
      <div className="bg-white rounded-card border border-border-color px-5 mb-6">
        {category.items.map((item) => (
          <FAQItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
      <button
        onClick={() => openModal(undefined, `faq-${category.category}`)}
        className="text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
      >
        Still have questions? Get your personalized quote →
      </button>
    </section>
  )
}
