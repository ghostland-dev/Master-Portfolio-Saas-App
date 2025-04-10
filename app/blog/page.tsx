"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Calendar, Clock, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample blog posts data
const blogPosts = [
  {
    id: "understanding-microservices",
    title: "Comprendre l'Architecture Microservices",
    excerpt:
      "Une introduction aux principes fondamentaux de l'architecture microservices et comment elle peut bénéficier à vos projets.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-05-15",
    readTime: 8,
    author: "Ismail MOUYAHADA",
    categories: ["Architecture", "DevOps"],
    tags: ["microservices", "architecture", "cloud"],
  },
  {
    id: "react-performance-optimization",
    title: "Optimisation des Performances React",
    excerpt:
      "Techniques avancées pour améliorer les performances de vos applications React et offrir une meilleure expérience utilisateur.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-04-22",
    readTime: 12,
    author: "Ismail MOUYAHADA",
    categories: ["Frontend", "Performance"],
    tags: ["react", "javascript", "performance", "optimization"],
  },
  {
    id: "postgresql-vs-mongodb",
    title: "PostgreSQL vs MongoDB : Choisir la Bonne Base de Données",
    excerpt:
      "Analyse comparative entre PostgreSQL et MongoDB pour vous aider à choisir la solution la plus adaptée à votre projet.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-03-10",
    readTime: 10,
    author: "Ismail MOUYAHADA",
    categories: ["Bases de données"],
    tags: ["postgresql", "mongodb", "sql", "nosql", "database"],
  },
  {
    id: "ci-cd-best-practices",
    title: "Meilleures Pratiques CI/CD pour les Équipes DevOps",
    excerpt:
      "Guide complet des meilleures pratiques d'intégration et de déploiement continus pour améliorer votre workflow DevOps.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-02-18",
    readTime: 15,
    author: "Ismail MOUYAHADA",
    categories: ["DevOps", "CI/CD"],
    tags: ["devops", "ci/cd", "automation", "github-actions", "jenkins"],
  },
  {
    id: "nextjs-vs-nuxtjs",
    title: "Next.js vs Nuxt.js : Quel Framework Choisir en 2023",
    excerpt:
      "Comparaison détaillée entre Next.js et Nuxt.js pour vous aider à choisir le framework le plus adapté à votre prochain projet.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2023-01-25",
    readTime: 9,
    author: "Ismail MOUYAHADA",
    categories: ["Frontend", "Frameworks"],
    tags: ["nextjs", "nuxtjs", "react", "vue", "javascript"],
  },
  {
    id: "docker-kubernetes-introduction",
    title: "Introduction à Docker et Kubernetes",
    excerpt: "Guide du débutant pour comprendre et utiliser Docker et Kubernetes dans vos projets de développement.",
    content: "...",
    image: "/placeholder.svg?height=400&width=600",
    date: "2022-12-05",
    readTime: 14,
    author: "Ismail MOUYAHADA",
    categories: ["DevOps", "Containerisation"],
    tags: ["docker", "kubernetes", "containers", "devops", "cloud"],
  },
]

// Get all unique categories and tags
const allCategories = [...new Set(blogPosts.flatMap((post) => post.categories))]
const allTags = [...new Set(blogPosts.flatMap((post) => post.tags))]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedTag, setSelectedTag] = useState("")

  // Filter posts based on search, category, and tag
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategory === "all" || post.categories.includes(selectedCategory)

    const matchesTag = selectedTag === "" || post.tags.includes(selectedTag)

    return matchesSearch && matchesCategory && matchesTag
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Articles, tutoriels et réflexions sur le développement, DevOps et les technologies web
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="md:w-3/4">
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher des articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="all" onValueChange={setSelectedCategory}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                {allCategories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="space-y-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="md:flex">
                    <div className="relative h-60 md:h-auto md:w-1/3">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.map((category) => (
                          <Badge key={category} variant="secondary" className="capitalize">
                            {category}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-2xl font-bold mb-2">
                        <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h2>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(post.date).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          {post.readTime} min de lecture
                        </span>
                      </div>
                      <Button variant="outline" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Aucun article trouvé</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche ou de revenir plus tard pour de nouveaux contenus.
              </p>
            </div>
          )}
        </div>

        <div className="md:w-1/4 space-y-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Tags populaires</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Articles récents</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 3).map((post) => (
                  <div key={post.id} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-2">
                        <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="px-6 py-4 border-t">
              <Button variant="ghost" size="sm" className="w-full" asChild>
                <Link href="/blog">Voir tous les articles</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Abonnez-vous pour recevoir mes derniers articles et actualités directement dans votre boîte mail.
              </p>
              <Input placeholder="Votre adresse email" type="email" className="mb-4" />
              <Button className="w-full">S'abonner</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

