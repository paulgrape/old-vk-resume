import type { ReactNode } from 'react'
import { ProfileInfoPanel } from '@/components/organisms/ProfileInfoPanel/ProfileInfoPanel'
import { ProfileTitlebar } from '@/components/organisms/ProfileTitlebar/ProfileTitlebar'
import { ResumeExperienceSection } from '@/components/organisms/ResumeExperienceSection/ResumeExperienceSection'
import { ResumePhotoPanel } from '@/components/organisms/ResumePhotoPanel/ResumePhotoPanel'
import { ResumeProjectsSection } from '@/components/organisms/ResumeProjectsSection/ResumeProjectsSection'
import { ResumeStackSection } from '@/components/organisms/ResumeStackSection/ResumeStackSection'
import { SidebarNav } from '@/components/organisms/SidebarNav/SidebarNav'
import { SiteFooter } from '@/components/organisms/SiteFooter/SiteFooter'
import { TopNavbar } from '@/components/organisms/TopNavbar/TopNavbar'
import { VkProfileLayout } from '@/components/templates/VkProfileLayout/VkProfileLayout'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { defaultResumeLocale, resumeContent, type ResumeContent } from '@/data/resume'
import {
  resumeRouteHrefs,
  resumeRoutes,
  type ResumeRoute,
  type ResumeRouteId,
} from '@/data/resumeRoutes'

type ResumePageProps = {
  routeId?: ResumeRouteId
}

type ResumePageDefinition = {
  showPhotoColumn?: boolean
  render: (resume: ResumeContent, route: ResumeRoute) => ReactNode
}

function ResumeHomeContent({ resume }: { resume: ResumeContent }) {
  return (
    <div className='px-2'>
      <ProfileInfoPanel
        name={resume.user.name}
        status={resume.user.profileStatus}
        education={resume.user.specialization}
        fields={resume.fields}
      />
      <ResumeProjectsSection
        title={resume.projectsSection.title}
        count={resume.projectsSection.count}
        linkText={resume.projectsSection.linkText}
        projects={resume.projects}
      />
      <ResumeExperienceSection
        title={resume.experienceSection.title}
        count={resume.experienceSection.count}
        linkText={resume.experienceSection.linkText}
        entries={resume.experience}
      />
    </div>
  )
}

function ResumePlaceholderContent({ route }: { route: ResumeRoute }) {
  return (
    <section className='border-b border-vk-border'>
      <SectionHeader
        title={route.title}
        count={route.subtitle}
      />
      <div className='p-3 text-left'>
        <p className='m-0 text-[13px] leading-[1.45] text-vk-text'>
          {route.description}
        </p>
        <ul className='my-3 pl-4 text-[12px] leading-normal text-vk-text'>
          {route.details.map(detail => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className='bg-vk-friends-count border border-vk-border-light p-2 text-[12px] text-vk-muted'>
          Страница подготовлена как раздел резюме.{' '}
          <VkLink href={resumeRouteHrefs.home}>Вернуться на главную</VkLink>
        </div>
      </div>
    </section>
  )
}

const resumePageRegistry: Record<ResumeRouteId, ResumePageDefinition> = {
  home: {
    showPhotoColumn: true,
    render: resume => <ResumeHomeContent resume={resume} />,
  },
  experience: {
    render: resume => (
      <ResumeExperienceSection
        title={resume.experienceSection.title}
        count={resume.experienceSection.count}
        linkText={resume.experienceSection.linkText}
        entries={resume.experience}
      />
    ),
  },
  projects: {
    render: resume => (
      <ResumeProjectsSection
        title={resume.projectsSection.title}
        count={resume.projectsSection.count}
        linkText={resume.projectsSection.linkText}
        projects={resume.projects}
      />
    ),
  },
  stack: {
    render: resume => <ResumeStackSection skillGroups={resume.skillGroups} />,
  },
  achievements: {
    render: (_resume, route) => <ResumePlaceholderContent route={route} />,
  },
  references: {
    render: (_resume, route) => <ResumePlaceholderContent route={route} />,
  },
  contacts: {
    render: (_resume, route) => <ResumePlaceholderContent route={route} />,
  },
  downloadCv: {
    render: (_resume, route) => <ResumePlaceholderContent route={route} />,
  },
}

export function ResumePage({ routeId = 'home' }: ResumePageProps) {
  const resume = resumeContent[defaultResumeLocale]
  const route = resumeRoutes[routeId]
  const definition = resumePageRegistry[routeId]
  const isHomeRoute = routeId === 'home'

  return (
    <VkProfileLayout
      header={<TopNavbar links={resume.topNavLinks} />}
      sidebar={
        <SidebarNav
          navItems={resume.sidebarNavItems}
          appItems={resume.appMenuItems}
        />
      }
      titlebar={
        <ProfileTitlebar
          name={isHomeRoute ? resume.user.name : route.title}
          subtitle={isHomeRoute ? resume.user.titlebarSubtitle : `(${route.subtitle})`}
          status={resume.user.status}
        />
      }
      photoColumn={
        definition.showPhotoColumn ? (
          <ResumePhotoPanel
            name={resume.user.name}
            stats={resume.stats}
            skillGroups={resume.skillGroups}
          />
        ) : null
      }
      mainColumn={definition.render(resume, route)}
      footer={
        <SiteFooter
          links={resume.footerLinks}
          copyright={resume.footerCopyright}
        />
      }
    />
  )
}
