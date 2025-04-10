"use client"

import { AlertTitle } from "@/components/ui/alert"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState("impression")
  const [rating, setRating] = useState<string | null>(null)
  const [comment, setComment] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    try {
      // Simuler un appel API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // En production, remplacer par un vrai appel API
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ feedbackType, rating, comment, email, name }),
      // })

      setIsSuccess(true)
      resetForm()
    } catch (error) {
      setIsError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFeedbackType("impression")
    setRating(null)
    setComment("")
    setEmail("")
    setName("")
  }

  const handleClose = () => {
    setOpen(false)
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 500)
    }
  }

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 left-4 z-50 rounded-full h-12 w-12 shadow-lg bg-background border-primary"
        onClick={() => setOpen(true)}
        aria-label="Donner votre avis"
      >
        <Icon name="MessageSquare" className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Votre avis nous intéresse</DialogTitle>
            <DialogDescription>Partagez vos impressions, suggestions ou signaler un problème</DialogDescription>
          </DialogHeader>

          {isSuccess ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Icon name="CheckCircle" className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-medium">Merci pour votre retour !</h3>
              <p className="text-muted-foreground">Votre avis est précieux et nous aide à améliorer notre service.</p>
              <Button onClick={handleClose} className="mt-2">
                Fermer
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Tabs defaultValue="impression" onValueChange={setFeedbackType}>
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="impression">Impression</TabsTrigger>
                  <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
                  <TabsTrigger value="probleme">Problème</TabsTrigger>
                </TabsList>

                <TabsContent value="impression" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Quelle est votre impression générale ?</Label>
                    <div className="flex justify-between py-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setRating(value.toString())}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            rating === value.toString()
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80"
                          }`}
                          aria-label={`Note de ${value} sur 5`}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="impression-comment">Commentaire (optionnel)</Label>
                    <Textarea
                      id="impression-comment"
                      placeholder="Partagez votre expérience..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="suggestion" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="suggestion-comment">Votre suggestion</Label>
                    <Textarea
                      id="suggestion-comment"
                      placeholder="Décrivez votre idée ou suggestion..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="probleme" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Type de problème</Label>
                    <RadioGroup value={rating || ""} onValueChange={setRating} className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="technique" id="problem-technical" />
                        <Label htmlFor="problem-technical" className="font-normal">
                          Problème technique
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="contenu" id="problem-content" />
                        <Label htmlFor="problem-content" className="font-normal">
                          Problème de contenu
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="accessibilite" id="problem-accessibility" />
                        <Label htmlFor="problem-accessibility" className="font-normal">
                          Problème d'accessibilité
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="autre" id="problem-other" />
                        <Label htmlFor="problem-other" className="font-normal">
                          Autre
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="problem-comment">Description du problème</Label>
                    <Textarea
                      id="problem-comment"
                      placeholder="Décrivez le problème rencontré..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={4}
                      required
                    />
                  </div>
                </TabsContent>

                <div className="space-y-4 mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedback-name">Nom (optionnel)</Label>
                      <Input
                        id="feedback-name"
                        placeholder="Votre nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-email">Email (optionnel)</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        placeholder="votre@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {isError && (
                    <Alert variant="destructive">
                      <Icon name="AlertCircle" className="h-4 w-4" />
                      <AlertTitle>Erreur</AlertTitle>
                      <AlertDescription>Une erreur s'est produite. Veuillez réessayer.</AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Icon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
                          Envoi...
                        </>
                      ) : (
                        "Envoyer"
                      )}
                    </Button>
                  </div>
                </div>
              </Tabs>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

