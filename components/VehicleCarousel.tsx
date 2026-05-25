'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Car } from 'lucide-react'

interface VehicleCarouselProps {
  images: string[]
  alt: string
  aspectRatio?: string
}

function ImageSlide({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2">
        <Car className="w-12 h-12 text-slate-300" />
        <p className="text-xs text-slate-400 font-medium">{alt}</p>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={priority}
      onError={() => setFailed(true)}
    />
  )
}

export default function VehicleCarousel({ images, alt, aspectRatio = 'aspect-[4/3]' }: VehicleCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (images.length <= 1 || isPaused) return
    const timer = setInterval(next, 3000)
    return () => clearInterval(timer)
  }, [next, images.length, isPaused])

  if (images.length === 0) {
    return (
      <div className={`relative w-full ${aspectRatio} bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center gap-2`}>
        <Car className="w-12 h-12 text-slate-300" />
        <p className="text-xs text-slate-400 font-medium">{alt}</p>
      </div>
    )
  }

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-slate-100 group`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label={`Photo gallery for ${alt}`}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <ImageSlide src={src} alt={`${alt} — photo ${i + 1}`} priority={i === 0} />
        </div>
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10"
            aria-label="Next photo"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                  i === current ? 'bg-white w-4' : 'bg-white/50 w-1.5'
                }`}
                aria-label={`Go to photo ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
