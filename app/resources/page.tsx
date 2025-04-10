"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">Ressources</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Ressources et téléchargements</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Une collection de ressources gratuites pour vous aider dans vos projets de développement
        </p>
      </div>

      <Tabs defaultValue="templates" className="max-w-5xl mx-auto mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="tools">Outils</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="React Starter Template"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">React</Badge>
                </div>
                <CardTitle>React Starter Template</CardTitle>
                <CardDescription>Template React avec TypeScript, Vite et TailwindCSS</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un template de démarrage pour vos projets React avec une configuration optimisée et les meilleures
                  pratiques.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React 18</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Vite</Badge>
                  <Badge variant="secondary">TailwindCSS</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/react-starter-template">
                    <Icon name="Download" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Next.js Blog Template"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Next.js</Badge>
                </div>
                <CardTitle>Next.js Blog Template</CardTitle>
                <CardDescription>Template de blog avec Next.js et MDX</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un template de blog moderne avec Next.js, MDX pour le contenu et une mise en page élégante.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Next.js 13</Badge>
                  <Badge variant="secondary">MDX</Badge>
                  <Badge variant="secondary">TailwindCSS</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/nextjs-blog-template">
                    <Icon name="Download" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
                    alt="Docker Compose Templates"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">DevOps</Badge>
                </div>
                <CardTitle>Docker Compose Templates</CardTitle>
                <CardDescription>Collection de configurations Docker Compose</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Une collection de configurations Docker Compose pour différentes stacks technologiques.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Docker Compose</Badge>
                  <Badge variant="secondary">YAML</Badge>
                  <Badge variant="secondary">DevOps</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/docker-compose-templates">
                    <Icon name="Download" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Guide React Hooks"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">React</Badge>
                </div>
                <CardTitle>Guide des React Hooks</CardTitle>
                <CardDescription>Guide complet sur les React Hooks</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un guide détaillé sur l'utilisation des React Hooks avec des exemples pratiques et des cas d'usage.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">useState</Badge>
                  <Badge variant="secondary">useEffect</Badge>
                  <Badge variant="secondary">useContext</Badge>
                  <Badge variant="secondary">Custom Hooks</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/react-hooks-guide">
                    <Icon name="FileText" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Lire le guide
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Guide CI/CD"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">DevOps</Badge>
                </div>
                <CardTitle>Guide CI/CD avec GitHub Actions</CardTitle>
                <CardDescription>Mise en place d'un pipeline CI/CD avec GitHub Actions</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un guide étape par étape pour mettre en place un pipeline CI/CD complet avec GitHub Actions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">GitHub Actions</Badge>
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">YAML</Badge>
                  <Badge variant="secondary">Automatisation</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/github-actions-guide">
                    <Icon name="FileText" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Lire le guide
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Guide TypeScript"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">TypeScript</Badge>
                </div>
                <CardTitle>TypeScript pour les développeurs JavaScript</CardTitle>
                <CardDescription>Guide de transition de JavaScript à TypeScript</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un guide pour les développeurs JavaScript qui souhaitent apprendre TypeScript et améliorer la qualité
                  de leur code.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Types</Badge>
                  <Badge variant="secondary">Interfaces</Badge>
                  <Badge variant="secondary">Generics</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/typescript-guide">
                    <Icon name="FileText" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Lire le guide
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="checklists" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Checklist DevOps"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">DevOps</Badge>
                </div>
                <CardTitle>Checklist DevOps</CardTitle>
                <CardDescription>Liste de contrôle pour vos pratiques DevOps</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Une checklist complète pour évaluer et améliorer vos pratiques DevOps actuelles.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">Infrastructure</Badge>
                  <Badge variant="secondary">Monitoring</Badge>
                  <Badge variant="secondary">Sécurité</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/tools/devops-checklist">
                    <Icon name="CheckSquare" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Accéder à la checklist
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Checklist Sécurité Web"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Sécurité</Badge>
                </div>
                <CardTitle>Checklist de Sécurité Web</CardTitle>
                <CardDescription>Liste de contrôle pour la sécurité de vos applications web</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Une checklist détaillée pour évaluer et améliorer la sécurité de vos applications web.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">OWASP</Badge>
                  <Badge variant="secondary">Authentication</Badge>
                  <Badge variant="secondary">XSS</Badge>
                  <Badge variant="secondary">CSRF</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/web-security-checklist">
                    <Icon name="Shield" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger la checklist
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Checklist Lancement de Projet"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
                    Gestion de projet
                  </Badge>
                </div>
                <CardTitle>Checklist de Lancement de Projet</CardTitle>
                <CardDescription>Liste de contrôle pour le lancement réussi d'un projet</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Une checklist complète pour s'assurer que tous les aspects importants sont couverts lors du lancement
                  d'un nouveau projet.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Planning</Badge>
                  <Badge variant="secondary">Ressources</Badge>
                  <Badge variant="secondary">Communication</Badge>
                  <Badge variant="secondary">Risques</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/resources/project-launch-checklist">
                    <Icon name="Rocket" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Télécharger la checklist
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Planificateur de projet"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">
                    Gestion de projet
                  </Badge>
                </div>
                <CardTitle>Planificateur de projet</CardTitle>
                <CardDescription>Outil interactif pour planifier vos projets</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un outil interactif pour planifier vos projets avec un diagramme de Gantt et une gestion des tâches.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Diagramme de Gantt</Badge>
                  <Badge variant="secondary">Gestion des tâches</Badge>
                  <Badge variant="secondary">Dépendances</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/tools/project-planner">
                    <Icon name="Calendar" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Accéder à l'outil
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1511&q=80"
                    alt="Simulateur de budget"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Finance</Badge>
                </div>
                <CardTitle>Simulateur de budget</CardTitle>
                <CardDescription>Estimez le coût de votre projet de développement</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un outil pour estimer le coût de votre projet de développement en fonction de vos besoins spécifiques.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Estimation de coûts</Badge>
                  <Badge variant="secondary">Budgétisation</Badge>
                  <Badge variant="secondary">Planification financière</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/tools/budget-simulator">
                    <Icon name="Calculator" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Accéder à l'outil
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="flex flex-col h-full">
              <CardHeader>
                <div className="mb-4 h-40 relative rounded-md overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Sélecteur de technologies"
                    fill
                    className="object-cover image-filter"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Architecture</Badge>
                </div>
                <CardTitle>Sélecteur de technologies</CardTitle>
                <CardDescription>Trouvez la stack technologique idéale pour votre projet</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Un outil interactif pour vous aider à choisir les technologies les plus adaptées à votre projet.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Front-end</Badge>
                  <Badge variant="secondary">Back-end</Badge>
                  <Badge variant="secondary">Base de données</Badge>
                  <Badge variant="secondary">DevOps</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/tools/technology-selector">
                    <Icon name="Layers" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Accéder à l'outil
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Ressources populaires</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Les plus téléchargées</CardTitle>
                <CardDescription>Les ressources les plus populaires auprès de la communauté</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/react-starter-template"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        React Starter Template
                      </Link>
                      <p className="text-sm text-muted-foreground">1,245 téléchargements</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/docker-compose-templates"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        Docker Compose Templates
                      </Link>
                      <p className="text-sm text-muted-foreground">987 téléchargements</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/web-security-checklist"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        Checklist de Sécurité Web
                      </Link>
                      <p className="text-sm text-muted-foreground">856 téléchargements</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ajouts récents</CardTitle>
                <CardDescription>Les dernières ressources ajoutées à la bibliothèque</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/typescript-guide"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        Guide TypeScript pour les développeurs JavaScript
                      </Link>
                      <p className="text-sm text-muted-foreground">Ajouté il y a 2 jours</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/nextjs-blog-template"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        Next.js Blog Template
                      </Link>
                      <p className="text-sm text-muted-foreground">Ajouté il y a 1 semaine</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <Link
                        href="/resources/github-actions-guide"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        Guide CI/CD avec GitHub Actions
                      </Link>
                      <p className="text-sm text-muted-foreground">Ajouté il y a 2 semaines</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Besoin d'une ressource spécifique ?</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Si vous ne trouvez pas la ressource que vous cherchez, n'hésitez pas à me contacter pour me faire part de
              vos besoins.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">
                <Icon name="Mail" className="mr-2 h-4 w-4" aria-hidden="true" />
                Me contacter
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

