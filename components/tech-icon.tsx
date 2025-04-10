"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { getTechnologyIconUrl } from "@/lib/simple-icons-utils"

interface TechIconProps {
  name: string
  size?: number
  className?: string
  fallbackIcon?: React.ReactNode
}

export function TechIcon({ name, size = 24, className = "", fallbackIcon }: TechIconProps) {
  const [error, setError] = useState(false)
  const iconUrl = getTechnologyIconUrl(name)

  if (error || !iconUrl) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        {fallbackIcon || name.charAt(0)}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={iconUrl || "/placeholder.svg"}
        alt={`${name} icon`}
        width={size}
        height={size}
        className="object-contain"
        onError={() => setError(true)}
      />
    </div>
  )
}

