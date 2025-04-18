import { z } from "zod"
// import { zfd } from "zod-form-data"


export const patientUserSchema = z.object({
    username: z.string().min(2).max(50, {
        message: "Ne doit pas dépassé"
    }),
    nom: z.string().min(2).max(50),
    prenom: z.string().min(2).max(50),
    dateNaissance : z.date(),
    password: z.string().min(2, {message: "Mot de passe trop court"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message : "Password must include one small letter, one uppercase letter and one number"}),
    email: z.string().email({ message: 'Veuillez entrer votre mail'}),
    confirmPassword: z.string().min(2, {message: "Mot de passe trop court"})
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {message : "Password must include one small letter, one uppercase letter and one number"}),
    tel: z.string().nonempty({message: "Numero de telephone requis"})
}).refine(
    data => data.password === data.confirmPassword,
)