import axios from "axios"
import { jwtDecode } from "jwt-decode"

// Création d'une instance Axios avec la configuration de base
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})

// Intercepteur pour ajouter le token d'authentification aux requêtes
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken")

    if (accessToken) {
      // Vérifier si le token est expiré
      try {
        const decodedToken = jwtDecode(accessToken)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          // Token expiré, essayer de le rafraîchir
          const refreshToken = localStorage.getItem("refreshToken")

          if (refreshToken) {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/jwt/refresh/`,
                { refresh: refreshToken },
              )

              const newAccessToken = response.data.access
              localStorage.setItem("accessToken", newAccessToken)
              config.headers.Authorization = `JWT ${newAccessToken}`
            } catch (error) {
              console.log(error)
              localStorage.removeItem("accessToken")
              localStorage.removeItem("refreshToken")
              window.dispatchEvent(new Event("storage"))
            }
          }
        } else {
          // Token valide
          config.headers.Authorization = `JWT ${accessToken}`
        }
      } catch (error) {
        console.log(error)
        config.headers.Authorization = `JWT ${accessToken}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Intercepteur pour gérer les erreurs de réponse
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs spécifiques (401, 403, etc.)
    if (error.response?.status === 401) {
      // Token invalide ou expiré et impossible à rafraîchir
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
      // Déclencher un événement pour que le store Zustand puisse réagir
      window.dispatchEvent(new Event("storage"))
    }
    return Promise.reject(error)
  },
)

export default axiosInstance