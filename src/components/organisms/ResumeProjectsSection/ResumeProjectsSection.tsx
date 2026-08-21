import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { PhotoViewer } from '@/components/organisms/PhotoViewer/PhotoViewer'
import type { ResumeProject } from '@/data/resume'
import { useState } from 'react'

type ResumeProjectsSectionProps = {
  title: string
  count: string
  linkText: string
  linkHref?: string
  projects: ResumeProject[]
  variant?: 'full' | 'compact'
  demoLabel: string
  npmLabel: string
  githubLabel?: string
  featuresLabel?: string
  stackLabel?: string
  authorName?: string
  authorAvatar?: string
}

function isNpmHref(href: string) {
  return href.includes('npmjs.com')
}

function ProjectIcon({
  src,
  alt,
  size,
}: {
  src: string
  alt: string
  size: 'sm' | 'md'
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={
        size === 'sm'
          ? 'size-[50px] shrink-0 object-contain bg-white'
          : 'size-[45px] shrink-0 object-contain bg-white p-0.5'
      }
    />
  )
}

function CompactProjectCard({ project }: { project: ResumeProject }) {
  const body = (
    <div className='min-w-0 flex-1'>
      <VkLink
        href={project.href}
        size='sm'
        bold
        block
        className='mb-0.5 text-[12px] leading-tight line-clamp-2'
        target='_blank'
        rel='noreferrer'
      >
        {project.title}
      </VkLink>
      <div className='text-[11px] text-vk-muted'>{project.metric}</div>
      <div className='mt-0.5 text-[10px] text-vk-text truncate'>
        {project.stack.join(' · ')}
      </div>
    </div>
  )

  return (
    <article
      className={
        project.iconSrc
          ? 'flex gap-1.5 border border-vk-border-light bg-vk-friends-count p-1.5 text-left'
          : 'border border-vk-border-light bg-vk-friends-count p-1.5 text-left'
      }
    >
      {project.iconSrc ? (
        <ProjectIcon
          src={project.iconSrc}
          alt={project.title}
          size='sm'
        />
      ) : null}
      {body}
    </article>
  )
}

function ProjectScreenshots({
  srcs,
  alt,
  authorName,
  authorAvatar,
}: {
  srcs: readonly string[]
  alt: string
  authorName: string
  authorAvatar: string
}) {
  const [index, setIndex] = useState<number | null>(null)
  const photos = srcs.map((src, photoIndex) => ({
    src,
    alt: `${alt} ${photoIndex + 1}`,
    authorName,
    authorAvatar,
  }))

  return (
    <div className='mb-1.5 flex flex-wrap items-start gap-1'>
      {srcs.map((src, photoIndex) => (
        <button
          key={src}
          type='button'
          className='m-0 flex h-[80px] w-[120px] shrink-0 items-center justify-center border border-vk-border-light bg-[#111] p-0 cursor-pointer'
          onClick={() => setIndex(photoIndex)}
        >
          <img
            src={src}
            alt={`${alt} ${photoIndex + 1}`}
            loading='lazy'
            className='max-h-full max-w-full object-contain'
          />
        </button>
      ))}

      {index != null ? (
        <PhotoViewer
          photos={photos}
          index={index}
          onClose={() => setIndex(null)}
          onIndexChange={setIndex}
        />
      ) : null}
    </div>
  )
}

function FullProjectCard({
  project,
  demoLabel,
  npmLabel,
  githubLabel,
  featuresLabel,
  stackLabel,
  authorName,
  authorAvatar,
}: {
  project: ResumeProject
  demoLabel: string
  npmLabel: string
  githubLabel: string
  featuresLabel: string
  stackLabel: string
  authorName: string
  authorAvatar: string
}) {
  return (
    <article className='flex gap-2.5 px-3 pt-2.5 pb-2 border-b border-vk-border-light'>
      {project.iconSrc ? (
        <ProjectIcon
          src={project.iconSrc}
          alt={project.title}
          size='md'
        />
      ) : null}
      <div className='flex-1 min-w-0 text-left'>
        <VkLink
          href={project.href}
          size='md'
          bold
          block
          className='mb-0.5'
          target='_blank'
          rel='noreferrer'
        >
          {project.title}
        </VkLink>
        <p className='m-0 mb-1.5 text-[13px] text-vk-text leading-[1.45]'>
          {project.description}
        </p>
        {project.screenshots && project.screenshots.length > 0 ? (
          <ProjectScreenshots
            srcs={project.screenshots}
            alt={project.title}
            authorName={authorName}
            authorAvatar={authorAvatar}
          />
        ) : null}
        <div className='text-[12px] font-semibold text-vk-text-subtle mb-1'>
          {featuresLabel}
        </div>
        <ul className='m-0 mb-1.5 pl-4 text-[12px] text-vk-text leading-[1.4]'>
          {project.features.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className='text-[11px] text-vk-muted'>
          <span className='font-semibold text-vk-text-subtle'>
            {stackLabel}:{' '}
          </span>
          {project.stack.join(' · ')}
        </div>
        <div className='mt-2 flex items-center gap-3 text-[12px]'>
          <VkLink
            href={project.href}
            target='_blank'
            rel='noreferrer'
          >
            {githubLabel}
          </VkLink>
          {project.demoHref ? (
            <VkLink
              href={project.demoHref}
              target='_blank'
              rel='noreferrer'
            >
              {isNpmHref(project.demoHref) ? npmLabel : demoLabel}
            </VkLink>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export function ResumeProjectsSection({
  title,
  count,
  linkText,
  linkHref = '#',
  projects,
  variant = 'full',
  demoLabel,
  npmLabel,
  githubLabel = 'GitHub',
  featuresLabel = 'Features',
  stackLabel = 'Stack',
  authorName = '',
  authorAvatar = '',
}: ResumeProjectsSectionProps) {
  const compact = variant === 'compact'

  return (
    <section className={compact ? undefined : 'border-b border-vk-border'}>
      <SectionHeader
        title={title}
        count={count}
        linkText={linkText}
        linkHref={linkHref}
      />
      {compact ? (
        <div className='flex flex-col gap-1 p-1'>
          {projects.map(project => (
            <CompactProjectCard
              key={project.title}
              project={project}
            />
          ))}
        </div>
      ) : (
        projects.map(project => (
          <FullProjectCard
            key={project.title}
            project={project}
            demoLabel={demoLabel}
            npmLabel={npmLabel}
            githubLabel={githubLabel}
            featuresLabel={featuresLabel}
            stackLabel={stackLabel}
            authorName={authorName}
            authorAvatar={authorAvatar}
          />
        ))
      )}
    </section>
  )
}
