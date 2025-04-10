"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState, useRef } from "react"
import { ModeToggle } from "@/components/mode-toggle"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, logout, isLoading, refreshAuth } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const authCheckedRef = useRef(false)

  // Effet pour s'assurer que le composant est monté côté client
  useEffect(() => {
    setMounted(true)

    // Vérifier l'authentification au montage du composant, mais une seule fois
    if (!authCheckedRef.current) {
      authCheckedRef.current = true
      const isLoggedIn = refreshAuth()

      if (!isLoggedIn) {
        console.log("Utilisateur non authentifié, redirection vers la page de connexion")
        router.push(`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}&unauthorized=true`)
      }
    }
  }, []) // Dépendances vides pour n'exécuter qu'au montage

  // Si le composant n'est pas encore monté côté client, afficher un placeholder
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dashboard-layout">
        <div className="flex items-center gap-2">
          <Icon name="Loader2" className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-lg">Initialisation...</span>
        </div>
      </div>
    )
  }

  // Si l'authentification est en cours, afficher un indicateur de chargement
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dashboard-layout">
        <div className="flex items-center gap-2">
          <Icon name="Loader2" className="h-6 w-6 animate-spin" aria-hidden="true" />
          <span className="text-lg">Chargement de votre espace...</span>
        </div>
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté, afficher un message et un bouton de connexion
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center dashboard-layout">
        <div className="flex flex-col items-center gap-4">
          <Icon name="ShieldAlert" className="h-12 w-12 text-red-500" aria-hidden="true" />
          <span className="text-xl">Accès non autorisé</span>
          <p className="text-muted-foreground text-center max-w-md">
            Vous devez être connecté pour accéder à cette page.
          </p>
          <Button asChild className="mt-4">
            <Link href={`/login?redirect=${encodeURIComponent(pathname || "/dashboard")}&unauthorized=true`}>
              <Icon name="LogIn" size="sm" className="mr-2" aria-hidden="true" />
              Se connecter
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Navigation pour l'administrateur
  const adminNavItems = [
    { name: "Vue d'ensemble", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "Projets", path: "/dashboard/projects", icon: "Briefcase" },
    { name: "Messages", path: "/dashboard/messages", icon: "Mail" },
    { name: "Clients", path: "/dashboard/clients", icon: "Users" },
    { name: "Factures", path: "/dashboard/invoices", icon: "Receipt" },
    { name: "Analytiques", path: "/dashboard/analytics", icon: "BarChart" },
    { name: "Rapports", path: "/dashboard/reports", icon: "FileText" },
    { name: "Support", path: "/dashboard/support", icon: "LifeBuoy" },
    { name: "Fichiers", path: "/dashboard/files", icon: "FolderOpen" },
  ]

  // Navigation pour le client
  const clientNavItems = [
    { name: "Vue d'ensemble", path: "/dashboard", icon: "LayoutDashboard" },
    { name: "Mes projets", path: "/dashboard/projects", icon: "Briefcase" },
    { name: "Messages", path: "/dashboard/messages", icon: "Mail" },
    { name: "Factures", path: "/dashboard/invoices", icon: "Receipt" },
    { name: "Support", path: "/dashboard/support", icon: "LifeBuoy" },
    { name: "Fichiers", path: "/dashboard/files", icon: "FolderOpen" },
  ]

  // Sélectionner les éléments de navigation
  const navItems = isAdmin ? adminNavItems : clientNavItems

  return (
    <div className="flex min-h-screen flex-col dashboard-layout">
      <div className="sticky top-16 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-14 items-center px-4">
          <ScrollArea className="flex-1">
            <div className="flex items-center gap-4 lg:gap-6 pb-2">
              <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <Icon name="LayoutDashboard" size="sm" aria-hidden="true" />
                <span>Espace Client</span>
              </Link>
              <Separator orientation="vertical" className="h-6" />
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 whitespace-nowrap",
                    pathname === item.path ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon
                    name={item.icon as any}
                    size="sm"
                    variant={pathname === item.path ? "solid" : "outline"}
                    className="transition-all duration-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </ScrollArea>
          <div className="ml-auto flex items-center gap-2">
            <ModeToggle variant="icon" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} alt={user?.name || ""} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <Icon name="User" className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Mon profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Icon name="Settings" className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Paramètres</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <Icon name="LogOut" className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" asChild>
              <Link href="/">
                <Icon name="ArrowLeft" size="sm" className="mr-2" aria-hidden="true" />
                Retour au site
              </Link>
            </Button>
          </div>
        </nav>
      </div>
      <main className="flex-1">{children}</main>
    </div>
  )
}

