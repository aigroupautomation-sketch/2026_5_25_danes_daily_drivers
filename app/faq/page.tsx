import type { Metadata } from 'next'
import FinalCTABanner from '@/components/FinalCTABanner'
import FAQAccordion from '@/components/FAQAccordion'
import { faqCategories } from '@/lib/faqData'

export const metadata: Metadata = {
  title: 'FAQ — All Your Questions Answered',
  description:
    "Everything you need to know about renting with Dane's Daily Drivers: age requirements, debit cards, insurance, cancellation, delivery, and more.",
}

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)' }}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">FAQ</p>
          <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}>
            All your questions, answered
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            No fine print. No &quot;see terms.&quot; Just plain answers.
          </p>
        </div>
      </section>

      {/* FAQ categories */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {faqCategories.map((category) => (
          <FAQAccordion key={category.category} category={category} />
        ))}
      </div>

      <FinalCTABanner />

      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqCategories.flatMap((cat) =>
              cat.items.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              }))
            ),
          }),
        }}
      />
    </>
  )
}
