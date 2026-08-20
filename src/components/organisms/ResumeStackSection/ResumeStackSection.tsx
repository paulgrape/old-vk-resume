import { FriendCard } from '@/components/molecules/FriendCard/FriendCard'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { SkillGroup, SkillItem } from '@/data/resume'
import { interpolate } from '@/i18n/interpolate'

type ResumeStackSectionProps = {
  skillGroups: SkillGroup[]
  skillsCountTemplate: string
  showAllLabel: string
  variant?: 'full' | 'compact'
  title?: string
  linkHref?: string
}

function SkillTags({ items }: { items: readonly SkillItem[] }) {
  return (
    <div className='flex flex-wrap gap-1.5 p-2'>
      {items.map(item => (
        <span
          key={item.name}
          className='bg-vk-friends-count text-vk-link text-[11px] px-1.5 py-0.5 border border-vk-border-light'
        >
          {item.name}
        </span>
      ))}
    </div>
  )
}

function SkillFriendsGrid({
  items,
  compact,
}: {
  items: readonly SkillItem[]
  compact: boolean
}) {
  return (
    <div
      className={
        compact
          ? 'grid grid-cols-[repeat(3,50px)] gap-x-[15px] gap-y-1.5 mb-1 pt-2.5 items-start justify-center'
          : 'grid grid-cols-[repeat(auto-fill,50px)] gap-x-[15px] gap-y-1.5 mb-1 p-2.5 items-start justify-start'
      }
    >
      {items.map(item => (
        <FriendCard
          key={item.name}
          name={item.name}
          src={item.iconSrc}
        />
      ))}
    </div>
  )
}

function hasAnySkillIcon(groups: readonly SkillGroup[]) {
  return groups.some(group => group.items.some(item => item.iconSrc))
}

function SkillGroupBody({
  items,
  compact,
  useGrid,
}: {
  items: readonly SkillItem[]
  compact: boolean
  useGrid: boolean
}) {
  if (useGrid) {
    return (
      <SkillFriendsGrid
        items={items}
        compact={compact}
      />
    )
  }

  return <SkillTags items={items} />
}

export function ResumeStackSection({
  skillGroups,
  skillsCountTemplate,
  showAllLabel,
  variant = 'full',
  title,
  linkHref,
}: ResumeStackSectionProps) {
  const compact = variant === 'compact'
  const useGrid = hasAnySkillIcon(skillGroups)

  if (compact) {
    const total = skillGroups.reduce((sum, group) => sum + group.items.length, 0)

    return (
      <section>
        <SectionHeader
          title={title ?? ''}
          count={interpolate(skillsCountTemplate, { count: total })}
          linkText={showAllLabel}
          linkHref={linkHref}
        />
        {skillGroups.map(group => (
          <div key={group.title}>
            <div className='text-left px-2 pt-1.5 text-[11px] text-vk-muted'>
              {group.title}
            </div>
            <SkillGroupBody
              items={group.items}
              compact
              useGrid={useGrid}
            />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section className='border-b border-vk-border'>
      {skillGroups.map(group => (
        <div
          key={group.title}
          className='mb-2'
        >
          <SectionHeader
            title={group.title}
            count={interpolate(skillsCountTemplate, { count: group.items.length })}
            linkText={showAllLabel}
          />
          <SkillGroupBody
            items={group.items}
            compact={false}
            useGrid={useGrid}
          />
        </div>
      ))}
    </section>
  )
}
