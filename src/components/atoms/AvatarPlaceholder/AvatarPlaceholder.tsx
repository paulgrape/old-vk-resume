type AvatarPlaceholderProps = {
  variant?: 'profile' | 'friend' | 'post'
  className?: string
}

const variantClasses = {
  profile: 'w-[200px] aspect-square bg-gradient-to-br from-vk-avatar-from to-vk-avatar-to mb-2',
  friend: 'w-[50px] h-[50px] bg-gradient-to-br from-vk-friend-avatar-from to-vk-friend-avatar-to',
  post: 'w-[45px] h-[45px] shrink-0 bg-gradient-to-br from-vk-avatar-from to-vk-avatar-to',
} as const

export function AvatarPlaceholder({
  variant = 'profile',
  className = '',
}: AvatarPlaceholderProps) {
  return <div className={`${variantClasses[variant]} ${className}`.trim()} />
}
