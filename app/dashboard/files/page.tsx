"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FilesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Fichiers</h1>
          <p className="text-muted-foreground mt-2">Gérez vos documents et fichiers de projet</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Fichiers</CardTitle>
          <CardDescription>Page en construction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cette page est en cours de développement. Revenez plus tard pour gérer vos fichiers.</p>
        </CardContent>
      </Card>
    </div>
  )
}

