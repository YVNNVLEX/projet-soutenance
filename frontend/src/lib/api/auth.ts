import type { LoginInput, RegisterStep1Input, RegisterStep2Input } from "@/types/auth"

// URL de base de l'API Django Djoser
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

/**
 * Fonction pour s'authentifier avec Django Djoser
 */
export async function login(credentials: LoginInput): Promise<{ token: string; user: any }> {
  try {
    const response = await fetch(`${API_URL}/auth/token/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Échec de l'authentification")
    }

    const data = await response.json()

    // Stocker le token dans le localStorage
    if (data.auth_token) {
      localStorage.setItem("authToken", data.auth_token)

      // Récupérer les informations de l'utilisateur
      const userResponse = await fetch(`${API_URL}/auth/users/me/`, {
        headers: {
          Authorization: `Token ${data.auth_token}`,
        },
      })

      if (userResponse.ok) {
        const userData = await userResponse.json()
        return { token: data.auth_token, user: userData }
      }
    }

    return { token: data.auth_token, user: null }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error)
    throw error
  }
}

/**
 * Fonction pour s'inscrire avec Django Djoser
 */
export async function register(userData: RegisterStep1Input & RegisterStep2Input): Promise<any> {
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

    const response = await fetch(`${API_URL}/auth/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(djoserData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    return await response.json()
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    throw error
  }
}

/**
 * Fonction pour vérifier si l'utilisateur est connecté
 */
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("authToken")
}

/**
 * Fonction pour se déconnecter
 */
export async function logout(): Promise<void> {
  try {
    const token = localStorage.getItem("authToken")

    if (token) {
      await fetch(`${API_URL}/auth/token/logout/`, {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  } finally {
    localStorage.removeItem("authToken")
  }
}
