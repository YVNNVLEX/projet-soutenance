import * as z from "zod"

export const registerStep1Schema = z
  .object({
    nom: z.string().min(1, { message: "Le nom complet est requis" }).min(3, { message: "Le nom complet doit contenir au moins 3 caractères" }),
    prenom: z.string().min(1, { message: "Le nom complet est requis" }).min(3, { message: "Le nom complet doit contenir au moins 3 caractères" }),
    dateNaissance: z
    .string()
    .min(1, { message: "La date de naissance est requise" })
    .refine(
      (date) => {
        const birthDate = new Date(date)
        const today = new Date()
        const age = today.getFullYear() - birthDate.getFullYear()
        return age >= 15
      },
      { message: "Vous devez avoir au moins 12 ans" },
    ),
    sexe: z.string(),
    tel: z
      .string()
      .min(1, { message: "Le numéro de téléphone est requis" })
      .regex(/^\+?[0-9]{8,15}$/, {
        message: "Veuillez entrer un numéro de téléphone valide",
      }),
  })



export const registerStep2Schema = z.object({
  email: z.string().min(1, { message: "L'email est requis" }).email({ message: "Veuillez entrer une adresse email valide" }),
  type: z.string().optional(),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: "Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule et un chiffre",
      }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
})



export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "L'email est requis" })
    .email({ message: "Veuillez entrer une adresse email valide" }),
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
})

export type RegisterStep1Input = z.infer<typeof registerStep1Schema>
export type RegisterStep2Input = z.infer<typeof registerStep2Schema>
export type LoginInput = z.infer<typeof loginSchema>
