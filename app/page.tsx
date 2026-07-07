import type { Metadata } from 'next'
import Link from 'next/link'
import BookingWidget from '@/components/BookingWidget'
import TrustBar from '@/components/TrustBar'
import VehicleCard from '@/components/VehicleCard'
import { vehicles } from '@/lib/vehicles'
import HeroCTA from '@/components/HeroCTA'
import ComparisonTable from '@/components/ComparisonTable'
import ReviewsSection from '@/components/ReviewsSection'
import HomeFAQ from '@/components/HomeFAQ'
import FinalCTABanner from '@/components/FinalCTABanner'
import HowItWorksSection from '@/components/HowItWorksSection'

export const metadata: Metadata = {
  title: "Vehicle Rentals for Gig Workers — Dane's Daily Drivers",
  alternates: {
    canonical: 'https://antigravityrentals.com',
  },
}

export default function HomePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: "Dane's Daily Drivers",
            description: 'Affordable vehicle rentals for gig workers in San Diego County, Orange County, and Riverside County. No auto insurance required.',
            url: 'https://antigravityrentals.com',
            telephone: '+16194325204',
            email: 'dane.davidson@danesdailydrivers.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'San Diego',
              addressRegion: 'CA',
              addressCountry: 'US',
            },
            areaServed: ['San Diego County, CA', 'Orange County, CA', 'Riverside County, CA'],
            openingHours: 'Mo-Su 07:00-22:00',
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '120',
            },
          }),
        }}
      />

      {/* Hero — split screen */}
      <section className="min-h-screen grid lg:grid-cols-2" aria-label="Hero">

        {/* LEFT: Mission statement */}
        <div className="hidden lg:flex flex-col justify-center items-center px-12 lg:px-20 text-center relative overflow-hidden bg-[#0F172A]">
          {/* Subtle background glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(229,90,60,0.08) 0%, transparent 70%)',
              filter: 'blur(50px)'
            }}
            aria-hidden="true"
          />
          <div className="relative max-w-4xl z-10 select-none">
            <p className="font-display text-white text-4xl lg:text-5xl leading-loose italic font-medium">
              <span className="text-accent font-display text-5xl lg:text-6xl inline-block mr-2 select-none" style={{ verticalAlign: 'middle', marginTop: '-0.35em' }}>“</span>
              Our mission is to provide simple, reliable car rentals designed for hardworking individuals who need dependable transportation without the hassle.
              <span className="text-accent font-display text-5xl lg:text-6xl inline-block ml-2 select-none" style={{ verticalAlign: 'middle', marginBottom: '-0.35em' }}>”</span>
            </p>
          </div>
        </div>

        {/* RIGHT: copy + CTAs + booking widget */}
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 pt-28 pb-16 lg:pt-32 lg:pb-20 min-h-screen bg-[#0F172A]"
        >
          {/* Accent glow */}
          <div
            className="absolute top-1/3 right-0 w-96 h-96 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(229,90,60,0.12) 0%, transparent 70%)' }}
            aria-hidden="true"
          />

          <div className="relative max-w-md w-full mx-auto lg:mx-0">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              San Diego · Orange · Riverside Counties
            </p>

            {/* Headline */}
            <h1
              className="font-display text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.75rem)', letterSpacing: '-0.02em', fontWeight: 600 }}
            >
              The right vehicle.<br />Simple and Reliable.
            </h1>

            {/* Sub-copy */}
            <p className="text-white/70 text-base leading-relaxed mb-8">
              Flexible weekly rentals with transparent pricing and personal service.<br />
              Serving San Diego, Orange, and Riverside Counties.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <HeroCTA />
              <Link
                href="/fleet"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base px-6 py-4 rounded-pill transition-colors min-h-[56px]"
              >
                Browse the Fleet →
              </Link>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 text-xs text-white/50 mb-10">
              <span>✓ No auto insurance needed</span>
              <span>·</span>
              <span>⚡ Transparent prices</span>
              <span>·</span>
              <span>🔒 All-in pricing</span>
            </div>

            {/* Booking widget */}
            <BookingWidget />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Fleet */}
      <section className="py-20 md:py-28 bg-bg" aria-labelledby="fleet-heading">
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Our Fleet</p>
            <h2 className="font-display text-ink mb-4" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="fleet-heading">
              {vehicles.length === 8 ? 'Eight' : vehicles.length === 6 ? 'Six' : vehicles.length} vehicles. All gig-work ready.
            </h2>
            <p className="text-ink-soft text-lg max-w-xl mx-auto">
              {"Every vehicle is photographed, maintained, and ready to help you earn. Whether you're delivering with DoorDash, Uber Eats, Amazon Flex, or driving for Uber and Lyft (on eligible vehicles), we've got an option for you."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.slug} vehicle={v} />
            ))}
          </div>

          <p className="text-center text-sm text-ink-soft mt-8">
            All vehicles are available for multi-platform gig work. No restrictions on earnings platforms.
          </p>
        </div>
      </section>

      {/* How it works */}
      <HowItWorksSection />

      {/* Why we're different */}
      <ComparisonTable />

      {/* Reviews */}
      <ReviewsSection />

      {/* FAQ */}
      <HomeFAQ />

      {/* Final CTA */}
      <FinalCTABanner />
    </>
  )
}
