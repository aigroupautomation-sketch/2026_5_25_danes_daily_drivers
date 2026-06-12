import { z } from 'zod'

export const step1Schema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (at least 10 digits)').max(20, 'Phone number is too long'),
  county: z.enum(['San Diego County', 'Orange County', 'Riverside County'], {
    required_error: 'Please select your county',
  }),
})

export const step2Schema = z.object({
  isGigWorker: z.enum(['yes', 'no'], {
    required_error: 'Please answer if you are currently working on gig apps',
  }),
  gigIdScreenshotName: z.string().optional(),
  gigIdScreenshotBase64: z.string().optional(),
  nonGigOccupation: z.string().optional(),
  activeGigPlatform: z.string().optional(),
  isActivelyGigWorkingThisWeek: z.enum(['yes', 'no'], {
    required_error: 'Please answer if you are actively gig working this week',
  }),
  canProvideProofOfEarnings: z.enum(['yes', 'no'], {
    required_error: 'Please answer if you can provide proof of weekly earnings',
  }),
  earningsProofScreenshotName: z.string().optional(),
  earningsProofScreenshotBase64: z.string().optional(),
  hasValidLicense: z.enum(['yes', 'no'], {
    required_error: 'Please answer if you have a valid drivers license',
  }),
  licenseFrontScreenshotName: z.string().optional(),
  licenseFrontScreenshotBase64: z.string().optional(),
  licenseBackScreenshotName: z.string().optional(),
  licenseBackScreenshotBase64: z.string().optional(),
  plannedDuration: z.enum(['1 week', '2 weeks', '1 month', '2-4 months', 'not sure yet'], {
    required_error: 'Please select how long you plan on using the vehicle',
  }),
  vehicle: z.string().optional(),
})

export const fullPrequalSchema = step1Schema.merge(step2Schema)

export type Step1Data = z.infer<typeof step1Schema>
export type Step2Data = z.infer<typeof step2Schema>
export type FullPrequalData = z.infer<typeof fullPrequalSchema>
