"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"
import { Icon } from "@/components/ui/icon"
import { useAuth } from "@/components/auth-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion, AnimatePresence } from "framer-motion"

const routes = [
  { name: "Accueil", path: "/", icon: "Home" },
  { name: "Services", path: "/services", icon: "Briefcase" },
  { name: "Portfolio", path: "/portfolio", icon: "FolderKanban" },
  { name: "Outils", path: "/tools", icon: "Wrench" },
  { name: "Compétences", path: "/skills", icon: "Award" },
  { name: "Contact", path: "/contact", icon: "Mail" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const pathname = usePathname()
  const { user, isLoggedIn, logout } = useAuth()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set active index based on current path
  useEffect(() => {
    const index = routes.findIndex((route) => route.path === pathname)
    setActiveIndex(index)
  }, [pathname])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
          : "bg-background",
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="font-bold text-xl">
            Ismail<span className="text-primary">MOUYAHADA</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 relative">
          {routes.map((route, index) => (
            <motion.div
              key={route.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setActiveIndex(index)}
              onHoverEnd={() => setActiveIndex(routes.findIndex((r) => r.path === pathname))}
            >
              <Link
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 py-1 px-2 rounded-md relative",
                  pathname === route.path ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon
                  name={route.icon as any}
                  size="sm"
                  variant={pathname === route.path ? "solid" : "outline"}
                  className={cn("transition-transform", pathname === route.path && "scale-110")}
                  aria-hidden="true"
                />
                {route.name}
                {index === activeIndex && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    layoutId="navbar-indicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden md:flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ModeToggle />
          <Button asChild variant="default" className="shadow-sm hover:shadow transition-all">
            <Link href="/appointment">
              <Icon name="Calendar" size="sm" className="mr-2" aria-hidden="true" /> Rendez-vous
            </Link>
          </Button>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 hover:bg-muted/50 transition-colors">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar} alt={user?.name || ""} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="max-w-[100px] truncate">{user?.name}</span>
                  <Icon name="ChevronDown" size="sm" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <Icon name="LayoutDashboard" className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Tableau de bord</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <Icon name="User" className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-500 focus:text-red-500">
                  <Icon name="LogOut" className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" asChild className="hover:bg-primary/10 transition-colors">
              <Link href="/login">
                <Icon name="LogIn" size="sm" className="mr-2" aria-hidden="true" /> Connexion
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="relative"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 absolute",
                  isOpen ? "rotate-45" : "-translate-y-1.5",
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300",
                  isOpen ? "opacity-0" : "opacity-100",
                )}
              />
              <span
                className={cn(
                  "w-5 h-0.5 bg-foreground rounded-full transition-all duration-300 absolute",
                  isOpen ? "-rotate-45" : "translate-y-1.5",
                )}
              />
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden fixed inset-0 top-16 z-50 bg-background border-t overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100vh - 4rem)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col p-6 space-y-1">
              {routes.map((route, index) => (
                <motion.div
                  key={route.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Link
                    href={route.path}
                    className={cn(
                      "text-lg font-medium py-3 px-4 transition-colors hover:text-primary flex items-center gap-3 rounded-lg",
                      pathname === route.path
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon
                      name={route.icon as any}
                      size="md"
                      variant={pathname === route.path ? "solid" : "outline"}
                      aria-hidden="true"
                    />
                    {route.name}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: routes.length * 0.05 }}
                >
                  <Button asChild className="w-full justify-center" size="lg">
                    <Link href="/appointment" onClick={() => setIsOpen(false)}>
                      <Icon name="Calendar" size="sm" className="mr-2" aria-hidden="true" /> Prendre rendez-vous
                    </Link>
                  </Button>
                </motion.div>

                {isLoggedIn ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: routes.length * 0.05 + 0.1 }}
                    >
                      <Button variant="outline" asChild className="w-full justify-center" size="lg">
                        <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                          <Icon name="LayoutDashboard" size="sm" className="mr-2" aria-hidden="true" /> Espace Client
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: routes.length * 0.05 + 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                        size="lg"
                        onClick={() => {
                          logout()
                          setIsOpen(false)
                        }}
                      >
                        <Icon name="LogOut" size="sm" className="mr-2" aria-hidden="true" /> Se déconnecter
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: routes.length * 0.05 + 0.1 }}
                  >
                    <Button variant="outline" asChild className="w-full justify-center" size="lg">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Icon name="LogIn" size="sm" className="mr-2" aria-hidden="true" /> Connexion
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

