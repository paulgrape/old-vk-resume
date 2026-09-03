import { locales, type Locale } from '@/i18n/locales'

export const cvFormats = ['pdf', 'docx'] as const

export type CvFormat = (typeof cvFormats)[number]

export type CvFile = {
  locale: Locale
  format: CvFormat
  fileName: string
  href: string
}

export const cvOutputDir = 'cv'

export function slugifyPersonName(name: string): string {
  const slug = name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')

  return slug || 'Resume'
}

export function cvFileName(
  name: string,
  locale: Locale,
  format: CvFormat = 'pdf',
): string {
  return `${slugifyPersonName(name)}_${locale.toUpperCase()}.${format}`
}

function publicBaseUrl(): string {
  const env = (import.meta as { env?: { BASE_URL?: string } }).env
  const base = env?.BASE_URL
  const prefix = typeof base === 'string' && base.length > 0 ? base : '/'

  return prefix.endsWith('/') ? prefix : `${prefix}/`
}

export function cvFileHref(fileName: string): string {
  return `${publicBaseUrl()}${cvOutputDir}/${fileName}`
}

export function cvFileFor(
  name: string,
  locale: Locale,
  format: CvFormat = 'pdf',
): CvFile {
  const fileName = cvFileName(name, locale, format)

  return {
    locale,
    format,
    fileName,
    href: cvFileHref(fileName),
  }
}

export function cvFilesFor(name: string): Record<Locale, CvFile> {
  return Object.fromEntries(
    locales.map(locale => [locale, cvFileFor(name, locale)]),
  ) as Record<Locale, CvFile>
}

export function cvDownloadList(
  name: string,
  preferredLocale: Locale,
): CvFile[] {
  const orderedLocales = [
    preferredLocale,
    ...locales.filter(locale => locale !== preferredLocale),
  ]

  return orderedLocales.flatMap(locale =>
    cvFormats.map(format => cvFileFor(name, locale, format)),
  )
}
