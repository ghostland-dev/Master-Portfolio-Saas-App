"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Icon } from "@/components/ui/icon"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  const router = useRouter()
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    service: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormState((prev) => ({ ...prev, budget: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Une erreur s'est produite lors de l'envoi du message")
      }

      setIsSuccess(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        service: "",
        budget: "",
      })
    } catch (err: any) {
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">Contact</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Discutons de votre projet</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Formulaire de contact</CardTitle>
              <CardDescription>
                Remplissez ce formulaire et je vous répondrai dans les plus brefs délais
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/30">
                  <Icon name="CheckCircle" className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Message envoyé avec succès !</AlertTitle>
                  <AlertDescription>
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        required
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="votre@email.com"
                        required
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Sujet de votre message"
                      required
                      value={formState.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service requis</Label>
                    <Select
                      name="service"
                      value={formState.service}
                      onValueChange={(value) => setFormState((prev) => ({ ...prev, service: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">Développement web</SelectItem>
                        <SelectItem value="mobile-development">Développement mobile</SelectItem>
                        <SelectItem value="devops">Services DevOps</SelectItem>
                        <SelectItem value="consulting">Conseil technique</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Budget estimé</Label>
                    <RadioGroup
                      value={formState.budget}
                      onValueChange={handleRadioChange}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="less-than-5k" id="less-than-5k" />
                        <Label htmlFor="less-than-5k" className="font-normal">
                          Moins de 5 000 €
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5k-10k" id="5k-10k" />
                        <Label htmlFor="5k-10k" className="font-normal">
                          5 000 € - 10 000 €
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10k-20k" id="10k-20k" />
                        <Label htmlFor="10k-20k" className="font-normal">
                          10 000 € - 20 000 €
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="more-than-20k" id="more-than-20k" />
                        <Label htmlFor="more-than-20k" className="font-normal">
                          Plus de 20 000 €
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-sure" id="not-sure" />
                        <Label htmlFor="not-sure" className="font-normal">
                          Je ne sais pas encore
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Décrivez votre projet ou votre demande"
                      rows={5}
                      required
                      value={formState.message}
                      onChange={handleChange}
                    />
                  </div>

                  {isError && (
                    <Alert variant="destructive">
                      <Icon name="AlertCircle" className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>
                        Une erreur s'est produite lors de l'envoi de votre message. Veuillez réessayer.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" className="mr-2 h-4 w-4" aria-hidden="true" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informations de contact</CardTitle>
              <CardDescription>Vous pouvez également me contacter directement via ces canaux</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon name="Mail" className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@ismailmouyahada.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon name="Phone" className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">Téléphone</h3>
                  <p className="text-muted-foreground">+33 6 12 34 56 78</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon name="MapPin" className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">Localisation</h3>
                  <p className="text-muted-foreground">Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Icon name="Clock" className="h-5 w-5 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-medium">Disponibilité</h3>
                  <p className="text-muted-foreground">Lundi - Vendredi, 9h - 18h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Réseaux sociaux</CardTitle>
              <CardDescription>Retrouvez-moi sur les réseaux sociaux</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="lg" asChild className="flex-1">
                  <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Icon name="Github" className="mr-2 h-4 w-4" aria-hidden="true" />
                    GitHub
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="flex-1">
                  <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Icon name="Linkedin" className="mr-2 h-4 w-4" aria-hidden="true" />
                    LinkedIn
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="flex-1">
                  <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Icon name="Twitter" className="mr-2 h-4 w-4" aria-hidden="true" />
                    Twitter
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Espace de travail"
              fill
              className="object-cover image-filter"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Questions fréquentes</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quel est votre processus de travail ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Mon processus commence par une phase de découverte pour comprendre vos besoins, suivie par la
                conception, le développement itératif et le déploiement. Je privilégie une approche agile avec des
                feedbacks réguliers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Quels sont vos délais de réalisation ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les délais varient selon la complexité du projet. Un site vitrine peut prendre 2-4 semaines, tandis
                qu'une application web complexe peut nécessiter 2-3 mois. Je fournis toujours une estimation précise
                après notre première discussion.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Proposez-vous un support après-projet ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Oui, je propose des contrats de maintenance et de support pour tous mes projets. Cela inclut les mises à
                jour de sécurité, les corrections de bugs et les petites améliorations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Comment se déroule la facturation ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Je propose généralement un paiement en trois fois : 30% à la signature du contrat, 30% à mi-parcours et
                40% à la livraison. Pour les projets plus importants, nous pouvons établir un échéancier personnalisé.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/faq">
              Voir toutes les FAQ <Icon name="ArrowRight" className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

