"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginSchema } from "@/lib/validations/auth"
import type { LoginInput } from "@/types/auth"
import { useAuthStore } from "@/lib/zustand/auth-store"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const { login } = useAuthStore()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      await login(data)
      router.push("/praticien/dashboard")
    } catch (error: any) {
      console.error("Erreur de connexion:", error)

      
      if (error.response?.data) {
        const errorData = error.response.data
        setError(errorData.detail || errorData.non_field_errors?.[0] || "Identifiants invalides")
      } else {
        setError("Une erreur est survenue lors de la connexion")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="card w-full max-w-md mx-auto shadow-sm bg-white border-2 border-gray-200">
      <div className="card-body">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl font-bold text-center">Se Connecter</h1>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Entrez votre email"
                        type="email"
                        className="input input-bordered w-full h-[50px]"
                        {...field}
                      />
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
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Entrez votre mot de passe"
                          type={showPassword ? "text" : "password"}
                          className="input input-bordered w-full h-[50px] pr-12"
                          {...field}
                        />
                        <button
                          type="button"
                          tabIndex={-1}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer"
                          onClick={() => setShowPassword((v) => !v)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <motion.div whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}>
                <Button type="submit" className="bg-[#00aed6] hover:bg-[#00aed6]\90 h-[50px] w-full cursor-pointer" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm mr-2"></span>
                      Connexion en cours...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
