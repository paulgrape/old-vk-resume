import avatar from '@/assets/avatar-small.jpg'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { FriendCard } from '@/components/molecules/FriendCard/FriendCard'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { StatRow } from '@/components/molecules/StatRow/StatRow'
import type { ProfileStat } from '@/data/profile'

type FriendsSectionData = {
  title: string
  count: string
  linkText: string
}

type ProfilePhotoPanelProps = {
  stats: ProfileStat[]
  friends: readonly string[]
  friendsSection: FriendsSectionData
  friendsOnlineSection: FriendsSectionData
}

export function ProfilePhotoPanel({
  stats,
  friends,
  friendsSection,
  friendsOnlineSection,
}: ProfilePhotoPanelProps) {
  return (
    <div className='w-[200px] shrink-0 pt-2 pl-2'>
      <img
        src={avatar}
        alt={name}
        className='w-[200px] h-[200px] object-cover'
      />

      {stats.map(({ label, count }) => (
        <StatRow
          key={label}
          label={label}
          count={count}
        />
      ))}

      <Divider className='my-2' />

      <VkLink
        href='#'
        className='flex items-center gap-1.5'
      >
        Отправить подарок
      </VkLink>

      <Divider className='my-2' />

      <SectionHeader
        title={friendsSection.title}
        count={friendsSection.count}
        linkText={friendsSection.linkText}
      />

      <div className='grid grid-cols-[repeat(3,50px)] gap-x-[15px] gap-y-1.5 mb-1 pt-2.5 items-center justify-center'>
        {friends.map(name => (
          <FriendCard
            key={name}
            name={name}
          />
        ))}
      </div>

      <Divider className='mt-2 mb-1' />
      <SectionHeader
        title={friendsOnlineSection.title}
        count={friendsOnlineSection.count}
        linkText={friendsOnlineSection.linkText}
      />

      <div className='grid grid-cols-[repeat(3,50px)] gap-x-[15px] gap-y-1.5 mb-1 pt-2.5 items-center justify-center'>
        {friends.map(name => (
          <FriendCard
            key={name}
            name={name}
          />
        ))}
      </div>
    </div>
  )
}
