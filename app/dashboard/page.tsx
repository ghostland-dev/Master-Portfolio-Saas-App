"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Icon, IconText } from "@/components/ui/icon"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import {
  projects,
  messages,
  feedbacks,
  invoices,
  users,
  getClientProjects,
  getClientMessages,
  getClientInvoices,
  getClientFeedbacks,
} from "@/lib/auth-utils"

export default function DashboardPage() {
  const { user, isAdmin, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [dataLoaded, setDataLoaded] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [filteredMessages, setFilteredMessages] = useState<any[]>([])
  const [filteredFeedbacks, setFilteredFeedbacks] = useState<any[]>([])
  const [filteredInvoices, setFilteredInvoices] = useState<any[]>([])
  const [stats, setStats] = useState({
    activeProjects: 0,
    completedProjects: 0,
    totalClients: 0,
    unreadMessages: 0,
    totalRevenue: 0,
    pendingRevenue: 0,
  })

  // Charger les données une fois que l'utilisateur est authentifié
  useEffect(() => {
    if (isLoading) return

    if (user) {
      console.log("Chargement des données pour l'utilisateur:", user.name)

      try {
        // Filtrer les données en fonction du rôle de l'utilisateur
        const projectsData = isAdmin
          ? projects.filter(
              (project) =>
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                users
                  .find((u) => u.id === project.clientId)
                  ?.name.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                users
                  .find((u) => u.id === project.clientId)
                  ?.company?.toLowerCase()
                  .includes(searchQuery.toLowerCase()),
            )
          : getClientProjects(user.id).filter((project) =>
              project.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )

        const messagesData = isAdmin
          ? messages.filter(
              (message) =>
                message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                users
                  .find((u) => u.id === message.clientId)
                  ?.name.toLowerCase()
                  .includes(searchQuery.toLowerCase()) ||
                message.content.toLowerCase().includes(searchQuery.toLowerCase()),
            )
          : getClientMessages(user.id).filter(
              (message) =>
                message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                message.content.toLowerCase().includes(searchQuery.toLowerCase()),
            )

        const feedbacksData = isAdmin ? feedbacks : getClientFeedbacks(user.id)
        const invoicesData = isAdmin ? invoices : getClientInvoices(user.id)

        // Calculer les statistiques
        const statsData = {
          activeProjects: projectsData.filter((p) => p.status === "active").length,
          completedProjects: projectsData.filter((p) => p.status === "completed").length,
          totalClients: isAdmin ? users.filter((u) => u.role === "client").length : 1,
          unreadMessages: messagesData.filter((m) => !m.read).length,
          totalRevenue: invoicesData.filter((i) => i.status === "paid").reduce((sum, inv) => sum + inv.amount, 0),
          pendingRevenue: invoicesData
            .filter((i) => i.status === "sent" || i.status === "overdue")
            .reduce((sum, inv) => sum + inv.amount, 0),
        }

        // Mettre à jour l'état avec les données filtrées
        setFilteredProjects(projectsData)
        setFilteredMessages(messagesData)
        setFilteredFeedbacks(feedbacksData)
        setFilteredInvoices(invoicesData)
        setStats(statsData)
        setDataLoaded(true)

        console.log("Données chargées avec succès:", {
          projects: projectsData.length,
          messages: messagesData.length,
          feedbacks: feedbacksData.length,
          invoices: invoicesData.length,
        })
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      }
    }
  }, [user, isAdmin, isLoading, searchQuery])

  // Si les données sont en cours de chargement, afficher un indicateur
  if (isLoading || !dataLoaded) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
        <Icon name="Loader2" className="h-12 w-12 animate-spin text-primary mb-4" aria-hidden="true" />
        <p className="text-lg">Chargement de votre tableau de bord...</p>
      </div>
    )
  }

  // Si l'utilisateur n'est pas connecté, ne rien afficher (la redirection sera gérée par AuthProvider)
  if (!user) {
    return null
  }

  // Obtenir le statut du projet sous forme de badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "proposal":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Proposition
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            En cours
          </Badge>
        )
      case "review":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            En révision
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
            Terminé
          </Badge>
        )
      case "on-hold":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            En pause
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Obtenir la priorité du message sous forme de badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Faible
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Moyenne
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Haute
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  // Obtenir le statut de la facture sous forme de badge
  const getInvoiceStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Brouillon
          </Badge>
        )
      case "sent":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Envoyée
          </Badge>
        )
      case "paid":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Payée
          </Badge>
        )
      case "overdue":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            En retard
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  // Formater la date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("fr-FR", options)
  }

  // Formater la date et l'heure
  const formatDateTime = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateTimeString).toLocaleDateString("fr-FR", options)
  }

  // Obtenir le nom du client à partir de son ID
  const getClientName = (clientId: string) => {
    const client = users.find((u) => u.id === clientId)
    return client ? client.name : "Client inconnu"
  }

  // Obtenir la société du client à partir de son ID
  const getClientCompany = (clientId: string) => {
    const client = users.find((u) => u.id === clientId)
    return client?.company || ""
  }

  // Obtenir l'avatar du client à partir de son ID
  const getClientAvatar = (clientId: string) => {
    const client = users.find((u) => u.id === clientId)
    return client?.avatar
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">{isAdmin ? "Espace Administration" : "Mon Espace Client"}</h1>
          <p className="text-muted-foreground mt-2">
            {isAdmin
              ? "Gérez vos projets, clients et communications en un seul endroit"
              : `Bienvenue, ${user?.name}. Suivez vos projets et communications`}
          </p>
        </div>

        <div className="w-full md:w-auto">
          <Input
            placeholder="Rechercher projets, clients, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[300px]"
          />
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projets Actifs</p>
                <h3 className="text-2xl font-bold mt-1">{stats.activeProjects}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Briefcase" className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Projets Terminés</p>
                <h3 className="text-2xl font-bold mt-1">{stats.completedProjects}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <Icon name="CheckCircle" className="h-6 w-6 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Messages Non Lus</p>
                <h3 className="text-2xl font-bold mt-1">{stats.unreadMessages}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Icon name="Mail" className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenus (€)</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Icon name="DollarSign" className="h-6 w-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
          <TabsTrigger value="projects" className="flex items-center gap-1.5">
            <Icon name="Briefcase" size="sm" aria-hidden="true" /> Projets
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-1.5">
            <Icon name="Mail" size="sm" aria-hidden="true" /> Messages
            {stats.unreadMessages > 0 && (
              <Badge className="ml-1 bg-primary text-primary-foreground">{stats.unreadMessages}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-1.5">
            <Icon name="MessageSquare" size="sm" aria-hidden="true" /> Retours Clients
          </TabsTrigger>
          <TabsTrigger value="invoices" className="flex items-center gap-1.5">
            <Icon name="Receipt" size="sm" aria-hidden="true" /> Factures
          </TabsTrigger>
        </TabsList>

        {/* Projets */}
        <TabsContent value="projects" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Projets en cours</CardTitle>
                  <CardDescription>Suivez l'avancement de vos projets actifs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {filteredProjects.length > 0 ? (
                      filteredProjects
                        .filter((project) => project.status === "active" || project.status === "review")
                        .map((project) => (
                          <div key={project.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{project.title}</h3>
                                  {getStatusBadge(project.status)}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Client: {getClientName(project.clientId)} ({getClientCompany(project.clientId)})
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/dashboard/projects/${project.id}`}>
                                    <Icon name="Eye" size="sm" className="mr-1" aria-hidden="true" /> Détails
                                  </Link>
                                </Button>
                                <Button size="sm" asChild>
                                  <Link href={`/dashboard/projects/${project.id}/edit`}>
                                    <Icon name="PenLine" size="sm" className="mr-1" aria-hidden="true" /> Modifier
                                  </Link>
                                </Button>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progression</span>
                                <span>{project.progress}%</span>
                              </div>
                              <Progress value={project.progress} className="h-2" />
                            </div>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
                              <IconText
                                name="Calendar"
                                text={`${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
                                size="xs"
                                variant="outline"
                              />
                              <IconText
                                name="DollarSign"
                                text={`${project.budget.toLocaleString()} €`}
                                size="xs"
                                variant="outline"
                              />
                              <IconText name="Tag" text={project.type} size="xs" variant="outline" />
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8">
                        <Icon name="Search" className="h-8 w-8 text-muted-foreground mx-auto mb-2" aria-hidden="true" />
                        <p className="text-muted-foreground">Aucun projet trouvé</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href="/dashboard/projects/new">
                      <Icon name="Plus" size="sm" className="mr-2" aria-hidden="true" /> Nouveau Projet
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Projets par statut</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { status: "proposal", label: "Proposition", icon: "FileText" },
                      { status: "active", label: "En cours", icon: "Play" },
                      { status: "review", label: "En révision", icon: "FileSearch" },
                      { status: "completed", label: "Terminé", icon: "CheckCircle" },
                      { status: "on-hold", label: "En pause", icon: "Pause" },
                    ].map((item) => (
                      <div key={item.status} className="flex items-center justify-between">
                        <IconText name={item.icon as any} text={item.label} size="sm" variant="outline" />
                        <Badge variant="outline">
                          {filteredProjects.filter((p) => p.status === item.status).length}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {isAdmin && (
                <Card>
                  <CardHeader>
                    <CardTitle>Clients récents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {users
                        .filter((u) => u.role === "client")
                        .slice(0, 4)
                        .map((client) => (
                          <div key={client.id} className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={client.avatar} alt={client.name} />
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{client.name}</p>
                              <p className="text-sm text-muted-foreground">{client.company}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/dashboard/clients">
                        <Icon name="Users" size="sm" className="mr-2" aria-hidden="true" /> Voir tous les clients
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        {/* Messages */}
        <TabsContent value="messages" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                {isAdmin ? "Gérez vos communications avec les clients" : "Vos communications avec nous"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`border rounded-lg p-4 hover:bg-accent/50 transition-colors ${
                        !message.read ? "border-primary/50 bg-primary/5" : ""
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={message.fromClient ? getClientAvatar(message.clientId) : user?.avatar}
                              alt={message.fromClient ? getClientName(message.clientId) : user?.name || ""}
                            />
                            <AvatarFallback>
                              {message.fromClient
                                ? getClientName(message.clientId).charAt(0)
                                : user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">
                              {message.fromClient
                                ? isAdmin
                                  ? getClientName(message.clientId)
                                  : "Vous"
                                : isAdmin
                                  ? "Vous"
                                  : "Ismail MOUYAHADA"}
                            </p>
                            <p className="text-sm text-muted-foreground">{formatDateTime(message.date)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!message.read && (
                            <Badge variant="default" className="bg-primary text-primary-foreground">
                              Nouveau
                            </Badge>
                          )}
                          {getPriorityBadge(message.priority)}
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mt-2">{message.subject}</h3>
                      <p className="text-muted-foreground mt-2">{message.content}</p>
                      <div className="flex justify-end mt-4 gap-2">
                        <Button variant="outline" size="sm">
                          <Icon name="MailCheck" size="sm" className="mr-1" aria-hidden="true" /> Marquer comme lu
                        </Button>
                        <Button size="sm">
                          <Icon name="Reply" size="sm" className="mr-1" aria-hidden="true" /> Répondre
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon name="Search" className="h-8 w-8 text-muted-foreground mx-auto mb-2" aria-hidden="true" />
                    <p className="text-muted-foreground">Aucun message trouvé</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href="/dashboard/messages/compose">
                  <Icon name="PenLine" size="sm" className="mr-2" aria-hidden="true" /> Nouveau Message
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Retours Clients */}
        <TabsContent value="feedback" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Retours et témoignages</CardTitle>
              <CardDescription>
                {isAdmin ? "Consultez les avis et commentaires de vos clients" : "Vos avis sur nos services"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredFeedbacks.length > 0 ? (
                  filteredFeedbacks.map((feedback) => (
                    <div key={feedback.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={getClientAvatar(feedback.clientId)}
                              alt={getClientName(feedback.clientId)}
                            />
                            <AvatarFallback>{getClientName(feedback.clientId).charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{isAdmin ? getClientName(feedback.clientId) : "Vous"}</p>
                            <p className="text-sm text-muted-foreground">{getClientCompany(feedback.clientId)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Icon
                                key={i}
                                name="Star"
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? "text-yellow-400" : "text-muted-foreground/30"
                                }`}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          {feedback.public ? (
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            >
                              Public
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            >
                              Privé
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Projet: <span className="font-medium text-foreground">{feedback.projectTitle}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mb-3">
                          Date: <span className="font-medium text-foreground">{formatDate(feedback.date)}</span>
                        </p>
                        <p className="italic">{feedback.comment}</p>
                      </div>
                      <div className="flex justify-end mt-4 gap-2">
                        {isAdmin && !feedback.public && (
                          <Button variant="outline" size="sm">
                            <Icon name="Globe" size="sm" className="mr-1" aria-hidden="true" /> Rendre public
                          </Button>
                        )}
                        {isAdmin && (
                          <Button size="sm">
                            <Icon name="ThumbsUp" size="sm" className="mr-1" aria-hidden="true" /> Remercier
                          </Button>
                        )}
                        {!isAdmin && (
                          <Button variant="outline" size="sm">
                            <Icon name="PenLine" size="sm" className="mr-1" aria-hidden="true" /> Modifier
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Icon
                      name="MessageSquare"
                      className="h-8 w-8 text-muted-foreground mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <p className="text-muted-foreground">Aucun retour client pour le moment</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              {isAdmin ? (
                <Button asChild>
                  <Link href="/dashboard/feedback/request">
                    <Icon name="MessageSquare" size="sm" className="mr-2" aria-hidden="true" /> Demander un avis
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/dashboard/feedback/new">
                    <Icon name="PenLine" size="sm" className="mr-2" aria-hidden="true" /> Laisser un avis
                  </Link>
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Factures */}
        <TabsContent value="invoices" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Factures récentes</CardTitle>
                  <CardDescription>Suivez vos factures et paiements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">N°</th>
                          {isAdmin && <th className="text-left py-3 px-2">Client</th>}
                          <th className="text-left py-3 px-2">Projet</th>
                          <th className="text-left py-3 px-2">Montant</th>
                          <th className="text-left py-3 px-2">Date</th>
                          <th className="text-left py-3 px-2">Statut</th>
                          <th className="text-left py-3 px-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredInvoices.map((invoice) => (
                          <tr key={invoice.id} className="border-b hover:bg-accent/50 transition-colors">
                            <td className="py-3 px-2 font-medium">{invoice.id}</td>
                            {isAdmin && <td className="py-3 px-2">{getClientName(invoice.clientId)}</td>}
                            <td className="py-3 px-2">{invoice.projectTitle}</td>
                            <td className="py-3 px-2">{invoice.amount.toLocaleString()} €</td>
                            <td className="py-3 px-2">{formatDate(invoice.date)}</td>
                            <td className="py-3 px-2">{getInvoiceStatusBadge(invoice.status)}</td>
                            <td className="py-3 px-2">
                              <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon">
                                  <Icon name="Eye" size="sm" aria-hidden="true" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Icon name="Download" size="sm" aria-hidden="true" />
                                </Button>
                                {isAdmin && (
                                  <Button variant="ghost" size="icon">
                                    <Icon name="PenLine" size="sm" aria-hidden="true" />
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                {isAdmin && (
                  <CardFooter>
                    <Button asChild>
                      <Link href="/dashboard/invoices/new">
                        <Icon name="FilePlus" size="sm" className="mr-2" aria-hidden="true" /> Nouvelle Facture
                      </Link>
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Résumé financier</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Revenus totaux</p>
                      <p className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} €</p>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground">En attente de paiement</p>
                      <p className="text-2xl font-bold">{stats.pendingRevenue.toLocaleString()} €</p>
                    </div>
                    <Separator />
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Factures par statut</span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { status: "draft", label: "Brouillon" },
                          { status: "sent", label: "Envoyée" },
                          { status: "paid", label: "Payée" },
                          { status: "overdue", label: "En retard" },
                        ].map((item) => (
                          <div key={item.status} className="flex justify-between items-center">
                            <span className="text-sm">{item.label}</span>
                            <Badge variant="outline">
                              {filteredInvoices.filter((i) => i.status === item.status).length}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {isAdmin && (
                <Card>
                  <CardHeader>
                    <CardTitle>Actions rapides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/dashboard/invoices/new">
                          <Icon name="FilePlus" size="sm" className="mr-2" aria-hidden="true" /> Créer une facture
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/dashboard/reports/financial">
                          <Icon name="BarChart" size="sm" className="mr-2" aria-hidden="true" /> Rapport financier
                        </Link>
                      </Button>
                      <Button variant="outline" className="w-full justify-start" asChild>
                        <Link href="/dashboard/invoices/reminders">
                          <Icon name="Bell" size="sm" className="mr-2" aria-hidden="true" /> Envoyer des rappels
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

