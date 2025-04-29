import axios from "axios"

// Création d'une instance Axios avec la configuration de base
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
})

// Intercepteur pour ajouter le token d'authentification aux requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Token ${token}`
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
      // Token expiré ou invalide
      localStorage.removeItem("authToken")
      // Rediriger vers la page de connexion si nécessaire
      // window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
