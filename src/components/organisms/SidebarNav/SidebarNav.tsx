import { SidebarMenuItem } from '@/components/molecules/SidebarMenuItem/SidebarMenuItem'
import { AppMenuItem } from '@/components/molecules/AppMenuItem/AppMenuItem'
import type { AppMenuItem as AppMenuItemData } from '@/data/profile'

type NavigationItem =
  | string
  | {
      label: string
      href: string
    }

type SidebarNavProps = {
  navItems: readonly NavigationItem[]
  appItems: Array<AppMenuItemData & { href?: string }>
}

function getNavigationItemData(item: NavigationItem) {
  return typeof item === 'string' ? { label: item, href: '#' } : item
}

export function SidebarNav({ navItems, appItems }: SidebarNavProps) {
  return (
    <aside className='w-[132px] shrink-0 self-stretch bg-white scheme-light'>
      <ul className='list-none self-start items-start m-0 p-0 pt-[5px] px-1'>
        {navItems.map(navItem => {
          const item = getNavigationItemData(navItem)

          return (
            <SidebarMenuItem
              key={item.label}
              label={item.label}
              href={item.href}
            />
          )
        })}
      </ul>
      {appItems.length > 0 && (
        <ul className='list-none self-start items-start m-0 p-0 pt-2 px-1 border-t border-vk-border-light'>
          {appItems.map(item => (
            <AppMenuItem
              key={item.label}
              label={item.label}
              badge={item.badge}
              href={item.href}
            />
          ))}
        </ul>
      )}
    </aside>
  )
}
