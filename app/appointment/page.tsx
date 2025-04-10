"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function AppointmentPage() {
  const { toast } = useToast()
  // Ajouter les types pour les états
  const [date, setDate] = useState<Date | undefined>(null)
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

  // Ajouter le type pour handleChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!date || !timeSlot) {
      toast({
        title: "Information manquante",
        description: "Veuillez sélectionner une date et un créneau horaire.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Rendez-vous demandé",
      description: `Votre demande de rendez-vous pour le ${date.toLocaleDateString()} à ${timeSlot} a été envoyée.`,
    })

    setDate(null)
    setTimeSlot("")
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      projectType: "",
      details: "",
    })
    setIsSubmitting(false)
  }

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 9 }, (_, i) => {
    const hour = i + 9
    return `${hour}:00`
  })

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
          <CardDescription>Sélectionnez une date et un créneau horaire qui vous conviennent.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Sélectionnez une date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(date) => {
                      // Disable weekends and past dates
                      const day = date.getDay()
                      const today = new Date()
                      today.setHours(0, 0, 0, 0)
                      return date < today || day === 0 || day === 6
                    }}
                    className="border rounded-md"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sélectionnez un créneau horaire</Label>
                  <RadioGroup value={timeSlot} onValueChange={setTimeSlot} className="grid grid-cols-3 gap-2">
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
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, projectType: value }))}
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
        </CardContent>
      </Card>
    </div>
  )
}

