import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ResumeProject } from '@/data/resume'

type ResumeProjectsSectionProps = {
  title: string
  count: string
  linkText: string
  projects: ResumeProject[]
}

export function ResumeProjectsSection({
  title,
  count,
  linkText,
  projects,
}: ResumeProjectsSectionProps) {
  return (
    <section className='border-b border-vk-border'>
      <SectionHeader
        title={title}
        count={count}
        linkText={linkText}
      />
      <div className='grid grid-cols-2 gap-1 p-2'>
        {projects.map((project, index) => (
          <article
            key={project.title}
            className='min-h-[108px] border border-vk-border-light bg-vk-friends-count p-2 text-left'
          >
            <div
              className='h-[26px] mb-1.5'
              style={{
                background: `hsl(${200 + index * 18}, 30%, ${55 + index * 4}%)`,
              }}
            />
            <VkLink
              href='#'
              size='md'
              bold
              block
              className='mb-1'
            >
              {project.title}
            </VkLink>
            <p className='m-0 text-[12px] text-vk-text leading-[1.35]'>
              {project.description}
            </p>
            <div className='mt-1.5 text-[11px] text-vk-muted'>
              {project.stack.join(' · ')}
            </div>
            <div className='mt-1 text-[11px] text-vk-link'>{project.metric}</div>
          </article>
        ))}
      </div>
    </section>
  )
}
