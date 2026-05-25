import Link from 'next/link'
import { Phone, Mail, MapPin, Clock, Star, Share2, Users } from 'lucide-react'

const fleetLinks = [
  { href: '/fleet/ford-escape-black', label: 'Ford Escape (Black)' },
  { href: '/fleet/ford-cmax-hybrid', label: 'Ford C-Max Hybrid' },
  { href: '/fleet/ford-fusion-hybrid-white', label: 'Ford Fusion Hybrid (White)' },
  { href: '/fleet/ford-escape-hybrid-silver', label: 'Ford Escape Hybrid (Silver)' },
  { href: '/fleet/lincoln-mkz-hybrid', label: 'Lincoln MKZ Hybrid' },
  { href: '/fleet/ford-focus-se-gray', label: 'Ford Focus SE (Gray)' },
]

const policyLinks = [
  { href: '/faq#cancellation', label: 'Cancellation Policy' },
  { href: '/faq#insurance', label: 'Insurance & Coverage' },
  { href: '/faq#payment', label: 'Payment Options' },
  { href: '/faq#age', label: 'Age Requirements' },
  { href: '/faq', label: 'Full FAQ' },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">DD</span>
              </div>
              <span className="font-display font-semibold text-lg">Dane&apos;s Daily Drivers</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Vehicles for gig workers in San Diego, Orange, and Riverside Counties. No auto insurance required. Get on the road fast.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Users className="w-4 h-4" />
              </a>
              <a
                href="https://google.com"
                aria-label="Google Reviews"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-accent flex items-center justify-center transition-colors"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Fleet */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Our Fleet</h3>
            <ul className="space-y-2.5">
              {fleetLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/fleet" className="text-accent hover:text-white text-sm font-medium transition-colors">
                  View all cars →
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Policies</h3>
            <ul className="space-y-2.5">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+16194325204" className="flex items-start gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-accent" />
                  <div>
                    <div>(619) 432-5204</div>
                    <div className="text-xs text-white/40 mt-0.5">Text or call — we pick up</div>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:dane.davidson@danesdailydrivers.com" className="flex items-start gap-2.5 text-white/70 hover:text-white text-sm transition-colors group">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-accent" />
                  <div>
                    <div>dane.davidson@danesdailydrivers.com</div>
                    <div className="text-xs text-white/40 mt-0.5">We reply instantly.</div>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Serving San Diego County,<br />Orange County &amp; Riverside County</span>
              </li>
              <li className="flex items-start gap-2.5 text-white/70 text-sm">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div>Monday–Sunday: 7am – 10pm</div>
                  <div className="text-xs text-white/40 mt-0.5">After-hours by arrangement</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Dane&apos;s Daily Drivers LLC. All rights reserved.</p>
          <p>
            Licensed in California · Insurance provided by Protective Insurance Co.
          </p>
        </div>
      </div>
    </footer>
  )
}
