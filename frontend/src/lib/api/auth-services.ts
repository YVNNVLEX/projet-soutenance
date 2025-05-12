import axiosInstance from "./axios-instance"
import type { LoginInput, RegisterFormData } from "@/types/auth"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"


export const AuthService = {

  login: async (credentials: LoginInput) => {
    try {
     
      const response = await axiosInstance.post("/auth/jwt/create/", {
        email: credentials.email,
        password: credentials.password,
      })

      const { access, refresh } = response.data

      if (access && refresh) {
       
        Cookies.set("accessToken", access, { expires: 7, path: "/" })
        console.log(access)
        Cookies.set("refreshToken", refresh, { expires: 7, path: "/" })

        
        const decodedToken = jwtDecode(access)

        const userResponse = await axiosInstance.get("/auth/users/me/", {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
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


  refreshToken: async () => {
    try {
      const refreshToken = Cookies.get("refreshToken")

      if (!refreshToken) {
        throw new Error("Refresh token manquant")
      }

      const response = await axiosInstance.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      })

      const { access } = response.data

      if (access) {
        Cookies.set("accessToken", access, { expires: 7, path: "/" })
        return access
      }

      throw new Error("Access token manquant dans la réponse")
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token:", error)
      AuthService.logout()
      throw error
    }
  },


  verifyToken: async (token: string) => {
    try {
      await axiosInstance.post("/auth/jwt/verify/", { token })
      return true
    } catch (error) {
      console.error("Token invalide:", error)
      return false
    }
  },


  register: async (userData: RegisterFormData) => {
    console.log("AuthService.register appelé avec:", userData)
    try {

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

  
  logout: async () => {
    try {
      Cookies.remove("accessToken", { path: "/" })
      Cookies.remove("refreshToken", { path: "/" })
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      Cookies.remove("accessToken", { path: "/" })
      Cookies.remove("refreshToken", { path: "/" })
      throw error
    }
  },

  
  isAuthenticated: () => {
    const accessToken = Cookies.get("accessToken")

    if (!accessToken) {
      return false
    }

    try {

      const decodedToken = jwtDecode(accessToken)
      const currentTime = Date.now() / 1000

      return decodedToken.exp ? decodedToken.exp > currentTime : false
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error)
      return false
    }
  },

  
  getCurrentUser: async () => {
    try {
      const response = await axiosInstance.get("/auth/users/me/")
      return response.data
    } catch (error) {
      console.error("Erreur lors de la récupération des informations utilisateur:", error)
      throw error
    }
  },

  
  requestPasswordReset: async (email: string) => {
    try {
      await axiosInstance.post("/auth/users/reset_password/", { email })
      return true
    } catch (error) {
      console.error("Erreur lors de la demande de réinitialisation de mot de passe:", error)
      throw error
    }
  },

  
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
