// Types pour l'authentification
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "client"
  company?: string
  avatar?: string
  phone?: string
}

// Utilisateurs simulés pour la démonstration
export const users: User[] = [
  {
    id: "admin1",
    email: "ismail@mouyahada.fr",
    name: "Ismail MOUYAHADA",
    role: "admin",
    avatar: "/images/profile.webp",
    phone: "+33 6 12 34 56 78",
  },
  {
    id: "client1",
    email: "marie.dupont@retailtech.com",
    name: "Marie Dupont",
    role: "client",
    company: "RetailTech Solutions",
    avatar: "https://i.pravatar.cc/150?u=marie",
    phone: "+33 6 12 34 56 78",
  },
  {
    id: "client2",
    email: "jean.martin@globalservices.com",
    name: "Jean Martin",
    role: "client",
    company: "Global Services Inc.",
    avatar: "https://i.pravatar.cc/150?u=jean",
    phone: "+33 6 23 45 67 89",
  },
  {
    id: "client3",
    email: "sophie.legrand@techstart.fr",
    name: "Sophie Legrand",
    role: "client",
    company: "TechStart SAS",
    avatar: "https://i.pravatar.cc/150?u=sophie",
    phone: "+33 6 34 56 78 90",
  },
  {
    id: "client4",
    email: "thomas.bernard@innovatecorp.com",
    name: "Thomas Bernard",
    role: "client",
    company: "InnovateCorp",
    avatar: "https://i.pravatar.cc/150?u=thomas",
    phone: "+33 6 45 67 89 01",
  },
  {
    id: "client5",
    email: "camille.petit@digitalwave.fr",
    name: "Camille Petit",
    role: "client",
    company: "DigitalWave",
    avatar: "https://i.pravatar.cc/150?u=camille",
    phone: "+33 6 56 78 90 12",
  },
]

// Clé pour le stockage des données utilisateur
const USER_STORAGE_KEY = "portfolio_auth_user"

// Fonction pour simuler la connexion
export const login = (email: string, password: string): User | null => {
  // Dans un environnement réel, vous vérifieriez le mot de passe avec un hash
  // Pour cette démo, nous acceptons n'importe quel mot de passe
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase())

  if (user) {
    // Stocker l'utilisateur dans le localStorage
    try {
      const userJson = JSON.stringify(user)
      localStorage.setItem(USER_STORAGE_KEY, userJson)

      // Vérifier que les données ont été correctement stockées
      const storedData = localStorage.getItem(USER_STORAGE_KEY)
      if (!storedData || storedData !== userJson) {
        console.error("Échec du stockage des données utilisateur")
        return null
      }

      console.log("Utilisateur connecté avec succès:", user.email)
    } catch (error) {
      console.error("Erreur lors du stockage des données utilisateur:", error)
      return null
    }
  }

  return user
}

// Fonction pour vérifier si l'utilisateur est connecté
export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false

  try {
    const userJson = localStorage.getItem(USER_STORAGE_KEY)
    if (!userJson || userJson === "undefined" || userJson === "") {
      return false
    }

    // Vérifier que les données sont un objet JSON valide avec un ID
    const user = JSON.parse(userJson)
    return !!(user && user.id && user.email)
  } catch (error) {
    console.error("Erreur lors de la vérification de l'authentification:", error)
    return false
  }
}

// Fonction pour obtenir l'utilisateur actuel
export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  try {
    const userJson = localStorage.getItem(USER_STORAGE_KEY)
    if (!userJson || userJson === "undefined" || userJson === "") {
      return null
    }

    const user = JSON.parse(userJson)
    if (!user || !user.id || !user.email) {
      localStorage.removeItem(USER_STORAGE_KEY) // Nettoyer les données invalides
      return null
    }

    return user
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur:", error)
    localStorage.removeItem(USER_STORAGE_KEY) // Nettoyer en cas d'erreur
    return null
  }
}

// Fonction pour définir l'utilisateur actuel
export const setCurrentUser = (user: User): boolean => {
  if (typeof window === "undefined") return false

  try {
    if (!user || !user.id || !user.email) {
      console.warn("Tentative de stockage de données utilisateur invalides")
      return false
    }

    const userJson = JSON.stringify(user)
    localStorage.setItem(USER_STORAGE_KEY, userJson)

    // Vérifier que les données ont été correctement stockées
    const storedData = localStorage.getItem(USER_STORAGE_KEY)
    if (!storedData || storedData !== userJson) {
      console.warn("Échec du stockage des données utilisateur")
      return false
    }

    console.log("Utilisateur stocké avec succès:", user.email)
    return true
  } catch (error) {
    console.error("Erreur lors du stockage des données utilisateur:", error)
    return false
  }
}

// Fonction pour rafraîchir l'état d'authentification
export const refreshAuthState = () => {
  try {
    const isLoggedIn = isAuthenticated()
    const user = isLoggedIn ? getCurrentUser() : null

    return {
      isAuthenticated: isLoggedIn,
      user,
    }
  } catch (error) {
    console.error("Erreur lors du rafraîchissement de l'état d'authentification:", error)
    return {
      isAuthenticated: false,
      user: null,
    }
  }
}

// Fonction pour déconnecter l'utilisateur
export const logout = (): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.removeItem(USER_STORAGE_KEY)
    console.log("Utilisateur déconnecté avec succès")
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
  }
}

// Fonction pour vérifier si l'utilisateur est administrateur
export const isAdmin = (): boolean => {
  const user = getCurrentUser()
  return user?.role === "admin"
}

// Fonction pour vérifier si l'utilisateur est un client
export const isClient = (): boolean => {
  const user = getCurrentUser()
  return user?.role === "client"
}

// Fonction pour obtenir les projets associés à un client
export const getClientProjects = (clientId: string) => {
  return projects.filter((project) => project.clientId === clientId)
}

// Fonction pour obtenir les messages associés à un client
export const getClientMessages = (clientId: string) => {
  return messages.filter((message) => message.clientId === clientId)
}

// Fonction pour obtenir les factures associées à un client
export const getClientInvoices = (clientId: string) => {
  return invoices.filter((invoice) => invoice.clientId === clientId)
}

// Fonction pour obtenir les retours associés à un client
export const getClientFeedbacks = (clientId: string) => {
  return feedbacks.filter((feedback) => feedback.clientId === clientId)
}

// Types pour les données
interface Project {
  id: string
  title: string
  description: string
  clientId: string
  status: "proposal" | "active" | "review" | "completed" | "on-hold"
  progress: number
  startDate: string
  endDate: string
  budget: number
  type: string
}

interface Message {
  id: string
  clientId: string
  date: string
  subject: string
  content: string
  read: boolean
  priority: "low" | "medium" | "high"
  fromClient: boolean
}

interface Feedback {
  id: string
  clientId: string
  projectId: string
  projectTitle: string
  rating: number
  comment: string
  date: string
  public: boolean
}

interface Invoice {
  id: string
  clientId: string
  projectId: string
  projectTitle: string
  amount: number
  date: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
}

// Données simulées
export const projects: Project[] = [
  {
    id: "project1",
    title: "E-commerce Platform",
    description: "Développement d'une plateforme e-commerce complète avec panier, paiement et gestion des commandes.",
    clientId: "client1",
    status: "active",
    progress: 65,
    startDate: "2023-03-15",
    endDate: "2023-07-30",
    budget: 25000,
    type: "web",
  },
  {
    id: "project2",
    title: "CRM Dashboard",
    description: "Tableau de bord CRM pour la gestion des clients et des ventes.",
    clientId: "client2",
    status: "review",
    progress: 90,
    startDate: "2023-01-10",
    endDate: "2023-05-20",
    budget: 18000,
    type: "web",
  },
  {
    id: "project3",
    title: "DevOps Pipeline",
    description: "Mise en place d'un pipeline CI/CD pour le déploiement automatisé d'applications.",
    clientId: "client3",
    status: "completed",
    progress: 100,
    startDate: "2022-11-05",
    endDate: "2023-02-28",
    budget: 15000,
    type: "devops",
  },
  {
    id: "project4",
    title: "Mobile Banking App",
    description: "Application mobile de services bancaires avec authentification sécurisée.",
    clientId: "client4",
    status: "proposal",
    progress: 0,
    startDate: "2023-06-01",
    endDate: "2023-11-30",
    budget: 35000,
    type: "mobile",
  },
  {
    id: "project5",
    title: "Data Analytics Platform",
    description: "Plateforme d'analyse de données en temps réel pour le suivi des performances.",
    clientId: "client5",
    status: "on-hold",
    progress: 40,
    startDate: "2023-02-15",
    endDate: "2023-08-15",
    budget: 28000,
    type: "data",
  },
]

export const messages: Message[] = [
  {
    id: "msg1",
    clientId: "client1",
    date: "2023-05-18T14:30:00",
    subject: "Question sur la fonctionnalité de panier",
    content:
      "Bonjour, j'aimerais savoir s'il est possible d'ajouter une fonctionnalité de sauvegarde de panier pour les utilisateurs non connectés. Merci d'avance pour votre réponse.",
    read: false,
    priority: "medium",
    fromClient: true,
  },
  {
    id: "msg2",
    clientId: "client2",
    date: "2023-05-17T09:15:00",
    subject: "Validation des maquettes",
    content:
      "Bonjour, nous avons examiné les maquettes que vous nous avez envoyées et nous les validons. Nous avons quelques commentaires mineurs que nous vous enverrons par email séparé. Cordialement.",
    read: true,
    priority: "high",
    fromClient: true,
  },
  {
    id: "msg3",
    clientId: "client3",
    date: "2023-05-16T16:45:00",
    subject: "Problème avec le déploiement",
    content:
      "Nous rencontrons un problème avec le déploiement automatique. Le pipeline échoue à l'étape de test. Pouvez-vous jeter un œil dès que possible ? Merci.",
    read: true,
    priority: "high",
    fromClient: true,
  },
  {
    id: "msg4",
    clientId: "client4",
    date: "2023-05-15T11:20:00",
    subject: "Demande de devis pour phase 2",
    content:
      "Suite à notre discussion de la semaine dernière, pourriez-vous nous préparer un devis pour la phase 2 du projet ? Nous aimerions ajouter les fonctionnalités discutées lors de notre dernière réunion.",
    read: false,
    priority: "medium",
    fromClient: true,
  },
  {
    id: "msg5",
    clientId: "client5",
    date: "2023-05-14T15:10:00",
    subject: "Report de la réunion",
    content:
      "Je dois malheureusement reporter notre réunion prévue demain. Seriez-vous disponible vendredi à la même heure ? Désolé pour ce changement de dernière minute.",
    read: true,
    priority: "low",
    fromClient: true,
  },
  {
    id: "msg6",
    clientId: "client1",
    date: "2023-05-13T10:30:00",
    subject: "Réponse: Question sur la fonctionnalité de panier",
    content:
      "Bonjour Marie, Oui, il est tout à fait possible d'ajouter cette fonctionnalité. Nous pouvons utiliser le stockage local du navigateur pour sauvegarder le panier des utilisateurs non connectés. Je vais ajouter cette tâche au backlog du projet. Cordialement, Ismail",
    read: true,
    priority: "medium",
    fromClient: false,
  },
]

export const feedbacks: Feedback[] = [
  {
    id: "feedback1",
    clientId: "client3",
    projectId: "project3",
    projectTitle: "DevOps Pipeline",
    rating: 5,
    comment:
      "Ismail a révolutionné notre processus de déploiement. Nous pouvons maintenant déployer plusieurs fois par jour avec confiance, ce qui nous donne un avantage concurrentiel significatif.",
    date: "2023-03-10",
    public: true,
  },
  {
    id: "feedback2",
    clientId: "client1",
    projectId: "project1",
    projectTitle: "E-commerce Platform",
    rating: 4,
    comment:
      "Le travail sur notre plateforme e-commerce avance bien. L'équipe est réactive et professionnelle. Quelques délais ont été un peu plus longs que prévu, mais la qualité est au rendez-vous.",
    date: "2023-05-05",
    public: false,
  },
  {
    id: "feedback3",
    clientId: "client2",
    projectId: "project2",
    projectTitle: "CRM Dashboard",
    rating: 5,
    comment:
      "Le CRM développé par Ismail a transformé notre façon de travailler. L'interface intuitive et les fonctionnalités d'analyse nous permettent de prendre de meilleures décisions commerciales.",
    date: "2023-04-28",
    public: true,
  },
]

export const invoices: Invoice[] = [
  {
    id: "inv001",
    clientId: "client1",
    projectId: "project1",
    projectTitle: "E-commerce Platform",
    amount: 10000,
    date: "2023-03-15",
    dueDate: "2023-04-15",
    status: "paid",
  },
  {
    id: "inv002",
    clientId: "client1",
    projectId: "project1",
    projectTitle: "E-commerce Platform",
    amount: 7500,
    date: "2023-05-01",
    dueDate: "2023-06-01",
    status: "sent",
  },
  {
    id: "inv003",
    clientId: "client2",
    projectId: "project2",
    projectTitle: "CRM Dashboard",
    amount: 9000,
    date: "2023-01-10",
    dueDate: "2023-02-10",
    status: "paid",
  },
  {
    id: "inv004",
    clientId: "client2",
    projectId: "project2",
    projectTitle: "CRM Dashboard",
    amount: 9000,
    date: "2023-03-15",
    dueDate: "2023-04-15",
    status: "paid",
  },
  {
    id: "inv005",
    clientId: "client3",
    projectId: "project3",
    projectTitle: "DevOps Pipeline",
    amount: 15000,
    date: "2022-11-05",
    dueDate: "2022-12-05",
    status: "paid",
  },
  {
    id: "inv006",
    clientId: "client5",
    projectId: "project5",
    projectTitle: "Data Analytics Platform",
    amount: 14000,
    date: "2023-02-15",
    dueDate: "2023-03-15",
    status: "overdue",
  },
]

