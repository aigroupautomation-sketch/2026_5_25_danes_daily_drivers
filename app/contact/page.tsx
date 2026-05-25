import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with Dane's Daily Drivers in San Diego, Orange, and Riverside Counties. Call, email, or send a message. We reply instantly.",
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 text-center"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1e293b 100%)' }}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Contact</p>
          <h1 className="font-display text-white mb-4" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600 }}>
            Get in touch
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Questions before you book? General inquiries? We reply instantly.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: contact info */}
          <div>
            <h2 className="font-display font-semibold text-ink text-2xl mb-6">Our info</h2>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Phone</p>
                  <a href="tel:+16194325204" className="text-accent hover:text-accent-hover text-sm transition-colors">
                    (619) 432-5204
                  </a>
                  <p className="text-xs text-ink-soft mt-0.5">Text or call — we pick up</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Email</p>
                  <a href="mailto:dane.davidson@danesdailydrivers.com" className="text-accent hover:text-accent-hover text-sm transition-colors">
                    dane.davidson@danesdailydrivers.com
                  </a>
                  <p className="text-xs text-ink-soft mt-0.5">We reply instantly.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Location</p>
                  <p className="text-sm text-ink-soft">
                    Serving San Diego County,<br />
                    Orange County &amp; Riverside County
                  </p>
                  <p className="text-xs text-ink-soft mt-0.5">Delivery available · Self-pickup by appointment</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-semibold text-ink">Hours</p>
                  <p className="text-sm text-ink-soft">Monday–Sunday: 7am – 10pm</p>
                  <p className="text-xs text-ink-soft mt-0.5">After-hours by arrangement</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-bg-soft rounded-card h-48 border border-border-color flex items-center justify-center">
              <div className="text-center text-ink-soft">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-medium">SD · OC · Riverside Counties</p>
                <p className="text-xs">Map coming soon</p>
              </div>
            </div>
          </div>

          {/* Right: contact form */}
          <div>
            <h2 className="font-display font-semibold text-ink text-2xl mb-6">Send a message</h2>
            <p className="text-ink-soft text-sm mb-6">
              This form is for general inquiries only. To get a rental quote,{' '}
              <span className="text-accent font-medium">use the prequalification form</span> — it&apos;s faster and gives you a real price.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}
