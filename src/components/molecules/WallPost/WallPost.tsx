import { PhotoTile } from '@/components/atoms/PhotoTile/PhotoTile'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { sitePhotos } from '@/data/content'
import type { WallPost as WallPostData } from '@/data/profile'

type WallPostProps = {
  post: WallPostData
}

export function WallPost({ post }: WallPostProps) {
  return (
    <article className='flex gap-2.5 pr-3 pt-2.5 pb-2 border-b border-vk-border-light'>
      <img
        src={sitePhotos.avatar}
        alt={post.author}
        width={45}
        height={45}
        className='size-[45px] object-cover'
      />
      <div className='flex-1 min-w-0'>
        <VkLink
          href='#'
          size='md'
          bold
          block
          className='mb-1 text-left'
        >
          {post.author}
        </VkLink>
        <p className='m-0 mb-2 text-[13px] text-vk-text leading-[1.45] text-left'>
          {post.text}
        </p>

        <div
          className='grid gap-0.5 my-2'
          style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
        >
          {Array.from({ length: post.photoCount }).map((_, i) => (
            <PhotoTile
              key={i}
              hue={195 + i * 8}
              saturation={25}
              lightness={50 + (i % 3) * 8}
            />
          ))}
        </div>

        <div className='flex items-center gap-4 text-[12px] text-vk-muted'>
          <span>{post.date}</span>
          <VkLink href='#'>Ответить</VkLink>
          <span className='ml-auto flex items-center gap-1'>
            Мне нравится <span className='text-vk-link'>{post.likes}</span>
          </span>
        </div>
      </div>
    </article>
  )
}
