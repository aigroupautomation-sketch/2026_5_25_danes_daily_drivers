import type { Metadata } from 'next'
import VehicleCard from '@/components/VehicleCard'
import FinalCTABanner from '@/components/FinalCTABanner'
import { vehicles } from '@/lib/vehicles'

export const metadata: Metadata = {
  title: "Our Fleet — Hand-Picked Rental Cars",
  description:
    "Browse our hand-picked fleet of rental vehicles. Every car is photographed, maintained, and guaranteed — the exact model you book is the one you drive.",
}

export default function FleetPage() {
  return (
    <>
      {/* Hero banner */}
      <section
        className="pt-32 pb-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)' }}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Fleet</p>
          <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}>
            Our hand-picked fleet
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Each one chosen, maintained, and photographed by us. No stock photos. No surprises.
          </p>
        </div>
      </section>

      {/* Fleet grid */}
      <section className="py-16 md:py-24 bg-bg">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>

          <p className="text-center text-sm text-ink-soft mt-8">
            The car you see is the car you get. No &ldquo;or similar&rdquo; nonsense.
          </p>
        </div>
      </section>

      <FinalCTABanner />
    </>
  )
}
