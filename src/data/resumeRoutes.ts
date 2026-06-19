export type ResumeRouteId =
  | 'home'
  | 'experience'
  | 'projects'
  | 'stack'
  | 'achievements'
  | 'references'
  | 'contacts'
  | 'downloadCv'

export type ResumeNavItem = {
  label: string
  href: string
}

export const resumeExternalHrefs = {
  github: 'https://github.com/paulgrape',
  linkedin: 'https://www.linkedin.com/',
} as const

export type ResumeRoute = {
  id: ResumeRouteId
  path: string
  title: string
  subtitle: string
  description: string
  details: readonly string[]
}

export const resumeRouteHrefs = {
  home: '#/',
  experience: '#/experience',
  projects: '#/projects',
  stack: '#/stack',
  achievements: '#/achievements',
  references: '#/references',
  contacts: '#/contacts',
  downloadCv: '#/download-cv',
} as const satisfies Record<ResumeRouteId, string>

export const resumeRoutes = {
  home: {
    id: 'home',
    path: '/',
    title: 'Моя Страница',
    subtitle: 'resume profile',
    description: 'Главная страница резюме с кратким профилем, проектами и опытом.',
    details: ['Профиль', 'Проекты', 'Опыт работы'],
  },
  experience: {
    id: 'experience',
    path: '/experience',
    title: 'Мой Опыт',
    subtitle: 'frontend timeline',
    description: 'Подробная страница про роли, зоны ответственности и результаты в продуктовых командах.',
    details: ['Senior frontend delivery', 'UI architecture', 'Mentoring and reviews'],
  },
  projects: {
    id: 'projects',
    path: '/projects',
    title: 'Мои Проекты',
    subtitle: 'selected work',
    description: 'Подборка проектов с акцентом на интерфейсы, дизайн-системы, платформенные решения и DX.',
    details: ['Portfolio Old VK', 'Design System', 'Frontend Platform'],
  },
  stack: {
    id: 'stack',
    path: '/stack',
    title: 'Мои Навыки',
    subtitle: 'technology stack',
    description: 'Технологии и практики, которыми я регулярно пользуюсь при разработке frontend-продуктов.',
    details: ['React and TypeScript', 'Vite and CI/CD', 'Accessibility and performance'],
  },
  achievements: {
    id: 'achievements',
    path: '/achievements',
    title: 'Мои Достижения',
    subtitle: 'impact highlights',
    description: 'Короткий список заметных результатов: ускорение интерфейсов, улучшение качества релизов и развитие командных практик.',
    details: ['Core Web Vitals', 'Reusable UI foundations', 'Release quality'],
  },
  references: {
    id: 'references',
    path: '/references',
    title: 'Мои Рекомендации',
    subtitle: 'feedback',
    description: 'Место для рекомендаций коллег, лидов и продуктовых команд.',
    details: ['Team feedback', 'Code review notes', 'Delivery references'],
  },
  contacts: {
    id: 'contacts',
    path: '/contacts',
    title: 'Мои Контакты',
    subtitle: 'get in touch',
    description: 'Способы связаться для обсуждения frontend-роли, продукта или технического проекта.',
    details: ['Telegram', 'Email', 'LinkedIn'],
  },
  downloadCv: {
    id: 'downloadCv',
    path: '/download-cv',
    title: 'Скачать CV',
    subtitle: 'pdf resume',
    description: 'Заглушка для будущей загрузки PDF-версии резюме.',
    details: ['Russian CV', 'English CV', 'Printable version'],
  },
} as const satisfies Record<ResumeRouteId, ResumeRoute>

export const resumeRouteList = Object.values(resumeRoutes)

export function getResumeRouteIdFromHash(hash: string): ResumeRouteId {
  const path = hash.replace(/^#/, '') || '/'
  const route = resumeRouteList.find(item => item.path === path)

  return route?.id ?? 'home'
}
