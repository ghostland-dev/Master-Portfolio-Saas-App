import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { inter, poppins } from "@/lib/font-utils"
import { LoadingIndicator } from "@/components/loading-indicator"

const interFont = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ismail MOUYAHADA - DevOps & Full-Stack Developer",
  description: "Portfolio professionnel d'Ismail MOUYAHADA, expert en DevOps et développement Full-Stack",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            {/* LoadingIndicator moved here to ensure it's in the body */}
            <LoadingIndicator />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'