import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import {jwtDecode} from "jwt-decode"

// Routes nécessitant une authentification
const protectedRoutes = ["/patient", "/praticien/**"]

// Routes accessibles uniquement aux non-authentifiés
const authRoutes = ["/praticien/login", "/patient/login", "/patient/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Lire le token JWT dans les cookies
  const accessToken = request.cookies.get("accessToken")?.value

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = accessToken ? isTokenValid(accessToken) : false

  // Vérifier si la route est protégée
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Vérifier si la route est une route d'authentification (login/signup)
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // Debug logs (à retirer en production)
  console.log("Middleware path:", pathname)
  console.log("Access Token:", accessToken)
  console.log("Is Authenticated:", isAuthenticated)
  console.log("Is Protected Route:", isProtectedRoute)
  console.log("Is Auth Route:", isAuthRoute)

  // Si route protégée et pas authentifié => rediriger vers login
  if (isProtectedRoute && !isAuthenticated) {
    const loginPath = pathname.startsWith("/praticien") ? "/praticien/login" : "/patient/login"
    const url = new URL(loginPath, request.url)
    url.searchParams.set("callbackUrl", encodeURIComponent(pathname))
    return NextResponse.redirect(url)
  }

  // Si route d'authentification et déjà authentifié => rediriger vers dashboard
  if (isAuthRoute && isAuthenticated) {
    const dashboardPath = pathname.startsWith("/praticien") ? "/praticien/dashboard" : "/patient/dashboard"
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  // Sinon laisser passer
  return NextResponse.next()
}

function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
  } catch (error) {
    console.error("Erreur lors de la validation du token:", error)
    return false
  }
}

export const config = {
  matcher: [
    '/praticien/:path*',
    '/patient/:path*',
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
}
