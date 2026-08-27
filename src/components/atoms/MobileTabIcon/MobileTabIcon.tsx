export type MobileTabIconName =
  | 'news'
  | 'wall'
  | 'dialogs'
  | 'friends'
  | 'media'

type MobileTabIconProps = {
  name: MobileTabIconName
  className?: string
}

const iconClassName = 'size-6'

export function MobileTabIcon({ name, className = '' }: MobileTabIconProps) {
  const combined = `${iconClassName} ${className}`.trim()

  switch (name) {
    case 'news':
      return (
        <svg
          viewBox='0 0 24 24'
          className={combined}
          aria-hidden
        >
          <rect
            x='4'
            y='4'
            width='16'
            height='16'
            rx='1.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          />
          <path
            d='M7 9h10M7 12.5h10M7 16h6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
        </svg>
      )
    case 'wall':
      return (
        <svg
          viewBox='0 0 24 24'
          className={combined}
          aria-hidden
        >
          <path
            d='M7 4.5h8.2L19 8.3V19.5H7z'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinejoin='round'
          />
          <path
            d='M15 4.7V8.5h4'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinejoin='round'
          />
          <path
            d='M10 12h6M10 15.5h4'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
        </svg>
      )
    case 'dialogs':
      return (
        <svg
          viewBox='0 0 24 24'
          className={combined}
          aria-hidden
        >
          <path
            d='M4.5 6.5h11.5v8H9.2L5 17.2V14.5H4.5z'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinejoin='round'
          />
          <path
            d='M8.5 11.2h11v7.2h-1.8v2.2l-3.6-2.2H8.5z'
            fill='currentColor'
            stroke='currentColor'
            strokeWidth='1.4'
            strokeLinejoin='round'
            opacity='0.95'
          />
        </svg>
      )
    case 'friends':
      return (
        <svg
          viewBox='0 0 24 24'
          className={combined}
          aria-hidden
        >
          <circle
            cx='9'
            cy='8'
            r='2.6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          />
          <path
            d='M4.4 17.2c.4-2.6 2.3-4 4.6-4s4.2 1.4 4.6 4'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
          <circle
            cx='16.2'
            cy='8.4'
            r='2.2'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          />
          <path
            d='M15.4 13.4c1.8.2 3.4 1.4 3.8 3.6'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinecap='round'
          />
        </svg>
      )
    case 'media':
      return (
        <svg
          viewBox='0 0 24 24'
          className={combined}
          aria-hidden
        >
          <rect
            x='3.5'
            y='6'
            width='17'
            height='13'
            rx='1.5'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          />
          <circle
            cx='8.2'
            cy='10.4'
            r='1.5'
            fill='currentColor'
          />
          <path
            d='M7.5 17.2 11.2 13l2.4 2.3 2-1.8 4.1 3.7'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            strokeLinejoin='round'
          />
        </svg>
      )
  }
}
