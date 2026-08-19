import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ExperienceEntry } from '@/data/resume'

type ResumeExperienceSectionProps = {
  title: string
  count: string
  linkText: string
  entries: ExperienceEntry[]
  avatarSrc: string
  replyLabel: string
  likeLabel: string
}

export function ResumeExperienceSection({
  title,
  count,
  linkText,
  entries,
  avatarSrc,
  replyLabel,
  likeLabel,
}: ResumeExperienceSectionProps) {
  return (
    <section>
      <SectionHeader
        title={title}
        count={count}
        linkText={linkText}
      />
      {entries.map(entry => (
        <article
          key={`${entry.company}-${entry.period}`}
          className='flex gap-2.5 pr-3 pt-2.5 pb-2 border-b border-vk-border-light'
        >
          <img
            src={avatarSrc}
            alt={entry.company}
            className='size-[45px] object-cover'
          />
          <div className='flex-1 min-w-0 text-left'>
            <VkLink
              href='#'
              size='md'
              bold
              block
              className='mb-0.5'
            >
              {entry.company}
            </VkLink>
            <div className='text-[12px] text-vk-muted mb-1'>
              {entry.role} · {entry.period}
            </div>
            <p className='m-0 mb-1.5 text-[13px] text-vk-text leading-[1.45]'>
              {entry.summary}
            </p>
            <ul className='m-0 mb-1.5 pl-4 text-[12px] text-vk-text leading-[1.4]'>
              {entry.highlights.map(highlight => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <div className='text-[11px] text-vk-muted'>
              {entry.stack.join(' · ')}
            </div>
            <div className='flex items-center gap-4 mt-2 text-[12px] text-vk-muted'>
              <span>{entry.period}</span>
              <VkLink href='#'>{replyLabel}</VkLink>
              <span className='ml-auto flex items-center gap-1'>
                {likeLabel} <span className='text-vk-link'>{entry.likes}</span>
              </span>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
