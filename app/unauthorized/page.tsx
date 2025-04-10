"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function UnauthorizedPage() {
  const searchParams = useSearchParams()
  const redirectPath = searchParams?.get("redirect") || "/dashboard"

  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-16rem)] py-12 text-center">
      <div className="flex flex-col items-center max-w-md">
        <div className="rounded-full bg-red-100 dark:bg-red-900/20 p-4 mb-4">
          <Icon name="ShieldAlert" className="h-12 w-12 text-red-500" aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight mb-2">Accès non autorisé</h1>

        <p className="text-muted-foreground mb-6">
          Vous devez être connecté pour accéder à cette page. Veuillez vous connecter pour continuer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href={`/login?redirect=${encodeURIComponent(redirectPath)}&unauthorized=true`}>
              <Icon name="LogIn" className="mr-2 h-5 w-5" aria-hidden="true" />
              Se connecter
            </Link>
          </Button>

          <Button variant="outline" asChild size="lg">
            <Link href="/">
              <Icon name="Home" className="mr-2 h-5 w-5" aria-hidden="true" />
              Retour à l'accueil
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

