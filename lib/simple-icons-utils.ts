/**
 * Utility functions for working with Simple Icons
 * https://simpleicons.org/
 */

// Base URL for Simple Icons CDN
const SIMPLE_ICONS_CDN = "https://cdn.simpleicons.org"

/**
 * Get the URL for a Simple Icon by slug
 * @param slug The slug of the icon (lowercase, no spaces)
 * @returns The URL to the SVG icon
 */
export function getSimpleIconUrl(slug: string): string {
  return `${SIMPLE_ICONS_CDN}/${slug}.svg`
}

/**
 * Technology icon mapping
 * Maps technology names to their Simple Icons slugs
 */
export const technologyIcons: Record<string, string> = {
  // Frontend
  React: "react",
  "Vue.js": "vuedotjs",
  "Next.js": "nextdotjs",
  "Nuxt.js": "nuxtdotjs",
  Angular: "angular",
  Svelte: "svelte",
  JavaScript: "javascript",
  TypeScript: "typescript",
  HTML5: "html5",
  CSS3: "css3",
  "Tailwind CSS": "tailwindcss",
  "Material UI": "mui",
  Bootstrap: "bootstrap",
  "Styled Components": "styledcomponents",
  "Framer Motion": "framer",
  Redux: "redux",
  Webpack: "webpack",
  Vite: "vite",

  // Backend
  "Node.js": "nodedotjs",
  Express: "express",
  NestJS: "nestjs",
  Django: "django",
  Flask: "flask",
  Laravel: "laravel",
  "Spring Boot": "springboot",
  "Ruby on Rails": "rubyonrails",
  GraphQL: "graphql",
  "REST API": "openapiinitiative",
  JWT: "jsonwebtokens",
  "Socket.IO": "socketdotio",
  Swagger: "swagger",
  Prisma: "prisma",

  // DevOps
  Docker: "docker",
  Kubernetes: "kubernetes",
  "GitHub Actions": "githubactions",
  Jenkins: "jenkins",
  AWS: "amazonaws",
  "Google Cloud": "googlecloud",
  Azure: "microsoftazure",
  Terraform: "terraform",
  Ansible: "ansible",
  Prometheus: "prometheus",
  Grafana: "grafana",
  CircleCI: "circleci",
  "Travis CI": "travisci",

  // Databases
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  MariaDB: "mariadb",
  "SQL Server": "microsoftsqlserver",
  MongoDB: "mongodb",
  Redis: "redis",
  Elasticsearch: "elasticsearch",
  Firebase: "firebase",
  Supabase: "supabase",
  DynamoDB: "amazondynamodb",
  Cassandra: "apachecassandra",

  // Languages
  Python: "python",
  Java: "java",
  "C#": "csharp",
  PHP: "php",
  Go: "go",
  Rust: "rust",
  Ruby: "ruby",
  Kotlin: "kotlin",
  Swift: "swift",

  // Tools
  Git: "git",
  GitHub: "github",
  GitLab: "gitlab",
  Bitbucket: "bitbucket",
  "VS Code": "visualstudiocode",
  Figma: "figma",
  "Adobe XD": "adobexd",
  Sketch: "sketch",
  Postman: "postman",
  Jira: "jira",
  Notion: "notion",

  // AI/ML
  TensorFlow: "tensorflow",
  PyTorch: "pytorch",
  "scikit-learn": "scikitlearn",
  OpenAI: "openai",
  "Hugging Face": "huggingface",

  // Mobile
  "React Native": "react",
  Flutter: "flutter",
  Ionic: "ionic",
  Xamarin: "xamarin",

  // Testing
  Jest: "jest",
  Mocha: "mocha",
  Cypress: "cypress",
  Selenium: "selenium",
  Playwright: "playwright",

  // Analytics
  "Google Analytics": "googleanalytics",
  Mixpanel: "mixpanel",
  Amplitude: "amplitude",

  // Other
  Vercel: "vercel",
  Netlify: "netlify",
  Heroku: "heroku",
  "Digital Ocean": "digitalocean",
  Cloudflare: "cloudflare",
  Stripe: "stripe",
  Auth0: "auth0",
  Storybook: "storybook",
}

/**
 * Get the Simple Icon slug for a technology
 * @param technology The technology name
 * @returns The slug for the technology icon or undefined if not found
 */
export function getTechnologyIconSlug(technology: string): string | undefined {
  return technologyIcons[technology]
}

/**
 * Get the Simple Icon URL for a technology
 * @param technology The technology name
 * @returns The URL to the SVG icon or undefined if not found
 */
export function getTechnologyIconUrl(technology: string): string | undefined {
  const slug = getTechnologyIconSlug(technology)
  if (!slug) return undefined
  return getSimpleIconUrl(slug)
}

