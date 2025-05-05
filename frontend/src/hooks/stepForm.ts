"use client"

import { useState } from "react"
import type { RegisterFormData } from "@/types/auth"

interface UseMultiStepFormProps {
  initialData?: Partial<RegisterFormData>
  totalSteps: number
}

interface UseMultiStepFormReturn {
  currentStep: number
  direction: number
  formData: Partial<RegisterFormData>
  isLoadingStep1: boolean
  isLoadingStep2: boolean
  goToNextStep: () => void
  goToPrevStep: () => void
  updateFormData: (data: Partial<RegisterFormData>) => void
  setIsLoadingStep1: (isLoading: boolean) => void
  setIsLoadingStep2: (isLoading: boolean) => void
  // Nouvelle méthode pour obtenir les données complètes du formulaire
  getCompleteFormData: () => Partial<RegisterFormData>
}

export function useMultiStepForm({ initialData = {}, totalSteps }: UseMultiStepFormProps): UseMultiStepFormReturn {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1) // 1 for forward, -1 for backward
  const [formData, setFormData] = useState<Partial<RegisterFormData>>(initialData)
  const [isLoadingStep1, setIsLoadingStep1] = useState(false)
  const [isLoadingStep2, setIsLoadingStep2] = useState(false)

  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }

  const updateFormData = (data: Partial<RegisterFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  // Nouvelle méthode pour obtenir les données complètes du formulaire
  const getCompleteFormData = () => {
    return formData
  }

  return {
    currentStep,
    direction,
    formData,
    isLoadingStep1,
    isLoadingStep2,
    goToNextStep,
    goToPrevStep,
    updateFormData,
    setIsLoadingStep1,
    setIsLoadingStep2,
    getCompleteFormData,
  }
}
