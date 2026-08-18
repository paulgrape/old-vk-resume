import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  defaultLocale,
  isLocale,
  localeStorageKey,
  messagesByLocale,
  type Locale,
  type LocaleMessages,
} from '@/i18n/locales'

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  messages: LocaleMessages
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function readStoredLocale(): Locale {
  try {
    const stored = localStorage.getItem(localeStorageKey)

    if (stored && isLocale(stored)) {
      return stored
    }
  } catch {
    // localStorage can be unavailable in private mode
  }

  return defaultLocale
}

function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(localeStorageKey, locale)
  } catch {
    // ignore quota / access errors
  }
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale)
  const messages = messagesByLocale[locale]

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale)
    persistLocale(nextLocale)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = messages.meta.documentTitle
  }, [locale, messages.meta.documentTitle])

  const value = useMemo(
    () => ({ locale, setLocale, messages }),
    [locale, messages, setLocale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider')
  }

  return context
}
