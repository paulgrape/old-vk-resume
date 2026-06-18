import { AvatarPlaceholder } from '@/components/atoms/AvatarPlaceholder/AvatarPlaceholder'

type FriendCardProps = {
  name: string
}

export function FriendCard({ name }: FriendCardProps) {
  return (
    <div className='flex flex-col items-center gap-0.5 text-center'>
      <AvatarPlaceholder variant='friend' />
      <span
        className='text-[10px] text-vk-link leading-tight w-full overflow-hidden'
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}
      >
        {name}
      </span>
    </div>
  )
}
