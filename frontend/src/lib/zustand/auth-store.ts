import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { AuthState, LoginInput } from "@/types/auth"
import AuthService from "../api/auth-services"

export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginInput) => Promise<void>
    logout: () => Promise<void>
    setUser: (user: any) => void
  }
>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const { token, user } = await AuthService.login(credentials)
          set({ token, user, isAuthenticated: true, isLoading: false })
        } catch (error : any) {
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
          set({ user: null, token: null, isAuthenticated: false, isLoading: false })
        } catch (error: any) {
          set({
            error: error.response?.data?.detail || "Échec de la déconnexion",
            isLoading: false,
          })
          throw error
        }
      },

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
    },
  ),
)
