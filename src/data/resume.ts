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
  contactIds,
  contactLogoUrls,
  type ContactId,
} from '@/data/contactLogos'
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
  features: readonly string[]
  stack: readonly string[]
  metric: string
  href: string
  iconSrc?: string
  demoHref?: string
  screenshots?: readonly string[]
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

export type FooterLink = {
  label: string
  href: string
}

export type ContactEntry = {
  id: ContactId
  value: string
  href: string
  logoSrc: string
}

export type { ContactId }

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
  footerLinks: readonly FooterLink[]
  footerCopyright: string
  email: string
  phone: string
  telegram: string
  contacts: readonly ContactEntry[]
  photos: SitePhotos
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function telegramHandle(url: string): string {
  const path = url.replace(/^https?:\/\/(t\.me|telegram\.me)\//, '')
  return path.startsWith('@') ? path : `@${path}`
}

function lastPathSegment(url: string): string {
  return url.replace(/\/+$/, '').split('/').pop() ?? url
}

function contactEntry(id: ContactId): ContactEntry {
  const logoSrc = contactLogoUrls[id]

  switch (id) {
    case 'telegram':
      return {
        id,
        value: telegramHandle(siteConfig.telegram),
        href: siteConfig.telegram,
        logoSrc,
      }
    case 'email':
      return {
        id,
        value: siteConfig.email,
        href: `mailto:${siteConfig.email}`,
        logoSrc,
      }
    case 'github':
      return {
        id,
        value: lastPathSegment(siteConfig.github),
        href: siteConfig.github,
        logoSrc,
      }
    case 'linkedin':
      return {
        id,
        value: lastPathSegment(siteConfig.linkedin),
        href: siteConfig.linkedin,
        logoSrc,
      }
    case 'phone':
      return {
        id,
        value: siteConfig.phone,
        href: telHref(siteConfig.phone),
        logoSrc,
      }
  }
}

function getNavHref(id: string): string {
  if (id === 'github') {
    return siteConfig.github
  }

  if (id === 'linkedin') {
    return siteConfig.linkedin
  }

  if (id === 'telegram') {
    return siteConfig.telegram
  }

  if (id === 'email') {
    return `mailto:${siteConfig.email}`
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
      const screenshots =
        'screenshots' in project ? project.screenshots : undefined

      return {
        title: project.title,
        description: project.description,
        features: project.features,
        stack: project.stack,
        metric: project.metric,
        href: project.href,
        demoHref: project.demoHref,
        iconSrc: icon ? iconUrl(icon) : undefined,
        screenshots,
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
    footerLinks: resume.footerLinks.map(item => ({
      label: item.label,
      href: getNavHref(item.id),
    })),
    footerCopyright: resume.footerCopyright,
    email: siteConfig.email,
    phone: siteConfig.phone,
    telegram: siteConfig.telegram,
    contacts: contactIds.map(contactEntry),
    photos: sitePhotos,
  }
}
