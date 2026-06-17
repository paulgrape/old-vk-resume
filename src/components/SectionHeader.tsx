type SectionHeaderProps = {
  title: string
  count?: string
  linkText?: string
  linkHref?: string
}

export function SectionHeader({
  title,
  count,
  linkText,
  linkHref = '#',
}: SectionHeaderProps) {
  return (
    <div>
      <div className='flex items-baseline justify-between px-2 bg-vk-friends-header'>
        <span className='text-[13px] font-bold text-vk-heading'>{title}</span>
        {linkText && (
          <a
            href={linkHref}
            className='text-[12px] text-vk-link no-underline hover:underline'
          >
            {linkText}
          </a>
        )}
      </div>
      {count && (
        <div className='text-left px-2 bg-vk-friends-count'>
          <span className='m-0 text-[12px] text-vk-muted text-left'>
            {count}
          </span>
        </div>
      )}
    </div>
  )
}
