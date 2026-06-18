import { SidebarMenuItem } from '@/components/molecules/SidebarMenuItem/SidebarMenuItem'
import type { AppMenuItem as AppMenuItemData } from '@/data/profile'

type SidebarNavProps = {
  navItems: readonly string[]
  appItems: AppMenuItemData[]
}

export function SidebarNav({ navItems, appItems }: SidebarNavProps) {
  return (
    <aside className='w-[132px] shrink-0 self-stretch bg-white scheme-light'>
      <ul className='list-none self-start items-start m-0 p-0 pt-[5px] px-1'>
        {navItems.map(item => (
          <SidebarMenuItem
            key={item}
            label={item}
          />
        ))}
      </ul>
    </aside>
  )
}
