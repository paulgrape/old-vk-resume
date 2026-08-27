import { LocaleSwitch } from '@/components/atoms/LocaleSwitch/LocaleSwitch'
import { resumeRouteHrefs } from '@/data/resumeRoutes'

type MobileTopBarProps = {
  title: string
  backLabel: string
  showBack?: boolean
}

export function MobileTopBar({
  title,
  backLabel,
  showBack = false,
}: MobileTopBarProps) {
  return (
    <header className='sticky top-0 z-20 hidden h-11 w-full bg-vk-header shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] max-vk:grid grid-cols-[1fr_auto_1fr] items-center px-2'>
      <div className='flex min-w-0 items-center justify-start'>
        {showBack ? (
          <a
            href={resumeRouteHrefs.home}
            aria-label={backLabel}
            className='inline-flex size-8 items-center justify-start text-white no-underline text-[28px] leading-none font-bold [text-shadow:0_1px_0_rgba(0,0,0,0.35)]'
          >
            ‹
          </a>
        ) : (
          <span className='size-8' />
        )}
      </div>

      <p className='m-0 max-w-[55vw] truncate text-center text-[15px] font-bold leading-none text-white [text-shadow:0_1px_0_rgba(0,0,0,0.35)]'>
        {title}
      </p>

      <div className='flex items-center justify-end'>
        <LocaleSwitch />
      </div>
    </header>
  )
}
