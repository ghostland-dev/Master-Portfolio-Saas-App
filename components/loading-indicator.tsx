"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export function LoadingIndicator() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    // Add event listeners for route changes
    window.addEventListener("beforeunload", handleStart)
    document.addEventListener("page:transition:start", handleStart)
    document.addEventListener("page:transition:complete", handleComplete)

    return () => {
      window.removeEventListener("beforeunload", handleStart)
      document.removeEventListener("page:transition:start", handleStart)
      document.removeEventListener("page:transition:complete", handleComplete)
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium">Loading...</p>
      </div>
    </div>
  )
}

