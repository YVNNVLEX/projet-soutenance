import axiosInstance from "./axios-instance"
import type { LoginInput, RegisterFormData } from "@/types/auth"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

/**
 * Service d'authentification pour interagir avec l'API Django Djoser avec JWT
 */
export const AuthService = {
  /**
   * Connexion utilisateur avec JWT
   */
  login: async (credentials: LoginInput) => {
    try {
      // Utiliser l'endpoint JWT de Djoser
      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: credentials.email,
        password: credentials.password,
      })

      const { access, refresh } = response.data

      if (access && refresh) {
        // Stocker les tokens JWT
        localStorage.setItem("accessToken", access)
        localStorage.setItem("refreshToken", refresh)

        // Décoder le token pour obtenir des informations sur l'utilisateur
        const decodedToken = jwtDecode(access)

        // Récupérer les informations complètes de l'utilisateur
        const userResponse = await axiosInstance.get("/auth/users/me/")
        return {
          tokens: { access, refresh },
          user: userResponse.data,
          decodedToken,
        }
      }

      throw new Error("Tokens d'authentification manquants")
    } catch (error) {
      console.error("Erreur lors de la connexion:", error)
      throw error
    }
  },

  /**
   * Rafraîchir le token JWT
   */
  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken")

      if (!refreshToken) {
        throw new Error("Refresh token manquant")
      }

      const response = await axiosInstance.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      })

      const { access } = response.data

      if (access) {
        localStorage.setItem("accessToken", access)
        return access
      }

      throw new Error("Access token manquant dans la réponse")
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error)
      // En cas d'échec, déconnecter l'utilisateur
      AuthService.logout()
      throw error
    }
  },

  /**
   * Vérifier la validité d'un token JWT
   */
  verifyToken: async (token: string) => {
    try {
      await axiosInstance.post("/auth/jwt/verify/", { token })
      return true
    } catch (error) {
      console.error("Token invalide:", error)
      return false
    }
  },

  /**
   * Inscription utilisateur
   */
  register: async (userData: RegisterFormData) => {
    console.log("AuthService.register appelé avec:", userData)
    try {
      // Adapter les données au format attendu par Djoser
      const djoserData = {
        tel: userData.tel,
        email: userData.email,
        password: userData.password,
        nom: userData.nom,
        prenom: userData.prenom,
        dateNaissance: userData.dateNaissance,
        sexe:userData.sexe,
        type:userData.type
      }

      console.log("Données formatées pour Djoser:", djoserData)
      console.log("URL de l'API:", `${axiosInstance.defaults.baseURL}/auth/users/`)

      const response = await axiosInstance.post("/auth/users/", djoserData)
      console.log("Réponse de l'API:", response.data)
      return response.data
    } catch (error) {
      console.error("Erreur détaillée lors de l'inscription:", error)
      if (axios.isAxiosError(error)) {
        console.error("Détails de l'erreur Axios:", {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        })
      }
      throw error
    }
  },

  /**
   * Déconnexion utilisateur
   */
  logout: async () => {
    try {
      // Avec JWT, il n'y a pas d'endpoint de déconnexion côté serveur
      // On supprime simplement les tokens côté client
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Supprimer les tokens même en cas d'erreur
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      throw error
    }
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated: () => {
    const accessToken = localStorage.getItem("accessToken")

    if (!accessToken) {
      return false
    }

    try {
      // Vérifier si le token est expiré
      const decodedToken = jwtDecode(accessToken)
      const currentTime = Date.now() / 1000

      return decodedToken.exp ? decodedToken.exp > currentTime : false
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error)
      return false
    }
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
