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
import { hydrateResume, type ResumeContent } from '@/data/resume'
import {
  hydrateRoute,
  resumeRouteHrefs,
  type ResumeRoute,
  type ResumeRouteId,
} from '@/data/resumeRoutes'
import { useLocale } from '@/i18n/LocaleContext'
import type { LocaleMessages } from '@/i18n/locales'

type UiLabels = LocaleMessages['ui']

type ResumePageProps = {
  routeId?: ResumeRouteId
}

type ResumePageDefinition = {
  showPhotoColumn?: boolean
  render: (resume: ResumeContent, route: ResumeRoute, ui: UiLabels) => ReactNode
}

function ResumeHomeContent({
  resume,
  ui,
}: {
  resume: ResumeContent
  ui: UiLabels
}) {
  return (
    <div className='px-2'>
      <ProfileInfoPanel
        name={resume.user.name}
        status={resume.user.profileStatus}
        education={resume.user.specialization}
        fields={resume.fields}
        showDetailsLabel={ui.showDetails}
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
        replyLabel={ui.reply}
        likeLabel={ui.like}
      />
    </div>
  )
}

function ResumePlaceholderContent({
  route,
  ui,
}: {
  route: ResumeRoute
  ui: UiLabels
}) {
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
          {ui.placeholderNote}{' '}
          <VkLink href={resumeRouteHrefs.home}>{ui.backHome}</VkLink>
        </div>
      </div>
    </section>
  )
}

const resumePageRegistry: Record<ResumeRouteId, ResumePageDefinition> = {
  home: {
    showPhotoColumn: true,
    render: (resume, _route, ui) => (
      <ResumeHomeContent
        resume={resume}
        ui={ui}
      />
    ),
  },
  experience: {
    render: (resume, _route, ui) => (
      <ResumeExperienceSection
        title={resume.experienceSection.title}
        count={resume.experienceSection.count}
        linkText={resume.experienceSection.linkText}
        entries={resume.experience}
        replyLabel={ui.reply}
        likeLabel={ui.like}
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
    render: (resume, _route, ui) => (
      <ResumeStackSection
        skillGroups={resume.skillGroups}
        skillsCountTemplate={ui.skillsCount}
        showAllLabel={ui.showAll}
      />
    ),
  },
  achievements: {
    render: (_resume, route, ui) => (
      <ResumePlaceholderContent
        route={route}
        ui={ui}
      />
    ),
  },
  references: {
    render: (_resume, route, ui) => (
      <ResumePlaceholderContent
        route={route}
        ui={ui}
      />
    ),
  },
  contacts: {
    render: (_resume, route, ui) => (
      <ResumePlaceholderContent
        route={route}
        ui={ui}
      />
    ),
  },
  downloadCv: {
    render: (_resume, route, ui) => (
      <ResumePlaceholderContent
        route={route}
        ui={ui}
      />
    ),
  },
}

export function ResumePage({ routeId = 'home' }: ResumePageProps) {
  const { messages } = useLocale()
  const resume = hydrateResume(messages.resume)
  const route = hydrateRoute(routeId, messages.routes[routeId])
  const definition = resumePageRegistry[routeId]
  const isHomeRoute = routeId === 'home'
  const ui = messages.ui

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
            writeMessageLabel={ui.writeMessage}
            skillsCountTemplate={ui.skillsCount}
            showAllLabel={ui.showAll}
          />
        ) : null
      }
      mainColumn={definition.render(resume, route, ui)}
      footer={
        <SiteFooter
          links={resume.footerLinks}
          copyright={resume.footerCopyright}
        />
      }
    />
  )
}
