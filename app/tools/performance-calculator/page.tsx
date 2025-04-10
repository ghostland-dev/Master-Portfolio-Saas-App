"use client"

import { useRef } from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"
import Image from "next/image"
import { generatePDF } from "@/lib/pdf-utils"

// Types pour le calculateur
type ApplicationType = "web" | "api" | "mobile" | "desktop"
type DatabaseType = "sql" | "nosql" | "hybrid" | "none"
type CachingStrategy = "none" | "memory" | "distributed" | "multi-level"
type DeploymentType = "single-server" | "load-balanced" | "microservices" | "serverless"

interface PerformanceEstimate {
  responseTime: {
    min: number
    max: number
  }
  throughput: {
    min: number
    max: number
  }
  concurrentUsers: {
    min: number
    max: number
  }
  resourceUsage: {
    cpu: number
    memory: number
    storage: number
    network: number
  }
  scalability: {
    score: number
    bottlenecks: string[]
  }
  recommendations: string[]
}

export default function PerformanceCalculatorPage() {
  // État pour les paramètres de l'application
  const [applicationType, setApplicationType] = useState<ApplicationType>("web")
  const [databaseType, setDatabaseType] = useState<DatabaseType>("sql")
  const [cachingStrategy, setCachingStrategy] = useState<CachingStrategy>("memory")
  const [deploymentType, setDeploymentType] = useState<DeploymentType>("load-balanced")
  const [dataSize, setDataSize] = useState([50])
  const [complexity, setComplexity] = useState([50])
  const [optimizationLevel, setOptimizationLevel] = useState([50])
  const [useAsyncProcessing, setUseAsyncProcessing] = useState(true)
  const [useCDN, setUseCDN] = useState(true)
  const [useCompression, setUseCompression] = useState(true)
  const [expectedUsers, setExpectedUsers] = useState("1000")
  const [showResults, setShowResults] = useState(false)
  const [estimate, setEstimate] = useState<PerformanceEstimate | null>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)

  // Calcul de l'estimation de performance
  const calculatePerformance = () => {
    // Base response time in milliseconds
    let baseResponseTime = 100

    // Adjust based on application type
    switch (applicationType) {
      case "web":
        baseResponseTime *= 1.2
        break
      case "api":
        baseResponseTime *= 0.8
        break
      case "mobile":
        baseResponseTime *= 1.5
        break
      case "desktop":
        baseResponseTime *= 0.7
        break
    }

    // Adjust based on database type
    switch (databaseType) {
      case "sql":
        baseResponseTime *= 1.2
        break
      case "nosql":
        baseResponseTime *= 0.9
        break
      case "hybrid":
        baseResponseTime *= 1.1
        break
      case "none":
        baseResponseTime *= 0.7
        break
    }

    // Adjust based on caching strategy
    switch (cachingStrategy) {
      case "none":
        baseResponseTime *= 1.5
        break
      case "memory":
        baseResponseTime *= 0.8
        break
      case "distributed":
        baseResponseTime *= 0.7
        break
      case "multi-level":
        baseResponseTime *= 0.6
        break
    }

    // Adjust based on deployment type
    switch (deploymentType) {
      case "single-server":
        baseResponseTime *= 1.3
        break
      case "load-balanced":
        baseResponseTime *= 0.9
        break
      case "microservices":
        baseResponseTime *= 1.1
        break
      case "serverless":
        baseResponseTime *= 0.8
        break
    }

    // Adjust based on data size, complexity, and optimization level
    baseResponseTime *= 0.5 + dataSize[0] / 100
    baseResponseTime *= 0.5 + complexity[0] / 100
    baseResponseTime *= 1.5 - optimizationLevel[0] / 100

    // Adjust based on async processing, CDN, and compression
    if (useAsyncProcessing) baseResponseTime *= 0.8
    if (useCDN) baseResponseTime *= 0.7
    if (useCompression) baseResponseTime *= 0.9

    // Calculate throughput (requests per second)
    const baseThroughput = 1000 / baseResponseTime

    // Calculate concurrent users
    const users = Number.parseInt(expectedUsers) || 1000
    const concurrentUsers = Math.min(users, baseThroughput * 10)

    // Calculate resource usage
    const cpuUsage = 20 + complexity[0] / 2 + dataSize[0] / 4 - optimizationLevel[0] / 4
    const memoryUsage = 30 + dataSize[0] / 2 + complexity[0] / 4 - optimizationLevel[0] / 4
    const storageUsage = 10 + dataSize[0] - optimizationLevel[0] / 10
    const networkUsage = 25 + dataSize[0] / 3 - (useCDN ? 10 : 0) - (useCompression ? 8 : 0)

    // Calculate scalability score
    let scalabilityScore = 50
    if (deploymentType === "microservices" || deploymentType === "serverless") scalabilityScore += 20
    if (cachingStrategy === "distributed" || cachingStrategy === "multi-level") scalabilityScore += 15
    if (useAsyncProcessing) scalabilityScore += 10
    if (databaseType === "nosql") scalabilityScore += 5
    scalabilityScore = Math.min(100, Math.max(0, scalabilityScore))

    // Identify bottlenecks
    const bottlenecks: string[] = []
    if (cpuUsage > 70) bottlenecks.push("Utilisation CPU élevée")
    if (memoryUsage > 80) bottlenecks.push("Utilisation mémoire élevée")
    if (deploymentType === "single-server") bottlenecks.push("Architecture à serveur unique")
    if (cachingStrategy === "none") bottlenecks.push("Absence de mise en cache")
    if (databaseType === "sql" && dataSize[0] > 70) bottlenecks.push("Base de données SQL avec grand volume de données")
    if (!useAsyncProcessing && complexity[0] > 60)
      bottlenecks.push("Traitement synchrone pour des opérations complexes")

    // Generate recommendations
    const recommendations: string[] = []
    if (deploymentType === "single-server") {
      recommendations.push("Migrer vers une architecture à charge équilibrée ou microservices")
    }
    if (cachingStrategy === "none") {
      recommendations.push("Implémenter une stratégie de mise en cache (mémoire ou distribuée)")
    }
    if (!useAsyncProcessing && complexity[0] > 60) {
      recommendations.push("Utiliser le traitement asynchrone pour les opérations longues")
    }
    if (!useCDN && applicationType === "web") {
      recommendations.push("Utiliser un CDN pour les ressources statiques")
    }
    if (!useCompression) {
      recommendations.push("Activer la compression des données")
    }
    if (databaseType === "sql" && dataSize[0] > 70) {
      recommendations.push("Envisager une base de données NoSQL ou hybride pour les grands volumes de données")
    }
    if (optimizationLevel[0] < 40) {
      recommendations.push("Améliorer l'optimisation du code et des requêtes")
    }
    if (deploymentType !== "serverless" && scalabilityScore < 60) {
      recommendations.push("Envisager une architecture serverless pour une meilleure scalabilité")
    }

    // Create the estimate
    const performanceEstimate: PerformanceEstimate = {
      responseTime: {
        min: Math.round(baseResponseTime * 0.8),
        max: Math.round(baseResponseTime * 1.2),
      },
      throughput: {
        min: Math.round(baseThroughput * 0.8),
        max: Math.round(baseThroughput * 1.2),
      },
      concurrentUsers: {
        min: Math.round(concurrentUsers * 0.8),
        max: Math.round(concurrentUsers * 1.2),
      },
      resourceUsage: {
        cpu: Math.round(cpuUsage),
        memory: Math.round(memoryUsage),
        storage: Math.round(storageUsage),
        network: Math.round(networkUsage),
      },
      scalability: {
        score: Math.round(scalabilityScore),
        bottlenecks,
      },
      recommendations,
    }

    setEstimate(performanceEstimate)
    setShowResults(true)
  }

  // Formatage des nombres avec séparateurs de milliers
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
  }

  // Générer le PDF
  const handleGeneratePDF = async () => {
    if (!calculatorRef.current) return

    generatePDF("calculator", "Performance_Calculator.pdf", {
      orientation: "landscape",
      title: "Calculateur de Performance",
      subtitle: "Estimation des performances de l'application",
      footer: "Document généré le " + new Date().toLocaleDateString(),
    })
  }

  return (
    <div className="container mx-auto px-4 py-12" id="calculator" ref={calculatorRef}>
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Calculateur de Performance</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Estimez les performances de votre application en fonction de différents paramètres
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de l'Application</CardTitle>
              <CardDescription>
                Configurez les caractéristiques de votre application pour estimer ses performances
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Type d'application et architecture */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="applicationType" className="text-base font-medium">
                    Type d'Application
                  </Label>
                  <Select value={applicationType} onValueChange={(value: ApplicationType) => setApplicationType(value)}>
                    <SelectTrigger id="applicationType" className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un type d'application" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Application Web</SelectItem>
                      <SelectItem value="api">API / Backend</SelectItem>
                      <SelectItem value="mobile">Application Mobile</SelectItem>
                      <SelectItem value="desktop">Application Desktop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="databaseType" className="text-base font-medium">
                    Type de Base de Données
                  </Label>
                  <Select value={databaseType} onValueChange={(value: DatabaseType) => setDatabaseType(value)}>
                    <SelectTrigger id="databaseType" className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un type de base de données" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sql">SQL (PostgreSQL, MySQL, etc.)</SelectItem>
                      <SelectItem value="nosql">NoSQL (MongoDB, Cassandra, etc.)</SelectItem>
                      <SelectItem value="hybrid">Hybride (SQL + NoSQL)</SelectItem>
                      <SelectItem value="none">Pas de base de données</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="cachingStrategy" className="text-base font-medium">
                    Stratégie de Cache
                  </Label>
                  <Select value={cachingStrategy} onValueChange={(value: CachingStrategy) => setCachingStrategy(value)}>
                    <SelectTrigger id="cachingStrategy" className="mt-1.5">
                      <SelectValue placeholder="Sélectionner une stratégie de cache" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Pas de cache</SelectItem>
                      <SelectItem value="memory">Cache en mémoire</SelectItem>
                      <SelectItem value="distributed">Cache distribué (Redis, Memcached)</SelectItem>
                      <SelectItem value="multi-level">Cache multi-niveaux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deploymentType" className="text-base font-medium">
                    Type de Déploiement
                  </Label>
                  <Select value={deploymentType} onValueChange={(value: DeploymentType) => setDeploymentType(value)}>
                    <SelectTrigger id="deploymentType" className="mt-1.5">
                      <SelectValue placeholder="Sélectionner un type de déploiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single-server">Serveur unique</SelectItem>
                      <SelectItem value="load-balanced">Équilibrage de charge</SelectItem>
                      <SelectItem value="microservices">Microservices</SelectItem>
                      <SelectItem value="serverless">Serverless</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              {/* Caractéristiques de l'application */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="dataSize" className="text-base font-medium">
                      Volume de Données
                    </Label>
                    <span className="text-sm text-muted-foreground">{dataSize[0]}%</span>
                  </div>
                  <Slider id="dataSize" min={10} max={100} step={5} value={dataSize} onValueChange={setDataSize} />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Faible</span>
                    <span>Moyen</span>
                    <span>Élevé</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="complexity" className="text-base font-medium">
                      Complexité des Opérations
                    </Label>
                    <span className="text-sm text-muted-foreground">{complexity[0]}%</span>
                  </div>
                  <Slider
                    id="complexity"
                    min={10}
                    max={100}
                    step={5}
                    value={complexity}
                    onValueChange={setComplexity}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Simple</span>
                    <span>Moyenne</span>
                    <span>Complexe</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="optimizationLevel" className="text-base font-medium">
                      Niveau d'Optimisation
                    </Label>
                    <span className="text-sm text-muted-foreground">{optimizationLevel[0]}%</span>
                  </div>
                  <Slider
                    id="optimizationLevel"
                    min={10}
                    max={100}
                    step={5}
                    value={optimizationLevel}
                    onValueChange={setOptimizationLevel}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Minimal</span>
                    <span>Standard</span>
                    <span>Avancé</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Optimisations et utilisateurs */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="useAsyncProcessing">Traitement Asynchrone</Label>
                      <p className="text-sm text-muted-foreground">Pour les opérations longues</p>
                    </div>
                    <Switch
                      id="useAsyncProcessing"
                      checked={useAsyncProcessing}
                      onCheckedChange={setUseAsyncProcessing}
                    />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="useCDN">Utilisation d'un CDN</Label>
                      <p className="text-sm text-muted-foreground">Pour les ressources statiques</p>
                    </div>
                    <Switch id="useCDN" checked={useCDN} onCheckedChange={setUseCDN} />
                  </div>
                  <div className="flex items-center justify-between space-x-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="useCompression">Compression des Données</Label>
                      <p className="text-sm text-muted-foreground">GZIP, Brotli, etc.</p>
                    </div>
                    <Switch id="useCompression" checked={useCompression} onCheckedChange={setUseCompression} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="expectedUsers" className="text-base font-medium">
                    Nombre d'Utilisateurs Attendus
                  </Label>
                  <Input
                    id="expectedUsers"
                    type="number"
                    min="1"
                    value={expectedUsers}
                    onChange={(e) => setExpectedUsers(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setApplicationType("web")
                  setDatabaseType("sql")
                  setCachingStrategy("memory")
                  setDeploymentType("load-balanced")
                  setDataSize([50])
                  setComplexity([50])
                  setOptimizationLevel([50])
                  setUseAsyncProcessing(true)
                  setUseCDN(true)
                  setUseCompression(true)
                  setExpectedUsers("1000")
                  setShowResults(false)
                }}
              >
                Réinitialiser
              </Button>
              <Button type="button" onClick={calculatePerformance}>
                <Icon name="Calculator" size="sm" className="mr-2" aria-hidden="true" /> Calculer les performances
              </Button>
            </CardFooter>
          </Card>

          {showResults && estimate && (
            <Card className="mt-8 border-primary/20">
              <CardHeader className="bg-primary/5">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="BarChart" className="text-primary" aria-hidden="true" />
                      Estimation des Performances
                    </CardTitle>
                    <CardDescription>Basée sur les paramètres fournis pour votre application</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleGeneratePDF}>
                    <Icon name="FileText" size="sm" className="mr-2" aria-hidden="true" />
                    Télécharger en PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <Tabs defaultValue="metrics">
                  <TabsList className="mb-4">
                    <TabsTrigger value="metrics" className="flex items-center gap-1.5">
                      <Icon name="LineChart" size="sm" aria-hidden="true" /> Métriques
                    </TabsTrigger>
                    <TabsTrigger value="resources" className="flex items-center gap-1.5">
                      <Icon name="Cpu" size="sm" aria-hidden="true" /> Ressources
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex items-center gap-1.5">
                      <Icon name="Lightbulb" size="sm" aria-hidden="true" /> Recommandations
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="metrics" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Icon name="Clock" size="sm" variant="solid" aria-hidden="true" /> Temps de Réponse
                          </h3>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">
                              {estimate.responseTime.min} - {estimate.responseTime.max} ms
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">Temps de réponse moyen par requête</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Icon name="Activity" size="sm" variant="solid" aria-hidden="true" /> Débit
                          </h3>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">
                              {estimate.throughput.min} - {estimate.throughput.max} req/s
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Nombre de requêtes traitées par seconde
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Icon name="Users" size="sm" variant="solid" aria-hidden="true" /> Utilisateurs Simultanés
                          </h3>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">
                              {formatNumber(estimate.concurrentUsers.min)} -{" "}
                              {formatNumber(estimate.concurrentUsers.max)}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Nombre d'utilisateurs simultanés supportés
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="font-semibold flex items-center gap-2">
                            <Icon name="ArrowUpDown" size="sm" variant="solid" aria-hidden="true" /> Scalabilité
                          </h3>
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="text-2xl font-bold">{estimate.scalability.score}/100</div>
                            <p className="text-sm text-muted-foreground mt-1">Capacité à gérer une charge croissante</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {estimate.scalability.bottlenecks.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                          <Icon name="AlertTriangle" size="sm" className="text-yellow-500" aria-hidden="true" /> Goulots
                          d'Étranglement Potentiels
                        </h3>
                        <ul className="space-y-1 text-muted-foreground">
                          {estimate.scalability.bottlenecks.map((bottleneck, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Icon
                                name="AlertCircle"
                                size="sm"
                                className="text-yellow-500 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{bottleneck}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="resources" className="mt-0">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="font-semibold mb-4">Utilisation des Ressources</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="flex items-center gap-1.5">
                                <Icon name="Ram" size="sm" aria-hidden="true" /> Mémoire
                              </Label>
                              <span className="text-sm font-medium">{estimate.resourceUsage.memory}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  estimate.resourceUsage.memory > 80
                                    ? "bg-red-500"
                                    : estimate.resourceUsage.memory > 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${estimate.resourceUsage.memory}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="flex items-center gap-1.5">
                                <Icon name="Globe" size="sm" aria-hidden="true" /> Réseau
                              </Label>
                              <span className="text-sm font-medium">{estimate.resourceUsage.network}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  estimate.resourceUsage.network > 80
                                    ? "bg-red-500"
                                    : estimate.resourceUsage.network > 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${estimate.resourceUsage.network}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="flex items-center gap-1.5">
                                <Icon name="Database" size="sm" aria-hidden="true" /> Stockage
                              </Label>
                              <span className="text-sm font-medium">{estimate.resourceUsage.storage}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  estimate.resourceUsage.storage > 80
                                    ? "bg-red-500"
                                    : estimate.resourceUsage.storage > 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${estimate.resourceUsage.storage}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label className="flex items-center gap-1.5">
                                <Icon name="Network" size="sm" aria-hidden="true" /> Réseau
                              </Label>
                              <span className="text-sm font-medium">{estimate.resourceUsage.network}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  estimate.resourceUsage.network > 80
                                    ? "bg-red-500"
                                    : estimate.resourceUsage.network > 60
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                }`}
                                style={{ width: `${estimate.resourceUsage.network}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-semibold mb-4">Interprétation</h3>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Icon
                              name={
                                Math.max(
                                  estimate.resourceUsage.cpu,
                                  estimate.resourceUsage.memory,
                                  estimate.resourceUsage.storage,
                                  estimate.resourceUsage.network,
                                ) > 80
                                  ? "AlertTriangle"
                                  : "CheckCircle"
                              }
                              className={
                                Math.max(
                                  estimate.resourceUsage.cpu,
                                  estimate.resourceUsage.memory,
                                  estimate.resourceUsage.storage,
                                  estimate.resourceUsage.network,
                                ) > 80
                                  ? "text-red-500"
                                  : "text-green-500"
                              }
                              size="md"
                              aria-hidden="true"
                            />
                            <div>
                              <h4 className="font-medium">Utilisation Globale des Ressources</h4>
                              <p className="text-muted-foreground">
                                {Math.max(
                                  estimate.resourceUsage.cpu,
                                  estimate.resourceUsage.memory,
                                  estimate.resourceUsage.storage,
                                  estimate.resourceUsage.network,
                                ) > 80
                                  ? "L'utilisation des ressources est élevée, ce qui pourrait entraîner des problèmes de performance sous charge."
                                  : Math.max(
                                        estimate.resourceUsage.cpu,
                                        estimate.resourceUsage.memory,
                                        estimate.resourceUsage.storage,
                                        estimate.resourceUsage.network,
                                      ) > 60
                                    ? "L'utilisation des ressources est modérée, mais pourrait être optimisée davantage."
                                    : "L'utilisation des ressources est bien équilibrée, ce qui devrait permettre de bonnes performances."}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Icon
                              name={estimate.resourceUsage.cpu > 70 ? "AlertCircle" : "CheckCircle"}
                              className={estimate.resourceUsage.cpu > 70 ? "text-yellow-500" : "text-green-500"}
                              size="md"
                              aria-hidden="true"
                            />
                            <div>
                              <h4 className="font-medium">Utilisation CPU</h4>
                              <p className="text-muted-foreground">
                                {estimate.resourceUsage.cpu > 70
                                  ? "L'utilisation CPU est élevée. Envisagez d'optimiser les algorithmes ou d'augmenter les ressources."
                                  : "L'utilisation CPU est à un niveau acceptable."}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Icon
                              name={estimate.resourceUsage.memory > 80 ? "AlertCircle" : "CheckCircle"}
                              className={estimate.resourceUsage.memory > 80 ? "text-yellow-500" : "text-green-500"}
                              size="md"
                              aria-hidden="true"
                            />
                            <div>
                              <h4 className="font-medium">Utilisation Mémoire</h4>
                              <p className="text-muted-foreground">
                                {estimate.resourceUsage.memory > 80
                                  ? "L'utilisation de la mémoire est élevée. Vérifiez les fuites de mémoire potentielles et optimisez la gestion des objets."
                                  : "L'utilisation de la mémoire est à un niveau acceptable."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="recommendations" className="mt-0">
                    <div className="space-y-6">
                      <Alert>
                        <Icon name="Info" className="h-4 w-4" aria-hidden="true" />
                        <AlertTitle>Recommandations d'Optimisation</AlertTitle>
                        <AlertDescription>
                          Basées sur les paramètres de votre application, voici des suggestions pour améliorer les
                          performances.
                        </AlertDescription>
                      </Alert>

                      <div className="space-y-4">
                        {estimate.recommendations.length > 0 ? (
                          estimate.recommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                              <Icon name="Lightbulb" className="text-primary mt-0.5" size="md" aria-hidden="true" />
                              <div>
                                <p>{recommendation}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex items-start gap-3 p-3 border rounded-lg">
                            <Icon name="CheckCircle" className="text-green-500 mt-0.5" size="md" aria-hidden="true" />
                            <div>
                              <p>
                                Votre configuration actuelle semble bien optimisée. Continuez à surveiller les
                                performances à mesure que votre application évolue.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">Bonnes Pratiques Générales</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size="sm" className="text-primary mt-0.5" aria-hidden="true" />
                            <span>
                              Mettez en place un monitoring continu pour détecter les problèmes de performance
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size="sm" className="text-primary mt-0.5" aria-hidden="true" />
                            <span>Effectuez des tests de charge réguliers pour valider les performances</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size="sm" className="text-primary mt-0.5" aria-hidden="true" />
                            <span>Optimisez les requêtes de base de données et utilisez des index appropriés</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size="sm" className="text-primary mt-0.5" aria-hidden="true" />
                            <span>Mettez en cache les résultats des opérations coûteuses</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon name="CheckCircle2" size="sm" className="text-primary mt-0.5" aria-hidden="true" />
                            <span>Utilisez des architectures évolutives pour gérer la croissance</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-6">
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    <Icon name="Mail" size="sm" className="mr-2" aria-hidden="true" /> Discuter de ces résultats
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/appointment">
                    <Icon name="Calendar" size="sm" className="mr-2" aria-hidden="true" /> Prendre
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Guide d'utilisation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Comment utiliser le calculateur</h3>
                <ul className="space-y-1 text-sm">
                  <li>Sélectionnez le type d'application et l'architecture</li>
                  <li>Ajustez les caractéristiques de votre application</li>
                  <li>Configurez les optimisations et le nombre d'utilisateurs</li>
                  <li>Cliquez sur "Calculer les performances" pour obtenir l'estimation</li>
                  <li>Consultez les résultats et les recommandations</li>
                </ul>
              </div>

              <Alert>
                <Icon name="Info" className="h-4 w-4" aria-hidden="true" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Les estimations sont basées sur des modèles théoriques et peuvent varier en fonction de nombreux
                  facteurs. Utilisez ces résultats comme point de départ pour vos analyses de performance.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pourquoi c'est important</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">Les performances d'une application ont un impact direct sur :</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>L'expérience utilisateur et la satisfaction client</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Les taux de conversion et la rétention des utilisateurs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Les coûts d'infrastructure et d'exploitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="CheckCircle" className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>La capacité à gérer la croissance et les pics de trafic</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="relative aspect-video rounded-md overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Performance Analysis"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

