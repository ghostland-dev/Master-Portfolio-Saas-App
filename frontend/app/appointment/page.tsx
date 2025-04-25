"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { DayPicker } from "react-day-picker"
import { CheckCircle } from "lucide-react"

export default function AppointmentPage() {
  const { toast } = useToast()

  const [date, setDate] = useState<Date | undefined>(undefined)
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    details: "",
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !timeSlot) {
      setIsSubmitting(false)
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une date et un créneau horaire.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const res = await fetch("http://localhost:8055/items/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: date.toISOString(),
          timeSlot,
        }),
      })

      if (!res.ok) throw new Error("Erreur lors de l'envoi")

      toast({
        title: "Rendez-vous demandé",
        description: `Votre demande pour le ${date.toLocaleDateString()} à ${timeSlot} a été envoyée.`,
      })

      setIsSubmitted(true)
    } catch (err) {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la demande. Réessayez plus tard.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const timeSlots = Array.from({ length: 9 }, (_, i) => `${i + 9}:00`)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">Prendre rendez-vous</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Réservez un créneau pour discuter de votre projet
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Demande de rendez-vous</CardTitle>
          <CardDescription>
            {isSubmitted
              ? "Merci pour votre demande !"
              : "Sélectionnez une date et un créneau horaire qui vous conviennent."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <CheckCircle className="h-12 w-12 text-green-500" />
              <p className="text-xl font-medium text-center">
                Votre demande a bien été envoyée. Nous reviendrons vers vous rapidement.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Sélectionnez une date</Label>
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      footer={
                        date
                          ? `Sélectionné : ${date.toLocaleDateString()}`
                          : "Choisissez une date"
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Sélectionnez un créneau horaire</Label>
                    <RadioGroup
                      value={timeSlot}
                      onValueChange={setTimeSlot}
                      className="grid grid-cols-3 gap-2"
                    >
                      {timeSlots.map((slot) => (
                        <div key={slot} className="flex items-center space-x-2">
                          <RadioGroupItem value={slot} id={`time-${slot}`} />
                          <Label htmlFor={`time-${slot}`}>{slot}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Votre nom"
                        required
                        value={formData.name}
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
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="Votre numéro de téléphone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Entreprise (optionnel)</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Nom de votre entreprise"
                        value={formData.company}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectType">Type de projet</Label>
                      <Select
                        value={formData.projectType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            projectType: value,
                          }))
                        }
                      >
                        <SelectTrigger id="projectType">
                          <SelectValue placeholder="Sélectionnez un type de projet" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">Développement Web</SelectItem>
                          <SelectItem value="mobile">Développement Mobile</SelectItem>
                          <SelectItem value="devops">DevOps</SelectItem>
                          <SelectItem value="database">Base de données</SelectItem>
                          <SelectItem value="other">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Détails du projet</Label>
                <Textarea
                  id="details"
                  name="details"
                  placeholder="Décrivez brièvement votre projet et vos besoins"
                  rows={4}
                  value={formData.details}
                  onChange={handleChange}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Demander un rendez-vous"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
