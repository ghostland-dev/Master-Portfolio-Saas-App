"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Database,
  BarChart,
  Server,
  Shield,
  Cpu,
  Cloud,
  Layers,
  ArrowRight,
  CheckCircle,
  FileText,
  Zap,
  GitBranch,
  Settings,
  Search,
  PieChart,
  Clock,
  ChevronRight,
} from "lucide-react"
import { TechGrid } from "@/components/tech-grid"
import { Badge } from "@/components/ui/badge"
import { TechIcon } from "@/components/tech-icon"

// Données des technologies par catégorie
const technologies = {
  frontend: [
    { name: "React", description: "A JavaScript library for building user interfaces" },
    { name: "Vue.js", description: "Progressive JavaScript framework" },
    { name: "Next.js", description: "React framework for production" },
    { name: "Nuxt.js", description: "Vue framework for production" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "Material UI", description: "React UI framework" },
    { name: "Styled Components", description: "CSS-in-JS styling" },
    { name: "Framer Motion", description: "Animation library for React" },
    { name: "TypeScript", description: "Typed JavaScript" },
    { name: "Redux", description: "State management for JavaScript" },
  ],
  backend: [
    { name: "Node.js", description: "JavaScript runtime" },
    { name: "Express", description: "Web framework for Node.js" },
    { name: "NestJS", description: "Progressive Node.js framework" },
    { name: "Django", description: "Python web framework" },
    { name: "GraphQL", description: "API query language" },
    { name: "REST API", description: "RESTful architecture" },
    { name: "JWT", description: "JSON Web Tokens" },
    { name: "Socket.IO", description: "Real-time communication" },
    { name: "Swagger", description: "API documentation" },
    { name: "Prisma", description: "Next-generation ORM" },
  ],
  devops: [
    { name: "Docker", description: "Containerization platform" },
    { name: "Kubernetes", description: "Container orchestration" },
    { name: "GitHub Actions", description: "CI/CD automation" },
    { name: "Jenkins", description: "Automation server" },
    { name: "AWS", description: "Cloud computing services" },
    { name: "Google Cloud", description: "Cloud platform" },
    { name: "Terraform", description: "Infrastructure as code" },
    { name: "Ansible", description: "IT automation" },
    { name: "Prometheus", description: "Monitoring system" },
    { name: "Grafana", description: "Observability platform" },
  ],
  database: [
    { name: "PostgreSQL", description: "Relational database" },
    { name: "MySQL", description: "Relational database" },
    { name: "MariaDB", description: "Relational database" },
    { name: "SQL Server", description: "Microsoft's RDBMS" },
    { name: "MongoDB", description: "NoSQL database" },
    { name: "Redis", description: "In-memory data store" },
    { name: "Elasticsearch", description: "Search engine" },
    { name: "Firebase", description: "App development platform" },
    { name: "Supabase", description: "Open source Firebase alternative" },
    { name: "DynamoDB", description: "NoSQL database service" },
  ],
}

// Données des services
const services = [
  {
    id: "frontend",
    title: "Développement Front-End",
    description: "Création d'interfaces utilisateur modernes, réactives et intuitives",
    icon: <Code className="h-10 w-10" />,
    color: "blue",
    features: [
      "Applications web réactives avec React et Vue.js",
      "Interfaces utilisateur intuitives et accessibles",
      "Optimisation des performances front-end",
      "Intégration d'APIs et de services tiers",
      "Développement responsive pour tous les appareils",
      "Animation et interactions utilisateur avancées",
    ],
    useCases: [
      {
        title: "Applications web complexes",
        description: "Interfaces riches et interactives avec gestion d'état complexe",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        title: "Sites web haute performance",
        description: "Sites optimisés pour le SEO et les temps de chargement",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        title: "Interfaces utilisateur avancées",
        description: "Expériences utilisateur riches avec animations et transitions",
        icon: <Layers className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "backend",
    title: "Développement Back-End",
    description: "Conception et développement d'APIs robustes et évolutives",
    icon: <Server className="h-10 w-10" />,
    color: "green",
    features: [
      "Conception et développement d'APIs RESTful",
      "Architecture microservices",
      "Authentification et autorisation sécurisées",
      "Optimisation des performances et mise en cache",
      "Intégration avec des services tiers",
      "Tests automatisés et documentation d'API",
    ],
    useCases: [
      {
        title: "APIs évolutives",
        description: "Services backend capables de gérer des charges importantes",
        icon: <Server className="h-5 w-5" />,
      },
      {
        title: "Microservices",
        description: "Architecture distribuée pour des applications complexes",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        title: "Systèmes sécurisés",
        description: "Protection des données et authentification robuste",
        icon: <Shield className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Automatisation, CI/CD, containerisation et orchestration",
    icon: <Settings className="h-10 w-10" />,
    color: "purple",
    features: [
      "Mise en place de pipelines CI/CD",
      "Containerisation avec Docker",
      "Orchestration avec Kubernetes",
      "Infrastructure as Code (IaC)",
      "Monitoring et logging",
      "Gestion de la configuration et des secrets",
    ],
    useCases: [
      {
        title: "Automatisation du déploiement",
        description: "Pipelines CI/CD pour des déploiements fréquents et fiables",
        icon: <Settings className="h-5 w-5" />,
      },
      {
        title: "Infrastructure cloud",
        description: "Gestion d'infrastructures évolutives et résilientes",
        icon: <Cloud className="h-5 w-5" />,
      },
      {
        title: "Intégration continue",
        description: "Tests automatisés et validation du code en continu",
        icon: <GitBranch className="h-5 w-5" />,
      },
    ],
  },
  {
    id: "database",
    title: "Conception de Bases de Données",
    description: "Conception, optimisation et gestion de bases de données",
    icon: <Database className="h-10 w-10" />,
    color: "orange",
    features: [
      "Conception de schémas de base de données",
      "Optimisation des requêtes et des performances",
      "Migration et transformation de données",
      "Réplication et haute disponibilité",
      "Sauvegarde et récupération",
      "Sécurité et conformité des données",
    ],
    useCases: [
      {
        title: "Bases de données à haute performance",
        description: "Optimisation pour des charges de travail intensives",
        icon: <Database className="h-5 w-5" />,
      },
      {
        title: "Systèmes distribués",
        description: "Solutions de stockage de données évolutives et résilientes",
        icon: <Layers className="h-5 w-5" />,
      },
      {
        title: "Analyse de données",
        description: "Structures optimisées pour l'analyse et le reporting",
        icon: <BarChart className="h-5 w-5" />,
      },
    ],
  },
]

// Données des outils
const tools = [
  {
    id: "tech-selector",
    title: "Sélecteur de Technologies",
    description: "Trouvez la stack technologique idéale pour votre projet",
    image: "/images/tools/tech-selector.jpg",
    badge: "Nouveau",
    badgeColor: "purple",
    icon: <Search className="h-5 w-5" />,
    features: [
      {
        title: "Recommandations personnalisées",
        description:
          "Obtenez des recommandations de technologies adaptées à votre type de projet, vos priorités et vos contraintes.",
        icon: <PieChart className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />,
      },
      {
        title: "Comparaison de stacks alternatives",
        description: "Comparez différentes options technologiques pour faire le meilleur choix pour votre projet.",
        icon: <Layers className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />,
      },
    ],
    link: "/tools/technology-selector",
  },
  {
    id: "performance-calculator",
    title: "Calculateur de Performance",
    description: "Estimez les performances de votre application",
    image: "/images/tools/performance-calc.jpg",
    badge: "Populaire",
    badgeColor: "blue",
    icon: <Clock className="h-5 w-5" />,
    features: [
      {
        title: "Estimation des temps de réponse",
        description: "Obtenez des estimations précises des temps de réponse et du débit de votre application.",
        icon: <Clock className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />,
      },
      {
        title: "Recommandations d'optimisation",
        description: "Recevez des suggestions concrètes pour améliorer les performances de votre application.",
        icon: <Zap className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />,
      },
    ],
    link: "/tools/performance-calculator",
  },
  {
    id: "devops-checklist",
    title: "Checklist DevOps",
    description: "Évaluez vos pratiques DevOps",
    image: "/images/tools/devops-checklist.jpg",
    badge: "Essentiel",
    badgeColor: "green",
    icon: <FileText className="h-5 w-5" />,
    features: [
      {
        title: "Évaluation de maturité DevOps",
        description: "Mesurez votre niveau de maturité DevOps et identifiez les axes d'amélioration.",
        icon: <FileText className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />,
      },
      {
        title: "Recommandations personnalisées",
        description: "Obtenez des recommandations adaptées à votre contexte et à vos objectifs.",
        icon: <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />,
      },
    ],
    link: "/tools/devops-checklist",
  },
  {
    id: "project-planner",
    title: "Planificateur de Projet",
    description: "Planifiez et suivez vos projets de développement",
    image: "/images/tools/project-planner.jpg",
    badge: "Nouveau",
    badgeColor: "amber",
    icon: <FileText className="h-5 w-5" />,
    features: [
      {
        title: "Diagramme de Gantt interactif",
        description: "Visualisez et gérez facilement le calendrier de votre projet.",
        icon: <BarChart className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />,
      },
      {
        title: "Gestion des ressources",
        description: "Attribuez des ressources et suivez leur utilisation tout au long du projet.",
        icon: <Cpu className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />,
      },
    ],
    link: "/tools/project-planner",
  },
]

// Composant pour les badges colorés
const ColoredBadge = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    purple:
      "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    orange:
      "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    amber: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  }

  return <Badge className={colorClasses[color as keyof typeof colorClasses]}>{children}</Badge>
}

// Composant pour les icônes colorées
const ColoredIconWrapper = ({ children, color }: { children: React.ReactNode; color: string }) => {
  const colorClasses = {
    blue: "text-blue-500 dark:text-blue-400",
    green: "text-green-500 dark:text-green-400",
    purple: "text-purple-500 dark:text-purple-400",
    orange: "text-orange-500 dark:text-orange-400",
    amber: "text-amber-500 dark:text-amber-400",
  }

  return <div className={colorClasses[color as keyof typeof colorClasses]}>{children}</div>
}

// Composant pour les cartes de service
const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <div className={`h-2 bg-${service.color}-500`} />
      <CardHeader className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-3">
              <ColoredBadge color={service.color}>{service.id}</ColoredBadge>
            </div>
            <CardTitle className="text-2xl font-bold">{service.title}</CardTitle>
          </div>
          <ColoredIconWrapper color={service.color}>{service.icon}</ColoredIconWrapper>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">{service.description}</p>
        <h4 className="font-semibold mb-3">Caractéristiques</h4>
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className={`h-5 w-5 text-${service.color}-500 flex-shrink-0 mt-0.5`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className={`w-full bg-${service.color}-500 hover:bg-${service.color}-600`}>
          <Link href={`/services/${service.id}`} className="flex items-center justify-center">
            En savoir plus
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Composant pour les cartes d'outil
const ToolCard = ({ tool }: { tool: (typeof tools)[0] }) => {
  return (
    <Card className="overflow-hidden group border-0 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="relative h-48">
        <Image
          src={tool.image || "/placeholder.svg"}
          alt={tool.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-6">
          <Badge className={`bg-${tool.badgeColor}-500 text-white border-none mb-2 self-start`}>{tool.badge}</Badge>
          <h3 className="text-white text-xl font-bold">{tool.title}</h3>
          <p className="text-white/80 mt-1 text-sm">{tool.description}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          {tool.features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 p-3 rounded-lg bg-${tool.badgeColor}-50 dark:bg-${tool.badgeColor}-900/20`}
            >
              {feature.icon}
              <div>
                <h4 className="font-medium text-sm">{feature.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-6 px-6">
        <Button asChild variant="outline" className="w-full">
          <Link href={tool.link}>
            Explorer l'outil
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Animations pour Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ServicesClientPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary/20 to-primary/5 blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 py-1.5 px-4 text-sm">
              Services professionnels
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300">
              Solutions technologiques sur mesure
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Une gamme complète de services couvrant l'ensemble du cycle de vie des projets informatiques, de la
              conception à la mise en production.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Discuter de mon projet
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-180%] transition-transform duration-1000" />
              </Button>
              <Button size="lg" variant="outline">
                Voir les projets réalisés
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes services</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Des solutions complètes pour répondre à tous vos besoins de développement web et d'infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Showcase */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technologies maîtrisées</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Une expertise approfondie dans un large éventail de technologies modernes pour répondre à tous vos besoins
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-5 mb-8">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="frontend">Front-End</TabsTrigger>
              <TabsTrigger value="backend">Back-End</TabsTrigger>
              <TabsTrigger value="devops">DevOps</TabsTrigger>
              <TabsTrigger value="database">Données</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4">
                {[...technologies.frontend, ...technologies.backend, ...technologies.devops, ...technologies.database]
                  .slice(0, 24)
                  .map((tech, index) => (
                    <div
                      key={index}
                      className="bg-white dark:bg-slate-800 rounded-lg p-4 flex flex-col items-center justify-center hover:shadow-md transition-shadow border border-slate-200 dark:border-slate-700"
                    >
                      <div className="mb-3">
                        <TechIcon name={tech.name} size={36} />
                      </div>
                      <span className="text-sm text-center">{tech.name}</span>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="frontend" className="mt-0">
              <TechGrid technologies={technologies.frontend} iconSize={48} />
            </TabsContent>

            <TabsContent value="backend" className="mt-0">
              <TechGrid technologies={technologies.backend} iconSize={48} />
            </TabsContent>

            <TabsContent value="devops" className="mt-0">
              <TechGrid technologies={technologies.devops} iconSize={48} />
            </TabsContent>

            <TabsContent value="database" className="mt-0">
              <TechGrid technologies={technologies.database} iconSize={48} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mon processus de travail</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Une approche méthodique et collaborative pour garantir le succès de votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Analyse et découverte",
                description:
                  "Compréhension approfondie de vos besoins, objectifs et contraintes pour définir une vision claire du projet.",
                icon: <Search className="h-8 w-8 text-primary" />,
              },
              {
                step: "02",
                title: "Conception et planification",
                description: "Élaboration d'une architecture technique solide et d'un plan de développement détaillé.",
                icon: <FileText className="h-8 w-8 text-primary" />,
              },
              {
                step: "03",
                title: "Développement itératif",
                description:
                  "Mise en œuvre progressive avec des cycles de feedback réguliers pour s'adapter à l'évolution des besoins.",
                icon: <Code className="h-8 w-8 text-primary" />,
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/30">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Outils spécialisés</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Des outils interactifs pour vous aider à prendre les meilleures décisions pour votre projet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent mes clients</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Découvrez les témoignages de clients satisfaits qui ont fait confiance à mes services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sophie Martin",
                role: "Directrice Marketing, TechStart",
                quote:
                  "Un travail exceptionnel sur notre plateforme e-commerce. Les performances sont excellentes et l'interface est intuitive. Je recommande vivement !",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Thomas Dubois",
                role: "CTO, InnovSolutions",
                quote:
                  "La refonte de notre architecture backend a considérablement amélioré nos performances. Un vrai partenaire technique qui comprend nos enjeux.",
                image: "/placeholder.svg?height=100&width=100",
              },
              {
                name: "Julie Lefèvre",
                role: "Fondatrice, DesignLab",
                quote:
                  "Une collaboration fluide et efficace. Les délais ont été respectés et le résultat dépasse nos attentes. Nous travaillerons ensemble sur nos prochains projets.",
                image: "/placeholder.svg?height=100&width=100",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="mb-6">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 flex-grow italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-slate-900/50">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à concrétiser votre projet ?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discutons de vos besoins et voyons comment je peux vous aider à atteindre vos objectifs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="relative overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  Prendre rendez-vous
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-[-180%] transition-transform duration-1000" />
              </Button>
              <Button size="lg" variant="outline">
                Me contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

