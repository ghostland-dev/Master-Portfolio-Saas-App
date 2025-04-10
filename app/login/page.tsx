"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "@/components/ui/icon"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { login, isAuthenticated, getCurrentUser } from "@/lib/auth-utils"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams?.get("redirect") || "/dashboard"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [authChecked, setAuthChecked] = useState(false)

  // Ajouter les types pour le handler des inputs
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  // Modifier le useEffect de vérification d'authentification pour éviter les boucles infinies
  // Remplacer l'effet actuel par celui-ci:

  // Rediriger si déjà connecté
  useEffect(() => {
    // Utiliser une variable pour éviter les vérifications multiples
    let isMounted = true

    const checkAuth = async () => {
      // Ne vérifier qu'une seule fois et seulement si le composant est monté
      if (!authChecked && isMounted) {
        try {
          if (isAuthenticated()) {
            const user = getCurrentUser()
            console.log("Utilisateur déjà connecté:", user?.email)
            console.log("Redirection vers:", redirectPath)

            // Ajouter un délai pour éviter les redirections trop rapides
            await new Promise((resolve) => setTimeout(resolve, 100))
            router.push(redirectPath)
          }
        } catch (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error)
        } finally {
          if (isMounted) {
            setAuthChecked(true)
          }
        }
      }
    }

    checkAuth()

    // Nettoyage pour éviter les fuites de mémoire
    return () => {
      isMounted = false
    }
  }, [authChecked, redirectPath, router])

  // Améliorer la gestion de l'authentification dans la page de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Nettoyer d'abord le localStorage pour éviter les conflits
      localStorage.removeItem("portfolio_auth_user")

      const user = login(email, password)
      if (user) {
        console.log("Connexion réussie pour:", user.email)
        console.log("Redirection vers:", redirectPath)

        // Ajouter un délai avant la redirection pour s'assurer que l'état est bien mis à jour
        setTimeout(() => {
          router.push(redirectPath)
        }, 300)
      } else {
        console.log("Échec de connexion: utilisateur non trouvé")
        setError("Email ou mot de passe incorrect")
      }
    } catch (err) {
      console.error("Erreur d'authentification:", err)
      setError("Une erreur est survenue lors de la connexion")
    } finally {
      setLoading(false)
    }
  }

  // Afficher un message d'erreur si l'utilisateur a été redirigé vers la page de connexion
  const unauthorizedMessage = searchParams?.get("unauthorized") === "true"

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-16rem)] py-12">
      <div className="w-full max-w-md">
        {unauthorizedMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              Vous devez être connecté pour accéder à cette page. Veuillez vous connecter pour continuer.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-1.5">
              <Icon name="LogIn" size="sm" aria-hidden="true" /> Connexion
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-1.5">
              <Icon name="Users" size="sm" aria-hidden="true" /> Comptes de démo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Connexion</CardTitle>
                <CardDescription>Entrez vos identifiants pour accéder à votre espace client</CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Mot de passe oublié?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Connexion en cours...
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" className="mr-2 h-4 w-4" aria-hidden="true" />
                        Se connecter
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="demo">
            <Card>
              <CardHeader>
                <CardTitle>Comptes de démonstration</CardTitle>
                <CardDescription>Utilisez l'un de ces comptes pour tester l'application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="UserCog" className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Compte Administrateur</h3>
                        <p className="text-sm text-muted-foreground">Accès complet à toutes les fonctionnalités</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-mono bg-muted p-1 rounded mt-1">ismail@mouyahada.fr</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mot de passe:</span>
                        <div className="font-mono bg-muted p-1 rounded mt-1">demo123</div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3"
                      onClick={() => {
                        setEmail("ismail@mouyahada.fr")
                        setPassword("demo123")
                        setActiveTab("login")
                      }}
                    >
                      <Icon name="Copy" className="mr-2 h-4 w-4" aria-hidden="true" />
                      Utiliser ces identifiants
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Icon name="User" className="h-5 w-5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Compte Client</h3>
                        <p className="text-sm text-muted-foreground">Accès limité aux projets du client</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Email:</span>
                        <div className="font-mono bg-muted p-1 rounded mt-1">marie.dupont@retailtech.com</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Mot de passe:</span>
                        <div className="font-mono bg-muted p-1 rounded mt-1">client123</div>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-3"
                      onClick={() => {
                        setEmail("marie.dupont@retailtech.com")
                        setPassword("client123")
                        setActiveTab("login")
                      }}
                    >
                      <Icon name="Copy" className="mr-2 h-4 w-4" aria-hidden="true" />
                      Utiliser ces identifiants
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-muted-foreground text-center">
                  Pour cette démo, n'importe quel mot de passe sera accepté pour les emails listés.
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            <Icon name="ArrowLeft" className="mr-1 h-3 w-3 inline" aria-hidden="true" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

