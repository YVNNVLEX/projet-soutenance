import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwtDecode  from "jwt-decode"

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

  // Rediriger les utilisateurs non authentifiés vers la page de connexion
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !isAuthenticated) {
    const url = new URL("/patient/login", request.url)
    url.searchParams.set("callbackUrl", encodeURI(pathname))
    return NextResponse.redirect(url)
  }

  // Rediriger les utilisateurs authentifiés vers le tableau de bord s'ils tentent d'accéder aux pages d'authentification
  if (authRoutes.some((route) => pathname === route) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

// Vérifier si le token JWT est valide
function isTokenValid(token: string): boolean {
  try {
    const decodedToken = jwtDecode<{ exp: number }>(token)
    const currentTime = Date.now() / 1000

    return decodedToken.exp > currentTime
  } catch (error) {
    console.log(error);
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
