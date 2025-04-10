"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Sample blog posts data - in a real app, this would come from a CMS or database
const getBlogPost = (slug: string) => {
  const posts = {
    "understanding-microservices": {
      id: "understanding-microservices",
      title: "Comprendre l'Architecture Microservices",
      excerpt:
        "Une introduction aux principes fondamentaux de l'architecture microservices et comment elle peut bénéficier à vos projets.",
      content: `
        <h2>Introduction aux Microservices</h2>
        <p>L'architecture microservices est une approche de développement logiciel qui structure une application comme un ensemble de services faiblement couplés. Contrairement à l'architecture monolithique traditionnelle, où toutes les fonctionnalités sont regroupées dans une seule base de code, les microservices divisent l'application en composants plus petits et indépendants.</p>
        
        <p>Chaque microservice est responsable d'une fonctionnalité spécifique et peut être développé, déployé et mis à l'échelle indépendamment des autres services. Cette approche offre une grande flexibilité et permet aux équipes de développement de travailler de manière plus autonome.</p>
        
        <h2>Avantages des Microservices</h2>
        <p>L'adoption d'une architecture microservices présente plusieurs avantages significatifs :</p>
        
        <h3>1. Évolutivité</h3>
        <p>Les microservices peuvent être mis à l'échelle individuellement en fonction des besoins spécifiques de chaque service, ce qui permet une utilisation plus efficace des ressources. Par exemple, si un service de traitement des paiements connaît une forte demande, vous pouvez augmenter ses ressources sans avoir à mettre à l'échelle l'ensemble de l'application.</p>
        
        <h3>2. Résilience</h3>
        <p>La nature distribuée des microservices améliore la résilience globale de l'application. Si un service tombe en panne, les autres peuvent continuer à fonctionner, limitant ainsi l'impact des défaillances. Cette isolation des défaillances est un avantage majeur par rapport aux applications monolithiques, où une erreur peut potentiellement paralyser l'ensemble du système.</p>
        
        <h3>3. Agilité et Déploiement</h3>
        <p>Les équipes peuvent développer, tester et déployer des services individuellement, ce qui accélère le cycle de développement et permet des mises à jour plus fréquentes. Cette agilité est particulièrement précieuse dans les environnements où les exigences évoluent rapidement et où la capacité à s'adapter rapidement est essentielle.</p>
        
        <h3>4. Diversité Technologique</h3>
        <p>Chaque service peut utiliser la technologie la plus adaptée à sa fonction spécifique, plutôt que d'être contraint par un choix technologique unique pour l'ensemble de l'application. Cette flexibilité permet aux équipes d'adopter les meilleures technologies pour chaque cas d'usage.</p>
        
        <h2>Défis des Microservices</h2>
        <p>Malgré leurs nombreux avantages, les microservices présentent également des défis significatifs :</p>
        
        <h3>1. Complexité Distribuée</h3>
        <p>La gestion d'un système distribué introduit une complexité supplémentaire en termes de communication entre services, gestion des transactions distribuées et cohérence des données. Cette complexité nécessite une expertise spécifique et des outils adaptés.</p>
        
        <h3>2. Surveillance et Débogage</h3>
        <p>Le suivi des problèmes à travers plusieurs services peut être difficile. Des outils de surveillance et de traçage distribués sont essentiels pour maintenir la visibilité sur l'ensemble du système. Des solutions comme Jaeger, Zipkin ou Prometheus sont souvent utilisées pour relever ce défi.</p>
        
        <h3>3. Gouvernance</h3>
        <p>Maintenir la cohérence et les standards à travers de nombreux services développés par différentes équipes peut être un défi. Une gouvernance efficace et des pratiques DevOps solides sont nécessaires pour éviter le chaos.</p>
        
        <h2>Quand Adopter les Microservices</h2>
        <p>Les microservices ne sont pas une solution universelle. Ils sont particulièrement adaptés aux :</p>
        
        <ul>
          <li>Applications complexes avec des domaines métier distincts</li>
          <li>Systèmes nécessitant une haute disponibilité et évolutivité</li>
          <li>Grandes équipes travaillant sur différentes parties d'une application</li>
          <li>Applications nécessitant des déploiements fréquents et indépendants</li>
        </ul>
        
        <p>Pour les applications plus petites ou les startups en phase initiale, une architecture monolithique peut être plus appropriée en raison de sa simplicité et de sa rapidité de développement.</p>
        
        <h2>Conclusion</h2>
        <p>L'architecture microservices offre une approche puissante pour développer des applications complexes et évolutives. Cependant, elle introduit également des défis qui nécessitent une planification et une expertise appropriées. La décision d'adopter les microservices doit être basée sur une évaluation soigneuse des besoins spécifiques de votre projet et de votre organisation.</p>
        
        <p>Dans mes prochains articles, j'explorerai plus en détail les aspects pratiques de la mise en œuvre des microservices, y compris les patterns de communication, les stratégies de déploiement et les meilleures pratiques pour la gestion des données.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      date: "2023-05-15",
      readTime: 8,
      author: "Ismail MOUYAHADA",
      authorImage: "/placeholder.svg?height=100&width=100",
      authorBio: "DevOps & Développeur Full-Stack spécialisé dans les architectures cloud et microservices.",
      categories: ["Architecture", "DevOps"],
      tags: ["microservices", "architecture", "cloud"],
      relatedPosts: ["ci-cd-best-practices", "docker-kubernetes-introduction"],
    },
    "react-performance-optimization": {
      id: "react-performance-optimization",
      title: "Optimisation des Performances React",
      excerpt:
        "Techniques avancées pour améliorer les performances de vos applications React et offrir une meilleure expérience utilisateur.",
      content: `
        <h2>Introduction à l'Optimisation des Performances React</h2>
        <p>React est connu pour sa performance grâce à son DOM virtuel et son système de réconciliation efficace. Cependant, à mesure que les applications grandissent en complexité, des problèmes de performance peuvent apparaître. Cet article explore des techniques avancées pour optimiser vos applications React et offrir une expérience utilisateur fluide.</p>
        
        <h2>Identifier les Problèmes de Performance</h2>
        <p>Avant d'optimiser, il est crucial d'identifier les véritables goulots d'étranglement. React DevTools et les outils de profilage intégrés sont essentiels pour cette étape :</p>
        
        <h3>1. React DevTools Profiler</h3>
        <p>Le Profiler de React DevTools vous permet d'enregistrer les rendus de vos composants et d'analyser leur durée. Cela vous aide à identifier les composants qui se rendent trop fréquemment ou qui prennent trop de temps à se rendre.</p>
        
        <h3>2. Mesure des Performances</h3>
        <p>Utilisez l'API Performance du navigateur pour mesurer précisément le temps d'exécution de fonctions spécifiques :</p>
        
        <pre><code>
        const t0 = performance.now();
        // Code à mesurer
        const t1 = performance.now();
        console.log(\`Exécution en \${t1 - t0} millisecondes\`);
        </code></pre>
        
        <h2>Techniques d'Optimisation</h2>
        
        <h3>1. Memoization avec React.memo, useMemo et useCallback</h3>
        <p>La memoization est une technique puissante pour éviter les calculs ou rendus inutiles :</p>
        
        <h4>React.memo</h4>
        <p>Enveloppez vos composants fonctionnels avec React.memo pour éviter les rendus inutiles lorsque les props n'ont pas changé :</p>
        
        <pre><code>
        const MyComponent = React.memo(function MyComponent(props) {
          // Votre composant
        });
        </code></pre>
        
        <h4>useMemo</h4>
        <p>Utilisez useMemo pour mémoriser les résultats de calculs coûteux :</p>
        
        <pre><code>
        const memoizedValue = useMemo(() => {
          return computeExpensiveValue(a, b);
        }, [a, b]);
        </code></pre>
        
        <h4>useCallback</h4>
        <p>Mémorisez les fonctions avec useCallback pour éviter de créer de nouvelles références à chaque rendu :</p>
        
        <pre><code>
        const memoizedCallback = useCallback(() => {
          doSomething(a, b);
        }, [a, b]);
        </code></pre>
        
        <h3>2. Virtualisation des Listes</h3>
        <p>Pour les listes longues, n'affichez que les éléments visibles dans la fenêtre d'affichage. Des bibliothèques comme react-window ou react-virtualized peuvent considérablement améliorer les performances :</p>
        
        <pre><code>
        import { FixedSizeList } from 'react-window';
        
        const Row = ({ index, style }) => (
          <div style={style}>Row {index}</div>
        );
        
        const Example = () => (
          <FixedSizeList
            height={500}
            width={500}
            itemCount={10000}
            itemSize={35}
          >
            {Row}
          </FixedSizeList>
        );
        </code></pre>
        
        <h3>3. Code Splitting et Lazy Loading</h3>
        <p>Réduisez la taille de votre bundle initial en utilisant le code splitting et le chargement paresseux :</p>
        
        <pre><code>
        import React, { Suspense, lazy } from 'react';
        
        const LazyComponent = lazy(() => import('./LazyComponent'));
        
        function MyComponent() {
          return (
            <Suspense fallback={<div>Loading...</div>}>
              <LazyComponent />
            </Suspense>
          );
        }
        </code></pre>
        
        <h3>4. Optimisation du State Management</h3>
        <p>Une gestion d'état inefficace peut causer des rendus inutiles. Considérez ces approches :</p>
        
        <h4>État Local vs Global</h4>
        <p>Utilisez l'état local pour les données qui n'ont pas besoin d'être partagées. Cela limite la portée des rendus lors des mises à jour.</p>
        
        <h4>Context API Optimisé</h4>
        <p>Divisez vos contextes pour éviter les rendus en cascade lorsqu'une seule partie de l'état change :</p>
        
        <pre><code>
        // Au lieu d'un seul grand contexte
        const UserContext = createContext();
        const ThemeContext = createContext();
        const SettingsContext = createContext();
        </code></pre>
        
        <h3>5. Debouncing et Throttling</h3>
        <p>Pour les événements fréquents comme le scroll ou le redimensionnement, utilisez le debouncing ou le throttling :</p>
        
        <pre><code>
        import { debounce } from 'lodash';
        
        const handleSearch = debounce((term) => {
          // Recherche API
        }, 300);
        </code></pre>
        
        <h2>Optimisations Avancées</h2>
        
        <h3>1. Web Workers</h3>
        <p>Déplacez les calculs intensifs hors du thread principal en utilisant les Web Workers :</p>
        
        <pre><code>
        // worker.js
        self.addEventListener('message', (e) => {
          const result = heavyComputation(e.data);
          self.postMessage(result);
        });
        
        // Dans votre composant
        const worker = new Worker('./worker.js');
        worker.postMessage(data);
        worker.onmessage = (e) => {
          setResult(e.data);
        };
        </code></pre>
        
        <h3>2. Optimisation des Rendus</h3>
        <p>Utilisez React.PureComponent ou implementez shouldComponentUpdate pour les composants de classe :</p>
        
        <pre><code>
        shouldComponentUpdate(nextProps, nextState) {
          return nextProps.id !== this.props.id || 
                 nextState.value !== this.state.value;
        }
        </code></pre>
        
        <h3>3. Utilisation de useTransition et useDeferredValue</h3>
        <p>Ces hooks de React 18 permettent de prioriser les mises à jour de l'interface utilisateur :</p>
        
        <pre><code>
        const [isPending, startTransition] = useTransition();
        
        const handleChange = (e) => {
          startTransition(() => {
            setSearchQuery(e.target.value);
          });
        };
        </code></pre>
        
        <h2>Conclusion</h2>
        <p>L'optimisation des performances React est un équilibre entre la complexité du code et les gains de performance. Commencez par mesurer, puis appliquez les optimisations là où elles auront le plus d'impact. N'oubliez pas que la lisibilité et la maintenabilité du code sont également importantes.</p>
        
        <p>Dans mes prochains articles, j'approfondirai des aspects spécifiques de l'optimisation React, notamment les stratégies de rendu côté serveur et l'optimisation des applications React Native.</p>
      `,
      image: "/placeholder.svg?height=600&width=1200",
      date: "2023-04-22",
      readTime: 12,
      author: "Ismail MOUYAHADA",
      authorImage: "/placeholder.svg?height=100&width=100",
      authorBio: "DevOps & Développeur Full-Stack spécialisé dans les architectures cloud et microservices.",
      categories: ["Frontend", "Performance"],
      tags: ["react", "javascript", "performance", "optimization"],
      relatedPosts: ["nextjs-vs-nuxtjs"],
    },
  }

  return posts[slug] || null
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Article non trouvé</h1>
        <p className="mb-8">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Button asChild>
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
          </Link>
        </Button>
      </div>
    )
  }

  // Get related posts
  const relatedPosts = post.relatedPosts?.map((slug) => getBlogPost(slug)).filter(Boolean) || []

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour au blog
        </Link>
      </div>

      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary" className="capitalize">
                {category}
              </Badge>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-muted-foreground mb-6">
            <span className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {new Date(post.date).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="mx-2">•</span>
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {post.readTime} min de lecture
            </span>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="border-t border-b py-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 rounded-full overflow-hidden">
              <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold">{post.author}</h3>
              <p className="text-sm text-muted-foreground">{post.authorBio}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="capitalize">
                {tag}
              </Badge>
            ))}
          </div>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" /> Partager
          </Button>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="overflow-hidden group">
                <div className="relative h-48 w-full">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {relatedPost.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="capitalize">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    <Link href={`/blog/${relatedPost.id}`} className="hover:text-primary transition-colors">
                      {relatedPost.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(relatedPost.date).toLocaleDateString("fr-FR", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto mt-16 text-center py-8 bg-muted/30 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Vous avez aimé cet article ?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          Abonnez-vous à ma newsletter pour recevoir mes derniers articles et actualités directement dans votre boîte
          mail.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button>S'abonner</Button>
        </div>
      </div>
    </div>
  )
}

