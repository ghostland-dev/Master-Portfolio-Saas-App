import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware pour gérer l'authentification côté serveur
export function middleware(request: NextRequest) {
  // Vérifier si l'utilisateur est authentifié via un cookie
  const isAuthenticated = request.cookies.has("portfolio_auth_session")

  // Vérifier si la route est protégée
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/dashboard")
  const isLoginPage = request.nextUrl.pathname === "/login"

  // Si l'utilisateur n'est pas authentifié et tente d'accéder à une route protégée
  if (!isAuthenticated && isProtectedRoute) {
    // Rediriger vers la page de connexion avec le chemin de redirection
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
    redirectUrl.searchParams.set("unauthorized", "true")
    return NextResponse.redirect(redirectUrl)
  }

  // Si l'utilisateur est authentifié et tente d'accéder à la page de connexion
  if (isAuthenticated && isLoginPage) {
    // Rediriger vers le tableau de bord
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Continuer la requête normalement
  return NextResponse.next()
}

// Configurer les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}

