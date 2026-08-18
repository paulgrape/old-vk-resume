import { VkLink } from '@/components/atoms/VkLink/VkLink'

type StatRowProps = {
  label: string
  count: string
}

export function StatRow({ label, count }: StatRowProps) {
  return (
    <div className='flex items-center justify-between py-[3px]'>
      <VkLink href='#'>{label}</VkLink>
      <span className='text-[12px] text-vk-muted ml-1 shrink-0'>{count}</span>
    </div>
  )
}
