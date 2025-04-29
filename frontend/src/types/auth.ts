import type { z } from "zod"
import type { registerStep1Schema, registerStep2Schema, loginSchema } from "@/lib/validations/auth"

export type RegisterStep1Input = z.infer<typeof registerStep1Schema>
export type RegisterStep2Input = z.infer<typeof registerStep2Schema>
export type LoginInput = z.infer<typeof loginSchema>

export type RegisterFormData = RegisterStep1Input & RegisterStep2Input


export interface patientProfile {
  nom: string,
  prenom : string,
  email : string,
  tel : string,
  type : string,
  password : string,
  sexe: string
}

export interface praticienProfile extends patientProfile{
  hopital_id : string,
  photo : string,
  specialite: string,
}

export interface StepperProps {
  currentStep: number
  totalSteps: number
}

export interface AuthState {
  user: any | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
