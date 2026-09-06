type BadgeProps = {
  children: string
}

export function Badge({ children }: BadgeProps) {
  return (
    <span className='inline-block text-[10px] leading-[18px] font-bold text-vk-badge-text bg-vk-badge-bg px-0.5 py-px rounded-xs'>
      {children}
    </span>
  )
}
