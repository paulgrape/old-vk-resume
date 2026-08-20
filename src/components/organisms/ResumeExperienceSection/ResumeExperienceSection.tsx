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

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox='0 0 16 14'
      width='12'
      height='11'
      aria-hidden='true'
      className='shrink-0'
    >
      <path
        d='M8 13.2S1.2 8.6 1.2 4.7C1.2 2.6 2.8 1 4.8 1c1.2 0 2.3.6 3.2 1.6C8.9 1.6 10 1 11.2 1c2 0 3.6 1.6 3.6 3.7 0 3.9-6.8 8.5-6.8 8.5z'
        fill={filled ? 'currentColor' : 'none'}
        stroke='currentColor'
        strokeWidth='1.2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function likeDisplay(count: number): string | null {
  if (count <= 0) {
    return null
  }

  return count > 100 ? '100+' : String(count)
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
  const countLabel = likeDisplay(likes)

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
          <span className='ml-auto flex items-center gap-1'>
            {likeLabel}
            <button
              type='button'
              className='inline-flex items-center gap-0.5 m-0 p-0 border-0 bg-transparent cursor-pointer text-vk-link'
              onClick={() => setLikes(count => count + 1)}
              aria-label={likeLabel}
            >
              <HeartIcon filled={likes > 0} />
              {countLabel}
            </button>
          </span>
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
