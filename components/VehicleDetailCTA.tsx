'use client'

import { usePrequalStore } from '@/lib/store'

export default function VehicleDetailCTA({ vehicleSlug }: { vehicleSlug: string }) {
  const openModal = usePrequalStore((s) => s.openModal)

  return (
    <button
      onClick={() => openModal(vehicleSlug, `vehicle-detail-${vehicleSlug}`)}
      className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[52px]"
    >
      Book this exact car
    </button>
  )
}
