"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAccessibility } from "@/components/accessibility-provider"

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false)
  const {
    options,
    setDyslexiaMode,
    setColorBlindMode,
    setHighContrast,
    setReducedMotion,
    setFontSize,
    setLineSpacing,
    resetOptions,
  } = useAccessibility()

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 shadow-lg bg-background border-primary"
        onClick={() => setOpen(true)}
        aria-label="Options d'accessibilité"
      >
        <Icon name="Accessibility" className="h-5 w-5" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Options d'accessibilité</DialogTitle>
            <DialogDescription>Personnalisez l'affichage du site selon vos besoins</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="reading">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="reading">Lecture</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="motion">Mouvement</TabsTrigger>
            </TabsList>

            <TabsContent value="reading" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dyslexia-mode">Mode dyslexie</Label>
                    <p className="text-sm text-muted-foreground">
                      Utilise une police adaptée aux personnes dyslexiques
                    </p>
                  </div>
                  <Switch id="dyslexia-mode" checked={options.dyslexiaMode} onCheckedChange={setDyslexiaMode} />
                </div>

                <div className="space-y-2">
                  <Label>Taille du texte</Label>
                  <RadioGroup
                    value={options.fontSize}
                    onValueChange={(value) => setFontSize(value as "normal" | "large" | "x-large")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="font-normal" />
                      <Label htmlFor="font-normal" className="font-normal">
                        Normal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="font-large" />
                      <Label htmlFor="font-large" className="font-normal text-lg">
                        Grand
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="x-large" id="font-x-large" />
                      <Label htmlFor="font-x-large" className="font-normal text-xl">
                        Très grand
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Espacement des lignes</Label>
                  <RadioGroup
                    value={options.lineSpacing}
                    onValueChange={(value) => setLineSpacing(value as "normal" | "increased" | "double")}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="spacing-normal" />
                      <Label htmlFor="spacing-normal" className="font-normal">
                        Normal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="increased" id="spacing-increased" />
                      <Label htmlFor="spacing-increased" className="font-normal leading-relaxed">
                        Augmenté
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="double" id="spacing-double" />
                      <Label htmlFor="spacing-double" className="font-normal leading-loose">
                        Double
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vision" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">Contraste élevé</Label>
                    <p className="text-sm text-muted-foreground">Augmente le contraste pour une meilleure lisibilité</p>
                  </div>
                  <Switch id="high-contrast" checked={options.highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="space-y-2">
                  <Label>Mode daltonisme</Label>
                  <RadioGroup
                    value={options.colorBlindMode}
                    onValueChange={setColorBlindMode}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="colorblind-none" />
                      <Label htmlFor="colorblind-none" className="font-normal">
                        Aucun
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="protanopia" id="colorblind-protanopia" />
                      <Label htmlFor="colorblind-protanopia" className="font-normal">
                        Protanopie (rouge-vert)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="deuteranopia" id="colorblind-deuteranopia" />
                      <Label htmlFor="colorblind-deuteranopia" className="font-normal">
                        Deutéranopie (vert-rouge)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tritanopia" id="colorblind-tritanopia" />
                      <Label htmlFor="colorblind-tritanopia" className="font-normal">
                        Tritanopie (bleu-jaune)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="motion" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Réduire les animations</Label>
                  <p className="text-sm text-muted-foreground">Désactive ou réduit les animations et transitions</p>
                </div>
                <Switch id="reduced-motion" checked={options.reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={resetOptions}>
              Réinitialiser
            </Button>
            <Button onClick={() => setOpen(false)}>Fermer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

