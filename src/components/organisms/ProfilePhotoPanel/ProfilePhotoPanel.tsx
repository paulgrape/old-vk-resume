import { useState } from 'react'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { FriendCard } from '@/components/molecules/FriendCard/FriendCard'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { StatRow } from '@/components/molecules/StatRow/StatRow'
import { PhotoViewer } from '@/components/organisms/PhotoViewer/PhotoViewer'
import { sitePhotos } from '@/data/content'
import type { ProfileStat } from '@/data/profile'

type FriendsSectionData = {
  title: string
  count: string
  linkText: string
}

type ProfilePhotoPanelProps = {
  name: string
  stats: ProfileStat[]
  friends: readonly string[]
  friendsSection: FriendsSectionData
  friendsOnlineSection: FriendsSectionData
}

export function ProfilePhotoPanel({
  name,
  stats,
  friends,
  friendsSection,
  friendsOnlineSection,
}: ProfilePhotoPanelProps) {
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <div className='w-[200px] shrink-0 pt-2 pl-2 max-vk:w-full max-vk:pl-0'>
      <button
        type='button'
        className='block m-0 p-0 border-0 bg-transparent cursor-pointer max-vk:w-full'
        onClick={() => setPhotoOpen(true)}
      >
        <img
          src={sitePhotos.avatar}
          srcSet={`${sitePhotos.avatar} 500w`}
          sizes='(max-width: 790px) 100vw, 200px'
          alt={name}
          className='w-[200px] h-[200px] object-cover [image-rendering:high-quality] max-vk:w-full max-vk:h-auto max-vk:aspect-square'
        />
      </button>

      {photoOpen ? (
        <PhotoViewer
          photos={[
            {
              src: sitePhotos.avatar,
              alt: name,
              authorName: name,
              authorAvatar: sitePhotos.avatar,
            },
          ]}
          index={0}
          onClose={() => setPhotoOpen(false)}
        />
      ) : null}

      <div className='divide-y divide-vk-border-light'>
        {stats.map(({ label, count }) => (
          <StatRow
            key={label}
            label={label}
            count={count}
          />
        ))}
      </div>

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
