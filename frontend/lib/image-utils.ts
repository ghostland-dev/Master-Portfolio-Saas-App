export function getImagePlaceholder(width: number, height: number, text?: string) {
  return `/placeholder.svg?width=${width}&height=${height}${text ? `&text=${encodeURIComponent(text)}` : ""}`
}

export function getResponsiveImageSizes() {
  return {
    xs: "(max-width: 640px) 100vw, 640px",
    sm: "(max-width: 768px) 100vw, 768px",
    md: "(max-width: 1024px) 100vw, 1024px",
    lg: "(max-width: 1280px) 100vw, 1280px",
    xl: "(max-width: 1536px) 100vw, 1536px",
    full: "100vw",
  }
}

export function getAspectRatioClass(ratio: string) {
  const ratios = {
    "1:1": "aspect-square",
    "4:3": "aspect-4/3",
    "16:9": "aspect-video",
    "21:9": "aspect-[21/9]",
  }

  return ratios[ratio as keyof typeof ratios] || "aspect-auto"
}

