import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { WallPost } from '@/components/molecules/WallPost/WallPost'
import type { WallPost as WallPostData } from '@/data/profile'

type WallSectionProps = {
  title: string
  count: string
  linkText: string
  posts: WallPostData[]
}

export function WallSection({ title, count, linkText, posts }: WallSectionProps) {
  return (
    <div>
      <SectionHeader title={title} count={count} linkText={linkText} />
      {posts.map(post => (
        <WallPost key={post.date} post={post} />
      ))}
    </div>
  )
}
