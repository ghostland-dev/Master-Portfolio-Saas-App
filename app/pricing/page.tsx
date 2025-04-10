import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">Tarification</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Tarifs transparents</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Des formules adaptées à vos besoins, sans mauvaises surprises
        </p>
      </div>

      <Tabs defaultValue="monthly" className="max-w-5xl mx-auto mb-12">
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="monthly">Mensuel</TabsTrigger>
            <TabsTrigger value="yearly">Annuel (2 mois offerts)</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="monthly">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Idéal pour les petits projets et les startups</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">1 500 €</span>
                  <span className="text-muted-foreground"> / mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 40 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>1 réunion hebdomadaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support par email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>1 environnement (développement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">CI/CD automatisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">Support prioritaire</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary text-primary-foreground">Populaire</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Pour les projets de taille moyenne et les entreprises</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">3 000 €</span>
                  <span className="text-muted-foreground"> / mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 80 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>2 réunions hebdomadaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support par email et téléphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>2 environnements (dev et production)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>CI/CD automatisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">Support prioritaire</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Pour les projets complexes et les grandes entreprises</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">5 000 €</span>
                  <span className="text-muted-foreground"> / mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 160 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Réunions illimitées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support complet (email, téléphone, chat)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>3+ environnements (dev, staging, prod)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>CI/CD automatisé avancé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support prioritaire 24/7</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="yearly">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>Idéal pour les petits projets et les startups</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">15 000 €</span>
                  <span className="text-muted-foreground"> / an</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Économisez 3 000 € avec l'abonnement annuel
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 40 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>1 réunion hebdomadaire</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support par email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>1 environnement (développement)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">CI/CD automatisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">Support prioritaire</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 border-primary shadow-lg relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <Badge className="bg-primary text-primary-foreground">Populaire</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>Pour les projets de taille moyenne et les entreprises</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">30 000 €</span>
                  <span className="text-muted-foreground"> / an</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Économisez 6 000 € avec l'abonnement annuel
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 80 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>2 réunions hebdomadaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support par email et téléphone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>2 environnements (dev et production)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>CI/CD automatisé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="X" className="h-5 w-5 text-muted-foreground mt-0.5" aria-hidden="true" />
                    <span className="text-muted-foreground">Support prioritaire</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="border-2 hover:border-primary transition-all duration-300">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>Pour les projets complexes et les grandes entreprises</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">50 000 €</span>
                  <span className="text-muted-foreground"> / an</span>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Économisez 10 000 € avec l'abonnement annuel
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Jusqu'à 160 heures de développement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Réunions illimitées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support complet (email, téléphone, chat)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>3+ environnements (dev, staging, prod)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>CI/CD automatisé avancé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" aria-hidden="true" />
                    <span>Support prioritaire 24/7</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/contact">Commencer</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Services à la carte</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Développement sur mesure</CardTitle>
                <CardDescription>Tarification horaire pour des besoins spécifiques</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Développement Front-End</span>
                    <span className="font-semibold">75 € / heure</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Développement Back-End</span>
                    <span className="font-semibold">85 € / heure</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Architecture DevOps</span>
                    <span className="font-semibold">95 € / heure</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Conseil technique</span>
                    <span className="font-semibold">120 € / heure</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Formation</span>
                    <span className="font-semibold">90 € / heure</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Projets forfaitaires</CardTitle>
                <CardDescription>Prix fixe pour des projets bien définis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Site vitrine (5-7 pages)</span>
                    <span className="font-semibold">à partir de 3 000 €</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Site e-commerce</span>
                    <span className="font-semibold">à partir de 8 000 €</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Application web sur mesure</span>
                    <span className="font-semibold">à partir de 15 000 €</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span>Migration cloud</span>
                    <span className="font-semibold">à partir de 5 000 €</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Mise en place CI/CD</span>
                    <span className="font-semibold">à partir de 3 500 €</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/contact">Demander un devis</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">Questions fréquentes</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Les prix incluent-ils la TVA ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Non, tous les prix indiqués sont hors taxes. La TVA applicable sera ajoutée lors de la facturation
                  selon la réglementation en vigueur.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comment se déroulent les paiements ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Pour les abonnements mensuels, la facturation est effectuée au début de chaque mois. Pour les projets
                  forfaitaires, un acompte de 30% est demandé à la signature, 30% à mi-parcours et le solde à la
                  livraison.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Puis-je changer de formule en cours d'abonnement ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Oui, vous pouvez passer à une formule supérieure à tout moment. Le passage à une formule inférieure
                  est possible à la fin de votre période d'engagement (mensuelle ou annuelle).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Y a-t-il des frais supplémentaires ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Les prix indiqués couvrent le développement et le support. Les frais d'hébergement, d'achat de
                  domaines ou de licences tierces sont facturés séparément et avec votre accord préalable.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold">Besoin d'une solution personnalisée ?</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Si aucune de ces formules ne correspond exactement à vos besoins, contactez-moi pour discuter d'une
              solution sur mesure.
            </p>
            <Button asChild size="lg" className="mt-4">
              <Link href="/contact">
                <Icon name="Mail" className="mr-2 h-4 w-4" aria-hidden="true" />
                Demander un devis personnalisé
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

