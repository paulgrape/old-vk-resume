import { AppMenuItem } from '@/components/molecules/AppMenuItem/AppMenuItem'
import { SidebarMenuItem } from '@/components/molecules/SidebarMenuItem/SidebarMenuItem'
import type { AppMenuItem as AppMenuItemData } from '@/data/profile'
import { resumeRouteHrefs } from '@/data/resumeRoutes'

type NavigationItem =
  | string
  | {
      label: string
      href: string
      badge?: string
    }

type SidebarNavProps = {
  navItems: readonly NavigationItem[]
  appItems: Array<AppMenuItemData & { href?: string }>
}

function getNavigationItemData(item: NavigationItem) {
  return typeof item === 'string' ? { label: item, href: '#' } : item
}

export function SidebarNav({ navItems, appItems }: SidebarNavProps) {
  const items = navItems.map(getNavigationItemData)
  const mainItems = items.filter(
    item => item.href !== resumeRouteHrefs.downloadCv,
  )
  const downloadItems = items.filter(
    item => item.href === resumeRouteHrefs.downloadCv,
  )
  const showBelow = downloadItems.length > 0 || appItems.length > 0

  return (
    <aside className='w-[132px] shrink-0 self-stretch bg-white scheme-light'>
      <ul className='list-none self-start items-start m-0 p-0 pt-[5px] pl-1'>
        {mainItems.map(item => (
          <SidebarMenuItem
            key={item.label}
            label={item.label}
            href={item.href}
            badge={item.badge}
          />
        ))}
      </ul>
      {showBelow ? (
        <ul className='list-none self-start items-start m-0 p-0 pt-2 px-1 border-t border-vk-border-light'>
          {downloadItems.map(item => (
            <SidebarMenuItem
              key={item.label}
              label={item.label}
              href={item.href}
              badge={item.badge}
            />
          ))}
          {appItems.map(item => (
            <AppMenuItem
              key={item.label}
              label={item.label}
              badge={item.badge}
              href={item.href}
            />
          ))}
        </ul>
      ) : null}
    </aside>
  )
}
