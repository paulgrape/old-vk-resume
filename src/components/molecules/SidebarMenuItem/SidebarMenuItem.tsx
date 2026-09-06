import { Badge } from '@/components/atoms/Badge/Badge'
import { VkLink } from '@/components/atoms/VkLink/VkLink'

type SidebarMenuItemProps = {
  label: string
  href?: string
  badge?: string
}

export function SidebarMenuItem({
  label,
  href = '#',
  badge,
}: SidebarMenuItemProps) {
  return (
    <li className='h-[24px] pl-1'>
      <VkLink
        href={href}
        hoverUnderline={false}
        className='group flex h-[20px] w-full items-center justify-between gap-1.5'
      >
        <span className='min-w-0 truncate group-hover:underline'>{label}</span>
        {badge ? <Badge>{badge}</Badge> : null}
      </VkLink>
    </li>
  )
}
