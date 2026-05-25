'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Phone } from 'lucide-react'
import { usePrequalStore } from '@/lib/store'

const navLinks = [
  { href: '/fleet', label: 'Our Fleet' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const openModal = usePrequalStore((s) => s.openModal)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full">
            <span
              className="bg-accent text-white px-4 py-2 rounded-full font-display font-semibold text-sm md:text-base leading-none transition-colors shadow-sm"
            >
              Dane&apos;s Daily Drivers
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded ${
                  scrolled ? 'text-ink-soft' : 'text-white/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+16194325204"
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent ${
                scrolled ? 'text-ink-soft' : 'text-white/90'
              }`}
            >
              <Phone className="w-4 h-4" />
              (619) 432-5204
            </a>
            <button
              onClick={() => openModal(undefined, 'header')}
              className="bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-5 py-2.5 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[44px]"
            >
              Book Now
            </button>
          </div>

          {/* Mobile: book now + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => openModal(undefined, 'header-mobile')}
              className="bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-4 py-2 rounded-pill transition-colors min-h-[44px]"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}
              aria-expanded={mobileOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-border-color pb-4">
            <nav className="flex flex-col gap-1 pt-2" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-ink text-sm font-medium hover:bg-bg-soft rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="tel:+16194325204"
                className="px-4 py-3 flex items-center gap-2 text-ink-soft text-sm font-medium hover:bg-bg-soft rounded-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                (619) 432-5204
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
