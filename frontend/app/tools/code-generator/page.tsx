"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Icon } from "@/components/ui/icon"
 
const codeTemplates = {
  react: `import React from "react"

export default function MyComponent() {
  return <div>Hello, world!</div>
}
`,
  express: `const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello, world!")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})
`,
}

export default function CodeGeneratorPage() {
  const [template, setTemplate] = useState<"react" | "express">("react")
  const [customCode, setCustomCode] = useState("")
  const [outputCode, setOutputCode] = useState("")

  const handleGenerate = () => {
    const base = codeTemplates[template]
    const finalCode = `${base}\n\n// Custom additions:\n${customCode}`
    setOutputCode(finalCode)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2">
          <Icon name="Code2" className="w-8 h-8" />
          Générateur de Code <span className="text-primary">( en cours de développement )</span>  
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Générez rapidement des snippets pour React, Express et d'autres stacks à partir de templates intelligents.
        </p>
      </div>

      {/* <Card>
        <CardHeader>
          <CardTitle>Sélectionnez un template et ajoutez vos personnalisations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="react" onValueChange={(value) => setTemplate(value as "react" | "express")}>
            <TabsList>
              <TabsTrigger value="react">React</TabsTrigger>
              <TabsTrigger value="express">Express</TabsTrigger>
            </TabsList>

            <TabsContent value="react">
              <Label htmlFor="customReact">Ajoutez du code personnalisé (facultatif)</Label>
              <Textarea
                id="customReact"
                placeholder="e.g. Ajouter un hook, un effet secondaire..."
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </TabsContent>

            <TabsContent value="express">
              <Label htmlFor="customExpress">Ajoutez du code personnalisé (facultatif)</Label>
              <Textarea
                id="customExpress"
                placeholder="e.g. Ajouter une route API, un middleware..."
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
              />
            </TabsContent>
          </Tabs>

          <Button onClick={handleGenerate}>Générer le code</Button>

          {outputCode && (
            <div className="bg-muted p-4 rounded-md border font-mono whitespace-pre-wrap text-sm">
              {outputCode}
            </div>
          )}
        </CardContent>
      </Card> */}
    </div>
  )
}
