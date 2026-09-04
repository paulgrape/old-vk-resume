import enResume from '@content/en.json'
import ruResume from '@content/ru.json'
import site from '@content/site.json'
import type { Locale } from '@/i18n/locales'
import type { ResumeJson, SiteConfig, SitePhotos } from '@/data/contentTypes'

export type { ResumeJson, SiteConfig, SitePhotos }

const photoModules = import.meta.glob(
  '@content/photos/*.{jpg,jpeg,png,webp,gif,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>

const iconModules = import.meta.glob('@content/icons/**/*.{svg,png,ico}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function urlFromModules(
  modules: Record<string, string>,
  filename: string,
): string | undefined {
  return Object.entries(modules).find(([modulePath]) =>
    modulePath.replaceAll('\\', '/').endsWith(`/${filename}`),
  )?.[1]
}

function photoUrl(filename: string): string {
  const url = urlFromModules(photoModules, filename)

  if (!url) {
    throw new Error(`Missing photos/${filename} in the active content pack.`)
  }

  return url
}

export function iconUrl(filename: string): string | undefined {
  return urlFromModules(iconModules, filename)
}

export const siteConfig: SiteConfig = site satisfies SiteConfig

export const resumeByLocale: Record<Locale, ResumeJson> = {
  en: enResume satisfies ResumeJson,
  ru: ruResume satisfies ResumeJson,
}

export const sitePhotos: SitePhotos = {
  avatar: photoUrl(siteConfig.photos.avatar),
}
