"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { registerStep2Schema } from "@/lib/validations/auth"
import type { RegisterStep2Input } from "@/types/auth"
import { fadeUpRightVariants } from "@/lib/utils"

interface FormStep2Props {
  defaultValues: Partial<RegisterStep2Input>
  onSubmit: (data: RegisterStep2Input) => Promise<void>
  isLoading: boolean
  direction: number
}

export function FormStep2({ defaultValues, onSubmit, isLoading, direction }: FormStep2Props) {
  const form = useForm<RegisterStep2Input>({
    resolver: zodResolver(registerStep2Schema),
    defaultValues,
  })

  return (
    <motion.div
      key="step2"
      custom={direction}
      variants={fadeUpRightVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="xxxxxxx@gmail.com" className="input input-bordered w-full h-[50px]" {...field} />
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
                <FormLabel>Mot de Passe</FormLabel>
                <FormControl>
                  <Input type="password" className="input input-bordered w-full h-[50px]" {...field} />
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
                <FormLabel>Confirmer Mot de Passe</FormLabel>
                <FormControl>
                  <Input type="password" className="input input-bordered w-full h-[50px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
            <Button type="submit" className="h-[50px] cursor-pointer hover:bg-[#00aed6]\90 bg-[#00aed6] w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm mr-2"></span>
                  Enregistrement...
                </>
              ) : (
                <>
                  Terminer l&apos;inscription
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  )
}
