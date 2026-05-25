import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, X, ChevronLeft } from 'lucide-react'
import { vehicles, getVehicleBySlug, getOtherVehicles } from '@/lib/vehicles'
import VehicleCard from '@/components/VehicleCard'
import VehicleDetailCTA from '@/components/VehicleDetailCTA'
import FinalCTABanner from '@/components/FinalCTABanner'
import VehicleCarousel from '@/components/VehicleCarousel'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) return {}

  return {
    title: `${vehicle.name} — ${vehicle.tagline}`,
    description: `Rent the exact ${vehicle.name} in Las Vegas. ${vehicle.description.slice(0, 120)}`,
  }
}

export default function VehicleDetailPage({ params }: Props) {
  const vehicle = getVehicleBySlug(params.slug)
  if (!vehicle) notFound()

  const similar = getOtherVehicles(params.slug, 2)
  const specPills = [
    `${vehicle.specs.seats} seats`,
    `${vehicle.specs.doors} doors`,
    vehicle.specs.transmission,
    vehicle.specs.fuelType,
    vehicle.specs.mpg || vehicle.specs.range || '',
    vehicle.specs.drivetrain,
  ].filter(Boolean)

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: vehicle.name,
            description: vehicle.description,
            offers: {
              '@type': 'Offer',
              price: vehicle.pricing.perWeek,
              priceCurrency: 'USD',
              priceSpecification: {
                '@type': 'UnitPriceSpecification',
                price: vehicle.pricing.perWeek,
                priceCurrency: 'USD',
                unitText: 'DAY',
              },
            },
          }),
        }}
      />

      <div className="pt-20">
        {/* Back link */}
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/fleet" className="inline-flex items-center gap-1.5 text-sm text-ink-soft hover:text-ink transition-colors">
            <ChevronLeft className="w-4 h-4" /> All vehicles
          </Link>
        </div>

        {/* Main content */}
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            {/* Left: gallery + details */}
            <div>
              {/* Photo gallery carousel */}
              <div className="rounded-card aspect-[16/9] mb-6 border border-border-color overflow-hidden shadow-sm">
                <VehicleCarousel
                  images={vehicle.images.gallery}
                  alt={vehicle.name}
                  aspectRatio="aspect-[16/9]"
                />
              </div>

              {/* Vehicle name + tagline */}
              <div className="mb-6">
                <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-1">{vehicle.tagline}</p>
                <h1 className="font-display text-ink mb-2" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 600 }}>
                  {vehicle.name}
                </h1>
                <p className="text-ink-soft leading-relaxed">{vehicle.description}</p>
              </div>

              {/* Spec table */}
              <div className="bg-bg-soft rounded-card p-6 mb-6 border border-border-color">
                <h2 className="font-semibold text-ink mb-4">Specifications</h2>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ['Year', String(vehicle.year)],
                    ['Make', vehicle.make],
                    ['Model', vehicle.model],
                    ['Trim', vehicle.trim],
                    ['Transmission', vehicle.specs.transmission],
                    ['Seats', String(vehicle.specs.seats)],
                    ['Doors', String(vehicle.specs.doors)],
                    ['Fuel Type', vehicle.specs.fuelType],
                    ['Drivetrain', vehicle.specs.drivetrain],
                    ['Economy', vehicle.specs.mpg || vehicle.specs.range || '—'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-border-color last:border-0">
                      <span className="text-xs text-ink-soft">{label}</span>
                      <span className="text-xs font-semibold text-ink">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-4 pt-4 border-t border-border-color">
                  <p className="text-xs text-ink-soft mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {vehicle.specs.features.map((f) => (
                      <span key={f} className="text-xs bg-white border border-border-color px-2.5 py-1 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's included / not included */}
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-green-50 rounded-card p-5 border border-green-100">
                  <h3 className="font-semibold text-ink text-sm mb-3 flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" /> What&apos;s included
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.included.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink">
                        <Check className="w-3.5 h-3.5 text-success flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-card p-5 border border-border-color">
                  <h3 className="font-semibold text-ink text-sm mb-3 flex items-center gap-2">
                    <X className="w-4 h-4 text-red-400" /> Not included
                  </h3>
                  <ul className="space-y-2">
                    {vehicle.notIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                        <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right rail: booking CTA */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="bg-white border border-border-color rounded-card p-6 shadow-sm">
                <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1">{vehicle.tagline}</p>
                <h2 className="font-display font-semibold text-ink text-xl mb-1">{vehicle.name}</h2>

                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-3xl font-bold text-ink">${vehicle.pricing.perWeek}</span>
                  <span className="text-ink-soft text-sm">/week</span>
                </div>
                <p className="text-xs text-ink-soft mb-5">
                  {vehicle.pricing.weeklyMileageIncluded.toLocaleString()} miles included · all fees shown upfront
                </p>

                {/* Spec pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {specPills.map((s) => (
                    <span key={s} className="text-xs bg-bg-soft border border-border-color px-2.5 py-1 rounded-full text-ink-soft">
                      {s}
                    </span>
                  ))}
                </div>

                <VehicleDetailCTA vehicleSlug={vehicle.slug} />

                <div className="mt-4 p-3 bg-bg-soft rounded-lg">
                  <p className="text-xs text-ink-soft text-center">
                    🔒 Free cancellation · All-in pricing · Instant quote
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Similar vehicles */}
          {similar.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display font-semibold text-ink text-2xl mb-6">
                Also in our fleet
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {similar.map((v) => (
                  <VehicleCard key={v.slug} vehicle={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <FinalCTABanner />
    </>
  )
}
