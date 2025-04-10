import type React from "react"
import { TabsContent } from "@/components/ui/tabs"
import { TabsTrigger } from "@/components/ui/tabs"
import { TabsList } from "@/components/ui/tabs"
import { Tabs } from "@/components/ui/tabs"
import type { Metadata } from "next"
import { TechIcon } from "@/components/tech-icon"

export const metadata: Metadata = {
  title: "Sélecteur de Technologies | Portfolio",
  description: "Trouvez la stack technologique idéale pour votre projet avec notre outil de sélection de technologies.",
}

export default function TechnologySelectorPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Sélecteur de Technologies</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Trouvez la stack technologique idéale pour votre projet en fonction de vos besoins et contraintes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-4">Filtres</h2>

            {/* Type de projet */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Type de projet</h3>
              <div className="space-y-2">
                {["Site web", "Application web", "Application mobile", "API", "E-commerce", "Dashboard", "Blog"].map(
                  (type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox id={`type-${type}`} />
                      <label
                        htmlFor={`type-${type}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {type}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Priorités */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Priorités</h3>
              <div className="space-y-3">
                {[
                  { name: "Performance", icon: <Zap className="h-4 w-4" /> },
                  { name: "Facilité de développement", icon: <Code className="h-4 w-4" /> },
                  { name: "Évolutivité", icon: <ArrowUpRight className="h-4 w-4" /> },
                  { name: "SEO", icon: <Search className="h-4 w-4" /> },
                  { name: "Sécurité", icon: <Shield className="h-4 w-4" /> },
                ].map((priority) => (
                  <div key={priority.name} className="flex items-center">
                    <div className="flex-1">{priority.name}</div>
                    <div className="flex items-center">
                      {priority.icon}
                      <Slider defaultValue={[3]} max={5} step={1} className="w-24 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contraintes */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Contraintes</h3>
              <div className="space-y-2">
                {[
                  "Budget limité",
                  "Délai court",
                  "Équipe réduite",
                  "Besoin de SEO",
                  "Trafic élevé attendu",
                  "Données sensibles",
                ].map((constraint) => (
                  <div key={constraint} className="flex items-center">
                    <Checkbox id={`constraint-${constraint}`} />
                    <label
                      htmlFor={`constraint-${constraint}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {constraint}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button className="w-full">Générer des recommandations</Button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Stack recommandée</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {[
                { name: "Next.js", category: "Frontend" },
                { name: "TypeScript", category: "Langage" },
                { name: "Tailwind CSS", category: "CSS" },
                { name: "Node.js", category: "Backend" },
                { name: "Express", category: "API" },
                { name: "PostgreSQL", category: "Base de données" },
              ].map((tech) => (
                <div key={tech.name} className="flex flex-col items-center p-4 bg-background rounded-lg border">
                  <TechIcon name={tech.name} size={40} />
                  <div className="mt-2 text-center">
                    <div className="font-medium">{tech.name}</div>
                    <div className="text-xs text-muted-foreground">{tech.category}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Pourquoi cette stack ?</h3>
              <p className="text-sm text-muted-foreground">
                Cette combinaison de technologies offre un excellent équilibre entre performance, facilité de
                développement et évolutivité. Next.js avec TypeScript fournit un framework robuste pour le frontend avec
                un excellent support SEO, tandis que Node.js et Express offrent une solution backend flexible et
                performante. PostgreSQL est une base de données relationnelle puissante et fiable.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Alternatives</h3>

              <Tabs defaultValue="frontend">
                <TabsList className="mb-4">
                  <TabsTrigger value="frontend">Frontend</TabsTrigger>
                  <TabsTrigger value="backend">Backend</TabsTrigger>
                  <TabsTrigger value="database">Base de données</TabsTrigger>
                </TabsList>

                <TabsContent value="frontend" className="space-y-4">
                  {[
                    {
                      name: "React + Vite",
                      pros: ["Développement rapide", "Excellentes performances", "Configuration minimale"],
                      cons: ["Moins de fonctionnalités intégrées que Next.js", "Configuration SEO manuelle"],
                    },
                    {
                      name: "Vue.js + Nuxt",
                      pros: ["Courbe d'apprentissage douce", "Bonne performance", "Écosystème cohérent"],
                      cons: ["Communauté plus petite que React", "Moins de bibliothèques tierces"],
                    },
                  ].map((alt) => (
                    <Card key={alt.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <TechIcon name={alt.name.split(" ")[0]} size={24} className="mr-2" />
                          <CardTitle>{alt.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Avantages</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.pros.map((pro, i) => (
                                <li key={i}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Inconvénients</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.cons.map((con, i) => (
                                <li key={i}>{con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="backend" className="space-y-4">
                  {[
                    {
                      name: "NestJS",
                      pros: ["Architecture structurée", "Support TypeScript natif", "Modulaire et extensible"],
                      cons: ["Plus complexe pour les petits projets", "Courbe d'apprentissage plus raide"],
                    },
                    {
                      name: "Django (Python)",
                      pros: ["Batteries included", "Admin intégré", "ORM puissant"],
                      cons: ["Moins performant que Node.js", "Moins adapté pour les API temps réel"],
                    },
                  ].map((alt) => (
                    <Card key={alt.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <TechIcon name={alt.name.split(" ")[0]} size={24} className="mr-2" />
                          <CardTitle>{alt.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Avantages</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.pros.map((pro, i) => (
                                <li key={i}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Inconvénients</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.cons.map((con, i) => (
                                <li key={i}>{con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="database" className="space-y-4">
                  {[
                    {
                      name: "MongoDB",
                      pros: ["Schéma flexible", "Scalabilité horizontale", "Bon pour les données non structurées"],
                      cons: ["Moins adapté pour les relations complexes", "Transactions moins robustes"],
                    },
                    {
                      name: "MySQL",
                      pros: ["Très répandu", "Bonne documentation", "Stable et éprouvé"],
                      cons: ["Moins de fonctionnalités avancées que PostgreSQL", "Scalabilité plus complexe"],
                    },
                  ].map((alt) => (
                    <Card key={alt.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <TechIcon name={alt.name} size={24} className="mr-2" />
                          <CardTitle>{alt.name}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Avantages</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.pros.map((pro, i) => (
                                <li key={i}>{pro}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-red-600 dark:text-red-400">Inconvénients</h4>
                            <ul className="text-sm list-disc pl-5 space-y-1">
                              {alt.cons.map((con, i) => (
                                <li key={i}>{con}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ressources d'apprentissage</h3>

              <div className="space-y-4">
                {[
                  {
                    title: "Next.js Documentation",
                    description: "La documentation officielle de Next.js, complète et bien structurée.",
                    link: "https://nextjs.org/docs",
                    icon: <BookOpen className="h-5 w-5" />,
                  },
                  {
                    title: "TypeScript Handbook",
                    description: "Guide complet pour apprendre TypeScript depuis les bases.",
                    link: "https://www.typescriptlang.org/docs/handbook/",
                    icon: <BookOpen className="h-5 w-5" />,
                  },
                  {
                    title: "Tailwind CSS Documentation",
                    description: "Documentation officielle avec exemples et guides.",
                    link: "https://tailwindcss.com/docs",
                    icon: <BookOpen className="h-5 w-5" />,
                  },
                  {
                    title: "Node.js & Express Tutorial",
                    description: "Tutoriel complet pour créer une API REST avec Node.js et Express.",
                    link: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs",
                    icon: <Video className="h-5 w-5" />,
                  },
                ].map((resource, i) => (
                  <div key={i} className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-md mr-3 text-primary">{resource.icon}</div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center mt-1"
                      >
                        Accéder à la ressource
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Composants fictifs pour l'exemple
function Checkbox({ id }: { id: string }) {
  return (
    <input
      type="checkbox"
      id={id}
      className="form-checkbox h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
    />
  )
}

function Slider({
  defaultValue,
  max,
  step,
  className,
}: { defaultValue: number[]; max: number; step: number; className?: string }) {
  return <div className={`h-4 bg-gray-200 rounded-full ${className}`} />
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="border rounded-lg overflow-hidden bg-card">{children}</div>
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-medium">{children}</h3>
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4 pt-0">{children}</div>
}

// Icônes fictives
function ArrowUpRight(props: any) {
  return <div {...props} />
}

function BookOpen(props: any) {
  return <div {...props} />
}

function CheckCircle(props: any) {
  return <div {...props} />
}

function ChevronRight(props: any) {
  return <div {...props} />
}

function Clock(props: any) {
  return <div {...props} />
}

function Code(props: any) {
  return <div {...props} />
}

function Database(props: any) {
  return <div {...props} />
}

function ExternalLink(props: any) {
  return <div {...props} />
}

function FileText(props: any) {
  return <div {...props} />
}

function GitBranch(props: any) {
  return <div {...props} />
}

function Layers(props: any) {
  return <div {...props} />
}

function PieChart(props: any) {
  return <div {...props} />
}

function Search(props: any) {
  return <div {...props} />
}

function Server(props: any) {
  return <div {...props} />
}

function Settings(props: any) {
  return <div {...props} />
}

function Shield(props: any) {
  return <div {...props} />
}

function TestTube(props: any) {
  return <div {...props} />
}

function Video(props: any) {
  return <div {...props} />
}

function Wrench(props: any) {
  return <div {...props} />
}

function Zap(props: any) {
  return <div {...props} />
}

function Cloud(props: any) {
  return <div {...props} />
}

function ArrowRight(props: any) {
  return <div {...props} />
}

function Button({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button className={`bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md ${className}`}>
      {children}
    </button>
  )
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}
    >
      {children}
    </span>
  )
}

