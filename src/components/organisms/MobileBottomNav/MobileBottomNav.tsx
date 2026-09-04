import {
  MobileTabIcon,
  type MobileTabIconName,
} from '@/components/atoms/MobileTabIcon/MobileTabIcon'

export type MobileBottomNavItem = {
  label: string
  href: string
  icon: MobileTabIconName
}

type MobileBottomNavProps = {
  items: readonly MobileBottomNavItem[]
  activeHref?: string
}

export function MobileBottomNav({ items, activeHref }: MobileBottomNavProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className='fixed inset-x-0 bottom-0 z-30 hidden border-t border-black/80 bg-vk-tabbar max-vk:block pb-[env(safe-area-inset-bottom)]'>
      <ul className='m-0 flex min-h-[49px] list-none p-0'>
        {items.map(item => {
          const active = item.href === activeHref

          return (
            <li key={item.href} className='min-w-0 flex-1'>
              <a
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex h-full min-w-0 flex-col items-center justify-center gap-0.5 px-0.5 no-underline ${
                  active
                    ? 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.16),rgba(0,0,0,0.28))] text-white'
                    : 'text-[#b3b3b3]'
                }`}
              >
                <MobileTabIcon
                  name={item.icon}
                  className={
                    active
                      ? 'text-white drop-shadow-[0_0_5px_var(--color-vk-tab-glow)]'
                      : ''
                  }
                />
                <span className='max-w-full line-clamp-2 px-0.5 text-center text-[9px] leading-tight font-bold'>
                  {item.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
