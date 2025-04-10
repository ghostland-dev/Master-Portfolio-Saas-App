import { TechIcon } from "@/components/tech-icon"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface TechCardProps {
  name: string
  description?: string
  className?: string
  iconSize?: number
}

export function TechCard({ name, description, className, iconSize = 48 }: TechCardProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all hover:shadow-md dark:hover:shadow-slate-700/30",
        className,
      )}
    >
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="mb-4">
          <TechIcon name={name} size={iconSize} className="text-primary dark:text-primary-foreground" />
        </div>
        <h3 className="text-center font-medium">{name}</h3>
        {description && <p className="mt-2 text-center text-sm text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}

