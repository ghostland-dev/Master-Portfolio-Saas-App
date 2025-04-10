"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertOctagon, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
        <AlertOctagon className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Une erreur est survenue</h1>
      <p className="text-muted-foreground max-w-md mb-8">
        Nous sommes désolés, une erreur inattendue s'est produite. Veuillez réessayer ou revenir à la page d'accueil.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={() => reset()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  )
}

