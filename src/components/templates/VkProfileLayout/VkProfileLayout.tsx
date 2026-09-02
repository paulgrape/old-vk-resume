import type { ReactNode } from 'react'
import { SkipLink } from '@/components/atoms/SkipLink/SkipLink'

type VkProfileLayoutProps = {
  header: ReactNode
  mobileHeader?: ReactNode
  sidebar: ReactNode
  titlebar?: ReactNode | null
  photoColumn?: ReactNode
  mainColumn: ReactNode
  footer: ReactNode
  mobileNav?: ReactNode
  skipLabel: string
}

export function VkProfileLayout({
  header,
  mobileHeader,
  sidebar,
  titlebar,
  photoColumn,
  mainColumn,
  footer,
  mobileNav,
  skipLabel,
}: VkProfileLayoutProps) {
  const mainColumnClassName = photoColumn
    ? 'w-[420px] shrink-0 min-w-0 max-vk:w-full'
    : 'w-full min-w-0'

  return (
    <div className='flex flex-col min-h-screen bg-white w-full mx-auto max-vk:pb-[calc(56px+env(safe-area-inset-bottom))]'>
      <SkipLink label={skipLabel} />
      <div className='max-vk:hidden'>{header}</div>
      {mobileHeader}

      <div className='max-w-[791px] mx-auto max-vk:max-w-none w-full'>
        <div className='flex flex-1 -mt-px border-vk-border items-start max-w-[791px] mr-auto max-vk:max-w-none max-vk:mr-0'>
          <div className='max-vk:hidden self-stretch shrink-0'>{sidebar}</div>

          <div className='flex-1 min-w-0 flex flex-col border-x border-vk-border shadow-xs w-[632px] ml-[13px] mr-[15px] max-vk:w-full max-vk:ml-0 max-vk:mr-0 max-vk:border-x-0 max-vk:shadow-none max-vk:text-left'>
            {titlebar ? <div className='max-vk:hidden'>{titlebar}</div> : null}

            <main
              id='main-content'
              tabIndex={-1}
              className='flex flex-1 items-start bg-white scheme-light gap-[10px] max-vk:flex-col max-vk:gap-0'
            >
              {photoColumn}
              <div className={mainColumnClassName}>{mainColumn}</div>
            </main>
          </div>
        </div>
      </div>

      {footer}
      {mobileNav}
    </div>
  )
}
