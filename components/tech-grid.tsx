import { TechCard } from "@/components/tech-card"

interface Technology {
  name: string
  description?: string
}

interface TechGridProps {
  technologies: Technology[]
  className?: string
  iconSize?: number
}

export function TechGrid({ technologies, className, iconSize }: TechGridProps) {
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ${className || ""}`}>
      {technologies.map((tech) => (
        <TechCard key={tech.name} name={tech.name} description={tech.description} iconSize={iconSize} />
      ))}
    </div>
  )
}

