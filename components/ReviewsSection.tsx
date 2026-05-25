import { Star, ExternalLink } from 'lucide-react'

const reviews = [
  {
    name: 'Marcus D.',
    context: 'DoorDash driver · San Diego County',
    rating: 5,
    text: 'I needed a car fast to start dashing and had no idea what to do. Qualified the same morning, picked up that afternoon. Already earning by dinner.',
  },
  {
    name: 'Jasmine R.',
    context: 'Uber & Lyft driver · Orange County',
    rating: 5,
    text: "Didn't have my own insurance and was turned away at two other places. Here they didn't even blink. Straightforward process, exact price, no games.",
  },
  {
    name: 'Carlos V.',
    context: 'Amazon Flex · Riverside County',
    rating: 5,
    text: 'Perfect for Flex blocks. Plenty of cargo space, reliable, and the all-in pricing meant no surprises on my weekly budget. Will keep renting.',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

export default function ReviewsSection() {
  return (
    <section className="py-20 md:py-28 bg-bg-soft" aria-labelledby="reviews-heading">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">Reviews</p>
          <h2 className="font-display text-ink mb-2" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 2.75rem)', fontWeight: 600 }} id="reviews-heading">
            Workers who got on the road
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-ink">4.9</span>
            <span className="text-ink-soft text-sm">on Google (120+ reviews)</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {reviews.map((review) => (
            <article key={review.name} className="bg-white rounded-card p-6 border border-border-color">
              <StarRating rating={review.rating} />
              <p className="text-ink leading-relaxed mt-3 mb-4 text-sm">&ldquo;{review.text}&rdquo;</p>
              <div>
                <p className="font-semibold text-ink text-sm">{review.name}</p>
                <p className="text-xs text-ink-soft">{review.context}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://google.com/search?q=Dane%27s+Daily+Drivers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-semibold text-sm transition-colors"
          >
            Read all reviews on Google <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
