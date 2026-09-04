import { HeartIcon } from '@/components/atoms/HeartIcon/HeartIcon'

type LikeControlProps = {
  likeLabel: string
  count: number
  onLike: () => void
}

function likeDisplay(count: number): string | null {
  if (count <= 0) {
    return null
  }

  return count > 100 ? '100+' : String(count)
}

export function LikeControl({ likeLabel, count, onLike }: LikeControlProps) {
  const countLabel = likeDisplay(count)

  return (
    <span className='ml-auto flex items-center gap-1'>
      {likeLabel}
      <button
        type='button'
        className='inline-flex items-center gap-0.5 m-0 p-0 border-0 bg-transparent cursor-pointer text-vk-link'
        onClick={onLike}
        aria-label={likeLabel}
      >
        <HeartIcon filled={count > 0} />
        {countLabel}
      </button>
    </span>
  )
}
