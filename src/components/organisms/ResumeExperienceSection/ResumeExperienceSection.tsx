import { LikeControl } from '@/components/atoms/LikeControl/LikeControl'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ExperienceEntry } from '@/data/resume'
import { useState } from 'react'

type ExperienceVariant = 'full' | 'compact'

type ResumeExperienceSectionProps = {
  title: string
  count: string
  linkText: string
  entries: ExperienceEntry[]
  avatarSrc: string
  replyLabel: string
  replyHref?: string
  likeLabel: string
  linkHref?: string
  variant?: ExperienceVariant
}

type ExperienceCardProps = {
  entry: ExperienceEntry
  avatarSrc: string
  replyLabel: string
  replyHref?: string
  likeLabel: string
  variant: ExperienceVariant
}

function ExperienceCard({
  entry,
  avatarSrc,
  replyLabel,
  replyHref,
  likeLabel,
  variant,
}: ExperienceCardProps) {
  const [likes, setLikes] = useState(0)
  const imageSrc = entry.logoSrc ?? avatarSrc
  const full = variant === 'full'

  return (
    <article
      className={
        full
          ? 'flex gap-2.5 px-3 pt-3 pb-2.5 border-b border-vk-border-light'
          : 'flex gap-2.5 pl-2 pr-3 pt-2.5 pb-2 border-b border-vk-border-light'
      }
    >
      <img
        src={imageSrc}
        alt={entry.company}
        className={
          entry.logoSrc
            ? 'size-[45px] shrink-0 object-contain bg-white'
            : 'size-[45px] shrink-0 object-cover'
        }
      />
      <div className='flex-1 min-w-0 text-left'>
        <VkLink href='#' size='md' bold block className='mb-0.5'>
          {entry.company}
        </VkLink>
        <div className='text-[12px] font-semibold text-vk-text-subtle mb-1'>
          {entry.role} · <span className=' text-nowrap'>{entry.period}</span>
        </div>
        <p className='m-0 mb-1.5 text-[13px] text-vk-text leading-[1.45]'>
          {entry.summary}
        </p>
        <ul className='m-0 mb-1.5 list-disc list-outside pl-5 space-y-0.5 text-[12px] text-vk-text leading-normal marker:text-vk-heading'>
          {entry.highlights.map(highlight => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        {full ? (
          <div className='flex flex-wrap gap-1'>
            {entry.stack.map(tech => (
              <span
                key={tech}
                className='bg-vk-badge-bg px-1.5 py-px text-[11px] text-vk-badge-text'
              >
                {tech}
              </span>
            ))}
          </div>
        ) : (
          <div className='text-[11px] text-vk-muted'>
            {entry.stack.join(' · ')}
          </div>
        )}
        <div className='flex items-center gap-4 mt-2 text-[12px] text-vk-muted'>
          {replyHref ? <VkLink href={replyHref}>{replyLabel}</VkLink> : null}
          <LikeControl
            likeLabel={likeLabel}
            count={likes}
            onLike={() => setLikes(count => count + 1)}
          />
        </div>
      </div>
    </article>
  )
}

export function ResumeExperienceSection({
  title,
  count,
  linkText,
  entries,
  avatarSrc,
  replyLabel,
  replyHref,
  likeLabel,
  linkHref,
  variant = 'compact',
}: ResumeExperienceSectionProps) {
  const full = variant === 'full'

  return (
    <section className={full ? 'border-b border-vk-border' : undefined}>
      <SectionHeader
        title={title}
        count={count}
        linkText={linkText}
        linkHref={linkHref}
      />
      {entries.map(entry => (
        <ExperienceCard
          key={`${entry.company}-${entry.period}`}
          entry={entry}
          avatarSrc={avatarSrc}
          replyLabel={replyLabel}
          replyHref={replyHref}
          likeLabel={likeLabel}
          variant={variant}
        />
      ))}
    </section>
  )
}
