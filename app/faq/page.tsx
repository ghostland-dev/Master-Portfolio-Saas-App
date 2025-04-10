import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center space-y-4 mb-12">
        <Badge className="px-3 py-1.5 text-sm badge-gradient">FAQ</Badge>
        <h1 className="text-4xl md:text-5xl font-bold">Questions fréquentes</h1>
        <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
          Retrouvez les réponses aux questions les plus courantes sur mes services
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="pricing">Tarification</TabsTrigger>
            <TabsTrigger value="technical">Technique</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quels types de projets acceptez-vous ?</AccordionTrigger>
                <AccordionContent>
                  Je travaille principalement sur des projets de développement web, d'applications mobiles et de
                  solutions DevOps. Je me spécialise dans les technologies modernes comme React, Node.js, et les
                  architectures cloud. Je sélectionne les projets où je peux apporter une réelle valeur ajoutée grâce à
                  mon expertise.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Comment se déroule la collaboration à distance ?</AccordionTrigger>
                <AccordionContent>
                  La collaboration à distance se fait via des outils comme Slack, Microsoft Teams ou Google Meet pour la
                  communication quotidienne. J'utilise également des outils de gestion de projet comme Jira ou Trello
                  pour suivre l'avancement. Des réunions régulières sont organisées pour faire le point sur le projet et
                  ajuster les priorités si nécessaire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Quelle est votre disponibilité actuelle ?</AccordionTrigger>
                <AccordionContent>
                  Ma disponibilité varie en fonction de mon planning de projets en cours. Je vous invite à me contacter
                  directement pour connaître mes disponibilités actuelles. Je m'efforce de répondre aux demandes dans un
                  délai de 24 à 48 heures ouvrées.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Travaillez-vous seul ou avec une équipe ?</AccordionTrigger>
                <AccordionContent>
                  Je travaille principalement en indépendant, mais je dispose d'un réseau de professionnels de confiance
                  (designers, développeurs spécialisés, experts en marketing digital) avec qui je collabore sur des
                  projets plus importants nécessitant des compétences complémentaires. Cela me permet de m'adapter à la
                  taille et aux besoins spécifiques de chaque projet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Comment assurez-vous la confidentialité des projets ?</AccordionTrigger>
                <AccordionContent>
                  La confidentialité est une priorité absolue. Je signe systématiquement des accords de confidentialité
                  (NDA) avant de commencer tout projet. Les données sensibles sont stockées de manière sécurisée, et
                  j'applique les meilleures pratiques en matière de sécurité informatique. Je ne partage jamais les
                  détails d'un projet sans l'autorisation explicite du client.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quels services de développement web proposez-vous ?</AccordionTrigger>
                <AccordionContent>
                  Je propose une gamme complète de services de développement web, incluant la création de sites
                  vitrines, de plateformes e-commerce, d'applications web sur mesure, et d'interfaces d'administration.
                  Je me spécialise dans les technologies modernes comme React, Next.js, Node.js et les architectures
                  JAMstack pour des performances optimales.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Proposez-vous des services de maintenance après la livraison ?</AccordionTrigger>
                <AccordionContent>
                  Oui, je propose des contrats de maintenance pour tous les projets que je développe. Ces contrats
                  incluent généralement les mises à jour de sécurité, les corrections de bugs, les petites améliorations
                  et un support technique. Plusieurs formules sont disponibles selon vos besoins, allant d'un support
                  ponctuel à une maintenance complète.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Pouvez-vous reprendre un projet existant ?</AccordionTrigger>
                <AccordionContent>
                  Oui, je peux reprendre des projets existants, qu'il s'agisse de corriger des bugs, d'ajouter de
                  nouvelles fonctionnalités ou de refondre complètement l'application. Je commence toujours par une
                  phase d'audit pour comprendre l'architecture actuelle, identifier les problèmes potentiels et proposer
                  une stratégie d'amélioration adaptée.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Quels services DevOps proposez-vous ?</AccordionTrigger>
                <AccordionContent>
                  Mes services DevOps comprennent la mise en place de pipelines CI/CD, la conteneurisation avec Docker,
                  l'orchestration avec Kubernetes, l'Infrastructure as Code avec Terraform, et la migration vers le
                  cloud (AWS, Azure, GCP). Je propose également des audits de performance et de sécurité pour optimiser
                  vos infrastructures existantes.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Proposez-vous des services de formation ?</AccordionTrigger>
                <AccordionContent>
                  Oui, je propose des formations personnalisées pour les équipes techniques sur des sujets comme React,
                  Node.js, les architectures cloud, et les pratiques DevOps. Ces formations peuvent être adaptées à
                  votre niveau et à vos besoins spécifiques, et peuvent se dérouler en présentiel ou à distance selon
                  vos préférences.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Comment sont calculés vos tarifs ?</AccordionTrigger>
                <AccordionContent>
                  Mes tarifs sont calculés en fonction de la complexité du projet, des technologies utilisées, des
                  délais demandés et de la valeur ajoutée apportée. Je propose deux modèles de tarification : au forfait
                  pour les projets bien définis, ou en régie (tarif horaire ou journalier) pour les projets nécessitant
                  plus de flexibilité ou dont le périmètre peut évoluer.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Quel est le budget minimum pour un projet ?</AccordionTrigger>
                <AccordionContent>
                  Le budget minimum varie selon le type de projet. Pour un site vitrine simple, comptez à partir de 3
                  000 €. Pour une application web sur mesure, le budget démarre généralement à 10 000 €. Pour des
                  projets DevOps ou des architectures cloud complexes, prévoyez un budget minimum de 5 000 €. Chaque
                  projet étant unique, je vous invite à me contacter pour obtenir un devis personnalisé.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Proposez-vous des tarifs dégressifs pour les projets à long terme ?</AccordionTrigger>
                <AccordionContent>
                  Oui, je propose des tarifs dégressifs pour les engagements à long terme. Pour les contrats de
                  maintenance ou les projets s'étalant sur plusieurs mois, des remises peuvent être appliquées. Les
                  abonnements annuels bénéficient également de tarifs préférentiels par rapport aux engagements
                  mensuels.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Quelles sont les modalités de paiement ?</AccordionTrigger>
                <AccordionContent>
                  Pour les projets au forfait, je demande généralement un acompte de 30% à la signature du contrat, 30%
                  à mi-parcours et le solde de 40% à la livraison. Pour les projets en régie, la facturation est
                  mensuelle, basée sur les heures ou jours effectivement travaillés. Les paiements peuvent être
                  effectués par virement bancaire, avec des délais de paiement standards de 30 jours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Les frais d'hébergement sont-ils inclus dans vos tarifs ?</AccordionTrigger>
                <AccordionContent>
                  Non, les frais d'hébergement, d'achat de domaines, de licences tierces ou d'abonnements à des services
                  cloud ne sont pas inclus dans mes tarifs de développement. Ces coûts sont facturés séparément et
                  directement à votre nom lorsque c'est possible. Je peux vous conseiller sur les meilleures options
                  selon votre budget et vos besoins techniques.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="technical" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Quelles technologies utilisez-vous principalement ?</AccordionTrigger>
                <AccordionContent>
                  Je me spécialise dans les technologies JavaScript modernes, notamment React et Next.js pour le
                  front-end, Node.js et Express pour le back-end. J'utilise TypeScript pour garantir la qualité du code.
                  Pour les bases de données, je travaille avec MongoDB, PostgreSQL et Redis selon les besoins. Côté
                  DevOps, j'utilise Docker, Kubernetes, et les services cloud AWS, Azure ou GCP.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Comment gérez-vous le versionnement du code ?</AccordionTrigger>
                <AccordionContent>
                  J'utilise Git pour le versionnement du code, principalement avec GitHub ou GitLab. J'applique une
                  méthodologie de branches basée sur Git Flow ou GitHub Flow selon la complexité du projet. Chaque
                  fonctionnalité est développée dans une branche dédiée, puis intégrée à la branche principale après
                  revue de code et tests automatisés.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Comment assurez-vous la qualité du code ?</AccordionTrigger>
                <AccordionContent>
                  La qualité du code est assurée par plusieurs pratiques : utilisation de TypeScript pour le typage
                  statique, mise en place de tests unitaires et d'intégration (Jest, React Testing Library),
                  configuration de linters et formatters (ESLint, Prettier), revues de code systématiques, et
                  intégration continue pour vérifier que chaque modification respecte les standards de qualité définis.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Comment gérez-vous la sécurité des applications ?</AccordionTrigger>
                <AccordionContent>
                  La sécurité est intégrée à toutes les étapes du développement. J'applique les bonnes pratiques OWASP,
                  j'utilise des bibliothèques à jour et maintenues, je configure correctement les en-têtes HTTP de
                  sécurité, j'implémente une authentification robuste (JWT, OAuth), et je réalise des audits de sécurité
                  réguliers. Les données sensibles sont toujours chiffrées, tant en transit qu'au repos.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Comment optimisez-vous les performances des applications ?</AccordionTrigger>
                <AccordionContent>
                  L'optimisation des performances passe par plusieurs techniques : code splitting et lazy loading pour
                  réduire la taille des bundles JavaScript, mise en cache intelligente (Redis, CDN), optimisation des
                  requêtes de base de données, utilisation de SSR ou SSG quand c'est pertinent, compression des assets,
                  et implémentation de stratégies de préchargement. Je surveille également les métriques de performance
                  (Core Web Vitals) et j'utilise des outils comme Lighthouse pour identifier les points d'amélioration.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <section className="space-y-8">
          <h2 className="text-2xl font-bold">Autres questions</h2>

          <Card>
            <CardHeader>
              <CardTitle>Comment démarrer un projet avec vous ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Le processus de démarrage d'un projet se déroule généralement en plusieurs étapes :
              </p>
              <ol className="space-y-2 list-decimal pl-5">
                <li>Prise de contact initiale via le formulaire de contact ou par email</li>
                <li>Réunion de découverte pour comprendre vos besoins et objectifs</li>
                <li>Élaboration et envoi d'une proposition détaillée avec estimation</li>
                <li>Signature du contrat et versement de l'acompte</li>
                <li>Réunion de lancement pour définir les détails du projet</li>
              </ol>
              <div className="mt-4 flex justify-end">
                <Link href="/contact" className="text-primary hover:underline flex items-center">
                  Contactez-moi <Icon name="ArrowRight" className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Que faire si ma question n'est pas listée ici ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Si vous ne trouvez pas la réponse à votre question dans cette FAQ, n'hésitez pas à me contacter
                directement. Je serai ravi de vous répondre personnellement et de vous fournir toutes les informations
                dont vous avez besoin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="text-primary hover:underline flex items-center">
                  Formulaire de contact <Icon name="ArrowRight" className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
                <span className="text-muted-foreground hidden sm:inline">ou</span>
                <Link
                  href="mailto:contact@ismailmouyahada.com"
                  className="text-primary hover:underline flex items-center"
                >
                  contact@ismailmouyahada.com <Icon name="ArrowRight" className="ml-1 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

