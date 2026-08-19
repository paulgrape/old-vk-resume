import { useState } from 'react'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { StatRow } from '@/components/molecules/StatRow/StatRow'
import { PhotoViewer } from '@/components/organisms/PhotoViewer/PhotoViewer'
import type { ProfileStat } from '@/data/profile'
import type { SkillGroup } from '@/data/resume'
import { interpolate } from '@/i18n/interpolate'

type ResumePhotoPanelProps = {
  name: string
  avatarSrc: string
  avatarFullSrc: string
  email: string
  stats: ProfileStat[]
  skillGroups: SkillGroup[]
  writeMessageLabel: string
  skillsCountTemplate: string
  showAllLabel: string
}

export function ResumePhotoPanel({
  name,
  avatarSrc,
  avatarFullSrc,
  email,
  stats,
  skillGroups,
  writeMessageLabel,
  skillsCountTemplate,
  showAllLabel,
}: ResumePhotoPanelProps) {
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <div className='w-[200px] shrink-0 pt-2 pl-2'>
      <button
        type='button'
        className='block m-0 p-0 border-0 bg-transparent cursor-pointer'
        onClick={() => setPhotoOpen(true)}
      >
        <img
          src={avatarSrc}
          alt={name}
          className='w-[200px] h-[200px] object-cover'
        />
      </button>

      {photoOpen ? (
        <PhotoViewer
          photos={[
            {
              src: avatarFullSrc,
              alt: name,
              likes: '12',
              authorName: name,
              authorAvatar: avatarSrc,
            },
          ]}
          index={0}
          onClose={() => setPhotoOpen(false)}
        />
      ) : null}

      <div className='mt-1 mx-0.5 divide-y divide-vk-border-light'>
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
        href={`mailto:${email}`}
        className='flex items-center gap-1.5'
      >
        {writeMessageLabel}
      </VkLink>

      <Divider className='my-2' />

      {skillGroups.map(group => (
        <div
          key={group.title}
          className='mb-2'
        >
          <SectionHeader
            title={group.title}
            count={interpolate(skillsCountTemplate, {
              count: group.items.length,
            })}
            linkText={showAllLabel}
          />
          <div className='flex flex-wrap gap-1.5 pt-2 px-1'>
            {group.items.map(skill => (
              <span
                key={skill}
                className='bg-vk-friends-count text-vk-link text-[11px] px-1.5 py-0.5 border border-vk-border-light'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
