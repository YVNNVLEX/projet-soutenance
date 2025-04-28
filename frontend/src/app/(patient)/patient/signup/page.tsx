'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { patientUserSchema } from '@/lib/validators'
import { registerPatient } from '@/api/registerPatient'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { FiArrowRight } from "react-icons/fi";

const Page = () => {

  const form = useForm<z.infer<typeof patientUserSchema>>({
    resolver: zodResolver(patientUserSchema),
    defaultValues: {
      nom: "",
      prenom: "",
      dateNaissance: "",
      tel:"",
      email: "",
      password: "",
      confirmPassword: "",
      sexe: "",
      type:"",
    },
  })

  const onSubmit = async (values: z.infer<typeof patientUserSchema>)=>{
    try {
      const result = await registerPatient(values)
      console.log("patient enregistré", result);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        {/* <Header/> */}
        <Image 
          src="logo.svg"
          width={30}
          height={30}
          alt=""
          className='items-center'
        />
        <h1>S&aposInscrire</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} 
            className="@container flex flex-col gap-2 justify-center border-2 rounded-lg p-2"
          >
              <div className='flex w-full gap-5'>
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem
                        className=''
                      >
                        <FormLabel className=''>Entrer votre Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem
                        className=''
                      >
                        <FormLabel>Entrer votre prenom</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <div>
                  <FormField
                    control={form.control}
                    name="dateNaissance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entrer votre Date de Naissance</FormLabel>
                        <FormControl>
                          <Input type="date" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sexe"
                    render={({ field }) => (
                      <FormItem>
                          <FormLabel>Sexe</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selectionner votre sexe" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="m">Masculin</SelectItem>
                                <SelectItem value="f">Feminin</SelectItem>
                              </SelectContent>
                            </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <FormField
                control={form.control}
                name="tel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de Telephone</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrer votre Email</FormLabel>
                    <FormControl>
                      <Input placeholder="xxxxx@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entrer votre mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmer votre mot de passe</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" 
                className='btn bg-[#00AED6] hover:bg-[#00AED6]/90 cursor-pointer h-13'
              >
                  <span>S&apos;incrire</span>
                  <FiArrowRight color='white'/>
              </Button>
          </form>
        </Form>
    </>
  )
}

export default Page