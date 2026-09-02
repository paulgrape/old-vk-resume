import { VkLink } from '@/components/atoms/VkLink/VkLink'

type SidebarMenuItemProps = {
  label: string
  href?: string
}

export function SidebarMenuItem({ label, href = '#' }: SidebarMenuItemProps) {
  return (
    <li className='text-left h-[24px]'>
      <VkLink href={href} className='h-[20px] flex items-center justify-start'>
        {label}
      </VkLink>
    </li>
  )
}
