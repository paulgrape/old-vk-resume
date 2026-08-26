import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { AchievementEntry } from '@/data/resume'
import { interpolate } from '@/i18n/interpolate'

type ResumeAchievementsSectionProps = {
  title: string
  countTemplate: string
  entries: AchievementEntry[]
}

export function ResumeAchievementsSection({
  title,
  countTemplate,
  entries,
}: ResumeAchievementsSectionProps) {
  if (entries.length === 0) {
    return null
  }

  return (
    <section className='border-b border-vk-border'>
      <SectionHeader
        title={title}
        count={interpolate(countTemplate, { count: entries.length })}
      />
      {entries.map((entry, index) => (
        <article
          key={`${entry.title}-${index}`}
          className='border-b border-vk-border-light px-3 pt-3 pb-2.5 text-left last:border-b-0'
        >
          <div className='flex items-baseline justify-between gap-3'>
            <span className='text-[13px] font-bold text-vk-heading'>
              {entry.title}
            </span>
            {entry.year ? (
              <span className='shrink-0 text-[12px] text-vk-muted'>
                {entry.year}
              </span>
            ) : null}
          </div>
          {entry.description ? (
            <p className='m-0 mt-1 text-[13px] leading-[1.45] text-vk-text'>
              {entry.description}
            </p>
          ) : null}
        </article>
      ))}
    </section>
  )
}
