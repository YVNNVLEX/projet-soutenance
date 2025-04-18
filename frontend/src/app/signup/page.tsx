'use client'

import { useForm } from 'react-hook-form'
// import axios from "axios"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { patientUserSchema } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// import { patientProfile } from '@/lib/interfaces'

const Page = () => {

    const form = useForm<z.infer<typeof patientUserSchema>>({
        resolver: zodResolver(patientUserSchema),
        defaultValues: {
            username: "",
            nom: "",
            prenom: "",
            dateNaissance: new Date(),
            password: "",
            confirmPassword: "",
            tel : "",
            email: "",
        },
      })

      function onSubmit(values: z.infer<typeof patientUserSchema>) {
         console.log(values)
      }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
       
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default Page