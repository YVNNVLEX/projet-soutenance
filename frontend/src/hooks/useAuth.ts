"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { useAuthStore } from "@/lib/zustand/auth-store"

export function useRequireAuth(redirectTo = "/login") {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth()

      if (!isAuth) {
        // Rediriger vers la page de connexion avec le callback URL
        router.push(`${redirectTo}?callbackUrl=${encodeURIComponent(pathname)}`)
      }
    }

    verifyAuth()
  }, [isAuthenticated, checkAuth, router, pathname, redirectTo])

  return { isAuthenticated }
}

export function useRedirectIfAuthenticated(redirectTo = "/dashboard") {
  const { isAuthenticated, checkAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    const verifyAuth = async () => {
      const isAuth = await checkAuth()

      if (isAuth) {
        // Rediriger vers le tableau de bord
        router.push(redirectTo)
      }
    }

    verifyAuth()
  }, [isAuthenticated, checkAuth, router, redirectTo])

  return { isAuthenticated }
}
