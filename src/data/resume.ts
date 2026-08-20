import type { AppMenuItem, ProfileField } from '@/data/profile'
import {
  iconUrl,
  siteConfig,
  sitePhotos,
  type ResumeJson,
  type SitePhotos,
} from '@/data/content'
import { skillIconFiles } from '@/data/skillIcons'
import {
  resumeRouteHrefs,
  type ResumeNavItem,
  type ResumeRouteId,
} from '@/data/resumeRoutes'

export type SkillItem = {
  name: string
  iconSrc?: string
}

export type SkillGroup = {
  title: string
  items: readonly SkillItem[]
}

export type ResumeProject = {
  title: string
  description: string
  stack: readonly string[]
  metric: string
  href: string
  iconSrc?: string
  demoHref?: string
}

export type EducationEntry = {
  institution: string
  department?: string
  major?: string
  mode?: string
  status?: string
}

export type ExperienceEntry = {
  company: string
  role: string
  period: string
  summary: string
  highlights: readonly string[]
  stack: readonly string[]
  logoSrc?: string
}

export type { ResumeJson }

export type ResumeContent = {
  user: ResumeJson['user']
  topNavLinks: readonly ResumeNavItem[]
  sidebarNavItems: readonly ResumeNavItem[]
  appMenuItems: AppMenuItem[]
  fields: ProfileField[]
  skillGroups: SkillGroup[]
  projectsSection: ResumeJson['projectsSection']
  projects: ResumeProject[]
  education: EducationEntry[]
  experienceSection: ResumeJson['experienceSection']
  experience: ExperienceEntry[]
  footerLinks: readonly string[]
  footerCopyright: string
  email: string
  phone: string
  telegram: string
  photos: SitePhotos
}

function getNavHref(id: string): string {
  if (id === 'github') {
    return siteConfig.github
  }

  if (id === 'linkedin') {
    return siteConfig.linkedin
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
    fields: resume.fields,
    skillGroups: resume.skillGroups.map(group => ({
      title: group.title,
      items: group.items.map(name => {
        const iconFile = skillIconFiles[name]
        return {
          name,
          iconSrc: iconFile ? iconUrl(iconFile) : undefined,
        }
      }),
    })),
    projectsSection: resume.projectsSection,
    projects: resume.projects.map(project => {
      const icon = 'icon' in project ? project.icon : undefined

      return {
        title: project.title,
        description: project.description,
        stack: project.stack,
        metric: project.metric,
        href: project.href,
        demoHref: project.demoHref,
        iconSrc: icon ? iconUrl(icon) : undefined,
      }
    }),
    education: resume.education ?? [],
    experienceSection: resume.experienceSection,
    experience: resume.experience.map(entry => {
      const logo = 'logo' in entry ? entry.logo : undefined

      return {
        company: entry.company,
        role: entry.role,
        period: entry.period,
        summary: entry.summary,
        highlights: entry.highlights,
        stack: entry.stack,
        logoSrc: logo ? iconUrl(logo) : undefined,
      }
    }),
    footerLinks: resume.footerLinks,
    footerCopyright: resume.footerCopyright,
    email: siteConfig.email,
    phone: siteConfig.phone,
    telegram: siteConfig.telegram,
    photos: sitePhotos,
  }
}
