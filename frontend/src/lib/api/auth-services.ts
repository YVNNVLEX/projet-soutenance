import axiosInstance from "./axios-instance"
import type { LoginInput, RegisterFormData } from "@/types/auth"

/**
 * Service d'authentification pour interagir avec l'API Django Djoser
 */
export const AuthService = {
  /**
   * Connexion utilisateur
   */
  login: async (credentials: LoginInput) => {
    try {
      const response = await axiosInstance.post("/auth/token/login/", {
        email: credentials.email,
        password: credentials.password,
      })

      const { auth_token } = response.data

      if (auth_token) {
        localStorage.setItem("authToken", auth_token)

        // Récupérer les informations de l'utilisateur
        const userResponse = await axiosInstance.get("/auth/users/me/")
        return { token: auth_token, user: userResponse.data }
      }

      return { token: auth_token, user: null }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      throw error
    }
  },

  /**
   * Inscription utilisateur
   */
  register: async (userData: RegisterFormData) => {
    try {
      // Adapter les données au format attendu par Djoser
      const djoserData = {
        email: userData.email,
        password: userData.password,
        re_password: userData.confirmPassword,
        phone_number: userData.telephone,
        full_name: userData.fullName,
        birth_date: userData.birthdate,
      }

      const response = await axiosInstance.post("/auth/users/", djoserData)
      return response.data
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      throw error
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      await axiosInstance.post("/auth/token/logout/")
      localStorage.removeItem("authToken")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Supprimer le token même en cas d'erreur
      localStorage.removeItem("authToken")
      throw error
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken")
  },

  /**
   * Récupérer les informations de l'utilisateur connecté
   */
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/users/me/")
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur:", error)
      throw error
    }
  },

  /**
   * Demander une réinitialisation de mot de passe
   */
  requestPasswordReset: async (email: string) => {
    try {
      await axiosInstance.post("/auth/users/reset_password/", { email })
      return true
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation de mot de passe:", error)
      throw error
    }
  },

  /**
   * Confirmer une réinitialisation de mot de passe
   */
  confirmPasswordReset: async (uid: string, token: string, newPassword: string) => {
    try {
      await axiosInstance.post("/auth/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword,
        re_new_password: newPassword,
      })
      return true
    } catch (error) {
      console.error("Erreur lors de la confirmation de réinitialisation de mot de passe:", error)
      throw error
    }
  },
}

export default AuthService
