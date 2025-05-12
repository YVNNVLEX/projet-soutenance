import axios from "axios"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
})


axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = Cookies.get("accessToken")

    if (accessToken) {
      try {
        const decodedToken = jwtDecode(accessToken)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp && decodedToken.exp < currentTime) {
          const refreshToken = Cookies.get("refreshToken")

          if (refreshToken) {
            try {
              const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/jwt/refresh/`,
                { refresh: refreshToken },
              )

              const newAccessToken = response.data.access
              Cookies.set("accessToken", newAccessToken, { expires: 7, path: "/" })
              config.headers.Authorization = `Bearer ${newAccessToken}`
            } catch (error) {
              console.log(error)
              Cookies.remove("accessToken", { path: "/" })
              Cookies.remove("refreshToken", { path: "/" })
              window.dispatchEvent(new Event("storage"))
            }
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`
        }
      } catch (error) {
        console.log(error)
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Gérer les erreurs spécifiques (401, 403, etc.)
    if (error.response?.status === 401) {
      // Token invalide ou expiré et impossible à rafraîchir
      Cookies.remove("accessToken", { path: "/" })
      Cookies.remove("refreshToken", { path: "/" })
      // Déclencher un événement pour que le store Zustand puisse réagir
      window.dispatchEvent(new Event("storage"))
    }
    return Promise.reject(error)
  },
)

export default axiosInstance