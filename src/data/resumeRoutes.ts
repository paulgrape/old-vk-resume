import type { LocaleMessages } from '@/i18n/locales'

export type ResumeRouteId =
  | 'home'
  | 'experience'
  | 'projects'
  | 'stack'
  | 'achievements'
  | 'contacts'
  | 'downloadCv'

export type ResumeNavItem = {
  label: string
  href: string
}

export type ResumeRouteCopy = LocaleMessages['routes'][ResumeRouteId]

export type ResumeRoute = ResumeRouteCopy & {
  id: ResumeRouteId
  path: string
}

export const resumeExternalHrefs = {
  github: 'https://github.com/paulgrape',
  linkedin: 'https://www.linkedin.com/',
} as const

export const resumeRoutePaths = {
  home: '/',
  experience: '/experience',
  projects: '/projects',
  stack: '/stack',
  achievements: '/achievements',
  contacts: '/contacts',
  downloadCv: '/download-cv',
} as const satisfies Record<ResumeRouteId, string>

export const resumeRouteHrefs = {
  home: '#/',
  experience: '#/experience',
  projects: '#/projects',
  stack: '#/stack',
  achievements: '#/achievements',
  contacts: '#/contacts',
  downloadCv: '#/download-cv',
} as const satisfies Record<ResumeRouteId, string>

export function hydrateRoute(
  id: ResumeRouteId,
  copy: ResumeRouteCopy,
): ResumeRoute {
  return {
    id,
    path: resumeRoutePaths[id],
    ...copy,
  }
}

export function getResumeRouteIdFromHash(hash: string): ResumeRouteId {
  const path = hash.replace(/^#/, '') || '/'
  const match = (Object.entries(resumeRoutePaths) as [ResumeRouteId, string][])
    .find(([, routePath]) => routePath === path)

  return match?.[0] ?? 'home'
}
