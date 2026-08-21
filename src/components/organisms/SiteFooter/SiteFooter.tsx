import { VkLink } from '@/components/atoms/VkLink/VkLink'

export type SiteFooterLink = {
  label: string
  href: string
}

type SiteFooterProps = {
  links: readonly SiteFooterLink[]
  copyright: string
  disclaimer?: string
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

export function SiteFooter({ links, copyright, disclaimer }: SiteFooterProps) {
  return (
    <footer className='border-t border-vk-border px-4 py-3 text-center max-w-[791px] mx-auto w-full  bg-vk-footer'>
      <nav className='flex justify-center gap-4 flex-wrap mb-1'>
        {links.map(link => {
          const external = isExternalHref(link.href)

          return (
            <VkLink
              key={link.label}
              href={link.href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </VkLink>
          )
        })}
      </nav>
      <p className='m-0 text-[12px] text-vk-muted'>{copyright}</p>
      {disclaimer ? (
        <p className='m-0 mt-1 text-[12px] text-vk-muted'>{disclaimer}</p>
      ) : null}
    </footer>
  )
}
