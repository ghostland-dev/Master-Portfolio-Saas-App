"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewProjectPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Nouveau Projet</h1>
          <p className="text-muted-foreground mt-2">Créez un nouveau projet</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nouveau Projet</CardTitle>
          <CardDescription>Page en construction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cette page est en cours de développement. Revenez plus tard pour créer un nouveau projet.</p>
        </CardContent>
      </Card>
    </div>
  )
}

