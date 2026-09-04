import type { DocumentHead } from '@/seo/documentHead'

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string | null,
): void {
  const selector = `meta[${attr}="${key}"]`
  const existing = document.head.querySelector(selector)

  if (!content) {
    existing?.remove()
    return
  }

  const el =
    existing ??
    (() => {
      const meta = document.createElement('meta')
      meta.setAttribute(attr, key)
      document.head.appendChild(meta)
      return meta
    })()

  el.setAttribute('content', content)
}

export function applyDocumentHead(locale: string, head: DocumentHead): void {
  document.documentElement.lang = locale
  document.title = head.title
  upsertMeta('name', 'description', head.description)
  upsertMeta('property', 'og:title', head.ogTitle)
  upsertMeta('property', 'og:description', head.ogDescription)
  upsertMeta('property', 'og:type', 'website')
  upsertMeta('property', 'og:locale', head.ogLocale)
  upsertMeta('property', 'og:image', head.ogImage)
  upsertMeta('name', 'twitter:card', head.twitterCard)
  upsertMeta('name', 'twitter:image', head.ogImage)
}
