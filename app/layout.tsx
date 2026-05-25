import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Fraunces } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PrequalModal from '@/components/PrequalModal'
import StickyCTA from '@/components/StickyCTA'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    template: "%s | Dane's Daily Drivers",
    default: "Vehicle Rentals for Gig Workers — Dane's Daily Drivers",
  },
  description:
    'Affordable vehicle rentals for gig workers in San Diego County, Orange County, and Riverside County. No auto insurance required. No vehicle ownership needed. Qualify fast and get on the road today.',
  keywords: 'gig worker car rental, DoorDash rental car, Uber car rental, Lyft rental, Amazon Flex vehicle, San Diego car rental, Orange County car rental, Riverside County car rental, no insurance car rental',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Dane's Daily Drivers",
    title: "Vehicle Rentals for Gig Workers — San Diego, Orange & Riverside Counties",
    description: 'No auto insurance required. No vehicle ownership needed. Qualify in minutes and get on the road the same day.',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dane's Daily Drivers — Gig Worker Vehicle Rentals",
    description: 'No auto insurance required. Approved for DoorDash, Uber, Lyft, Amazon Flex & more. Serving San Diego, Orange & Riverside Counties.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans antialiased bg-bg text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <PrequalModal />
        <StickyCTA />
      </body>
    </html>
  )
}
