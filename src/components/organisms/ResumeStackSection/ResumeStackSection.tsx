import { FriendCard } from '@/components/molecules/FriendCard/FriendCard'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { SkillGroup, SkillItem } from '@/data/resume'
import { skillGroupUsesGrid } from '@/data/skillIcons'
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
          ? 'grid grid-cols-[repeat(3,50px)] max-vk:grid-cols-[repeat(auto-fill,50px)] gap-x-[15px] gap-y-1 mb-0.5 pt-1 items-start justify-center max-vk:justify-start max-vk:px-2'
          : 'grid grid-cols-[repeat(auto-fill,50px)] gap-x-[15px] gap-y-1 px-2 pt-1 pb-0.5 items-start justify-start'
      }
    >
      {items.map(item => (
        <FriendCard key={item.name} name={item.name} src={item.iconSrc} />
      ))}
    </div>
  )
}

function SkillGroupHeading({ title }: { title: string }) {
  return (
    <div className='text-left px-2 pt-1 text-[11px] text-vk-muted'>{title}</div>
  )
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
    return <SkillFriendsGrid items={items} compact={compact} />
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
  const total = skillGroups.reduce((sum, group) => sum + group.items.length, 0)

  if (compact) {
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
            <SkillGroupHeading title={group.title} />
            <SkillGroupBody
              items={group.items}
              compact
              useGrid={skillGroupUsesGrid(group.items)}
            />
          </div>
        ))}
      </section>
    )
  }

  return (
    <section className='border-b border-vk-border'>
      <SectionHeader
        title={title ?? ''}
        count={interpolate(skillsCountTemplate, { count: total })}
        linkText={showAllLabel}
        linkHref={linkHref}
      />
      {skillGroups.map(group => (
        <div key={group.title}>
          <SkillGroupHeading title={group.title} />
          <SkillGroupBody
            items={group.items}
            compact={false}
            useGrid={skillGroupUsesGrid(group.items)}
          />
        </div>
      ))}
    </section>
  )
}
