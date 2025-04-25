"use client"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

type Project = {
  id: string
  title: string
  client: string
  date: string
  description: string
  longDescription: string
  challenge: string
  solution: string
  results: string
  technologies: string[]
  categories: string[]
  images: string[]
  testimonial: {
    text: string
    author: string
    position: string
  }
  liveUrl?: string | null
  githubUrl?: string | null
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [project, setProject] = useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetch(`http://localhost:8055/items/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        const p = data.data
        const formattedProject: Project = {
          id: p.id,
          title: p.title,
          client: p.client || "Client inconnu",
          date: new Date(p.start_date).getFullYear().toString(),
          description: p.description,
          longDescription: p.long_description || "",
          challenge: p.challenge || "",
          solution: p.solution || "",
          results: p.results || "",
          technologies: p.technologies || [],
          categories: p.type || [],
          images: p.images?.map((imgId: number) => `/images/project${imgId % 4 + 1}.jpeg`) || [],
          testimonial: {
            text: p.testimonial_text || "",
            author: p.testimonial_author || "",
            position: p.testimonial_position || ""
          },
          liveUrl: p.live_url || null,
          githubUrl: p.github_url || null
        }
        setProject(formattedProject)
        setError(null)
      })
      .catch(() => setError("Impossible de charger le projet. Veuillez réessayer plus tard."))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center animate-pulse">
        <Loader2 className="mx-auto mb-6 h-10 w-10 animate-spin text-primary" />
        <p className="text-muted-foreground text-lg">Chargement du projet en cours...</p>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Erreur</h1>
        <p className="mb-8 text-muted-foreground">{error || "Le projet que vous recherchez n'existe pas ou a été déplacé."}</p>
        <Button asChild>
          <Link href="/portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au portfolio
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/portfolio"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-xl text-muted-foreground mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-4 mb-8">
            {project.liveUrl && (
              <Button asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="mr-2 h-4 w-4" /> Voir le site
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <ArrowRight className="mr-2 h-4 w-4" /> Code source
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Informations</h3>
              <p><strong>Client :</strong> {project.client}</p>
              <p><strong>Date :</strong> {project.date}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-12">
        <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
          <Image
            src={project.images[activeImageIndex] || "/placeholder.svg"}
            alt={`${project.title} - Image ${activeImageIndex + 1}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {project.images.map((image, index) => (
            <div
              key={index}
              className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 ${
                index === activeImageIndex ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
            
              <Image
                src={image || "/placeholder.svg"}
                alt={`${project.title} - Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="text-center py-8 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Vous avez un projet similaire en tête ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Je serais ravi de discuter de votre projet et de voir comment je peux vous aider à le réaliser.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/appointment">
              <ArrowLeft className="mr-2 h-4 w-4" /> Prendre rendez-vous
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">
              <ArrowLeft className="mr-2 h-4 w-4" /> Contactez-moi
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}