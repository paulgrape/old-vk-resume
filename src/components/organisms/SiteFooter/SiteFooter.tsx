import { VkLink } from '@/components/atoms/VkLink/VkLink'

type SiteFooterProps = {
  links: readonly string[]
  copyright: string
}

export function SiteFooter({ links, copyright }: SiteFooterProps) {
  return (
    <footer className='border-t border-vk-border px-4 py-3 text-center max-w-[791px] mx-auto w-full  bg-vk-footer'>
      <nav className='flex justify-center gap-4 flex-wrap mb-1'>
        {links.map(link => (
          <VkLink
            key={link}
            href='#'
          >
            {link}
          </VkLink>
        ))}
      </nav>
      <p className='m-0 text-[12px] text-vk-muted'>{copyright}</p>
    </footer>
  )
}
