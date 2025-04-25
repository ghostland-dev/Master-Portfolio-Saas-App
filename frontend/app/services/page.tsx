import ServicesClientPage from "./ServicesClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | Portfolio de Développeur Web Full-Stack",
  description:
    "Découvrez les services de développement web full-stack, incluant le développement front-end, back-end, DevOps et bases de données.",
}

export default function ServicesPage() {
  return <ServicesClientPage />
}

