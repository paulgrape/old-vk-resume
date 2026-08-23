import type { Locale } from '@/i18n/locales'

export type CvFile = {
  locale: Locale
  fileName: string
  href: string
}

export const cvOutputDir = 'cv'

export const cvFileNames: Record<Locale, string> = {
  en: 'Pavel_Vinogradov_Frontend_Developer_EN.pdf',
  ru: 'Pavel_Vinogradov_Frontend_Developer_RU.pdf',
}

export const cvFiles: Record<Locale, CvFile> = {
  en: {
    locale: 'en',
    fileName: cvFileNames.en,
    href: `/${cvOutputDir}/${cvFileNames.en}`,
  },
  ru: {
    locale: 'ru',
    fileName: cvFileNames.ru,
    href: `/${cvOutputDir}/${cvFileNames.ru}`,
  },
}
