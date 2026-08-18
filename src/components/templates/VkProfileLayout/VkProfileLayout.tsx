import type { ReactNode } from 'react'

type VkProfileLayoutProps = {
  header: ReactNode
  sidebar: ReactNode
  titlebar?: ReactNode | null
  photoColumn?: ReactNode
  mainColumn: ReactNode
  footer: ReactNode
}

export function VkProfileLayout({
  header,
  sidebar,
  titlebar,
  photoColumn,
  mainColumn,
  footer,
}: VkProfileLayoutProps) {
  const mainColumnClassName = photoColumn
    ? 'w-[420px] shrink-0 min-w-0'
    : 'w-full min-w-0'

  return (
    <div className='flex flex-col min-h-screen bg-white w-full mx-auto '>
      {header}

      <div className='max-w-[791px] mx-auto'>
        <div className='flex flex-1 -mt-px border-vk-border items-start max-w-[791px] mr-auto'>
          {sidebar}

          <div className='flex-1 min-w-0 flex flex-col border-x border-vk-border shadow-xs w-[632px]  ml-[13px] mr-[15px]'>
            {titlebar}

            <div className='flex flex-1 items-start bg-white scheme-light gap-[10px]'>
              {photoColumn}
              <div className={mainColumnClassName}>{mainColumn}</div>
            </div>
          </div>
        </div>
      </div>

      {footer}
    </div>
  )
}
