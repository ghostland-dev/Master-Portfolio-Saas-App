"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Icon } from "@/components/ui/icon"
import { getCategoryIcon } from "@/lib/icon-utils"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  main_image?: string
  images: string[]
  type: string
  technologies: string[]
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    fetch("http://localhost:8055/items/projects")
      .then((res) => res.json())
      .then((res) => {
        const formatted = (res.data || []).map((item: Project) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          main_image:  item.main_image, // fallback or construct from item.main_image
          type: item.type?.[0] || "web", // assume first type
          technologies: ["React", "Node.js", "MongoDB"], // placeholder, adjust if real data is available
        }))
        setProjects(formatted)
      })
  }, [])

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">Portfolio</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Découvrez mes projets récents et les technologies que j&apos;utilise
        </p>
      </div>

      <Tabs defaultValue="all" className="mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center gap-1.5">
              <Icon name="Grid" size="sm" /> Tous
            </TabsTrigger>
            <TabsTrigger value="web" className="flex items-center gap-1.5">
              <Icon name="Globe" size="sm" /> Web
            </TabsTrigger>
            <TabsTrigger value="mobile" className="flex items-center gap-1.5">
              <Icon name="Smartphone" size="sm" /> Mobile
            </TabsTrigger>
            <TabsTrigger value="devops" className="flex items-center gap-1.5">
              <Icon name="Server" size="sm" /> DevOps
            </TabsTrigger>
          </TabsList>
        </div>

        {["all", "web", "mobile", "devops"].map((tab) => (
          <TabsContent value={tab} key={tab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects
                .filter((p) => tab === "all" || p.type === tab)
                .map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const typeIcon = getCategoryIcon(project.type)

  return (
    <Card className="overflow-hidden group">
      <div className="relative h-64 w-full">
        <div className="absolute top-4 right-4 z-10">
          <Badge className="flex items-center gap-1.5 bg-background/80 backdrop-blur-sm">
            <Icon name={typeIcon} size="xs" />
            {project.type}
          </Badge>
        </div>
        <Image
          src={'http://localhost:8055/assets/'+project.main_image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <Icon name={typeIcon} size="sm" variant="solid" />
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </div>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <Badge key={index} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/portfolio/${project.id}`}>
            Voir le projet
            <Icon name="ArrowRight" size="sm" className="ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
