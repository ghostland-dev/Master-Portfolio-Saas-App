import { marked } from "marked"
import { useEffect, useState } from "react"

export default function ArticleRenderer({ markdown }: { markdown: string }) {
  const [html, setHtml] = useState("")

  useEffect(() => {
    // Assure que le rendu est synchrone
    const htmlContent = marked.parse(markdown, { async: false }) as string
    setHtml(htmlContent)
  }, [markdown])

  return (
    <div
      className="prose prose-lg dark:prose-invert max-w-none mb-12"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
