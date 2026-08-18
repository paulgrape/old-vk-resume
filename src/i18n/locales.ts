import en from '@/locales/en.json'
import ru from '@/locales/ru.json'

export const locales = ['en', 'ru'] as const

export type Locale = (typeof locales)[number]

export type LocaleMessages = typeof en

export const defaultLocale: Locale = 'en'

export const localeStorageKey = 'locale'

export const messagesByLocale: Record<Locale, LocaleMessages> = {
  en,
  ru,
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}
