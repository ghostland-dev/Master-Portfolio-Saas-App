import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import Image from "next/image"

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">Outils</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Outils et ressources</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Découvrez une collection d'outils interactifs pour vous aider dans vos projets de développement
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="card-hover-effect">
          <CardHeader>
            <div className="mb-4 h-40 relative rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Planificateur de projet"
                fill
                className="object-cover image-filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Gestion de projet</Badge>
            </div>
            <CardTitle>Planificateur de projet</CardTitle>
            <CardDescription>Créez et gérez votre plan de projet avec un diagramme de Gantt interactif</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Organisez vos tâches, définissez des dépendances et suivez la progression de votre projet avec cet outil
              intuitif.
            </p>
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

        <Card className="card-hover-effect">
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
          <CardContent>
            <p className="text-muted-foreground">
              Obtenez une estimation réaliste du budget nécessaire pour votre projet en fonction de vos besoins
              spécifiques.
            </p>
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

        <Card className="card-hover-effect">
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
          <CardContent>
            <p className="text-muted-foreground">
              Comparez différentes technologies et frameworks pour choisir les outils les plus adaptés à vos besoins.
            </p>
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

        <Card className="card-hover-effect">
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
            <CardDescription>Vérifiez la maturité DevOps de votre projet</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Évaluez vos pratiques DevOps actuelles et identifiez les points d'amélioration pour optimiser votre
              pipeline.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/tools/devops-checklist">
                <Icon name="CheckSquare" className="mr-2 h-4 w-4" aria-hidden="true" />
                Accéder à l'outil
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <div className="mb-4 h-40 relative rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Calculateur de performance"
                fill
                className="object-cover image-filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Performance</Badge>
            </div>
            <CardTitle>Calculateur de performance</CardTitle>
            <CardDescription>Estimez les performances de votre application</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Analysez les facteurs qui influencent la performance de votre application et obtenez des recommandations
              d'optimisation.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/tools/performance-calculator">
                <Icon name="Zap" className="mr-2 h-4 w-4" aria-hidden="true" />
                Accéder à l'outil
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader>
            <div className="mb-4 h-40 relative rounded-md overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Générateur de code"
                fill
                className="object-cover image-filter"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <Badge className="absolute bottom-3 left-3 bg-primary text-primary-foreground">Développement</Badge>
            </div>
            <CardTitle>Générateur de code</CardTitle>
            <CardDescription>Créez rapidement des snippets de code pour vos projets</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Générez des modèles de code pour différents frameworks et langages de programmation pour accélérer votre
              développement.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/tools/code-generator">
                <Icon name="Code" className="mr-2 h-4 w-4" aria-hidden="true" />
                Accéder à l'outil
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6">Ressources gratuites</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Guides et tutoriels</CardTitle>
                <CardDescription>Apprenez les meilleures pratiques de développement</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/blog/introduction-to-devops" className="hover:text-primary transition-colors">
                      Introduction au DevOps
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/blog/react-best-practices" className="hover:text-primary transition-colors">
                      Bonnes pratiques React
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/blog/docker-for-beginners" className="hover:text-primary transition-colors">
                      Docker pour les débutants
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="FileText" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/blog/ci-cd-pipeline" className="hover:text-primary transition-colors">
                      Créer un pipeline CI/CD
                    </Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/blog">Voir tous les articles</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modèles et templates</CardTitle>
                <CardDescription>Accélérez votre développement avec des templates prêts à l'emploi</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/resources/react-starter-template" className="hover:text-primary transition-colors">
                      Template React avec TypeScript
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/resources/nextjs-blog-template" className="hover:text-primary transition-colors">
                      Blog Next.js avec MDX
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/resources/docker-compose-templates" className="hover:text-primary transition-colors">
                      Configurations Docker Compose
                    </Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Download" className="h-5 w-5 text-primary" aria-hidden="true" />
                    <Link href="/resources/github-actions-workflows" className="hover:text-primary transition-colors">
                      Workflows GitHub Actions
                    </Link>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/resources">Voir toutes les ressources</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Besoin d'un outil sur mesure ?</h2>
              <p className="text-muted-foreground mb-6">
                Si vous avez besoin d'un outil spécifique pour votre entreprise, je peux développer une solution
                personnalisée adaptée à vos besoins.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="animate-pulse-slow">
                  <Link href="/contact">
                    <Icon name="Mail" size="sm" className="mr-2" aria-hidden="true" /> Discuter de votre projet
                  </Link>
                </Button>
                <Button variant="outline" asChild size="lg">
                  <Link href="/services">
                    <Icon name="Info" size="sm" className="mr-2" aria-hidden="true" /> En savoir plus
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Développement sur mesure"
                fill
                className="object-cover image-filter"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

