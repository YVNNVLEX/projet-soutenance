import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtDecode } from "jwt-decode"

// Routes qui nécessitent une authentification
const protectedRoutes = ["/patient", "/praticien/dashboard"]

// Routes accessibles uniquement aux utilisateurs non authentifiés
const authRoutes = ["/praticien/login", "/patient/login", "/patient/signup"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Récupérer le token JWT depuis les cookies
  const accessToken = request.cookies.get("accessToken")?.value

  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = accessToken ? isTokenValid(accessToken) : false

  // Vérifier si la route actuelle nécessite une authentification
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname === route)

  // Rediriger les utilisateurs non authentifiés vers la page de connexion appropriée
  if (isProtectedRoute && !isAuthenticated) {
    const loginPath = pathname.startsWith("/praticien") ? "/praticien/login" : "/patient/login"
    const url = new URL(loginPath, request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Rediriger les utilisateurs authentifiés vers le tableau de bord approprié
  if (isAuthRoute && isAuthenticated) {
    const dashboardPath = pathname.includes("praticien") ? "/praticien/dashboard" : "/patient/dashboard"
    return NextResponse.redirect(new URL(dashboardPath, request.url))
  }

  return NextResponse.next()
}

// Vérifier si le token JWT est valide
function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token)
    const currentTime = Date.now() / 1000

    // Vérifier si le token n'est pas expiré
    if (decodedToken.exp <= currentTime) {
      return false
    }

    return true
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
