import { AvatarPlaceholder } from '@/components/atoms/AvatarPlaceholder/AvatarPlaceholder'

type FriendCardProps = {
  name: string
  src?: string
}

export function FriendCard({ name, src }: FriendCardProps) {
  return (
    <div className='flex flex-col items-center gap-0.5 text-center'>
      {src ? (
        <img
          src={src}
          alt={name}
          className='w-[50px] h-[50px] object-contain bg-white p-0.5'
        />
      ) : (
        <AvatarPlaceholder variant='friend' />
      )}
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
