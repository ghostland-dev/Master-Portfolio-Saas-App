import type { IconName } from "@/components/ui/icon"

// Mapping des catégories aux icônes
export const categoryIcons: Record<string, IconName> = {
  web: "Globe",
  mobile: "Smartphone",
  devops: "Server",
  frontend: "Layout",
  backend: "Database",
  fullstack: "Layers",
  design: "Palette",
  cloud: "Cloud",
  database: "Database",
  ecommerce: "ShoppingCart",
  crm: "Users",
  automation: "Cog",
  dashboard: "BarChart",
  default: "Code",
}

// Mapping des statuts aux icônes
export const statusIcons: Record<string, IconName> = {
  "not-started": "Clock",
  "in-progress": "Loader",
  completed: "CheckCircle",
  delayed: "AlertTriangle",
  default: "Circle",
}

// Mapping des priorités aux icônes
export const priorityIcons: Record<string, IconName> = {
  low: "ArrowDown",
  medium: "Minus",
  high: "ArrowUp",
  default: "Circle",
}

// Fonction pour obtenir l'icône d'une catégorie
export function getCategoryIcon(category: string): IconName {
  return categoryIcons[category] || categoryIcons.default
}

// Fonction pour obtenir l'icône d'un statut
export function getStatusIcon(status: string): IconName {
  return statusIcons[status] || statusIcons.default
}

// Fonction pour obtenir l'icône d'une priorité
export function getPriorityIcon(priority: string): IconName {
  return priorityIcons[priority] || priorityIcons.default
}

// Fonction pour obtenir une icône aléatoire pour les tests
export function getRandomIcon(): IconName {
  const icons: IconName[] = [
    "Code",
    "Globe",
    "Server",
    "Database",
    "Layers",
    "ShoppingCart",
    "Users",
    "BarChart",
    "Smartphone",
  ]
  return icons[Math.floor(Math.random() * icons.length)]
}

