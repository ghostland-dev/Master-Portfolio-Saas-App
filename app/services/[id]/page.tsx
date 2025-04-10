import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Service data
const services = [
  {
    id: "frontend",
    title: "Développement Front-End",
    description: "Création d'interfaces utilisateur modernes, réactives et intuitives",
    longDescription:
      "Je crée des interfaces utilisateur modernes et intuitives qui offrent une expérience utilisateur exceptionnelle. Mes solutions front-end sont optimisées pour les performances, l'accessibilité et la compatibilité avec tous les appareils.",
    image: "/images/services/frontend.jpg",
    color: "blue",
    features: [
      "Applications web réactives avec React et Vue.js",
      "Interfaces utilisateur intuitives et accessibles",
      "Optimisation des performances front-end",
      "Intégration d'APIs et de services tiers",
      "Développement responsive pour tous les appareils",
      "Animation et interactions utilisateur avancées",
    ],
    tools: [
      {
        name: "React",
        description: "Bibliothèque JavaScript pour créer des interfaces utilisateur",
        icon: "/images/tech/react.svg",
      },
      {
        name: "Vue.js",
        description: "Framework JavaScript progressif pour construire des interfaces utilisateur",
        icon: "/images/tech/vue.svg",
      },
      {
        name: "Next.js",
        description: "Framework React pour la production avec rendu côté serveur",
        icon: "/images/tech/nextjs.svg",
        darkIcon: "/images/tech/nextjs-dark.svg",
      },
      {
        name: "Tailwind CSS",
        description: "Framework CSS utilitaire pour créer des designs personnalisés",
        icon: "/images/tech/tailwind.svg",
      },
      {
        name: "TypeScript",
        description: "Superset JavaScript typé qui se compile en JavaScript",
        icon: "/images/tech/typescript.svg",
      },
      {
        name: "Framer Motion",
        description: "Bibliothèque d'animations pour React",
        icon: "/images/tech/framer-motion.svg",
      },
    ],
    projects: [
      {
        name: "Plateforme E-commerce",
        description: "Interface utilisateur moderne pour une boutique en ligne",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Application SaaS",
        description: "Dashboard interactif pour une application SaaS",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Site Vitrine",
        description: "Site vitrine responsive avec animations avancées",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "backend",
    title: "Développement Back-End",
    description: "Conception et développement d'APIs robustes et évolutives",
    longDescription:
      "Je développe des solutions back-end robustes, évolutives et sécurisées qui répondent aux besoins spécifiques de votre entreprise. Mes APIs sont conçues pour être performantes, faciles à maintenir et à faire évoluer.",
    image: "/images/services/backend.jpg",
    color: "green",
    features: [
      "Conception et développement d'APIs RESTful",
      "Architecture microservices",
      "Authentification et autorisation sécurisées",
      "Optimisation des performances et mise en cache",
      "Intégration avec des services tiers",
      "Tests automatisés et documentation d'API",
    ],
    tools: [
      {
        name: "Node.js",
        description: "Environnement d'exécution JavaScript côté serveur",
        icon: "/images/tech/nodejs.svg",
      },
      {
        name: "Express",
        description: "Framework web minimaliste pour Node.js",
        icon: "/images/tech/express.svg",
        darkIcon: "/images/tech/express-dark.svg",
      },
      {
        name: "NestJS",
        description: "Framework Node.js progressif pour construire des applications côté serveur",
        icon: "/images/tech/nestjs.svg",
      },
      { name: "GraphQL", description: "Langage de requête pour les APIs", icon: "/images/tech/graphql.svg" },
      {
        name: "Prisma",
        description: "ORM nouvelle génération pour Node.js et TypeScript",
        icon: "/images/tech/prisma.svg",
      },
      { name: "JWT", description: "Standard ouvert pour la création de tokens d'accès", icon: "/images/tech/jwt.svg" },
    ],
    projects: [
      {
        name: "API E-commerce",
        description: "API RESTful pour une plateforme e-commerce",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Système d'authentification",
        description: "Système d'authentification sécurisé avec JWT",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Microservices",
        description: "Architecture microservices pour une application d'entreprise",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Automatisation, CI/CD, containerisation et orchestration",
    longDescription:
      "J'implémente des pratiques DevOps modernes pour automatiser et optimiser vos processus de développement et de déploiement. Mes solutions DevOps vous permettent de livrer plus rapidement, plus fréquemment et avec une meilleure qualité.",
    image: "/images/services/devops.jpg",
    color: "purple",
    features: [
      "Mise en place de pipelines CI/CD",
      "Containerisation avec Docker",
      "Orchestration avec Kubernetes",
      "Infrastructure as Code (IaC)",
      "Monitoring et logging",
      "Gestion de la configuration et des secrets",
    ],
    tools: [
      { name: "Docker", description: "Plateforme de containerisation d'applications", icon: "/images/tech/docker.svg" },
      { name: "Kubernetes", description: "Système d'orchestration de containers", icon: "/images/tech/kubernetes.svg" },
      {
        name: "GitHub Actions",
        description: "Automatisation des workflows CI/CD",
        icon: "/images/tech/github-actions.svg",
      },
      { name: "Terraform", description: "Outil d'infrastructure as code", icon: "/images/tech/terraform.svg" },
      { name: "AWS", description: "Services cloud d'Amazon", icon: "/images/tech/aws.svg" },
      { name: "Prometheus", description: "Système de monitoring et d'alerte", icon: "/images/tech/prometheus.svg" },
    ],
    projects: [
      {
        name: "Pipeline CI/CD",
        description: "Pipeline CI/CD automatisé pour une application web",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Infrastructure Cloud",
        description: "Infrastructure cloud évolutive avec Terraform",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Monitoring",
        description: "Système de monitoring et d'alerte pour une application en production",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
  {
    id: "database",
    title: "Conception de Bases de Données",
    description: "Conception, optimisation et gestion de bases de données",
    longDescription:
      "Je conçois et optimise des bases de données pour garantir la performance, la sécurité et la scalabilité de vos applications. Mes solutions de base de données sont adaptées à vos besoins spécifiques et à votre volume de données.",
    image: "/images/services/database.jpg",
    color: "orange",
    features: [
      "Conception de schémas de base de données",
      "Optimisation des requêtes et des performances",
      "Migration et transformation de données",
      "Réplication et haute disponibilité",
      "Sauvegarde et récupération",
      "Sécurité et conformité des données",
    ],
    tools: [
      {
        name: "PostgreSQL",
        description: "Système de gestion de base de données relationnelle avancé",
        icon: "/images/tech/postgresql.svg",
      },
      { name: "MongoDB", description: "Base de données NoSQL orientée documents", icon: "/images/tech/mongodb.svg" },
      { name: "Redis", description: "Magasin de structure de données en mémoire", icon: "/images/tech/redis.svg" },
      {
        name: "MySQL",
        description: "Système de gestion de base de données relationnelle open-source",
        icon: "/images/tech/mysql.svg",
      },
      {
        name: "Elasticsearch",
        description: "Moteur de recherche et d'analyse distribué",
        icon: "/images/tech/elasticsearch.svg",
      },
      { name: "Supabase", description: "Alternative open source à Firebase", icon: "/images/tech/supabase.svg" },
    ],
    projects: [
      {
        name: "Optimisation de Base de Données",
        description: "Optimisation des performances d'une base de données PostgreSQL",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Migration de Données",
        description: "Migration d'une base de données relationnelle vers MongoDB",
        image: "/placeholder.svg?height=200&width=300",
      },
      {
        name: "Système de Cache",
        description: "Implémentation d'un système de cache avec Redis",
        image: "/placeholder.svg?height=200&width=300",
      },
    ],
  },
]

export async function generateMetadata({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    return {
      title: "Service non trouvé",
      description: "Le service demandé n'existe pas",
    }
  }

  return {
    title: `${service.title} | Portfolio de Développeur Web Full-Stack`,
    description: service.description,
  }
}

export default function ServicePage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id)

  if (!service) {
    notFound()
  }

  const colorClasses = {
    blue: "bg-blue-500 text-white",
    green: "bg-green-500 text-white",
    purple: "bg-purple-500 text-white",
    orange: "bg-orange-500 text-white",
  }

  const bgColorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20",
    green: "bg-green-50 dark:bg-green-900/20",
    purple: "bg-purple-50 dark:bg-purple-900/20",
    orange: "bg-orange-50 dark:bg-orange-900/20",
  }

  const borderColorClasses = {
    blue: "border-blue-200 dark:border-blue-800",
    green: "border-green-200 dark:border-green-800",
    purple: "border-purple-200 dark:border-purple-800",
    orange: "border-orange-200 dark:border-orange-800",
  }

  const textColorClasses = {
    blue: "text-blue-700 dark:text-blue-300",
    green: "text-green-700 dark:text-green-300",
    purple: "text-purple-700 dark:text-purple-300",
    orange: "text-orange-700 dark:text-orange-300",
  }

  return (
    <main className="min-h-screen py-12">
      <div className="container px-4 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/services" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux services
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Badge className={`mb-4 ${colorClasses[service.color as keyof typeof colorClasses]}`}>{service.id}</Badge>
              <h1 className="text-4xl font-bold mb-4">{service.title}</h1>
              <p className="text-xl text-muted-foreground mb-6">{service.longDescription}</p>
              <Button asChild className={colorClasses[service.color as keyof typeof colorClasses]}>
                <Link href="/contact" className="flex items-center">
                  Discuter de votre projet
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={service.image || "/placeholder.svg?height=300&width=600"}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div
          className={`p-8 rounded-lg mb-12 ${bgColorClasses[service.color as keyof typeof bgColorClasses]} ${borderColorClasses[service.color as keyof typeof borderColorClasses]} border`}
        >
          <h2 className="text-2xl font-bold mb-6">Caractéristiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {service.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle
                  className={`h-5 w-5 mt-0.5 ${textColorClasses[service.color as keyof typeof textColorClasses]}`}
                />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Outils et technologies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {service.tools.map((tool, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="relative h-16 w-16 mb-4">
                    {tool.darkIcon ? (
                      <>
                        <Image
                          src={tool.icon || "/placeholder.svg"}
                          alt={tool.name}
                          fill
                          className="object-contain dark:hidden"
                        />
                        <Image
                          src={tool.darkIcon || "/placeholder.svg"}
                          alt={tool.name}
                          fill
                          className="object-contain hidden dark:block"
                        />
                      </>
                    ) : (
                      <Image src={tool.icon || "/placeholder.svg"} alt={tool.name} fill className="object-contain" />
                    )}
                  </div>
                  <h3 className="font-medium mb-1">{tool.name}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Projets réalisés</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image src={project.image || "/placeholder.svg"} alt={project.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{project.name}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="my-12" />

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Discutons de vos besoins spécifiques et voyons comment je peux vous aider à atteindre vos objectifs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className={colorClasses[service.color as keyof typeof colorClasses]}>
              <Link href="/contact">
                Prendre contact
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/portfolio">Voir mes réalisations</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

