import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ResumeProject } from '@/data/resume'

type ResumeProjectsSectionProps = {
  title: string
  count: string
  linkText: string
  linkHref?: string
  projects: ResumeProject[]
  variant?: 'full' | 'compact'
  demoLabel: string
  npmLabel: string
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
          : 'h-[50px] w-full mb-1.5 object-contain bg-white'
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

function FullProjectCard({
  project,
  index,
  demoLabel,
  npmLabel,
}: {
  project: ResumeProject
  index: number
  demoLabel: string
  npmLabel: string
}) {
  return (
    <article className='min-h-[108px] border border-vk-border-light bg-vk-friends-count p-2 text-left'>
      {project.iconSrc ? (
        <ProjectIcon
          src={project.iconSrc}
          alt={project.title}
          size='md'
        />
      ) : (
        <div
          className='h-[26px] mb-1.5'
          style={{
            background: `hsl(${200 + index * 18}, 30%, ${55 + index * 4}%)`,
          }}
        />
      )}
      <VkLink
        href={project.href}
        size='md'
        bold
        block
        className='mb-1'
        target='_blank'
        rel='noreferrer'
      >
        {project.title}
      </VkLink>
      <p className='m-0 text-[12px] text-vk-text leading-[1.35]'>
        {project.description}
      </p>
      <div className='mt-1.5 text-[11px] text-vk-muted'>
        {project.stack.join(' · ')}
      </div>
      <div className='mt-1 flex items-center gap-2 text-[11px]'>
        <span className='text-vk-link'>{project.metric}</span>
        {project.demoHref ? (
          <VkLink
            href={project.demoHref}
            size='sm'
            target='_blank'
            rel='noreferrer'
          >
            {isNpmHref(project.demoHref) ? npmLabel : demoLabel}
          </VkLink>
        ) : null}
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
      <div
        className={
          compact ? 'flex flex-col gap-1 p-1' : 'grid grid-cols-2 gap-1 p-2'
        }
      >
        {projects.map((project, index) =>
          compact ? (
            <CompactProjectCard
              key={project.title}
              project={project}
            />
          ) : (
            <FullProjectCard
              key={project.title}
              project={project}
              index={index}
              demoLabel={demoLabel}
              npmLabel={npmLabel}
            />
          ),
        )}
      </div>
    </section>
  )
}
