import type { AppMenuItem, ProfileField, ProfileStat } from '@/data/profile'
import {
  resumeExternalHrefs,
  resumeRouteHrefs,
  type ResumeNavItem,
  type ResumeRouteId,
} from '@/data/resumeRoutes'
import type { LocaleMessages } from '@/i18n/locales'

export type SkillGroup = {
  title: string
  items: readonly string[]
}

export type ResumeProject = {
  title: string
  description: string
  stack: readonly string[]
  metric: string
}

export type ExperienceEntry = {
  company: string
  role: string
  period: string
  summary: string
  highlights: readonly string[]
  stack: readonly string[]
  likes: string
}

export type ResumeJson = LocaleMessages['resume']

export type ResumeContent = {
  user: ResumeJson['user']
  topNavLinks: readonly ResumeNavItem[]
  sidebarNavItems: readonly ResumeNavItem[]
  appMenuItems: AppMenuItem[]
  stats: ProfileStat[]
  fields: ProfileField[]
  skillGroups: SkillGroup[]
  projectsSection: ResumeJson['projectsSection']
  projects: ResumeProject[]
  experienceSection: ResumeJson['experienceSection']
  experience: ExperienceEntry[]
  footerLinks: readonly string[]
  footerCopyright: string
}

function getNavHref(id: string): string {
  if (id === 'github') {
    return resumeExternalHrefs.github
  }

  if (id === 'linkedin') {
    return resumeExternalHrefs.linkedin
  }

  if (id in resumeRouteHrefs) {
    return resumeRouteHrefs[id as ResumeRouteId]
  }

  return '#'
}

export function hydrateResume(resume: ResumeJson): ResumeContent {
  return {
    user: resume.user,
    topNavLinks: resume.topNavLinks.map(item => ({
      label: item.label,
      href: getNavHref(item.id),
    })),
    sidebarNavItems: resume.sidebarNavItems.map(item => ({
      label: item.label,
      href: getNavHref(item.id),
    })),
    appMenuItems: resume.appMenuItems,
    stats: resume.stats,
    fields: resume.fields,
    skillGroups: resume.skillGroups,
    projectsSection: resume.projectsSection,
    projects: resume.projects,
    experienceSection: resume.experienceSection,
    experience: resume.experience,
    footerLinks: resume.footerLinks,
    footerCopyright: resume.footerCopyright,
  }
}
