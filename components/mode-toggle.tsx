"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Icon } from "@/components/ui/icon"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { useState, useEffect } from "react"

export function ModeToggle({ variant = "dropdown" }: { variant?: "dropdown" | "switch" | "icon" }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Effet pour s'assurer que le composant est monté côté client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Si le composant n'est pas encore monté côté client, afficher un placeholder
  if (!mounted) {
    return <div className="w-9 h-9"></div>
  }

  if (variant === "switch") {
    return (
      <div className="flex items-center gap-2">
        <Icon name="Sun" className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="theme-switch"
          aria-label="Basculer entre le mode clair et sombre"
        >
          <span className="theme-switch-thumb" />
        </Switch>
        <Icon name="Moon" className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
    )
  }

  if (variant === "icon") {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Basculer entre le mode clair et sombre"
            >
              <Icon
                name="Sun"
                className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
                aria-hidden="true"
              />
              <Icon
                name="Moon"
                className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
                aria-hidden="true"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="custom-tooltip">
            {theme === "dark" ? "Passer au mode clair" : "Passer au mode sombre"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Changer de thème">
          <Icon
            name="Sun"
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
            aria-hidden="true"
          />
          <Icon
            name="Moon"
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
            aria-hidden="true"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex items-center gap-2">
          <Icon name="Sun" size="sm" aria-hidden="true" /> Mode clair
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
          <Icon name="Moon" size="sm" aria-hidden="true" /> Mode sombre
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex items-center gap-2">
          <Icon name="Laptop" size="sm" aria-hidden="true" /> Système
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

