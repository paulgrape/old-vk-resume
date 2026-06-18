type ProfileTitlebarProps = {
  name: string
  subtitle: string
  status: string
}

export function ProfileTitlebar({
  name,
  subtitle,
  status,
}: ProfileTitlebarProps) {
  return (
    <div className='flex items-center justify-between px-2.5 py-[7px] border-b border-vk-border h-[24px] bg-vk-titlebar'>
      <span className='text-[11px] font-bold text-black'>
        {name} <span className='text-vk-muted/60'> {subtitle}</span>
      </span>
      <span className='text-[12px] text-vk-muted'>{status}</span>
    </div>
  )
}
