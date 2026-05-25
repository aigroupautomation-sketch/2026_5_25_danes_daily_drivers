import { MetadataRoute } from 'next'
import { vehicles } from '@/lib/vehicles'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://antigravityrentals.com'

  const vehicleRoutes = vehicles.map((v) => ({
    url: `${base}/fleet/${v.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/fleet`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
    ...vehicleRoutes,
  ]
}
