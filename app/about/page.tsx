import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Mail } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold">À Propos</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Découvrez mon parcours, mes valeurs et ma vision du développement logiciel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold mb-6">Ismail MOUYAHADA</h2>
          <p className="text-lg">
            Je suis un développeur full-stack et DevOps passionné par la création de solutions logicielles innovantes et
            performantes. Avec plus de 10 ans d'expérience dans le développement web et mobile, j'ai eu l'opportunité de
            travailler sur une grande variété de projets, des startups aux grandes entreprises.
          </p>
          <p className="text-lg">
            Ma passion pour la technologie m'a conduit à explorer et maîtriser un large éventail de langages de
            programmation et de frameworks, me permettant d'adopter toujours la meilleure approche pour chaque projet.
            Je crois fermement que le code de qualité, les bonnes pratiques et l'attention aux détails sont essentiels
            pour créer des applications robustes et évolutives.
          </p>
          <p className="text-lg">
            Au-delà de la technique, je m'efforce de comprendre les besoins métier de mes clients pour proposer des
            solutions qui apportent une réelle valeur ajoutée. Je considère chaque projet comme une opportunité
            d'apprentissage et d'innovation.
          </p>

          <div className="pt-4">
            <h3 className="text-xl font-semibold mb-4">Mes valeurs</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  Qualité
                </Badge>
                <span>Je m'engage à livrer un code propre, bien testé et maintenable.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  Innovation
                </Badge>
                <span>Je reste constamment à jour avec les dernières technologies et meilleures pratiques.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  Communication
                </Badge>
                <span>Je crois en une communication claire et transparente tout au long du projet.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">
                  Pragmatisme
                </Badge>
                <span>Je choisis toujours la solution la plus adaptée aux besoins réels du projet.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="relative w-full aspect-square rounded-xl overflow-hidden">
            <Image src="/images/profile.png" alt="Ismail MOUYAHADA" fill className="object-cover" />
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-center space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </Button>
              </div>

              <div className="pt-4 space-y-4">
                <Button asChild className="w-full">
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" /> Me contacter
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <a href="#" download>
                    <Download className="mr-2 h-4 w-4" /> Télécharger mon CV
                  </a>
                </Button>
                <Button variant="secondary" asChild className="w-full">
                  <Link href="/appointment">
                    <Calendar className="mr-2 h-4 w-4" /> Prendre rendez-vous
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Parcours Professionnel</h2>
        <div className="relative border-l-2 border-muted ml-4 md:mx-auto md:max-w-3xl pl-8 space-y-12">
          {[
            {
              period: "2020 - Présent",
              title: "Développeur Full-Stack & DevOps Indépendant",
              description:
                "Conception et développement d'applications web et mobiles pour divers clients. Mise en place d'infrastructures cloud et de pipelines CI/CD. Conseil en architecture logicielle et bonnes pratiques de développement.",
            },
            {
              period: "2017 - 2020",
              title: "Lead Developer",
              company: "Tech Innovations Inc.",
              description:
                "Direction d'une équipe de 5 développeurs. Conception d'architecture microservices. Implémentation de pratiques DevOps et d'intégration continue. Développement d'applications web à forte charge.",
            },
            {
              period: "2014 - 2017",
              title: "Développeur Full-Stack",
              company: "Digital Solutions",
              description:
                "Développement d'applications web avec React et Node.js. Conception et optimisation de bases de données. Mise en place d'APIs RESTful. Collaboration avec les équipes design et produit.",
            },
            {
              period: "2012 - 2014",
              title: "Développeur Front-End",
              company: "WebCreative Agency",
              description:
                "Création d'interfaces utilisateur réactives et modernes. Intégration de maquettes. Optimisation des performances front-end. Collaboration avec les designers UX/UI.",
            },
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-[42px] h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-background"></div>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">{item.period}</span>
                <h3 className="text-xl font-semibold mt-1">{item.title}</h3>
                {item.company && <p className="text-primary">{item.company}</p>}
                <p className="mt-2 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Formation & Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              type: "Diplôme",
              title: "Master en Informatique",
              institution: "Université de Technologie",
              year: "2012",
              description: "Spécialisation en développement logiciel et systèmes distribués.",
            },
            {
              type: "Certification",
              title: "AWS Certified Solutions Architect",
              institution: "Amazon Web Services",
              year: "2022",
              description: "Conception d'architectures sécurisées, performantes et résilientes sur AWS.",
            },
            {
              type: "Certification",
              title: "Professional Scrum Master",
              institution: "Scrum.org",
              year: "2021",
              description: "Maîtrise des principes et pratiques Scrum pour la gestion de projets agiles.",
            },
            {
              type: "Certification",
              title: "Docker Certified Associate",
              institution: "Docker",
              year: "2020",
              description: "Compétences avancées en containerisation et orchestration Docker.",
            },
            {
              type: "Formation",
              title: "Advanced React Patterns",
              institution: "Frontend Masters",
              year: "2021",
              description: "Patterns avancés pour le développement d'applications React performantes et maintenables.",
            },
            {
              type: "Formation",
              title: "Microservices Architecture",
              institution: "O'Reilly Learning",
              year: "2019",
              description: "Conception et implémentation d'architectures microservices évolutives.",
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Badge
                  variant={
                    item.type === "Diplôme" ? "default" : item.type === "Certification" ? "secondary" : "outline"
                  }
                  className="mb-2"
                >
                  {item.type}
                </Badge>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <div className="flex justify-between items-center mt-1 mb-2">
                  <span className="text-primary">{item.institution}</span>
                  <span className="text-sm text-muted-foreground">{item.year}</span>
                </div>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center py-8 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Intéressé par une collaboration ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Je suis toujours ouvert à discuter de nouveaux projets passionnants et de collaborations intéressantes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/appointment">
              <Calendar className="mr-2 h-4 w-4" /> Prendre rendez-vous
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" /> Me contacter
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

