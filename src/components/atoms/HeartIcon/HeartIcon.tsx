type HeartIconProps = {
  filled: boolean
}

export function HeartIcon({ filled }: HeartIconProps) {
  return (
    <svg
      viewBox='0 0 16 14'
      width='12'
      height='11'
      aria-hidden='true'
      className='shrink-0'
    >
      <path
        d='M8 13.2S1.2 8.6 1.2 4.7C1.2 2.6 2.8 1 4.8 1c1.2 0 2.3.6 3.2 1.6C8.9 1.6 10 1 11.2 1c2 0 3.6 1.6 3.6 3.7 0 3.9-6.8 8.5-6.8 8.5z'
        fill={filled ? 'currentColor' : 'none'}
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
    </svg>
  )
}
