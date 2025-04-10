import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">Témoignages</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Ce que disent mes clients</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Découvrez les retours d'expérience de clients avec qui j'ai eu le plaisir de collaborer
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/women/32.jpg" alt="Sophie Martin" />
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Sophie Martin</CardTitle>
            <CardDescription>Directrice Marketing, TechSolutions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Ismail a complètement transformé notre présence en ligne. Notre nouveau site web est non seulement
              magnifique, mais aussi extrêmement performant. Sa compréhension de nos besoins et sa capacité à les
              traduire en solutions techniques ont été impressionnantes."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Site e-commerce</Badge>
              <Badge variant="outline">React</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/men/42.jpg" alt="Thomas Dubois" />
                <AvatarFallback>TD</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Thomas Dubois</CardTitle>
            <CardDescription>CEO, StartupInnovate</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Travailler avec Ismail a été une expérience exceptionnelle. Il a non seulement développé notre
              application mobile dans les délais, mais a également proposé des améliorations auxquelles nous n'avions
              pas pensé. Son expertise en DevOps nous a permis de mettre en place un pipeline de déploiement continu qui
              a considérablement accéléré notre cycle de développement."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Application mobile</Badge>
              <Badge variant="outline">DevOps</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" alt="Émilie Rousseau" />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Émilie Rousseau</CardTitle>
            <CardDescription>Fondatrice, EcoDesign</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Ismail a su comprendre les valeurs écologiques de notre entreprise et les a parfaitement intégrées dans
              notre plateforme web. Sa méthodologie de travail agile nous a permis de rester impliqués tout au long du
              processus et d'obtenir exactement ce que nous voulions."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Plateforme web</Badge>
              <Badge variant="outline">Méthodologie Agile</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="Alexandre Moreau" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Alexandre Moreau</CardTitle>
            <CardDescription>CTO, FinTech Solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "La migration de notre infrastructure vers le cloud était un défi majeur pour notre équipe. Ismail a
              dirigé ce projet avec une expertise remarquable, en mettant en place une architecture cloud sécurisée et
              évolutive. Son approche méthodique et sa documentation détaillée ont facilité la transition pour toute
              notre équipe."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Migration cloud</Badge>
              <Badge variant="outline">AWS</Badge>
              <Badge variant="outline">Kubernetes</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/women/45.jpg" alt="Julie Lefevre" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Julie Lefevre</CardTitle>
            <CardDescription>Responsable Produit, HealthTech</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Ismail a développé une API robuste pour notre application de santé, en respectant scrupuleusement les
              normes de sécurité et de confidentialité des données. Sa capacité à traduire des exigences complexes en
              solutions techniques efficaces a été déterminante pour le succès de notre projet."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">API REST</Badge>
              <Badge variant="outline">Sécurité</Badge>
              <Badge variant="outline">Node.js</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover-effect">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src="https://randomuser.me/api/portraits/men/36.jpg" alt="Nicolas Bernard" />
                <AvatarFallback>NB</AvatarFallback>
              </Avatar>
              <div className="flex text-amber-400">
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
                <Icon name="Star" className="h-5 w-5 fill-current" aria-hidden="true" />
              </div>
            </div>
            <CardTitle className="mt-4">Nicolas Bernard</CardTitle>
            <CardDescription>Directeur, Agence de communication</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              "Nous avons fait appel à Ismail pour refondre plusieurs sites web de nos clients. Sa créativité, son souci
              du détail et sa maîtrise technique ont donné des résultats exceptionnels. Nos clients sont ravis et nous
              continuons à collaborer régulièrement avec lui."
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="outline">Refonte web</Badge>
              <Badge variant="outline">UX/UI</Badge>
              <Badge variant="outline">Performance</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Études de cas</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Étude de cas E-commerce"
                  fill
                  className="object-cover image-filter"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">E-commerce</Badge>
              </div>
              <CardHeader>
                <CardTitle>Transformation digitale pour FashionRetail</CardTitle>
                <CardDescription>Augmentation des ventes en ligne de 150% en 6 mois</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  FashionRetail cherchait à moderniser sa présence en ligne et à améliorer l'expérience d'achat de ses
                  clients. J'ai développé une plateforme e-commerce performante et intuitive qui a considérablement
                  augmenté leurs conversions.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                  <Badge variant="secondary">Stripe</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Étude de cas DevOps"
                  fill
                  className="object-cover image-filter"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">DevOps</Badge>
              </div>
              <CardHeader>
                <CardTitle>Optimisation du pipeline CI/CD pour TechCorp</CardTitle>
                <CardDescription>Réduction du temps de déploiement de 45 minutes à 8 minutes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  TechCorp avait besoin d'optimiser son processus de déploiement pour accélérer ses cycles de
                  développement. J'ai mis en place un pipeline CI/CD automatisé qui a considérablement réduit le temps
                  de déploiement et amélioré la qualité du code.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">GitHub Actions</Badge>
                  <Badge variant="secondary">AWS</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Ils me font confiance</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              J'ai eu le plaisir de collaborer avec des entreprises de toutes tailles, des startups aux grandes
              entreprises
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <div className="h-12 w-32 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
                  alt="Google"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-12 w-32 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/1280px-Microsoft_logo_%282012%29.svg.png"
                  alt="Microsoft"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-12 w-32 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                  alt="Amazon"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="h-12 w-32 relative grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1280px-Netflix_2015_logo.svg.png"
                  alt="Netflix"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

