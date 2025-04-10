export function generatePersonSchema(data: {
  name: string
  jobTitle: string
  image: string
  url: string
  description: string
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: data.name,
    jobTitle: data.jobTitle,
    image: data.image,
    url: data.url,
    description: data.description,
    sameAs: data.sameAs || [],
  }
}

export function generateServiceSchema(data: {
  name: string
  description: string
  provider: {
    name: string
    url: string
  }
  url: string
  areaServed?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.name,
    description: data.description,
    provider: {
      "@type": "Person",
      name: data.provider.name,
      url: data.provider.url,
    },
    url: data.url,
    areaServed: data.areaServed,
  }
}

export function generatePortfolioItemSchema(data: {
  name: string
  description: string
  image: string
  url: string
  author: {
    name: string
    url: string
  }
  datePublished: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: data.name,
    description: data.description,
    image: data.image,
    url: data.url,
    author: {
      "@type": "Person",
      name: data.author.name,
      url: data.author.url,
    },
    datePublished: data.datePublished,
  }
}

