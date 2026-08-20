import { VkLink } from '@/components/atoms/VkLink/VkLink'

type ProfileFieldRowProps = {
  label: string
  value: string
  link: boolean
  href?: string
}

export function ProfileFieldRow({
  label,
  value,
  link,
  href,
}: ProfileFieldRowProps) {
  return (
    <tr>
      <td className='text-[12px] text-vk-muted pr-2 align-top whitespace-nowrap text-left'>
        {label}
      </td>
      <td
        className={`text-[12px] align-top text-left ${link && !href ? 'text-vk-link' : 'text-vk-text'}`}
      >
        {href ? (
          <VkLink
            href={href}
            className='text-[12px]!'
            {...(href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {value}
          </VkLink>
        ) : (
          value
        )}
      </td>
    </tr>
  )
}
