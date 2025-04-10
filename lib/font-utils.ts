import { Inter, Poppins, Lexend } from "next/font/google"
import localFont from "next/font/local"

// Polices standard
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
})

export const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
})

// Police pour dyslexie
export const openDyslexic = localFont({
  src: [
    {
      path: "../public/fonts/OpenDyslexic-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/OpenDyslexic-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-open-dyslexic",
})

