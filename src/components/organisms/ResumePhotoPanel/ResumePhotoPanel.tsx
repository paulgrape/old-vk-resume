import avatar from '@/assets/avatar-small.jpg'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { StatRow } from '@/components/molecules/StatRow/StatRow'
import type { ProfileStat } from '@/data/profile'
import type { SkillGroup } from '@/data/resume'

type ResumePhotoPanelProps = {
  name: string
  stats: ProfileStat[]
  skillGroups: SkillGroup[]
}

export function ResumePhotoPanel({
  name,
  stats,
  skillGroups,
}: ResumePhotoPanelProps) {
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
        href='mailto:hello@example.com'
        className='flex items-center gap-1.5'
      >
        Написать сообщение
      </VkLink>

      <Divider className='my-2' />

      {skillGroups.map(group => (
        <div key={group.title} className='mb-2'>
          <SectionHeader
            title={group.title}
            count={`${group.items.length} навыков`}
            linkText='все'
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
