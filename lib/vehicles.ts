export interface VehicleSpecs {
  seats: number
  doors: number
  transmission: string
  fuelType: string
  mpg?: string
  range?: string
  drivetrain: string
  features: string[]
}

export interface VehiclePricing {
  perWeek: number
  youngDriverFeePerWeek: number
  additionalDriverPerWeek: number
  excessMileagePerMile: number
  weeklyMileageIncluded: number
}

export interface Vehicle {
  slug: string
  name: string
  tagline: string
  year: number
  make: string
  model: string
  trim: string
  specs: VehicleSpecs
  pricing: VehiclePricing
  images: {
    hero: string
    gallery: string[]
  }
  included: string[]
  notIncluded: string[]
  description: string
  order: number
}

import fordEscapeBlack from '@/content/fleet/ford-escape-black.json'
import fordCMaxHybrid from '@/content/fleet/ford-cmax-hybrid.json'
import fordFusionWhite from '@/content/fleet/ford-fusion-hybrid-white.json'
import fordEscapeSilver from '@/content/fleet/ford-escape-hybrid-silver.json'
import lincolnMkz from '@/content/fleet/lincoln-mkz-hybrid.json'
import fordFocusGray from '@/content/fleet/ford-focus-se-gray.json'
import fordFusionBlue from '@/content/fleet/ford-fusion-hybrid-blue.json'
import fordFocus2015Gray from '@/content/fleet/ford-focus-2015-gray.json'

export const vehicles: Vehicle[] = [
  fordEscapeBlack as Vehicle,
  fordCMaxHybrid as Vehicle,
  fordFusionWhite as Vehicle,
  fordEscapeSilver as Vehicle,
  lincolnMkz as Vehicle,
  fordFocusGray as Vehicle,
  fordFusionBlue as Vehicle,
  fordFocus2015Gray as Vehicle,
].sort((a, b) => a.order - b.order)

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug)
}

export function getOtherVehicles(slug: string, count = 2): Vehicle[] {
  return vehicles.filter((v) => v.slug !== slug).slice(0, count)
}
