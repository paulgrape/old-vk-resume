import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { ProfileInfoPanel } from '@/components/organisms/ProfileInfoPanel/ProfileInfoPanel'
import { ProfileTitlebar } from '@/components/organisms/ProfileTitlebar/ProfileTitlebar'
import { ResumeContactsSection } from '@/components/organisms/ResumeContactsSection/ResumeContactsSection'
import { ResumeEducationSection } from '@/components/organisms/ResumeEducationSection/ResumeEducationSection'
import { ResumeExperienceSection } from '@/components/organisms/ResumeExperienceSection/ResumeExperienceSection'
import { ResumePhotoPanel } from '@/components/organisms/ResumePhotoPanel/ResumePhotoPanel'
import { ResumeProjectsSection } from '@/components/organisms/ResumeProjectsSection/ResumeProjectsSection'
import { ResumeStackSection } from '@/components/organisms/ResumeStackSection/ResumeStackSection'
import { SidebarNav } from '@/components/organisms/SidebarNav/SidebarNav'
import { SiteFooter } from '@/components/organisms/SiteFooter/SiteFooter'
import { TopNavbar } from '@/components/organisms/TopNavbar/TopNavbar'
import { VkProfileLayout } from '@/components/templates/VkProfileLayout/VkProfileLayout'
import { resumeByLocale } from '@/data/content'
import {
  hydrateResume,
  telHref,
  telegramHandle,
  type ResumeContent,
} from '@/data/resume'
import {
  hydrateRoute,
  resumeRouteHrefs,
  type ResumeRoute,
  type ResumeRouteId,
} from '@/data/resumeRoutes'
import { useLocale } from '@/i18n/LocaleContext'
import type { LocaleMessages } from '@/i18n/locales'
import type { ReactNode } from 'react'

type UiLabels = LocaleMessages['ui']

function profileInfoFields(resume: ResumeContent, ui: UiLabels) {
  const [location, ...rest] = resume.fields

  return [
    ...(location ? [location] : []),
    {
      label: ui.phone,
      value: resume.phone,
      link: true,
      href: telHref(resume.phone),
    },
    {
      label: ui.email,
      value: resume.email,
      link: true,
      href: `mailto:${resume.email}`,
    },
    {
      label: ui.telegram,
      value: telegramHandle(resume.telegram),
      link: true,
      href: resume.telegram,
    },
    ...rest,
  ]
}

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
        education={resume.education}
        fields={profileInfoFields(resume, ui)}
      />
      <ResumeEducationSection
        labels={ui.education}
        entries={resume.education}
      />
      <ResumeExperienceSection
        title={resume.experienceSection.title}
        count={resume.experienceSection.count}
        linkText={resume.experienceSection.linkText}
        entries={resume.experience}
        avatarSrc={resume.photos.avatarIcon}
        replyLabel={ui.reply}
        replyHref={resume.telegram}
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
        avatarSrc={resume.photos.avatarIcon}
        replyLabel={ui.reply}
        replyHref={resume.telegram}
        likeLabel={ui.like}
      />
    ),
  },
  projects: {
    render: (resume, _route, ui) => (
      <ResumeProjectsSection
        title={resume.projectsSection.title}
        count={resume.projectsSection.count}
        linkText={resume.projectsSection.linkText}
        linkHref={resumeRouteHrefs.projects}
        projects={resume.projects}
        demoLabel={ui.projectDemo}
        npmLabel={ui.projectNpm}
        githubLabel={ui.projectGithub}
        featuresLabel={ui.projectFeatures}
        stackLabel={ui.projectStack}
        authorName={resume.user.name}
        authorAvatar={resume.photos.avatar}
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
  contacts: {
    render: (resume, route, ui) => (
      <ResumeContactsSection
        title={route.title}
        count={route.subtitle}
        description={route.description}
        contacts={resume.contacts}
        labels={ui.contacts}
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
  const { locale, messages } = useLocale()
  const resume = hydrateResume(resumeByLocale[locale])
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
        isHomeRoute ? (
          <ProfileTitlebar
            name={resume.user.name}
            subtitle={resume.user.titlebarSubtitle}
            status={resume.user.status}
          />
        ) : null
      }
      photoColumn={
        definition.showPhotoColumn ? (
          <div className='w-[200px] shrink-0 pt-2 pl-2'>
            <ResumePhotoPanel
              name={resume.user.name}
              avatarSrc={resume.photos.avatar}
              avatarFullSrc={resume.photos.avatarFull}
              writeMessageHref={resume.telegram}
              writeMessageLabel={ui.writeMessage}
            />
            <ResumeProjectsSection
              title={resume.projectsSection.title}
              count={resume.projectsSection.count}
              linkText={resume.projectsSection.linkText}
              linkHref={resumeRouteHrefs.projects}
              projects={resume.projects}
              variant='compact'
              demoLabel={ui.projectDemo}
              npmLabel={ui.projectNpm}
            />
            <ResumeStackSection
              skillGroups={resume.skillGroups}
              skillsCountTemplate={ui.skillsCount}
              showAllLabel={ui.showAll}
              variant='compact'
              title={ui.skillsTitle}
              linkHref={resumeRouteHrefs.stack}
            />
          </div>
        ) : null
      }
      mainColumn={definition.render(resume, route, ui)}
      footer={
        <SiteFooter
          links={resume.footerLinks}
          copyright={resume.footerCopyright}
          disclaimer={ui.footerDisclaimer}
        />
      }
    />
  )
}
