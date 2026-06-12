'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface PrequalFormData {
  county?: string
  fullName?: string
  email?: string
  phone?: string
  isGigWorker?: 'yes' | 'no'
  gigIdScreenshotName?: string
  gigIdScreenshotBase64?: string
  nonGigOccupation?: string
  activeGigPlatform?: string
  isActivelyGigWorkingThisWeek?: 'yes' | 'no'
  canProvideProofOfEarnings?: 'yes' | 'no'
  earningsProofScreenshotName?: string
  earningsProofScreenshotBase64?: string
  hasValidLicense?: 'yes' | 'no'
  licenseFrontScreenshotName?: string
  licenseFrontScreenshotBase64?: string
  licenseBackScreenshotName?: string
  licenseBackScreenshotBase64?: string
  plannedDuration?: string
  vehicle?: string
}

type ModalStatus = 'idle' | 'filling' | 'submitted' | 'disqualified'

interface PrequalState {
  isOpen: boolean
  currentStep: number
  status: ModalStatus
  formData: PrequalFormData
  openSource: string
  openModal: (vehicleSlug?: string, source?: string) => void
  closeModal: () => void
  setStep: (step: number) => void
  updateFormData: (data: Partial<PrequalFormData>) => void
  setStatus: (status: ModalStatus) => void
  resetForm: () => void
}

export const usePrequalStore = create<PrequalState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      currentStep: 1,
      status: 'idle',
      formData: {},
      openSource: '',

      openModal: (vehicleSlug?: string, source = 'unknown') => {
        const update: Partial<PrequalState> = {
          isOpen: true,
          openSource: source,
          status: 'filling',
          currentStep: 1,
        }
        if (vehicleSlug) {
          update.formData = { ...get().formData, vehicle: vehicleSlug }
        }
        set(update)
        if (typeof window !== 'undefined' && (window as { gtag?: (cmd: string, ...args: unknown[]) => void }).gtag) {
          (window as { gtag?: (cmd: string, ...args: unknown[]) => void }).gtag?.('event', 'prequal_modal_opened', { source })
        }
      },

      closeModal: () => set({ isOpen: false }),

      setStep: (step: number) => {
        set({ currentStep: step })
        if (typeof window !== 'undefined' && (window as { gtag?: (cmd: string, ...args: unknown[]) => void }).gtag) {
          (window as { gtag?: (cmd: string, ...args: unknown[]) => void }).gtag?.('event', 'prequal_step_completed', { step })
        }
      },

      updateFormData: (data: Partial<PrequalFormData>) =>
        set((state) => ({ formData: { ...state.formData, ...data } })),

      setStatus: (status: ModalStatus) => set({ status }),

      resetForm: () =>
        set({ currentStep: 1, status: 'idle', formData: {}, openSource: '' }),
    }),
    {
      name: 'prequal-form-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : ({} as Storage))),
      partialize: (state) => ({ currentStep: state.currentStep, formData: state.formData, status: state.status }),
    }
  )
)
