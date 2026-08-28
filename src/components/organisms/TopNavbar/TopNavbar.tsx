import headerBg from '@/assets/vk-header-bg.gif'
import { LocaleSwitch } from '@/components/atoms/LocaleSwitch/LocaleSwitch'
import { NavLink } from '@/components/atoms/NavLink/NavLink'
import { SearchInput } from '@/components/atoms/SearchInput/SearchInput'
import { useLocale } from '@/i18n/LocaleContext'

type NavigationItem = string | {
  label: string
  href: string
}

type TopNavbarProps = {
  links: readonly NavigationItem[]
}

function getNavigationItemData(item: NavigationItem) {
  return typeof item === 'string' ? { label: item, href: '#' } : item
}

function isExternalHref(href: string) {
  return /^https?:\/\//.test(href)
}

export function TopNavbar({ links }: TopNavbarProps) {
  const { messages } = useLocale()

  return (
    <header
      className='relative w-full max-w-[791px] h-[45px] mx-auto rounded-b-[10px] bg-no-repeat bg-size-[100%_100%]'
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <div className='relative z-10 flex h-full w-full items-center gap-3 pl-[150px] pr-2'>
        <SearchInput placeholder={messages.ui.searchPlaceholder} />

        <nav className='flex flex-1 flex-wrap items-center justify-end gap-5 pr-1.5'>
          {links.map(link => {
            const item = getNavigationItemData(link)

            return (
              <NavLink
                key={item.label}
                href={item.href}
                target={isExternalHref(item.href) ? '_blank' : undefined}
                rel={isExternalHref(item.href) ? 'noreferrer' : undefined}
              >
                {item.label}
              </NavLink>
            )
          })}
          <LocaleSwitch />
        </nav>
      </div>
    </header>
  )
}
