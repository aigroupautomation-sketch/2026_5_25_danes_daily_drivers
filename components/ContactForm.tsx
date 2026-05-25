'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Check } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Please enter a message (at least 10 characters)'),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch {
      // Fail silently
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
          <Check className="w-6 h-6 text-success" />
        </div>
        <h3 className="font-semibold text-ink text-lg mb-1">Message sent!</h3>
        <p className="text-ink-soft text-sm">We&apos;ll reply within a few hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="c-name" className="block text-sm font-medium text-ink mb-1">
          Name <span className="text-accent">*</span>
        </label>
        <input
          id="c-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          {...register('name')}
          className="w-full px-4 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.name ? 'err-c-name' : undefined}
        />
        {errors.name && <p id="err-c-name" className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="c-email" className="block text-sm font-medium text-ink mb-1">
          Email <span className="text-accent">*</span>
        </label>
        <input
          id="c-email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          {...register('email')}
          className="w-full px-4 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.email ? 'err-c-email' : undefined}
        />
        {errors.email && <p id="err-c-email" className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="c-message" className="block text-sm font-medium text-ink mb-1">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="c-message"
          rows={5}
          placeholder="Tell us what you need..."
          {...register('message')}
          className="w-full px-4 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          aria-describedby={errors.message ? 'err-c-message' : undefined}
        />
        {errors.message && <p id="err-c-message" className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-white font-semibold py-4 rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[52px]"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
