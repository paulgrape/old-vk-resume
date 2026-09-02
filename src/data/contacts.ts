import type { ContactId } from '@/data/contactLogos'

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function telegramHandle(url: string): string {
  const path = url.replace(/^https?:\/\/(t\.me|telegram\.me)\//, '')

  return path.startsWith('@') ? path : `@${path}`
}

export function telegramHref(raw: string): string {
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  return `https://t.me/${raw.replace(/^@/, '')}`
}

function lastPathSegment(url: string): string {
  return url.replace(/\/+$/, '').split('/').pop() ?? url
}

function looksLikeEmail(value: string): boolean {
  return value.includes('@') && !value.includes('://')
}

export function contactHref(id: ContactId, raw: string): string {
  if (
    raw.startsWith('mailto:') ||
    raw.startsWith('tel:') ||
    raw.startsWith('skype:')
  ) {
    return raw
  }

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  if (id === 'email') {
    return `mailto:${raw}`
  }

  if (id === 'phone') {
    return telHref(raw)
  }

  if (id === 'telegram') {
    return telegramHref(raw)
  }

  if (looksLikeEmail(raw)) {
    return `mailto:${raw}`
  }

  return raw
}

export function contactValue(id: ContactId, raw: string, href: string): string {
  if (id === 'email') {
    return raw.replace(/^mailto:/, '')
  }

  if (id === 'phone') {
    return raw
  }

  if (id === 'telegram') {
    return telegramHandle(href)
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return lastPathSegment(href)
  }

  return raw
}
