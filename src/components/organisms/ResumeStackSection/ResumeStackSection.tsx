import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { SkillGroup } from '@/data/resume'
import { interpolate } from '@/i18n/interpolate'

type ResumeStackSectionProps = {
  skillGroups: SkillGroup[]
  skillsCountTemplate: string
  showAllLabel: string
}

export function ResumeStackSection({
  skillGroups,
  skillsCountTemplate,
  showAllLabel,
}: ResumeStackSectionProps) {
  return (
    <section className='border-b border-vk-border'>
      {skillGroups.map(group => (
        <div key={group.title} className='mb-2'>
          <SectionHeader
            title={group.title}
            count={interpolate(skillsCountTemplate, { count: group.items.length })}
            linkText={showAllLabel}
          />
          <div className='flex flex-wrap gap-1.5 p-2'>
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
    </section>
  )
}
