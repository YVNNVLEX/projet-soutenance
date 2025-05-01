"use client"

import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useMultiStepForm } from "@/hooks/stepForm"
import { Stepper } from "./stepper"
import { FormStep1 } from "./formStepOne"
import { FormStep2 } from "./formStepTwo"
import type { RegisterStep1Input, RegisterStep2Input } from "@/types/auth"
import AuthService from "@/lib/api/auth-services"

const TOTAL_STEPS = 2

export default function InscriptionForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const {
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
  } = useMultiStepForm({
    initialData: {
      telephone: "",
      email: "",
      password: "",
      confirmPassword: "",
      nom: "",
      prenom:"",
      dateNaissance: "",
      sexe:"",
      type:""
    },
    totalSteps: TOTAL_STEPS,
  })

  const handleSubmitStep1 = async (data: RegisterStep1Input) => {
    setIsLoadingStep1(true)
    setError(null)

    try {
      // Vérifier si l'email existe déjà (simulation)
      // Dans un cas réel, vous pourriez avoir un endpoint API pour vérifier cela
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mettre à jour les données du formulaire et passer à l'étape suivante
      updateFormData(data)
      goToNextStep()
    } catch (error) {
      console.error("Erreur lors de la vérification des données:", error)
      setError("Une erreur est survenue lors de la vérification de l'email.")
    } finally {
      setIsLoadingStep1(false)
    }
  }

  const handleSubmitStep2 = async (data: RegisterStep2Input) => {
    setIsLoadingStep2(true)
    setError(null)

    try {
      // Mettre à jour les données du formulaire avec les données de l'étape 2
      updateFormData(data)

      // Récupérer les données complètes du formulaire (étape 1 + étape 2)
      const completeFormData = {
        ...getCompleteFormData(),
        ...data,
      }

      // Envoyer toutes les données à l'API en une seule requête
      await AuthService.register(completeFormData as any)

      // Rediriger vers la page de connexion après inscription réussie
      alert("Inscription réussie ! Veuillez vous connecter.")
      router.push("/login")
    } catch (error: any) {
      console.error("Erreur lors de l'enregistrement des données:", error)

      // Afficher un message d'erreur plus précis si disponible
      if (error.response?.data) {
        const errorData = error.response.data
        const errorMessage = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${(value as any[]).join(", ")}`)
          .join("\n")
        setError(errorMessage || "Une erreur est survenue lors de l'inscription.")
      } else {
        setError("Une erreur est survenue lors de l'inscription. Veuillez réessayer.")
      }
    } finally {
      setIsLoadingStep2(false)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-base-100 shadow-sm">
      <div className="card-body bg-white border-2">
        <div className="flex justify-center">
          {currentStep > 1 && (
            <motion.button
              whileHover={{ scale: isLoadingStep2 ? 1 : 1.1 }}
              whileTap={{ scale: isLoadingStep2 ? 1 : 0.95 }}
              onClick={goToPrevStep}
              className="btn btn-ghost btn-circle"
              disabled={isLoadingStep2}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
          <h1 className="text-3xl font-bold text-center flex-1">S'Inscrire</h1>
        </div>

        <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        {error && (
          <div className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            {currentStep === 1 && (
              <FormStep1
                defaultValues={{
                  telephone: formData.telephone || "",
                  nom: formData.nom || "",
                  prenom: formData.prenom || "",
                  sexe: formData.sexe || "",
                  dateNaissance: formData.dateNaissance || "",
                }}
                onSubmit={handleSubmitStep1}
                isLoading={isLoadingStep1}
                direction={direction}
              />
            )}

            {currentStep === 2 && (
              <FormStep2
                defaultValues={{
                  email: formData.email || "",
                  password: formData.password || "",
                  confirmPassword: formData.confirmPassword || "",
                }}
                onSubmit={handleSubmitStep2}
                isLoading={isLoadingStep2}
                direction={direction}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
