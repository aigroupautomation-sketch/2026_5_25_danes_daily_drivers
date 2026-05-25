import { Star, Car, DollarSign, MapPin } from 'lucide-react'

const items = [
  {
    icon: Star,
    stat: '4.9',
    label: 'on Google',
    sub: '(120+ reviews)',
    color: 'text-yellow-500',
  },
  {
    icon: Car,
    stat: 'No insurance',
    label: 'required',
    sub: 'Qualify without it',
    color: 'text-accent',
  },
  {
    icon: DollarSign,
    stat: 'All-in pricing',
    label: 'no surprises',
    sub: 'Every fee shown upfront',
    color: 'text-success',
  },
  {
    icon: MapPin,
    stat: 'SD · OC · IE',
    label: 'counties served',
    sub: 'Locally owned & operated',
    color: 'text-accent',
  },
]

export default function TrustBar() {
  return (
    <section className="bg-bg-soft border-y border-border-color" aria-label="Trust signals">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.stat} className="flex items-center gap-3">
                <div className={`flex-shrink-0 ${item.color}`}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-ink text-sm leading-tight">
                    {item.stat}{' '}
                    <span className="text-ink-soft font-normal">{item.label}</span>
                  </p>
                  <p className="text-xs text-ink-soft">{item.sub}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
