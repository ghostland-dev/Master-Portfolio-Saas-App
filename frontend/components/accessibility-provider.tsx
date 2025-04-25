"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type AccessibilityOptions = {
  dyslexiaMode: boolean
  colorBlindMode: string // "none", "protanopia", "deuteranopia", "tritanopia"
  highContrast: boolean
  reducedMotion: boolean
  fontSize: "normal" | "large" | "x-large"
  lineSpacing: "normal" | "increased" | "double"
}

type AccessibilityContextType = {
  options: AccessibilityOptions
  setDyslexiaMode: (enabled: boolean) => void
  setColorBlindMode: (mode: string) => void
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  setFontSize: (size: "normal" | "large" | "x-large") => void
  setLineSpacing: (spacing: "normal" | "increased" | "double") => void
  resetOptions: () => void
}

const defaultOptions: AccessibilityOptions = {
  dyslexiaMode: false,
  colorBlindMode: "none",
  highContrast: false,
  reducedMotion: false,
  fontSize: "normal",
  lineSpacing: "normal",
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [options, setOptions] = useLocalStorage<AccessibilityOptions>("accessibility-options", defaultOptions)

  // Apply accessibility classes to the document
  useEffect(() => {
    const root = document.documentElement

    // Dyslexia mode
    if (options.dyslexiaMode) {
      root.classList.add("dyslexia-friendly")
    } else {
      root.classList.remove("dyslexia-friendly")
    }

    // Color blind modes
    root.classList.remove("color-blind-protanopia", "color-blind-deuteranopia", "color-blind-tritanopia")
    if (options.colorBlindMode !== "none") {
      root.classList.add(`color-blind-${options.colorBlindMode}`)
    }

    // High contrast
    if (options.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Reduced motion
    if (options.reducedMotion) {
      root.classList.add("reduced-motion")
    } else {
      root.classList.remove("reduced-motion")
    }

    // Font size
    root.classList.remove("font-size-large", "font-size-x-large")
    if (options.fontSize !== "normal") {
      root.classList.add(`font-size-${options.fontSize}`)
    }

    // Line spacing
    root.classList.remove("line-spacing-increased", "line-spacing-double")
    if (options.lineSpacing !== "normal") {
      root.classList.add(`line-spacing-${options.lineSpacing}`)
    }
  }, [options])

  const setDyslexiaMode = (enabled: boolean) => {
    setOptions((prev) => ({ ...prev, dyslexiaMode: enabled }))
  }

  const setColorBlindMode = (mode: string) => {
    setOptions((prev) => ({ ...prev, colorBlindMode: mode }))
  }

  const setHighContrast = (enabled: boolean) => {
    setOptions((prev) => ({ ...prev, highContrast: enabled }))
  }

  const setReducedMotion = (enabled: boolean) => {
    setOptions((prev) => ({ ...prev, reducedMotion: enabled }))
  }

  const setFontSize = (size: "normal" | "large" | "x-large") => {
    setOptions((prev) => ({ ...prev, fontSize: size }))
  }

  const setLineSpacing = (spacing: "normal" | "increased" | "double") => {
    setOptions((prev) => ({ ...prev, lineSpacing: spacing }))
  }

  const resetOptions = () => {
    setOptions(defaultOptions)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        options,
        setDyslexiaMode,
        setColorBlindMode,
        setHighContrast,
        setReducedMotion,
        setFontSize,
        setLineSpacing,
        resetOptions,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider")
  }
  return context
}

