"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AuthState, LoginInput } from "@/types/auth"
import AuthService from "../api/auth-services"
import { useEffect } from "react"


export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginInput) => Promise<void>
    logout: () => Promise<void>
    refreshToken: () => Promise<void>
    setUser: (user: any) => void
    checkAuth: () => Promise<boolean>
  }
>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshTokenValue: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const { tokens, user } = await AuthService.login(credentials)
          set({
            accessToken: tokens.access,
            refreshTokenValue: tokens.refresh,
            user,
            isAuthenticated: true,
            isLoading: false,
          })
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || "Échec de l'authentification",
            isLoading: false,
          })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await AuthService.logout()
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || "Échec de la déconnexion",
          })
        } finally {
          set({
            user: null,
            accessToken: null,
            refreshTokenValue: null,
            isAuthenticated: false,
            isLoading: false,
          })
        }
      },

      refreshToken: async () => {
        try {
          const tokens = await AuthService.refreshToken()
          set({ accessToken: tokens.access, refreshTokenValue: tokens.refresh })
        } catch (error) {
          await get().logout()
          throw error
        }
      },

      setUser: (user) => set({ user }),

      checkAuth: async () => {
        const isAuth = AuthService.isAuthenticated()
        if (!isAuth) {
          await get().logout()
          return false
        }
        if (isAuth && !get().user) {
          try {
            const user = await AuthService.getCurrentUser()
            set({ user, isAuthenticated: true })
          } catch (error) {
            console.log(error);
            await get().logout()
            return false
          }
        }
        return true
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshTokenValue: state.refreshTokenValue,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      version: 1,
    },
  ),
)

export function useAuthCheck() {
  const checkAuth = useAuthStore((state) => state.checkAuth)

  useEffect(() => {
    checkAuth()
    const handleStorageChange = () => {
      checkAuth()
    }
    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [checkAuth])
}
