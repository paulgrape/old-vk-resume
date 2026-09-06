import { Badge } from '@/components/atoms/Badge/Badge'
import { VkLink } from '@/components/atoms/VkLink/VkLink'

type AppMenuItemProps = {
  label: string
  badge: string | null
  href?: string
}

export function AppMenuItem({ label, badge, href = '#' }: AppMenuItemProps) {
  return (
    <li className='flex items-center justify-start gap-1.5 py-[2px]'>
      <VkLink href={href}>{label}</VkLink>
      {badge ? <Badge>{badge}</Badge> : null}
    </li>
  )
}
