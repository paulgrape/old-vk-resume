import enResume from '@content/en.json'
import ruResume from '@content/ru.json'
import site from '@content/site.json'
import type { Locale } from '@/i18n/locales'

const photoModules = import.meta.glob('../../content/photos/*.{jpg,jpeg,png,webp,gif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const iconModules = import.meta.glob('../../content/icons/**/*.{svg,png,ico}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function urlFromModules(
  modules: Record<string, string>,
  filename: string,
): string | undefined {
  const match = Object.entries(modules).find(([modulePath]) =>
    modulePath.replaceAll('\\', '/').endsWith(`/${filename}`),
  )

  return match?.[1]
}

function photoUrl(filename: string): string {
  const url = urlFromModules(photoModules, filename)

  if (!url) {
    throw new Error(`Missing content/photos/${filename}`)
  }

  return url
}

export function iconUrl(filename: string): string | undefined {
  return urlFromModules(iconModules, filename)
}

export type SiteConfig = typeof site

export type ResumeJson = typeof enResume

export type SitePhotos = {
  avatar: string
  avatarFull: string
  avatarIcon: string
}

export const siteConfig: SiteConfig = site

export const resumeByLocale: Record<Locale, ResumeJson> = {
  en: enResume,
  ru: ruResume,
}

export const sitePhotos: SitePhotos = {
  avatar: photoUrl(site.photos.avatar),
  avatarFull: photoUrl(site.photos.avatarFull),
  avatarIcon: photoUrl(site.photos.avatarIcon),
}
