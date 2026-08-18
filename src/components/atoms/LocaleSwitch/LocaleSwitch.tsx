import { useLocale } from '@/i18n/LocaleContext'
import { locales } from '@/i18n/locales'

export function LocaleSwitch() {
  const { locale, setLocale, messages } = useLocale()

  return (
    <div
      className='flex items-center gap-1 text-white text-[11px] font-bold shrink-0'
      role='group'
      aria-label={messages.ui.localeSwitch}
    >
      {locales.map((item, index) => {
        const isActive = item === locale

        return (
          <span key={item} className='flex items-center gap-1'>
            {index > 0 ? <span className='opacity-70'>|</span> : null}
            <button
              type='button'
              aria-pressed={isActive}
              onClick={() => setLocale(item)}
              className={`bg-transparent border-0 p-0 font-bold text-[11px] text-white cursor-pointer ${
                isActive ? 'opacity-100' : 'opacity-70 hover:underline'
              }`}
            >
              {item.toUpperCase()}
            </button>
          </span>
        )
      })}
    </div>
  )
}
