type BadgeProps = {
  children: string
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className='text-[11px] text-vk-badge-text bg-vk-badge-bg px-1 rounded-sm'>
      {children}
    </span>
  )
}
