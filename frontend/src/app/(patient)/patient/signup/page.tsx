'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { patientUserSchema } from '@/lib/validators'
import { registerPatient } from '@/api/registerPatient'


const Page = () => {

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<z.infer<typeof patientUserSchema>>({
    resolver: zodResolver(patientUserSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      dateNaissance: new Date(),
      tel:"",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = (values: z.infer<typeof patientUserSchema>)=>{
    //  registerPatient(values)
    console.log(values)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="nom">Entre votre nom</label>
            <input type="text" id='nom' {...register("nom")} />
            <p>{errors.nom?.message}</p>
        </div>

        <div>
            <label htmlFor="prenom">Entrer votre prenom</label>
            <input type='text' {...register("prenom")} />
            <p>{errors.prenom?.message}</p>
        </div>
        <div>
            <label htmlFor="date">Entrer votre date de Naissance</label>
            <input type='date' {...register("dateNaissance")} />
            <p>{errors.dateNaissance?.message}</p>
        </div>
        <div>
            <label htmlFor="sexe"></label>
            <input type='radio' {...register("dateNaissance")} />
            <p>{errors.dateNaissance?.message}</p>
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input type='email'{...register("email")} />
            <p>{errors.email?.message}</p>
        </div>
        <div>
            <label htmlFor="tel">Numéro de Telephone</label>
            <input type='tel'{...register("tel")} />
            <p>{errors.tel?.message}</p>
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
            <input type='password' {...register("password")} />
            <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmer votre mot de passe</label>
            <input type="password" {...register("confirmPassword")} />
            <p>{errors.confirmPassword?.message}</p>
        </div>

      <input type="submit" />
    </form>
  )
}

export default Page