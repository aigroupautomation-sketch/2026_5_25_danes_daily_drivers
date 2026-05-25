'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, ChevronLeft, ChevronRight, Check, Lock } from 'lucide-react'
import { usePrequalStore } from '@/lib/store'
import {
  step1Schema, step2Schema,
  type Step1Data, type Step2Data,
} from '@/lib/prequalSchema'
import { vehicles } from '@/lib/vehicles'

// Common non-gig occupations
const OCCUPATIONS = [
  'Sales / Retail',
  'Hospitality / Food Service',
  'Healthcare / Medical',
  'Construction / Trades / Manufacturing',
  'Office / Admin / Corporate / Tech',
  'Student',
  'Retired',
  'Unemployed',
  'Other',
]

// Gig platforms
const GIG_PLATFORMS = [
  'Uber',
  'Uber Eats',
  'DoorDash',
  'Lyft',
  'Instacart',
  'Amazon Flex',
  'Grubhub',
  'Shipt',
  'Spark Driver',
  'Other',
]

// Custom file upload zone sub-component
interface FileUploadZoneProps {
  id: string
  label: string
  fileName?: string
  onChange: (fileName: string) => void
}

function FileUploadZone({ id, label, fileName, onChange }: FileUploadZoneProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0].name)
    }
  }

  return (
    <div className="mt-2">
      <p className="text-xs font-semibold text-ink-soft mb-1">{label}</p>
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center border-2 border-dashed border-border-color hover:border-accent rounded-lg p-4 bg-bg-soft cursor-pointer transition-colors"
      >
        <span className="text-2xl mb-1">📤</span>
        <span className="text-xs font-semibold text-ink-soft text-center">
          {fileName ? `✓ ${fileName}` : 'Click to select or drop screenshot'}
        </span>
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  )
}

// --- Step 1 ---
function Step1() {
  const formData = usePrequalStore((s) => s.formData)
  const updateFormData = usePrequalStore((s) => s.updateFormData)
  const setStep = usePrequalStore((s) => s.setStep)

  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: formData.fullName || '',
      phone: formData.phone || '',
      email: formData.email || '',
      county: (formData.county as 'San Diego County' | 'Orange County' | 'Riverside County') || undefined,
    },
  })

  const onSubmit = (data: Step1Data) => {
    updateFormData(data)
    setStep(2)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="m-fullName" className="block text-sm font-medium text-ink mb-1">
          Full Name <span className="text-accent">*</span>
        </label>
        <input
          id="m-fullName"
          type="text"
          placeholder="John Doe"
          {...register('fullName')}
          className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.fullName ? 'err-fullName' : undefined}
        />
        {errors.fullName && <p id="err-fullName" className="text-xs text-red-600 mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="m-phone" className="block text-sm font-medium text-ink mb-1">
          Phone Number <span className="text-accent">*</span>
        </label>
        <input
          id="m-phone"
          type="tel"
          placeholder="(619) 555-0199"
          {...register('phone')}
          className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.phone ? 'err-phone' : undefined}
        />
        {errors.phone && <p id="err-phone" className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="m-email" className="block text-sm font-medium text-ink mb-1">
          Email Address <span className="text-accent">*</span>
        </label>
        <input
          id="m-email"
          type="email"
          placeholder="john@example.com"
          {...register('email')}
          className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.email ? 'err-email' : undefined}
        />
        {errors.email && <p id="err-email" className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="m-county" className="block text-sm font-medium text-ink mb-1">
          What county are you in? <span className="text-accent">*</span>
        </label>
        <select
          id="m-county"
          {...register('county')}
          className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          aria-describedby={errors.county ? 'err-county' : undefined}
        >
          <option value="">Select your county...</option>
          <option value="Riverside County">Riverside County</option>
          <option value="Orange County">Orange County</option>
          <option value="San Diego County">San Diego County</option>
        </select>
        {errors.county && <p id="err-county" className="text-xs text-red-600 mt-1">{errors.county.message}</p>}
      </div>

      <button type="submit" className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-pill transition-colors flex items-center justify-center gap-1.5">
        Next: Qualification Info <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  )
}

// --- Step 2 ---
function Step2() {
  const formData = usePrequalStore((s) => s.formData)
  const updateFormData = usePrequalStore((s) => s.updateFormData)
  const setStep = usePrequalStore((s) => s.setStep)
  const setStatus = usePrequalStore((s) => s.setStatus)

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      isGigWorker: formData.isGigWorker,
      gigIdScreenshotName: formData.gigIdScreenshotName,
      nonGigOccupation: formData.nonGigOccupation,
      activeGigPlatform: formData.activeGigPlatform,
      isActivelyGigWorkingThisWeek: formData.isActivelyGigWorkingThisWeek,
      canProvideProofOfEarnings: formData.canProvideProofOfEarnings,
      earningsProofScreenshotName: formData.earningsProofScreenshotName,
      hasValidLicense: formData.hasValidLicense,
      licenseFrontScreenshotName: formData.licenseFrontScreenshotName,
      licenseBackScreenshotName: formData.licenseBackScreenshotName,
      plannedDuration: formData.plannedDuration as '1 week' | '2 weeks' | '1 month' | '2-4 months' | 'not sure yet' | undefined,
      vehicle: formData.vehicle,
    },
  })

  // Watch fields for conditional rendering
  const isGigWorker = watch('isGigWorker')
  const canProvideProofOfEarnings = watch('canProvideProofOfEarnings')
  const hasValidLicense = watch('hasValidLicense')

  // Watch custom uploaded filenames
  const gigIdScreenshotName = watch('gigIdScreenshotName')
  const earningsProofScreenshotName = watch('earningsProofScreenshotName')
  const licenseFrontScreenshotName = watch('licenseFrontScreenshotName')
  const licenseBackScreenshotName = watch('licenseBackScreenshotName')

  const onSubmit = async (data: Step2Data) => {
    updateFormData(data)
    const fullPayload = { ...formData, ...data }

    // Call simulated submission API
    try {
      await fetch('/api/prequal-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload),
      })
    } catch {
      // Fail silently - user will still see screen
    }

    if (fullPayload.hasValidLicense === 'no') {
      setStatus('disqualified')
    } else {
      setStatus('submitted')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Q1: Gig Worker Status */}
      <fieldset className="border border-border-color p-4 rounded-xl space-y-3 bg-white">
        <legend className="text-sm font-semibold text-ink px-2">
          Are you currently working on any gig apps like Uber, DoorDash, Lyft, or similar? <span className="text-accent">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 p-3 border border-border-color rounded-lg cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-orange-50/50">
              <input type="radio" value={val} {...register('isGigWorker')} className="accent-accent" />
              <span className="text-sm font-semibold capitalize">{val}</span>
            </label>
          ))}
        </div>
        {errors.isGigWorker && <p className="text-xs text-red-600">{errors.isGigWorker.message}</p>}

        {/* Q1 Conditional: Gig worker ID screenshot upload */}
        {isGigWorker === 'yes' && (
          <FileUploadZone
            id="gig-id-upload"
            label="Upload a screenshot of your gig worker ID screen:"
            fileName={gigIdScreenshotName}
            onChange={(name) => setValue('gigIdScreenshotName', name)}
          />
        )}
      </fieldset>

      {/* Q2: Non-Gig Worker Occupation (Shown only if isGigWorker is 'no') */}
      {isGigWorker === 'no' && (
        <div className="border border-border-color p-4 rounded-xl bg-white">
          <label htmlFor="nonGigOccupation" className="block text-sm font-semibold text-ink mb-2">
            If you&apos;re not a gig worker, select your occupation <span className="text-accent">*</span>
          </label>
          <select
            id="nonGigOccupation"
            {...register('nonGigOccupation')}
            className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Select your occupation...</option>
            {OCCUPATIONS.map((occ) => (
              <option key={occ} value={occ}>{occ}</option>
            ))}
          </select>
        </div>
      )}

      {/* Gig Worker specific questions: platform, actively working, proof of earnings */}
      {isGigWorker === 'yes' && (
        <>
          {/* Q3: Main Gig Platform */}
          <div className="border border-border-color p-4 rounded-xl bg-white">
            <label htmlFor="activeGigPlatform" className="block text-sm font-semibold text-ink mb-2">
              Which gig platform are you mainly active on right now? <span className="text-accent">*</span>
            </label>
            <select
              id="activeGigPlatform"
              {...register('activeGigPlatform')}
              className="w-full px-3 py-3 border border-border-color rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">Select platform...</option>
              {GIG_PLATFORMS.map((plat) => (
                <option key={plat} value={plat}>{plat}</option>
              ))}
            </select>
          </div>

          {/* Q4: Actively Gig Working This Week */}
          <fieldset className="border border-border-color p-4 rounded-xl space-y-3 bg-white">
            <legend className="text-sm font-semibold text-ink px-2">
              Are you actively gig working this week? <span className="text-accent">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(['yes', 'no'] as const).map((val) => (
                <label key={val} className="flex items-center gap-2 p-3 border border-border-color rounded-lg cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-orange-50/50">
                  <input type="radio" value={val} {...register('isActivelyGigWorkingThisWeek')} className="accent-accent" />
                  <span className="text-sm font-semibold capitalize">{val}</span>
                </label>
              ))}
            </div>
            {errors.isActivelyGigWorkingThisWeek && <p className="text-xs text-red-600">{errors.isActivelyGigWorkingThisWeek.message}</p>}
          </fieldset>

          {/* Q5: Proof of Weekly Earnings */}
          <fieldset className="border border-border-color p-4 rounded-xl space-y-3 bg-white">
            <legend className="text-sm font-semibold text-ink px-2">
              Are you able to provide proof of weekly earnings from the app? <span className="text-accent">*</span>
            </legend>
            <div className="grid grid-cols-2 gap-3">
              {(['yes', 'no'] as const).map((val) => (
                <label key={val} className="flex items-center gap-2 p-3 border border-border-color rounded-lg cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-orange-50/50">
                  <input type="radio" value={val} {...register('canProvideProofOfEarnings')} className="accent-accent" />
                  <span className="text-sm font-semibold capitalize">{val}</span>
                </label>
              ))}
            </div>
            {errors.canProvideProofOfEarnings && <p className="text-xs text-red-600">{errors.canProvideProofOfEarnings.message}</p>}

            {/* Q5 Conditional: Proof upload */}
            {canProvideProofOfEarnings === 'yes' && (
              <FileUploadZone
                id="earnings-upload"
                label="Upload a screenshot of your weekly earnings statement:"
                fileName={earningsProofScreenshotName}
                onChange={(name) => setValue('earningsProofScreenshotName', name)}
              />
            )}
          </fieldset>
        </>
      )}

      {/* Q6: Valid Drivers License */}
      <fieldset className="border border-border-color p-4 rounded-xl space-y-3 bg-white">
        <legend className="text-sm font-semibold text-ink px-2">
          Do you currently have a valid driver&apos;s license? <span className="text-accent">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {(['yes', 'no'] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 p-3 border border-border-color rounded-lg cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-orange-50/50">
              <input type="radio" value={val} {...register('hasValidLicense')} className="accent-accent" />
              <span className="text-sm font-semibold capitalize">{val}</span>
            </label>
          ))}
        </div>
        {errors.hasValidLicense && <p className="text-xs text-red-600">{errors.hasValidLicense.message}</p>}

        {/* Q6 Conditional: License Upload Front/Back */}
        {hasValidLicense === 'yes' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <FileUploadZone
              id="license-front-upload"
              label="License (Front Side):"
              fileName={licenseFrontScreenshotName}
              onChange={(name) => setValue('licenseFrontScreenshotName', name)}
            />
            <FileUploadZone
              id="license-back-upload"
              label="License (Back Side):"
              fileName={licenseBackScreenshotName}
              onChange={(name) => setValue('licenseBackScreenshotName', name)}
            />
          </div>
        )}
      </fieldset>

      {/* Q7: Rental Duration */}
      <div className="border border-border-color p-4 rounded-xl bg-white">
        <label htmlFor="plannedDuration" className="block text-sm font-semibold text-ink mb-3">
          How long do you plan on using the vehicle? <span className="text-accent">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {(['1 week', '2 weeks', '1 month', '2-4 months', 'not sure yet'] as const).map((duration) => (
            <label key={duration} className="flex items-center justify-center text-center p-2.5 border border-border-color rounded-lg cursor-pointer hover:border-accent transition-colors has-[:checked]:border-accent has-[:checked]:bg-orange-50/50">
              <input type="radio" value={duration} {...register('plannedDuration')} className="sr-only" />
              <span className="text-xs font-semibold">{duration}</span>
            </label>
          ))}
        </div>
        {errors.plannedDuration && <p className="text-xs text-red-600 mt-2">{errors.plannedDuration.message}</p>}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex items-center gap-1 px-4 py-3.5 text-sm font-medium text-ink-soft hover:text-ink border border-border-color rounded-pill transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="submit"
          className="flex-1 bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-pill transition-colors flex items-center justify-center gap-1.5"
        >
          Submit Qualification <Check className="w-4 h-4" />
        </button>
      </div>
    </form>
  )
}

// --- Confirmation screen ---
function ConfirmationScreen() {
  const formData = usePrequalStore((s) => s.formData)
  const closeModal = usePrequalStore((s) => s.closeModal)
  const resetForm = usePrequalStore((s) => s.resetForm)
  const selectedVehicle = vehicles.find((v) => v.slug === formData.vehicle)

  const handleClose = () => {
    resetForm()
    closeModal()
  }

  return (
    <div className="text-center space-y-5 py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-success" />
      </div>
      <div>
        <h3 className="text-xl font-display font-semibold text-ink">Application Submitted!</h3>
        <p className="text-ink-soft text-sm mt-1">Thank you for submitting your prequalification details.</p>
      </div>

      {selectedVehicle && (
        <div className="bg-bg-soft rounded-card p-4 text-left">
          <p className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1">Selected Vehicle</p>
          <p className="font-semibold text-ink">{selectedVehicle.name}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-2xl font-bold text-accent">${selectedVehicle.pricing.perWeek}</span>
            <span className="text-sm text-ink-soft">/week — all fees included</span>
          </div>
        </div>
      )}

      <p className="text-sm text-ink-soft">
        We are processing your application for <strong>{formData.county || 'your county'}</strong>. We will text and email you at <strong className="text-ink">{formData.phone}</strong> shortly.
      </p>

      <button
        onClick={handleClose}
        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-pill transition-colors"
      >
        Done
      </button>
    </div>
  )
}

// --- Disqualification screen ---
function DisqualificationScreen() {
  const closeModal = usePrequalStore((s) => s.closeModal)
  const resetForm = usePrequalStore((s) => s.resetForm)

  const handleClose = () => {
    resetForm()
    closeModal()
  }

  return (
    <div className="text-center space-y-5 py-4">
      <div className="text-4xl">⚠️</div>
      <div>
        <h3 className="text-xl font-display font-semibold text-ink">Valid License Required</h3>
        <p className="text-ink-soft text-sm mt-2 leading-relaxed">
          Unfortunately, we require all drivers to hold a valid driver&apos;s license to rent and operate our vehicles.
        </p>
      </div>
      <button onClick={handleClose} className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3.5 rounded-pill transition-colors">
        Close
      </button>
    </div>
  )
}

// --- Progress bar ---
function ProgressBar({ step }: { step: number }) {
  const labels = ['Contact Info', 'Qualifications']
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        {labels.map((label, i) => {
          const s = i + 1
          const done = s < step
          const active = s === step
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                  done ? 'bg-success text-white' : active ? 'bg-accent text-white' : 'bg-gray-100 text-ink-soft'
                }`}
              >
                {done ? <Check className="w-3.5 h-3.5" /> : s}
              </div>
              <span className={`text-xs ${active ? 'text-accent font-semibold' : 'text-ink-soft'}`}>{label}</span>
            </div>
          )
        })}
      </div>
      <div className="relative h-1.5 bg-gray-100 rounded-full mt-1">
        <div
          className="absolute left-0 top-0 h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${((step - 1) / 1) * 100}%` }}
        />
      </div>
    </div>
  )
}

// --- Main Modal ---
export default function PrequalModal() {
  const isOpen = usePrequalStore((s) => s.isOpen)
  const currentStep = usePrequalStore((s) => s.currentStep)
  const status = usePrequalStore((s) => s.status)
  const closeModal = usePrequalStore((s) => s.closeModal)
  const formData = usePrequalStore((s) => s.formData)

  const overlayRef = useRef<HTMLDivElement>(null)
  const hasData = Object.keys(formData).length > 0

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) {
        if (hasData && status === 'filling') {
          if (confirm('Close form? Your progress has been saved.')) closeModal()
        } else {
          closeModal()
        }
      }
    },
    [closeModal, hasData, status]
  )

  // ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, closeModal])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const stepContent = () => {
    if (status === 'submitted') return <ConfirmationScreen />
    if (status === 'disqualified') return <DisqualificationScreen />
    switch (currentStep) {
      case 1: return <Step1 />
      case 2: return <Step2 />
      default: return <Step1 />
    }
  }

  const showProgress = status !== 'submitted' && status !== 'disqualified'

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          onClick={handleOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-0 sm:px-4"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Prequalification form"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white w-full sm:max-w-2xl rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl max-h-[95vh] flex flex-col"
          >
            {/* Modal header */}
            <div className="px-6 pt-6 pb-4 border-b border-border-color">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-display font-semibold text-ink">
                    Get Qualified in 60 Seconds
                  </h2>
                  <p className="text-sm text-ink-soft mt-0.5">
                    Answer these simple questions to get your personalized quote.
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg text-ink-soft hover:text-ink hover:bg-bg-soft transition-colors ml-4 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="px-6 py-5 overflow-y-auto flex-1">
              {showProgress && <ProgressBar step={currentStep} />}
              {stepContent()}
            </div>

            {/* Trust footer */}
            <div className="px-6 py-3 bg-bg-soft border-t border-border-color">
              <p className="text-xs text-ink-soft text-center flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" />
                Your info is secure and encrypted. We will only contact you about your quote.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
