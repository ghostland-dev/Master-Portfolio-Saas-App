import type React from "react"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"

export type IconName = keyof typeof LucideIcons
export type IconSize = "xs" | "sm" | "md" | "lg" | "xl"
export type IconVariant = "default" | "outline" | "solid" | "muted"

const sizeClasses: Record<IconSize, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
}

const variantClasses: Record<IconVariant, string> = {
  default: "text-foreground",
  outline: "text-muted-foreground",
  solid: "text-primary",
  muted: "text-muted-foreground opacity-70",
}

export interface IconProps extends React.SVGAttributes<SVGElement> {
  name: IconName
  size?: IconSize
  variant?: IconVariant
  className?: string
  "aria-hidden"?: boolean
  "aria-label"?: string
}

export function Icon({
  name,
  size = "md",
  variant = "default",
  className,
  "aria-hidden": ariaHidden,
  "aria-label": ariaLabel,
  ...props
}: IconProps) {
  const LucideIcon = LucideIcons[name]

  // Vérifier si l'icône existe
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found in Lucide icons`)
    // Utiliser une icône par défaut ou retourner null
    return (
      <LucideIcons.HelpCircle
        className={cn(sizeClasses[size], variantClasses[variant], className)}
        aria-hidden="true"
        {...props}
      />
    )
  }

  // Déterminer si l'icône est décorative ou informative
  const isDecorative = ariaHidden || (!ariaLabel && !props["aria-labelledby"])

  return (
    <LucideIcon
      className={cn(sizeClasses[size], variantClasses[variant], className)}
      aria-hidden={isDecorative ? "true" : undefined}
      aria-label={!isDecorative ? ariaLabel : undefined}
      {...props}
    />
  )
}

// Composant pour afficher une icône avec un texte
export interface IconTextProps {
  name: IconName
  text: string
  size?: IconSize
  variant?: IconVariant
  iconClassName?: string
  textClassName?: string
  className?: string
}

export function IconText({
  name,
  text,
  size = "md",
  variant = "default",
  iconClassName,
  textClassName,
  className,
}: IconTextProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon name={name} size={size} variant={variant} className={iconClassName} aria-hidden="true" />
      <span className={cn("text-sm", textClassName)}>{text}</span>
    </div>
  )
}

// Composant pour afficher une icône avec un badge
export interface IconBadgeProps {
  name: IconName
  size?: IconSize
  variant?: IconVariant
  badgeContent?: React.ReactNode
  badgeClassName?: string
  className?: string
  "aria-label"?: string
}

export function IconBadge({
  name,
  size = "md",
  variant = "default",
  badgeContent,
  badgeClassName,
  className,
  "aria-label": ariaLabel,
}: IconBadgeProps) {
  return (
    <div className={cn("relative inline-flex", className)}>
      <Icon name={name} size={size} variant={variant} aria-label={ariaLabel} />
      {badgeContent && (
        <span
          className={cn(
            "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground",
            badgeClassName,
          )}
        >
          {badgeContent}
        </span>
      )}
    </div>
  )
}

