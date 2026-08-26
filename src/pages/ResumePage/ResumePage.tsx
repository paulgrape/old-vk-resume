import { DownloadCvSection } from '@/components/organisms/DownloadCvSection/DownloadCvSection'
import { ProfileInfoPanel } from '@/components/organisms/ProfileInfoPanel/ProfileInfoPanel'
import { ProfileTitlebar } from '@/components/organisms/ProfileTitlebar/ProfileTitlebar'
import { ResumeAchievementsSection } from '@/components/organisms/ResumeAchievementsSection/ResumeAchievementsSection'
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
import type { Locale, LocaleMessages } from '@/i18n/locales'
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
  render: (
    resume: ResumeContent,
    route: ResumeRoute,
    ui: UiLabels,
    locale: Locale,
  ) => ReactNode
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
        linkHref={resumeRouteHrefs.experience}
        entries={resume.experience}
        avatarSrc={resume.photos.avatarIcon}
        replyLabel={ui.reply}
        replyHref={resume.telegram}
        likeLabel={ui.like}
      />
    </div>
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
        linkText={ui.backToResume}
        linkHref={resumeRouteHrefs.home}
        entries={resume.experience}
        avatarSrc={resume.photos.avatarIcon}
        replyLabel={ui.reply}
        replyHref={resume.telegram}
        likeLabel={ui.like}
        variant='full'
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
    render: (resume, route, ui) => (
      <ResumeStackSection
        skillGroups={resume.skillGroups}
        skillsCountTemplate={ui.skillsCount}
        showAllLabel={ui.backToResume}
        title={route.title}
        linkHref={resumeRouteHrefs.home}
      />
    ),
  },
  achievements: {
    render: (resume, route, ui) => (
      <ResumeAchievementsSection
        title={route.title}
        countTemplate={ui.achievements.count}
        entries={resume.achievements}
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
    render: (_resume, route, ui, locale) => (
      <DownloadCvSection
        title={route.title}
        count={route.subtitle}
        description={route.description}
        locale={locale}
        labels={ui.downloadCv}
      />
    ),
  },
}

export function ResumePage({ routeId = 'home' }: ResumePageProps) {
  const { locale, messages } = useLocale()
  const resume = hydrateResume(resumeByLocale[locale])
  const effectiveRouteId =
    routeId === 'achievements' && resume.achievements.length === 0
      ? 'home'
      : routeId
  const route = hydrateRoute(
    effectiveRouteId,
    messages.routes[effectiveRouteId],
  )
  const definition = resumePageRegistry[effectiveRouteId]
  const isHomeRoute = effectiveRouteId === 'home'
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
      mainColumn={definition.render(resume, route, ui, locale)}
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
