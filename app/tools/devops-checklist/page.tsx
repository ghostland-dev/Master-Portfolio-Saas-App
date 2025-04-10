"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Icon, IconText } from "@/components/ui/icon"
import Link from "next/link"
import Image from "next/image"
import { generatePDF } from "@/lib/pdf-utils"

// Types pour la checklist
interface ChecklistItem {
  id: string
  label: string
  description: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  impact: "low" | "medium" | "high"
}

interface Category {
  id: string
  name: string
  icon: string
  description: string
}

export default function DevOpsChecklistPage() {
  // Catégories de la checklist
  const categories: Category[] = [
    {
      id: "ci-cd",
      name: "CI/CD",
      icon: "GitBranch",
      description: "Intégration continue et déploiement continu",
    },
    {
      id: "infrastructure",
      name: "Infrastructure",
      icon: "Server",
      description: "Infrastructure as Code et gestion des environnements",
    },
    {
      id: "monitoring",
      name: "Monitoring",
      icon: "LineChart",
      description: "Surveillance, alertes et observabilité",
    },
    {
      id: "security",
      name: "Sécurité",
      icon: "Shield",
      description: "Sécurité et conformité",
    },
    {
      id: "automation",
      name: "Automatisation",
      icon: "Cog",
      description: "Automatisation des processus et des tâches",
    },
    {
      id: "collaboration",
      name: "Collaboration",
      icon: "Users",
      description: "Pratiques de collaboration et culture DevOps",
    },
  ]

  // Items de la checklist
  const checklistItems: ChecklistItem[] = [
    // CI/CD
    {
      id: "version-control",
      label: "Système de contrôle de version",
      description: "Utilisation d'un système de contrôle de version comme Git avec des conventions de nommage claires",
      category: "ci-cd",
      difficulty: "easy",
      impact: "high",
    },
    {
      id: "automated-builds",
      label: "Builds automatisés",
      description: "Processus de build automatisé déclenché à chaque commit ou pull request",
      category: "ci-cd",
      difficulty: "easy",
      impact: "high",
    },
    {
      id: "automated-tests",
      label: "Tests automatisés",
      description: "Suite de tests automatisés (unitaires, d'intégration, fonctionnels) exécutée à chaque build",
      category: "ci-cd",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "deployment-pipeline",
      label: "Pipeline de déploiement",
      description: "Pipeline de déploiement automatisé avec promotion entre environnements",
      category: "ci-cd",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "artifact-management",
      label: "Gestion des artefacts",
      description: "Système de gestion des artefacts pour stocker et versionner les builds",
      category: "ci-cd",
      difficulty: "medium",
      impact: "medium",
    },
    {
      id: "feature-flags",
      label: "Feature flags",
      description: "Utilisation de feature flags pour activer/désactiver des fonctionnalités en production",
      category: "ci-cd",
      difficulty: "hard",
      impact: "medium",
    },

    // Infrastructure
    {
      id: "infrastructure-as-code",
      label: "Infrastructure as Code",
      description: "Définition de l'infrastructure sous forme de code (Terraform, CloudFormation, etc.)",
      category: "infrastructure",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "containerization",
      label: "Conteneurisation",
      description: "Utilisation de conteneurs (Docker) pour packager les applications",
      category: "infrastructure",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "orchestration",
      label: "Orchestration de conteneurs",
      description: "Utilisation d'un orchestrateur de conteneurs (Kubernetes, ECS, etc.)",
      category: "infrastructure",
      difficulty: "hard",
      impact: "high",
    },
    {
      id: "environment-parity",
      label: "Parité des environnements",
      description: "Environnements de développement, test et production similaires",
      category: "infrastructure",
      difficulty: "medium",
      impact: "medium",
    },
    {
      id: "immutable-infrastructure",
      label: "Infrastructure immuable",
      description: "Approche d'infrastructure immuable (pas de modifications en place)",
      category: "infrastructure",
      difficulty: "hard",
      impact: "medium",
    },
    {
      id: "disaster-recovery",
      label: "Plan de reprise d'activité",
      description: "Plan de reprise d'activité documenté et testé régulièrement",
      category: "infrastructure",
      difficulty: "hard",
      impact: "high",
    },

    // Monitoring
    {
      id: "logging",
      label: "Centralisation des logs",
      description: "Système centralisé de collecte et d'analyse des logs",
      category: "monitoring",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "metrics",
      label: "Métriques d'application",
      description: "Collecte et visualisation des métriques d'application et d'infrastructure",
      category: "monitoring",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "alerting",
      label: "Système d'alertes",
      description: "Alertes configurées pour les incidents critiques avec notification de l'équipe",
      category: "monitoring",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "tracing",
      label: "Traçage distribué",
      description: "Traçage des requêtes à travers les différents services (dans les architectures microservices)",
      category: "monitoring",
      difficulty: "hard",
      impact: "medium",
    },
    {
      id: "dashboards",
      label: "Tableaux de bord",
      description: "Tableaux de bord pour visualiser l'état du système et les KPIs",
      category: "monitoring",
      difficulty: "easy",
      impact: "medium",
    },
    {
      id: "health-checks",
      label: "Health checks",
      description: "Endpoints de health check pour vérifier l'état des services",
      category: "monitoring",
      difficulty: "easy",
      impact: "medium",
    },

    // Security
    {
      id: "secrets-management",
      label: "Gestion des secrets",
      description: "Système sécurisé pour gérer les secrets (clés API, mots de passe, etc.)",
      category: "security",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "dependency-scanning",
      label: "Analyse des dépendances",
      description: "Scan automatique des dépendances pour détecter les vulnérabilités",
      category: "security",
      difficulty: "easy",
      impact: "high",
    },
    {
      id: "container-scanning",
      label: "Scan des conteneurs",
      description: "Scan des images de conteneurs pour détecter les vulnérabilités",
      category: "security",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "sast",
      label: "Analyse statique de code",
      description: "Analyse statique du code pour détecter les problèmes de sécurité",
      category: "security",
      difficulty: "medium",
      impact: "medium",
    },
    {
      id: "dast",
      label: "Tests de sécurité dynamiques",
      description: "Tests de sécurité dynamiques sur l'application en cours d'exécution",
      category: "security",
      difficulty: "hard",
      impact: "medium",
    },
    {
      id: "iam",
      label: "Gestion des identités et des accès",
      description: "Système robuste de gestion des identités et des accès avec principe du moindre privilège",
      category: "security",
      difficulty: "medium",
      impact: "high",
    },

    // Automation
    {
      id: "config-management",
      label: "Gestion de configuration",
      description:
        "Outil de gestion de configuration (Ansible, Chef, Puppet) pour automatiser la configuration des serveurs",
      category: "automation",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "infrastructure-provisioning",
      label: "Provisionnement automatisé",
      description: "Provisionnement automatisé des ressources d'infrastructure",
      category: "automation",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "database-migrations",
      label: "Migrations de base de données",
      description: "Système automatisé pour les migrations de base de données",
      category: "automation",
      difficulty: "medium",
      impact: "medium",
    },
    {
      id: "backup-automation",
      label: "Automatisation des sauvegardes",
      description: "Processus automatisé pour les sauvegardes et la vérification de leur intégrité",
      category: "automation",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "documentation-automation",
      label: "Documentation automatisée",
      description: "Génération automatique de documentation (API, architecture, etc.)",
      category: "automation",
      difficulty: "easy",
      impact: "medium",
    },
    {
      id: "chatops",
      label: "ChatOps",
      description: "Intégration des outils DevOps avec les plateformes de chat (Slack, Teams, etc.)",
      category: "automation",
      difficulty: "easy",
      impact: "low",
    },

    // Collaboration
    {
      id: "code-review",
      label: "Revue de code",
      description: "Processus systématique de revue de code avant l'intégration",
      category: "collaboration",
      difficulty: "easy",
      impact: "high",
    },
    {
      id: "knowledge-sharing",
      label: "Partage de connaissances",
      description: "Pratiques de partage de connaissances (documentation, sessions de formation, etc.)",
      category: "collaboration",
      difficulty: "easy",
      impact: "medium",
    },
    {
      id: "cross-functional-teams",
      label: "Équipes pluridisciplinaires",
      description: "Équipes pluridisciplinaires avec compétences en développement et opérations",
      category: "collaboration",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "incident-management",
      label: "Gestion des incidents",
      description: "Processus défini pour la gestion des incidents et les post-mortems",
      category: "collaboration",
      difficulty: "medium",
      impact: "high",
    },
    {
      id: "continuous-improvement",
      label: "Amélioration continue",
      description: "Culture d'amélioration continue avec rétrospectives régulières",
      category: "collaboration",
      difficulty: "medium",
      impact: "medium",
    },
    {
      id: "documentation",
      label: "Documentation",
      description: "Documentation à jour et accessible pour les processus, l'architecture et les opérations",
      category: "collaboration",
      difficulty: "easy",
      impact: "medium",
    },
  ]

  // État pour les items cochés
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("ci-cd")
  const checklistRef = useRef<HTMLDivElement>(null)

  // Gestion des items cochés
  const handleItemCheck = (itemId: string, checked: boolean) => {
    if (checked) {
      setCheckedItems([...checkedItems, itemId])
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== itemId))
    }
  }

  // Calcul du score par catégorie
  const getCategoryScore = (categoryId: string) => {
    const categoryItems = checklistItems.filter((item) => item.category === categoryId)
    const checkedCategoryItems = categoryItems.filter((item) => checkedItems.includes(item.id))
    return categoryItems.length > 0 ? Math.round((checkedCategoryItems.length / categoryItems.length) * 100) : 0
  }

  // Calcul du score global
  const getTotalScore = () => {
    return Math.round((checkedItems.length / checklistItems.length) * 100)
  }

  // Filtrer les items par catégorie
  const getItemsByCategory = (categoryId: string) => {
    return checklistItems.filter((item) => item.category === categoryId)
  }

  // Obtenir la couleur en fonction du score
  const getScoreColor = (score: number) => {
    if (score < 30) return "text-red-500 dark:text-red-400"
    if (score < 70) return "text-yellow-500 dark:text-yellow-400"
    return "text-green-500 dark:text-green-400"
  }

  // Obtenir la couleur de la difficulté
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Obtenir la couleur de l'impact
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "medium":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "high":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Générer le PDF
  const handleGeneratePDF = async () => {
    if (!checklistRef.current) return

    generatePDF("checklist", "DevOps_Checklist.pdf", {
      orientation: "landscape",
      title: "Checklist DevOps",
      subtitle: "Évaluation des pratiques DevOps",
      footer: "Document généré le " + new Date().toLocaleDateString(),
    })
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Checklist DevOps</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Évaluez vos pratiques DevOps et identifiez les opportunités d'amélioration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Évaluation des Pratiques DevOps</CardTitle>
              <CardDescription>
                Cochez les pratiques que vous avez déjà mises en place dans votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCategory} onValueChange={setActiveCategory}>
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-8">
                  {categories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-1.5">
                      <Icon name={category.icon as any} size="sm" aria-hidden="true" />
                      <span className="hidden md:inline">{category.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold flex items-center gap-2">
                          <Icon name={category.icon as any} className="text-primary" aria-hidden="true" />
                          {category.name}
                        </h3>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold flex items-center gap-2">
                          <span className={getScoreColor(getCategoryScore(category.id))}>
                            {getCategoryScore(category.id)}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getItemsByCategory(category.id).filter((item) => checkedItems.includes(item.id)).length} /{" "}
                          {getItemsByCategory(category.id).length} pratiques
                        </p>
                      </div>
                    </div>

                    <Progress
                      value={getCategoryScore(category.id)}
                      className="h-2 mb-6"
                      indicatorClassName={
                        getCategoryScore(category.id) < 30
                          ? "bg-red-500"
                          : getCategoryScore(category.id) < 70
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }
                    />

                    <div className="space-y-4" id="checklist" ref={checklistRef}>
                      {getItemsByCategory(category.id).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                          <Checkbox
                            id={item.id}
                            checked={checkedItems.includes(item.id)}
                            onCheckedChange={(checked) => handleItemCheck(item.id, checked as boolean)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <Label htmlFor={item.id} className="text-base font-medium cursor-pointer">
                              {item.label}
                            </Label>
                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className={getDifficultyColor(item.difficulty)}>
                                <Icon name="Gauge" size="xs" className="mr-1" aria-hidden="true" />
                                {item.difficulty === "easy"
                                  ? "Facile"
                                  : item.difficulty === "medium"
                                    ? "Moyen"
                                    : "Difficile"}
                              </Badge>
                              <Badge variant="outline" className={getImpactColor(item.impact)}>
                                <Icon name="TrendingUp" size="xs" className="mr-1" aria-hidden="true" />
                                Impact {item.impact === "low" ? "Faible" : item.impact === "medium" ? "Moyen" : "Élevé"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setCheckedItems([])
                }}
              >
                <Icon name="RefreshCw" size="sm" className="mr-2" aria-hidden="true" /> Réinitialiser
              </Button>
              <Button onClick={handleGeneratePDF}>
                <Icon name="FileText" size="sm" className="mr-2" aria-hidden="true" /> Générer un rapport
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Score Global</CardTitle>
              <CardDescription>Votre niveau de maturité DevOps</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold text-center">
                      <span className={getScoreColor(getTotalScore())}>{getTotalScore()}%</span>
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className={`${
                        getTotalScore() < 30
                          ? "text-red-500"
                          : getTotalScore() < 70
                            ? "text-yellow-500"
                            : "text-green-500"
                      } stroke-current`}
                      strokeWidth="10"
                      strokeDasharray={`${getTotalScore() * 2.51} 251`}
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <p className="text-center text-muted-foreground mt-4">
                  {checkedItems.length} sur {checklistItems.length} pratiques mises en place
                </p>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Niveau de maturité</h3>
                <div className="space-y-2">
                  {getTotalScore() < 30 && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-red-800 dark:text-red-300">
                        <Icon name="AlertTriangle" size="sm" aria-hidden="true" /> Débutant
                      </h4>
                      <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                        Vous êtes au début de votre parcours DevOps. Concentrez-vous sur les pratiques fondamentales
                        comme le contrôle de version, les builds automatisés et les tests.
                      </p>
                    </div>
                  )}

                  {getTotalScore() >= 30 && getTotalScore() < 70 && (
                    <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-yellow-800 dark:text-yellow-300">
                        <Icon name="AlertCircle" size="sm" aria-hidden="true" /> Intermédiaire
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                        Vous avez mis en place plusieurs bonnes pratiques DevOps. Continuez à améliorer votre pipeline
                        CI/CD et à renforcer votre infrastructure et votre monitoring.
                      </p>
                    </div>
                  )}

                  {getTotalScore() >= 70 && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                      <h4 className="font-medium flex items-center gap-2 text-green-800 dark:text-green-300">
                        <Icon name="CheckCircle" size="sm" aria-hidden="true" /> Avancé
                      </h4>
                      <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                        Félicitations ! Vous avez atteint un niveau de maturité DevOps élevé. Concentrez-vous maintenant
                        sur l'optimisation et l'innovation continue.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Scores par catégorie</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <IconText
                        name={category.icon as any}
                        text={category.name}
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => setActiveCategory(category.id)}
                      />
                      <div className="flex items-center gap-2">
                        <Progress
                          value={getCategoryScore(category.id)}
                          className="w-24 h-2"
                          indicatorClassName={
                            getCategoryScore(category.id) < 30
                              ? "bg-red-500"
                              : getCategoryScore(category.id) < 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        />
                        <span className={`text-sm font-medium ${getScoreColor(getCategoryScore(category.id))}`}>
                          {getCategoryScore(category.id)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ressources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Guides et Documentation</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link
                      href="https://devopschecklist.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1.5"
                    >
                      <Icon name="ExternalLink" size="xs" aria-hidden="true" /> The DevOps Checklist
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://cloud.google.com/devops"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1.5"
                    >
                      <Icon name="ExternalLink" size="xs" aria-hidden="true" /> Google Cloud DevOps
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://docs.microsoft.com/en-us/azure/devops/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1.5"
                    >
                      <Icon name="ExternalLink" size="xs" aria-hidden="true" /> Microsoft Azure DevOps
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Livres Recommandés</h3>
                <ul className="space-y-1 text-sm">
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1.5">
                      <Icon name="BookOpen" size="xs" aria-hidden="true" /> The DevOps Handbook
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1.5">
                      <Icon name="BookOpen" size="xs" aria-hidden="true" /> Accelerate: Building and Scaling High
                      Performing Technology Organizations
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-primary hover:underline flex items-center gap-1.5">
                      <Icon name="BookOpen" size="xs" aria-hidden="true" /> Site Reliability Engineering
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/contact">
                    <Icon name="Mail" size="sm" className="mr-2" aria-hidden="true" /> Demander une consultation
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative aspect-video rounded-md overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="DevOps Practices"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

