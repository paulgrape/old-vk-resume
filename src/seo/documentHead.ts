const SOCIAL_PREVIEW_EXT = /\.(jpe?g|png|webp|gif)$/i

export type DocumentHead = {
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string | null
  ogLocale: string
  twitterCard: 'summary' | 'summary_large_image'
}

export function metaDescription(text: string, max = 200): string {
  const trimmed = text.trim().replace(/\s+/g, ' ')

  if (trimmed.length <= max) {
    return trimmed
  }

  const slice = trimmed.slice(0, max - 1)
  const cut = slice.lastIndexOf(' ')

  return `${(cut > 80 ? slice.slice(0, cut) : slice).trimEnd()}…`
}

export function isSocialPreviewImage(url: string): boolean {
  const path = url.split('?')[0] ?? url

  return SOCIAL_PREVIEW_EXT.test(path)
}

export function toAbsoluteUrl(
  path: string,
  origin: string,
  base = '/',
): string {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const relative = path.startsWith('/') ? path : `${normalizedBase}${path}`

  return new URL(relative, origin).href
}

export function ogLocaleFor(locale: string): string {
  return locale === 'ru' ? 'ru_RU' : 'en_US'
}

export function buildDocumentHead({
  locale,
  name,
  role,
  description,
  imageUrl,
}: {
  locale: string
  name: string
  role: string
  description: string
  imageUrl: string | null
}): DocumentHead {
  const title = `${name} — ${role}`
  const desc = metaDescription(description)
  const ogImage = imageUrl && isSocialPreviewImage(imageUrl) ? imageUrl : null

  return {
    title,
    description: desc,
    ogTitle: title,
    ogDescription: desc,
    ogImage,
    ogLocale: ogLocaleFor(locale),
    twitterCard: ogImage ? 'summary_large_image' : 'summary',
  }
}

export function documentHeadTags(head: DocumentHead): {
  tag: 'meta'
  attrs: Record<string, string>
}[] {
  const tags: { tag: 'meta'; attrs: Record<string, string> }[] = [
    { tag: 'meta', attrs: { name: 'description', content: head.description } },
    { tag: 'meta', attrs: { property: 'og:title', content: head.ogTitle } },
    {
      tag: 'meta',
      attrs: { property: 'og:description', content: head.ogDescription },
    },
    { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
    { tag: 'meta', attrs: { property: 'og:locale', content: head.ogLocale } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: head.twitterCard } },
  ]

  if (head.ogImage) {
    tags.push(
      { tag: 'meta', attrs: { property: 'og:image', content: head.ogImage } },
      { tag: 'meta', attrs: { name: 'twitter:image', content: head.ogImage } },
    )
  }

  return tags
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}
