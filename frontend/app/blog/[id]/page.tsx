"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import ArticleRenderer from "@/components/ui/article-renderer"

export interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  image?: string
  date: string
  readTime: number
  categories?: string[]
  tags?: string[]
  author?: string
  authorImage?: string
  authorBio?: string
  date_created: string
}

export default function BlogPostClient({ id }: { id: number }) {
  const [post, setPost] = useState<Article | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<Article[]>([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8055/items/articles/${id}`)
        const data = await res.json()
        setPost(data.data || null)
      } catch (error) {
        console.error("Error fetching blog post:", error)
      }
    }

    const fetchRelatedPosts = async () => {
      try {
        const res = await fetch(`http://localhost:8055/items/articles`)
        const data = await res.json()
        setRelatedPosts(
          (data.data || []).filter((a: Article) => a.id !== id).slice(0, 4)
        )
      } catch (error) {
        console.error("Error fetching related posts:", error)
      }
    }

    fetchPost()
    fetchRelatedPosts()
  }, [id])

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <p className="mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          {post.categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category) => (
                <Badge key={category} variant="secondary" className="capitalize">
                  {category}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
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
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image
            alt={post.title}
            src={post.image ? `http://localhost:8055/assets/${post.image}` : "/placeholder.svg"}
            fill
            className="object-cover"
            priority
          />
        </div>

        <ArticleRenderer markdown={post.content} />

        {post.author && (
          <div className="border-t border-b py-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-full overflow-hidden">
                <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground">{post.authorBio}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Partager
          </Button>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      relatedPost.image
                        ? `http://localhost:8055/assets/${relatedPost.image}`
                        : "/placeholder.svg"
                    }
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {relatedPost.categories?.map((category) => (
                      <Badge key={category} variant="secondary" className="capitalize">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${relatedPost.id}`} className="hover:text-primary transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(relatedPost.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-16 text-center py-8 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Vous avez aimé cet article ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Abonnez-vous à ma newsletter pour recevoir mes derniers articles et actualités directement dans votre boîte
          mail.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button>S'abonner</Button>
        </div>
      </div>
    </div>
  )
}
