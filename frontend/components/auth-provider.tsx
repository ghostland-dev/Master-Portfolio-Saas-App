"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from "react"
import { type User, getCurrentUser, isAuthenticated, logout, refreshAuthState } from "@/lib/auth-utils"
import { useRouter, usePathname } from "next/navigation"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  isClient: boolean
  logout: () => void
  refreshAuth: () => boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  isAdmin: false,
  isClient: false,
  logout: () => {},
  refreshAuth: () => false,
})

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const [initialized, setInitialized] = useState(false)
  const isRedirectingRef = useRef(false)

  // Fonction pour rafraîchir l'état d'authentification sans créer de boucle
  const refreshAuth = () => {
    try {
      console.log("Rafraîchissement de l'état d'authentification...")
      const authState = refreshAuthState()

      // Ne mettre à jour l'état que si nécessaire pour éviter les rendus inutiles
      if (JSON.stringify(user) !== JSON.stringify(authState.user)) {
        setUser(authState.user)
      }

      return authState.isAuthenticated
    } catch (error) {
      console.error("Erreur lors du rafraîchissement de l'état d'authentification:", error)

      // Ne mettre à jour l'état que si nécessaire
      if (user !== null) {
        setUser(null)
      }

      return false
    }
  }

  // Initialisation de l'état d'authentification
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      try {
        console.log("Initialisation de l'authentification...")

        // Vérifier si l'utilisateur est authentifié
        if (isAuthenticated()) {
          const currentUser = getCurrentUser()
          console.log("Utilisateur authentifié trouvé:", currentUser?.email)
          setUser(currentUser)
        } else {
          console.log("Aucun utilisateur authentifié")
          setUser(null)
        }
      } catch (error) {
        console.error("Erreur lors de l'initialisation de l'authentification:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
        setInitialized(true)
      }
    }

    initAuth()
  }, [])

  // Gestion des redirections basées sur l'état d'authentification
  useEffect(() => {
    // Ne pas rediriger si l'authentification n'est pas encore initialisée
    if (!initialized) return

    // Attendre que le chargement soit terminé
    if (isLoading) return

    // Éviter les redirections multiples
    if (isRedirectingRef.current) return

    const handleAuthRedirects = async () => {
      // Pages qui nécessitent une authentification
      const isProtectedRoute = pathname?.startsWith("/dashboard")
      const isLoginPage = pathname === "/login"

      // Éviter les redirections inutiles qui peuvent causer des boucles
      if (!user && isProtectedRoute && !window.location.pathname.includes("/login")) {
        // Marquer que nous sommes en train de rediriger
        isRedirectingRef.current = true

        // L'utilisateur n'est pas connecté et tente d'accéder à une page protégée
        console.log("Redirection vers login: accès non autorisé à", pathname)
        router.push(`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}`)

        // Réinitialiser le flag après un délai pour permettre la redirection
        setTimeout(() => {
          isRedirectingRef.current = false
        }, 500)
      } else if (user && isLoginPage && !isLoading) {
        // Marquer que nous sommes en train de rediriger
        isRedirectingRef.current = true

        // L'utilisateur est connecté et tente d'accéder à la page de connexion
        console.log("Redirection vers dashboard: utilisateur déjà connecté")
        router.push("/dashboard")

        // Réinitialiser le flag après un délai pour permettre la redirection
        setTimeout(() => {
          isRedirectingRef.current = false
        }, 500)
      }
    }

    handleAuthRedirects()
  }, [initialized, isLoading, user, pathname, router])

  // Fonction de déconnexion améliorée
  const handleLogout = () => {
    console.log("Déconnexion de l'utilisateur")
    logout()
    setUser(null)
    router.push("/login")
  }

  const value = {
    user,
    isLoading,
    isLoggedIn: !!user,
    isAdmin: user?.role === "admin",
    isClient: user?.role === "client",
    logout: handleLogout,
    refreshAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

