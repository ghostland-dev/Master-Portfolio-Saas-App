import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

/**
 * Génère un PDF à partir d'un élément HTML
 * @param elementId ID de l'élément HTML à convertir en PDF
 * @param filename Nom du fichier PDF à télécharger
 * @param options Options supplémentaires
 */
export const generatePDF = async (
  elementId: string,
  filename = "document.pdf",
  options: {
    format?: "a4" | "a3" | "letter"
    orientation?: "portrait" | "landscape"
    margin?: number
    scale?: number
    title?: string
    subtitle?: string
    footer?: string
    watermark?: string
  } = {},
) => {
  try {
    // Options par défaut
    const {
      format = "a4",
      orientation = "portrait",
      margin = 10,
      scale = 2,
      title,
      subtitle,
      footer,
      watermark,
    } = options

    // Récupérer l'élément à convertir
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`L'élément avec l'ID ${elementId} n'a pas été trouvé`)
    }

    // Créer une copie de l'élément pour le styliser sans affecter l'original
    const clonedElement = element.cloneNode(true) as HTMLElement
    clonedElement.style.backgroundColor = "#ffffff"

    // Ajouter temporairement à la page pour la capture
    clonedElement.style.position = "absolute"
    clonedElement.style.left = "-9999px"
    document.body.appendChild(clonedElement)

    // Capturer l'élément avec html2canvas
    const canvas = await html2canvas(clonedElement, {
      scale: scale,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Supprimer l'élément cloné
    document.body.removeChild(clonedElement)

    // Dimensions du PDF
    const imgWidth = format === "a4" ? 210 : format === "a3" ? 297 : 216 // mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Créer le PDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: "mm",
      format: format,
    })

    // Ajouter un titre si spécifié
    if (title) {
      pdf.setFontSize(18)
      pdf.text(title, margin, margin + 10)
    }

    // Ajouter un sous-titre si spécifié
    if (subtitle) {
      pdf.setFontSize(12)
      pdf.text(subtitle, margin, margin + (title ? 20 : 10))
    }

    // Calculer le décalage Y pour l'image
    const yOffset = margin + (title ? (subtitle ? 30 : 20) : subtitle ? 20 : 0)

    // Ajouter l'image au PDF
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 0.95),
      "JPEG",
      margin,
      yOffset,
      imgWidth - margin * 2,
      imgHeight - margin * 2,
    )

    // Ajouter un filigrane si spécifié
    if (watermark) {
      pdf.setTextColor(200, 200, 200)
      pdf.setFontSize(30)
      pdf.save()
      pdf.rotate(45, imgWidth / 2, imgHeight / 2)
      pdf.text(watermark, imgWidth / 2 - 40, imgHeight / 2)
      pdf.restore()
      pdf.setTextColor(0, 0, 0)
    }

    // Ajouter un pied de page si spécifié
    if (footer) {
      pdf.setFontSize(10)
      pdf.text(footer, margin, pdf.internal.pageSize.height - margin)
    }

    // Télécharger le PDF
    pdf.save(filename)

    return true
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error)
    return false
  }
}

/**
 * Génère un PDF à partir de données structurées
 * @param data Données à inclure dans le PDF
 * @param filename Nom du fichier PDF
 * @param options Options supplémentaires
 */
export const generateStructuredPDF = (
  data: {
    title?: string
    subtitle?: string
    sections: {
      title: string
      content: string | string[] | { label: string; value: string }[]
    }[]
    footer?: string
  },
  filename = "document.pdf",
  options: {
    format?: "a4" | "a3" | "letter"
    orientation?: "portrait" | "landscape"
    logo?: string
    watermark?: string
  } = {},
) => {
  try {
    // Options par défaut
    const { format = "a4", orientation = "portrait", logo, watermark } = options

    // Créer le PDF
    const pdf = new jsPDF({
      orientation: orientation,
      unit: "mm",
      format: format,
    })

    const pageWidth = pdf.internal.pageSize.getWidth()
    const margin = 20
    let yPosition = margin

    // Ajouter un logo si spécifié
    if (logo) {
      pdf.addImage(logo, "PNG", margin, yPosition, 40, 20)
      yPosition += 25
    }

    // Ajouter un titre si spécifié
    if (data.title) {
      pdf.setFontSize(22)
      pdf.setFont("helvetica", "bold")
      pdf.text(data.title, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 10
    }

    // Ajouter un sous-titre si spécifié
    if (data.subtitle) {
      pdf.setFontSize(14)
      pdf.setFont("helvetica", "normal")
      pdf.text(data.subtitle, pageWidth / 2, yPosition, { align: "center" })
      yPosition += 15
    } else {
      yPosition += 5
    }

    // Ajouter un filigrane si spécifié
    if (watermark) {
      pdf.setTextColor(200, 200, 200)
      pdf.setFontSize(60)
      pdf.textWithRotation(watermark, pageWidth / 2 - 100, pdf.internal.pageSize.getHeight() / 2, { angle: 45 })
      pdf.text(watermark, pageWidth / 2 - 100, pdf.internal.pageSize.getHeight() / 2)
      pdf.restore()
      pdf.setTextColor(0, 0, 0)
    }

    // Ajouter les sections
    for (const section of data.sections) {
      // Vérifier si on a besoin d'une nouvelle page
      if (yPosition > pdf.internal.pageSize.getHeight() - 50) {
        pdf.addPage()
        yPosition = margin
      }

      // Titre de la section
      pdf.setFontSize(16)
      pdf.setFont("helvetica", "bold")
      pdf.text(section.title, margin, yPosition)
      yPosition += 8

      // Contenu de la section
      pdf.setFontSize(12)
      pdf.setFont("helvetica", "normal")

      if (typeof section.content === "string") {
        // Texte simple
        const lines = pdf.splitTextToSize(section.content, pageWidth - margin * 2)
        pdf.text(lines, margin, yPosition)
        yPosition += lines.length * 7
      } else if (Array.isArray(section.content)) {
        if (typeof section.content[0] === "string" || section.content[0] === undefined) {
          // Liste de textes
          for (const item of section.content as string[]) {
            pdf.text(`• ${item}`, margin, yPosition)
            yPosition += 7
          }
        } else {
          // Tableau de données
          for (const item of section.content as { label: string; value: string }[]) {
            pdf.setFont("helvetica", "bold")
            pdf.text(`${item.label}: `, margin, yPosition)
            pdf.setFont("helvetica", "normal")
            pdf.text(item.value, margin + pdf.getTextWidth(`${item.label}: `), yPosition)
            yPosition += 7
          }
        }
      }

      yPosition += 10
    }

    // Ajouter un pied de page si spécifié
    if (data.footer) {
      pdf.setFontSize(10)
      pdf.text(data.footer, pageWidth / 2, pdf.internal.pageSize.getHeight() - 10, { align: "center" })
    }

    // Télécharger le PDF
    pdf.save(filename)

    return true
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error)
    return false
  }
}

