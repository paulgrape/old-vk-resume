import {
  contactIds,
  contactLogoUrls,
  isContactId,
  type ContactId,
} from '@/data/contactLogos'
import {
  contactHref,
  contactValue,
  telHref,
  telegramHandle,
} from '@/data/contacts'
import type { ResumeJson, SiteConfig, SitePhotos } from '@/data/contentTypes'
import type { AppMenuItem, ProfileField } from '@/data/profile'
import {
  resumeRouteHrefs,
  type ResumeNavItem,
  type ResumeRouteId,
} from '@/data/resumeRoutes'
import { resolveSkillIconSrc, skillIconUrls } from '@/data/skillIcons'

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

export type AchievementEntry = {
  title: string
  description?: string
  year?: string
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

export { contactHref, telHref, telegramHandle }
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
  cv: ResumeJson['cv']
  topNavLinks: readonly ResumeNavItem[]
  sidebarNavItems: readonly ResumeNavItem[]
  appMenuItems: AppMenuItem[]
  fields: ProfileField[]
  skillGroups: SkillGroup[]
  projectsSection: ResumeJson['projectsSection']
  projects: ResumeProject[]
  education: EducationEntry[]
  achievements: AchievementEntry[]
  experienceSection: ResumeJson['experienceSection']
  experience: ExperienceEntry[]
  footerLinks: readonly FooterLink[]
  footerCopyright: string
  email?: string
  phone?: string
  telegram?: string
  contacts: readonly ContactEntry[]
  photos: SitePhotos
}

function siteContactRaw(site: SiteConfig, id: ContactId): string | undefined {
  const value = site[id]

  return typeof value === 'string' && value.trim() !== ''
    ? value.trim()
    : undefined
}

function contactEntry(id: ContactId, raw: string): ContactEntry {
  const href = contactHref(id, raw)

  return {
    id,
    value: contactValue(id, raw, href),
    href,
    logoSrc: contactLogoUrls[id],
  }
}

function contactsFromSite(site: SiteConfig): ContactEntry[] {
  return contactIds.flatMap(id => {
    const raw = siteContactRaw(site, id)

    return raw ? [contactEntry(id, raw)] : []
  })
}

function getNavHref(site: SiteConfig, id: string): string | undefined {
  if (isContactId(id)) {
    const raw = siteContactRaw(site, id)

    return raw ? contactHref(id, raw) : undefined
  }

  if (id in resumeRouteHrefs) {
    return resumeRouteHrefs[id as ResumeRouteId]
  }

  return '#'
}

function hydrateNavItems(
  site: SiteConfig,
  items: readonly { id: string; label: string }[],
  badgeForId?: (id: string) => string | undefined,
): ResumeNavItem[] {
  return items.flatMap(item => {
    const href = getNavHref(site, item.id)

    if (!href) {
      return []
    }

    const badge = badgeForId?.(item.id)

    return badge
      ? [{ label: item.label, href, badge }]
      : [{ label: item.label, href }]
  })
}

function sidebarNavBadge(id: string, resume: ResumeJson): string | undefined {
  if (id === 'projects') {
    return '+' + String(resume.projects.length)
  }

  if (id === 'stack') {
    return (
      '+' +
      String(
        resume.skillGroups.reduce(
          (total, group) => total + group.items.length,
          0,
        ),
      )
    )
  }

  return undefined
}

function achievementsFromResume(resume: ResumeJson): AchievementEntry[] {
  return resume.achievements ?? []
}

export function hydrateResume(
  resume: ResumeJson,
  site: SiteConfig,
  photos: SitePhotos,
  resolveIcon: (filename: string) => string | undefined,
): ResumeContent {
  const achievements = achievementsFromResume(resume)
  const telegramRaw = siteContactRaw(site, 'telegram')

  return {
    user: resume.user,
    cv: resume.cv,
    topNavLinks: hydrateNavItems(site, resume.topNavLinks),
    sidebarNavItems: hydrateNavItems(
      site,
      resume.sidebarNavItems.filter(
        item => item.id !== 'achievements' || achievements.length > 0,
      ),
      id => sidebarNavBadge(id, resume),
    ),
    appMenuItems: resume.appMenuItems,
    fields: resume.fields,
    skillGroups: resume.skillGroups.map(group => ({
      title: group.title,
      items: group.items.map(name => ({
        name,
        iconSrc: resolveSkillIconSrc(name, resolveIcon, skillIconUrls),
      })),
    })),
    projectsSection: resume.projectsSection,
    projects: resume.projects.map(project => ({
      title: project.title,
      description: project.description,
      features: project.features,
      stack: project.stack,
      metric: project.metric,
      href: project.href,
      demoHref: project.demoHref,
      iconSrc: project.icon ? resolveIcon(project.icon) : undefined,
      screenshots: project.screenshots,
    })),
    education: resume.education ?? [],
    achievements,
    experienceSection: resume.experienceSection,
    experience: resume.experience.map(entry => ({
      company: entry.company,
      role: entry.role,
      period: entry.period,
      summary: entry.summary,
      highlights: entry.highlights,
      stack: entry.stack,
      logoSrc: entry.logo ? resolveIcon(entry.logo) : undefined,
    })),
    footerLinks: hydrateNavItems(site, resume.footerLinks),
    footerCopyright: resume.footerCopyright,
    email: siteContactRaw(site, 'email'),
    phone: siteContactRaw(site, 'phone'),
    telegram: telegramRaw ? contactHref('telegram', telegramRaw) : undefined,
    contacts: contactsFromSite(site),
    photos,
  }
}
