import { LikeControl } from '@/components/atoms/LikeControl/LikeControl'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ExperienceEntry } from '@/data/resume'
import { useState } from 'react'

type ResumeExperienceSectionProps = {
  title: string
  count: string
  linkText: string
  entries: ExperienceEntry[]
  avatarSrc: string
  replyLabel: string
  replyHref: string
  likeLabel: string
}

type ExperienceCardProps = {
  entry: ExperienceEntry
  avatarSrc: string
  replyLabel: string
  replyHref: string
  likeLabel: string
}

function ExperienceCard({
  entry,
  avatarSrc,
  replyLabel,
  replyHref,
  likeLabel,
}: ExperienceCardProps) {
  const [likes, setLikes] = useState(0)
  const imageSrc = entry.logoSrc ?? avatarSrc

  return (
    <article className='flex gap-2.5 pr-3 pt-2.5 pb-2 border-b border-vk-border-light'>
      <img
        src={imageSrc}
        alt={entry.company}
        className={
          entry.logoSrc
            ? 'size-[45px] shrink-0 object-contain bg-white p-0.5'
            : 'size-[45px] shrink-0 object-cover'
        }
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
        <div className='text-[12px] font-semibold text-vk-text-subtle mb-1'>
          {entry.role} · <span className=' text-nowrap'>{entry.period}</span>
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
          <VkLink href={replyHref}>{replyLabel}</VkLink>
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
}: ResumeExperienceSectionProps) {
  return (
    <section>
      <SectionHeader
        title={title}
        count={count}
        linkText={linkText}
      />
      {entries.map(entry => (
        <ExperienceCard
          key={`${entry.company}-${entry.period}`}
          entry={entry}
          avatarSrc={avatarSrc}
          replyLabel={replyLabel}
          replyHref={replyHref}
          likeLabel={likeLabel}
        />
      ))}
    </section>
  )
}
