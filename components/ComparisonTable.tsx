import { X, Check } from 'lucide-react'

const rows = [
  { them: 'Auto insurance required to qualify', us: 'No auto insurance needed — ever' },
  { them: 'Must own a vehicle to be approved', us: 'No vehicle ownership required' },
  { them: 'Credit check and long approval process', us: 'Fast, simple qualification in minutes' },
  { them: 'Hidden fees revealed at pickup', us: 'Every fee shown before you commit' },
  { them: 'Restricted to personal use only', us: 'Approved for all major gig platforms' },
  { them: 'Debit cards rejected or held $500+', us: 'Transparent deposit policy, debit accepted' },
]

export default function ComparisonTable() {
  return (
    <section className="py-20 md:py-28 bg-bg" aria-labelledby="comparison-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Why Us</p>
          <h2 className="font-display text-ink mb-4" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="comparison-heading">
            Built for workers, not tourists
          </h2>
          <p className="text-ink-soft text-lg max-w-md mx-auto">
            Traditional rentals were never designed for gig workers. We were.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-t-card px-5 py-3 text-center">
              <p className="font-semibold text-ink-soft text-sm">Traditional rental companies</p>
            </div>
            <div className="bg-accent rounded-t-card px-5 py-3 text-center">
              <p className="font-semibold text-white text-sm">Dane&apos;s Daily Drivers</p>
            </div>
          </div>

          {/* Rows */}
          <div className="border border-border-color rounded-b-card overflow-hidden divide-y divide-border-color">
            {rows.map((row, i) => (
              <div key={i} className="grid grid-cols-2">
                <div className="px-5 py-4 bg-gray-50 flex items-start gap-2.5">
                  <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-soft">{row.them}</span>
                </div>
                <div className="px-5 py-4 bg-orange-50 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-ink">{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
