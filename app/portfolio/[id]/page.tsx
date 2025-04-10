"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Simulated project data - in a real app, this would come from an API or database
const getProjectData = (id: string) => {
  const projects = {
    "project-1": {
      id: "project-1",
      title: "E-commerce Platform",
      client: "RetailTech Solutions",
      date: "2023",
      description:
        "Une plateforme e-commerce complète avec panier, paiement et gestion des commandes. Cette solution a permis au client d'augmenter ses ventes en ligne de 45% dans les trois mois suivant le lancement.",
      longDescription:
        "Ce projet a impliqué la création d'une plateforme e-commerce complète pour RetailTech Solutions, une entreprise spécialisée dans la vente de produits électroniques. Le client cherchait à moderniser sonn site existant qui souffrait de problèmes de performance et d'une expérience utilisateur dépassée.\n\nJ'ai conçu et développé une solution complète comprenant un catalogue de produits, un système de panier d'achat, l'intégration de passerelles de paiement, et un tableau de bord administrateur pour la gestion des produits, des commandes et des clients.",
      challenge:
        "Le principal défi était de migrer les données existantes (plus de 5000 produits et 10000 clients) tout en maintenant l'intégrité des données et en assurant une transition transparente. De plus, le système devait gérer des pics de trafic importants pendant les périodes promotionnelles.",
      solution:
        "J'ai mis en place une architecture microservices avec un backend Node.js (NestJS) et une base de données PostgreSQL. Le frontend a été développé avec React et Next.js pour optimiser les performances et le SEO. J'ai utilisé Redis pour la mise en cache et la gestion des sessions, et implémenté une stratégie de déploiement progressif pour minimiser les interruptions de service.",
      results:
        "La nouvelle plateforme a permis d'augmenter les ventes en ligne de 45% dans les trois mois suivant le lancement. Le temps de chargement des pages a été réduit de 70%, et le taux de conversion a augmenté de 28%. Le système a également démontré sa robustesse en gérant sans problème un pic de trafic lors d'une promotion Black Friday avec plus de 10 000 utilisateurs simultanés.",
      technologies: ["React", "Next.js", "Node.js", "NestJS", "PostgreSQL", "Redis", "Docker", "AWS", "Stripe"],
      categories: ["web", "ecommerce", "fullstack"],
      images: ["/images/project1.jpeg", "/images/project2.jpeg", "/images/project3.jpeg", "/images/project1.jpeg"],
      testimonial: {
        text: "Ismail a transformé notre présence en ligne avec une plateforme e-commerce robuste et performante. Sa compréhension de nos besoins et son expertise technique ont fait toute la différence.",
        author: "Marie Dupont",
        position: "Directrice Marketing, RetailTech Solutions",
      },
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    "project-2": {
      id: "project-2",
      title: "CRM Dashboard",
      client: "Global Services Inc.",
      date: "2022",
      description:
        "Un tableau de bord CRM pour la gestion des clients et des ventes, intégrant des visualisations de données avancées et des fonctionnalités d'automatisation.",
      longDescription:
        "Ce projet consistait à développer un système CRM (Customer Relationship Management) sur mesure pour Global Services Inc., une entreprise de services B2B. Le client avait besoin d'une solution centralisée pour gérer ses relations clients, suivre les opportunités de vente et analyser les performances commerciales.\n\nJ'ai conçu et développé un tableau de bord complet avec des fonctionnalités de gestion des contacts, suivi des prospects, pipeline de vente, rapports et analyses, et automatisation des tâches répétitives.",
      challenge:
        "Le défi principal était d'intégrer des données provenant de multiples sources (ancien CRM, feuilles de calcul, emails) tout en créant une interface intuitive permettant aux équipes commerciales d'accéder rapidement aux informations pertinentes. De plus, le système devait être hautement personnalisable pour s'adapter aux processus spécifiques de l'entreprise.",
      solution:
        "J'ai développé une application Vue.js avec une architecture modulaire, permettant une personnalisation poussée. Le backend a été construit avec Express et une base de données PostgreSQL. J'ai implémenté une API RESTful robuste et mis en place des intégrations avec les outils existants (Gmail, Outlook, Slack). Les visualisations de données ont été créées avec D3.js et Chart.js.",
      results:
        "Le nouveau CRM a permis de réduire de 30% le temps consacré aux tâches administratives par l'équipe commerciale. Le taux de conversion des opportunités a augmenté de 18% grâce à un meilleur suivi, et la satisfaction des utilisateurs internes a atteint 92%. Le système est désormais utilisé quotidiennement par plus de 50 employés.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "D3.js", "Chart.js", "Docker", "Google Cloud", "Socket.IO"],
      categories: ["web", "dashboard", "crm"],
      images: ["/images/project2.jpeg", "/images/project3.jpeg", "/images/project1.jpeg"],
      testimonial: {
        text: "Le CRM développé par Ismail a transformé notre façon de travailler. L'interface intuitive et les fonctionnalités d'analyse nous permettent de prendre de meilleures décisions commerciales.",
        author: "Jean Martin",
        position: "Directeur Commercial, Global Services Inc.",
      },
      liveUrl: "https://example.com",
      githubUrl: null,
    },
    "project-3": {
      id: "project-3",
      title: "DevOps Pipeline",
      client: "TechStart SAS",
      date: "2023",
      description:
        "Mise en place d'un pipeline CI/CD pour le déploiement automatisé d'applications, réduisant le temps de déploiement de 85%.",
      longDescription:
        "Ce projet consistait à mettre en place une infrastructure DevOps complète pour TechStart SAS, une startup en croissance rapide développant des applications SaaS. L'entreprise souffrait de processus de déploiement manuels, longs et sujets aux erreurs, ce qui ralentissait leur capacité à livrer rapidement de nouvelles fonctionnalités.\n\nJ'ai conçu et implémenté un pipeline CI/CD complet, incluant l'intégration continue, les tests automatisés, et le déploiement continu dans un environnement Kubernetes.",
      challenge:
        "Le principal défi était de mettre en place une solution qui s'intègre avec les multiples technologies utilisées par l'entreprise (microservices en Node.js, Python et Java) tout en minimisant les perturbations pendant la transition. De plus, l'équipe avait peu d'expérience avec les pratiques DevOps modernes.",
      solution:
        "J'ai implémenté une solution basée sur GitHub Actions pour l'intégration continue, Docker pour la conteneurisation, et Kubernetes pour l'orchestration. J'ai mis en place des environnements de développement, staging et production identiques, avec promotion automatique du code entre les environnements après validation des tests. J'ai également configuré un monitoring complet avec Prometheus et Grafana.",
      results:
        "Le temps de déploiement a été réduit de 85%, passant de plusieurs heures à moins de 15 minutes. La fréquence des déploiements a augmenté de 300%, permettant des livraisons quotidiennes. Les incidents de production liés aux déploiements ont diminué de 90%, et l'équipe a gagné en autonomie grâce à la formation et la documentation fournies.",
      technologies: ["Docker", "Kubernetes", "GitHub Actions", "Terraform", "AWS", "Prometheus", "Grafana", "Helm"],
      categories: ["devops", "cloud", "automation"],
      images: ["/images/project3.jpeg", "/images/project1.jpeg"],
      testimonial: {
        text: "Ismail a révolutionné notre processus de déploiement. Nous pouvons maintenant déployer plusieurs fois par jour avec confiance, ce qui nous donne un avantage concurrentiel significatif.",
        author: "Sophie Legrand",
        position: "CTO, TechStart SAS",
      },
      liveUrl: null,
      githubUrl: "https://github.com/example",
    },
  }

  return projects[id] || null
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = getProjectData(params.id)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
        <p className="mb-8">Le projet que vous recherchez n'existe pas ou a été déplacé.</p>
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
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
          </div>
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
              <p>Client: {project.client}</p>
              <p>Date: {project.date}</p>
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
              className={`relative aspect-video rounded-md overflow-hidden cursor-pointer border-2 ${index === activeImageIndex ? "border-primary" : "border-transparent"}`}
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

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Projets similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="overflow-hidden group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg"
                alt="Related Project 1"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Related Project 1</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor.
              </p>
              <Button variant="outline" size="sm">
                Voir le projet
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg"
                alt="Related Project 2"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Related Project 2</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor.
              </p>
              <Button variant="outline" size="sm">
                Voir le projet
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden group">
            <div className="relative h-48 w-full">
              <Image
                src="/placeholder.svg"
                alt="Related Project 3"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Related Project 3</h3>
              <p className="text-muted-foreground mb-4 line-clamp-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor,
                dignissim sit amet, adipiscing nec, ultricies sed, dolor.
              </p>
              <Button variant="outline" size="sm">
                Voir le projet
              </Button>
            </CardContent>
          </Card>
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

