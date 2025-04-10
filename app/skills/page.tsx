import type { Metadata } from "next"
import { TechGrid } from "@/components/tech-grid"
import { Code, Layers, Server, Database, Cloud, TestTube, Wrench } from "lucide-react"

export const metadata: Metadata = {
  title: "Compétences techniques | Portfolio",
  description:
    "Découvrez mes compétences techniques et mon expertise dans différents domaines du développement web et logiciel.",
}

// Données des technologies par catégorie
const technologies = {
  languages: [
    { name: "JavaScript", description: "Langage de programmation web" },
    { name: "TypeScript", description: "JavaScript typé" },
    { name: "Python", description: "Langage polyvalent" },
    { name: "PHP", description: "Langage de script côté serveur" },
    { name: "Java", description: "Langage orienté objet" },
    { name: "C#", description: "Langage .NET" },
    { name: "Go", description: "Langage performant et concurrent" },
    { name: "Rust", description: "Langage système sécurisé" },
  ],
  frontend: [
    { name: "React", description: "Bibliothèque UI" },
    { name: "Vue.js", description: "Framework progressif" },
    { name: "Next.js", description: "Framework React" },
    { name: "Nuxt.js", description: "Framework Vue" },
    { name: "Angular", description: "Framework complet" },
    { name: "Svelte", description: "Compilateur de composants" },
    { name: "Tailwind CSS", description: "Framework CSS utilitaire" },
    { name: "Material UI", description: "Composants React" },
    { name: "Bootstrap", description: "Framework CSS" },
    { name: "Styled Components", description: "CSS-in-JS" },
    { name: "Framer Motion", description: "Animations React" },
    { name: "Redux", description: "Gestion d'état" },
    { name: "Webpack", description: "Bundler" },
    { name: "Vite", description: "Build tool" },
  ],
  backend: [
    { name: "Node.js", description: "Runtime JavaScript" },
    { name: "Express", description: "Framework Node.js" },
    { name: "NestJS", description: "Framework Node.js" },
    { name: "Django", description: "Framework Python" },
    { name: "Flask", description: "Micro-framework Python" },
    { name: "Laravel", description: "Framework PHP" },
    { name: "Spring Boot", description: "Framework Java" },
    { name: "ASP.NET Core", description: "Framework .NET" },
    { name: "GraphQL", description: "Langage de requête API" },
    { name: "REST API", description: "Architecture API" },
    { name: "JWT", description: "Authentification" },
    { name: "Socket.IO", description: "Communication temps réel" },
    { name: "Swagger", description: "Documentation API" },
    { name: "Prisma", description: "ORM moderne" },
  ],
  database: [
    { name: "PostgreSQL", description: "Base de données relationnelle" },
    { name: "MySQL", description: "Base de données relationnelle" },
    { name: "MariaDB", description: "Fork de MySQL" },
    { name: "SQL Server", description: "SGBDR Microsoft" },
    { name: "MongoDB", description: "Base de données NoSQL" },
    { name: "Redis", description: "Store de données en mémoire" },
    { name: "Elasticsearch", description: "Moteur de recherche" },
    { name: "Firebase", description: "Plateforme de développement" },
    { name: "Supabase", description: "Alternative à Firebase" },
    { name: "DynamoDB", description: "NoSQL AWS" },
  ],
  devops: [
    { name: "Docker", description: "Conteneurisation" },
    { name: "Kubernetes", description: "Orchestration de conteneurs" },
    { name: "GitHub Actions", description: "CI/CD" },
    { name: "Jenkins", description: "Serveur d'automatisation" },
    { name: "AWS", description: "Cloud computing" },
    { name: "Google Cloud", description: "Plateforme cloud" },
    { name: "Azure", description: "Cloud Microsoft" },
    { name: "Terraform", description: "Infrastructure as code" },
    { name: "Ansible", description: "Automatisation IT" },
    { name: "Prometheus", description: "Monitoring" },
    { name: "Grafana", description: "Visualisation" },
  ],
  testing: [
    { name: "Jest", description: "Framework de test JavaScript" },
    { name: "Mocha", description: "Framework de test JavaScript" },
    { name: "Cypress", description: "Tests E2E" },
    { name: "Selenium", description: "Automatisation de navigateur" },
    { name: "Playwright", description: "Tests de navigateur" },
    { name: "JUnit", description: "Framework de test Java" },
    { name: "PyTest", description: "Framework de test Python" },
    { name: "PHPUnit", description: "Framework de test PHP" },
  ],
  tools: [
    { name: "Git", description: "Contrôle de version" },
    { name: "GitHub", description: "Plateforme de développement" },
    { name: "GitLab", description: "DevOps platform" },
    { name: "VS Code", description: "Éditeur de code" },
    { name: "Figma", description: "Design d'interface" },
    { name: "Postman", description: "Client API" },
    { name: "Jira", description: "Gestion de projet" },
    { name: "Notion", description: "Espace de travail" },
  ],
}

export default function SkillsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Compétences techniques</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Une expertise approfondie dans un large éventail de technologies modernes pour répondre à tous vos besoins de
          développement.
        </p>
      </div>

      <div className="space-y-16">
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Code className="h-6 w-6" />
            </span>
            Langages de programmation
          </h2>
          <TechGrid technologies={technologies.languages} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Layers className="h-6 w-6" />
            </span>
            Développement Frontend
          </h2>
          <TechGrid technologies={technologies.frontend} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Server className="h-6 w-6" />
            </span>
            Développement Backend
          </h2>
          <TechGrid technologies={technologies.backend} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Database className="h-6 w-6" />
            </span>
            Bases de données
          </h2>
          <TechGrid technologies={technologies.database} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Cloud className="h-6 w-6" />
            </span>
            DevOps & Cloud
          </h2>
          <TechGrid technologies={technologies.devops} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <TestTube className="h-6 w-6" />
            </span>
            Tests & Qualité
          </h2>
          <TechGrid technologies={technologies.testing} iconSize={48} />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-primary/10 text-primary p-2 rounded-md mr-3">
              <Wrench className="h-6 w-6" />
            </span>
            Outils & Environnements
          </h2>
          <TechGrid technologies={technologies.tools} iconSize={48} />
        </section>
      </div>
    </div>
  )
}

