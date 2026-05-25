'use client'

import Link from 'next/link'
import { Users, Fuel, Gauge, Zap, ArrowRight } from 'lucide-react'
import { usePrequalStore } from '@/lib/store'
import type { Vehicle } from '@/lib/vehicles'
import VehicleCarousel from '@/components/VehicleCarousel'

interface VehicleCardProps {
  vehicle: Vehicle
  featured?: boolean
}

export default function VehicleCard({ vehicle, featured = false }: VehicleCardProps) {
  const openModal = usePrequalStore((s) => s.openModal)

  const specIcon = (spec: string) => {
    if (spec.toLowerCase().includes('electric') || spec.toLowerCase().includes('mi range')) return <Zap className="w-3.5 h-3.5" />
    if (spec.toLowerCase().includes('mpg') || spec.toLowerCase().includes('hybrid')) return <Fuel className="w-3.5 h-3.5" />
    if (spec.toLowerCase().includes('seat') || /^\d$/.test(spec)) return <Users className="w-3.5 h-3.5" />
    return <Gauge className="w-3.5 h-3.5" />
  }

  const specPills = [
    `${vehicle.specs.seats} seats`,
    vehicle.specs.transmission,
    vehicle.specs.mpg || vehicle.specs.range || '',
    vehicle.specs.drivetrain,
    vehicle.specs.fuelType,
  ].filter(Boolean)

  return (
    <article className={`bg-white rounded-card border border-border-color overflow-hidden hover:shadow-lg transition-shadow duration-200 flex flex-col ${featured ? 'md:flex-row' : ''}`}>
      {/* Carousel */}
      <div className={`overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
        <VehicleCarousel
          images={vehicle.images.gallery}
          alt={vehicle.name}
          aspectRatio={featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex-1">
          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-1">{vehicle.tagline}</p>
          <h3 className="font-display font-semibold text-ink text-xl mb-3">{vehicle.year} {vehicle.name}</h3>

          {/* Spec pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {specPills.map((spec) => (
              <span
                key={spec}
                className="inline-flex items-center gap-1 bg-bg-soft text-ink-soft text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {specIcon(spec)}
                {spec}
              </span>
            ))}
          </div>

          {/* Pricing */}
          <div className="mb-5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-ink">${vehicle.pricing.perWeek}</span>
              <span className="text-ink-soft text-sm">/week</span>
            </div>
            <p className="text-xs text-ink-soft mt-0.5">
              {vehicle.pricing.weeklyMileageIncluded.toLocaleString()} miles included per week
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-2 pt-4 border-t border-border-color">
          <button
            onClick={() => openModal(vehicle.slug, `vehicle-card-${vehicle.slug}`)}
            className="flex-1 bg-accent hover:bg-accent-hover text-white font-semibold text-sm px-4 py-3 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[48px]"
          >
            Book this exact car
          </button>
          <Link
            href={`/fleet/${vehicle.slug}`}
            className="flex items-center justify-center gap-1 text-ink-soft hover:text-ink text-sm font-medium px-4 py-3 rounded-pill border border-border-color hover:border-ink-soft transition-colors min-h-[48px]"
          >
            See full details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  )
}
