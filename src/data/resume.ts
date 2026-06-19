import type { AppMenuItem, ProfileField, ProfileStat } from '@/data/profile'
import {
  resumeExternalHrefs,
  resumeRouteHrefs,
  type ResumeNavItem,
} from '@/data/resumeRoutes'

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

export type ResumeContent = {
  user: {
    name: string
    titlebarSubtitle: string
    status: string
    profileStatus: string
    specialization: string
  }
  topNavLinks: readonly ResumeNavItem[]
  sidebarNavItems: readonly ResumeNavItem[]
  appMenuItems: AppMenuItem[]
  stats: ProfileStat[]
  fields: ProfileField[]
  skillGroups: SkillGroup[]
  projectsSection: {
    title: string
    count: string
    linkText: string
  }
  projects: ResumeProject[]
  experienceSection: {
    title: string
    count: string
    linkText: string
  }
  experience: ExperienceEntry[]
  footerLinks: readonly string[]
  footerCopyright: string
}

export const resumeContentRu: ResumeContent = {
  user: {
    name: 'Павел Виноградов',
    titlebarSubtitle: '(senior frontend developer)',
    status: 'онлайн',
    profileStatus:
      'Senior frontend developer: проектирую надежные, быстрые и поддерживаемые интерфейсы на React и TypeScript, помогаю командам выпускать продукт без хаоса в UI.',
    specialization: 'Frontend Architecture',
  },
  topNavLinks: [
    { label: 'опыт', href: resumeRouteHrefs.experience },
    { label: 'проекты', href: resumeRouteHrefs.projects },
    { label: 'стек', href: resumeRouteHrefs.stack },
    { label: 'контакты', href: resumeRouteHrefs.contacts },
    { label: 'github', href: resumeExternalHrefs.github },
    { label: 'linkedin', href: resumeExternalHrefs.linkedin },
  ],
  sidebarNavItems: [
    { label: 'Моя Страница', href: resumeRouteHrefs.home },
    { label: 'Мой Опыт', href: resumeRouteHrefs.experience },
    { label: 'Мои Проекты', href: resumeRouteHrefs.projects },
    { label: 'Мои Навыки', href: resumeRouteHrefs.stack },
    { label: 'Мои Достижения', href: resumeRouteHrefs.achievements },
    { label: 'Мои Рекомендации', href: resumeRouteHrefs.references },
    { label: 'Мои Контакты', href: resumeRouteHrefs.contacts },
    { label: 'Скачать CV', href: resumeRouteHrefs.downloadCv },
  ],
  appMenuItems: [
    { label: 'Open to work', badge: 'remote' },
    { label: 'English', badge: 'B2/C1' },
    { label: 'Relocation', badge: 'EU' },
  ],
  stats: [
    { label: 'Лет во frontend', count: '8+' },
    { label: 'Production-проектов', count: '20+' },
    { label: 'Размер команды', count: 'до 6' },
    { label: 'Performance wins', count: 'Core Web Vitals' },
  ],
  fields: [
    { label: 'Город:', value: 'Санкт-Петербург / remote', link: true },
    { label: 'Опыт:', value: 'Senior frontend, UI architecture, delivery', link: false },
    { label: 'Основной стек:', value: 'React, TypeScript, Next.js, Vite, Tailwind', link: false },
    { label: 'Фокус:', value: 'Design systems, performance, mentoring, DX', link: false },
    { label: 'Языки:', value: 'Русский, English, Italiano', link: false },
  ],
  skillGroups: [
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Redux', 'TanStack Query', 'CSS'],
    },
    {
      title: 'Архитектура',
      items: ['Design systems', 'Monorepos', 'API contracts', 'Accessibility'],
    },
    {
      title: 'Tooling',
      items: ['Vite', 'ESLint', 'Vitest', 'Playwright', 'CI/CD'],
    },
  ],
  projectsSection: {
    title: 'Избранные проекты',
    count: '4 проекта',
    linkText: 'портфолио',
  },
  projects: [
    {
      title: 'Portfolio Old VK',
      description: 'Личный сайт в стиле старого ВК с переиспользуемыми React-компонентами.',
      stack: ['React', 'TypeScript', 'Tailwind'],
      metric: 'retro UX',
    },
    {
      title: 'Design System',
      description: 'Основа библиотеки компонентов для быстрой и единообразной разработки UI.',
      stack: ['React', 'Storybook', 'Tokens'],
      metric: 'faster UI',
    },
    {
      title: 'Analytics Console',
      description: 'Плотный интерфейс аналитики с быстрыми фильтрами и удобными сценариями.',
      stack: ['React', 'Charts', 'Query'],
      metric: 'operator UX',
    },
    {
      title: 'Frontend Platform',
      description: 'Сборка, линтинг, тесты и правила релизов для продуктовых frontend-команд.',
      stack: ['Vite', 'CI', 'Testing'],
      metric: 'better DX',
    },
  ],
  experienceSection: {
    title: 'Опыт работы',
    count: 'senior frontend timeline',
    linkText: 'подробнее',
  },
  experience: [
    {
      company: 'Product Engineering Team',
      role: 'Senior Frontend Developer',
      period: '2022 - сейчас',
      summary:
        'Веду frontend-разработку сложных продуктовых интерфейсов: от архитектуры UI до качества релиза и командных практик.',
      highlights: [
        'Проектировал React и TypeScript-паттерны для продуктовых фичей.',
        'Улучшал производительность страниц и снижал лишние перерисовки в критичных сценариях.',
        'Менторил инженеров через code review, парное программирование и практичные frontend-стандарты.',
      ],
      stack: ['React', 'TypeScript', 'Next.js', 'Testing', 'Performance'],
      likes: 'impact 100500',
    },
    {
      company: 'Web Platform Projects',
      role: 'Frontend Developer',
      period: '2018 - 2022',
      summary:
        'Разрабатывал production web-приложения с фокусом на поддерживаемый UI, предсказуемое состояние и надежные релизы.',
      highlights: [
        'Выпускал responsive-интерфейсы для клиентских и внутренних продуктов.',
        'Внедрял переиспользуемые UI-блоки и более чистые границы фичей.',
        'Работал с дизайном, backend и QA над итеративной поставкой улучшений.',
      ],
      stack: ['React', 'Redux', 'REST', 'CSS Modules', 'Webpack'],
      likes: 'users 1M+',
    },
  ],
  footerLinks: ['GitHub', 'LinkedIn', 'Telegram', 'Email', 'PDF CV'],
  footerCopyright: '© 2006-2026, Павел Виноградов',
}

export const resumeContentEn: ResumeContent = {
  user: {
    name: 'Pavel Vinogradov',
    titlebarSubtitle: '(senior frontend developer)',
    status: 'online',
    profileStatus:
      'Senior frontend developer building reliable, fast and maintainable product interfaces with React, TypeScript and thoughtful UI architecture.',
    specialization: 'Frontend Architecture',
  },
  topNavLinks: [
    { label: 'experience', href: resumeRouteHrefs.experience },
    { label: 'projects', href: resumeRouteHrefs.projects },
    { label: 'stack', href: resumeRouteHrefs.stack },
    { label: 'contacts', href: resumeRouteHrefs.contacts },
    { label: 'github', href: resumeExternalHrefs.github },
    { label: 'linkedin', href: resumeExternalHrefs.linkedin },
  ],
  sidebarNavItems: [
    { label: 'My Page', href: resumeRouteHrefs.home },
    { label: 'My Experience', href: resumeRouteHrefs.experience },
    { label: 'My Projects', href: resumeRouteHrefs.projects },
    { label: 'My Skills', href: resumeRouteHrefs.stack },
    { label: 'My Achievements', href: resumeRouteHrefs.achievements },
    { label: 'My References', href: resumeRouteHrefs.references },
    { label: 'My Contacts', href: resumeRouteHrefs.contacts },
    { label: 'Download CV', href: resumeRouteHrefs.downloadCv },
  ],
  appMenuItems: [
    { label: 'Open to work', badge: 'remote' },
    { label: 'English', badge: 'B2/C1' },
    { label: 'Relocation', badge: 'EU' },
  ],
  stats: [
    { label: 'Years in frontend', count: '8+' },
    { label: 'Production projects', count: '20+' },
    { label: 'Team size led', count: '6' },
    { label: 'Performance wins', count: 'Core Web Vitals' },
  ],
  fields: [
    { label: 'Location:', value: 'Saint Petersburg / remote', link: true },
    { label: 'Experience:', value: 'Senior frontend, UI architecture, delivery', link: false },
    { label: 'Core stack:', value: 'React, TypeScript, Next.js, Vite, Tailwind', link: false },
    { label: 'Focus:', value: 'Design systems, performance, mentoring, DX', link: false },
    { label: 'Languages:', value: 'Russian, English, Italian', link: false },
  ],
  skillGroups: [
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Redux', 'TanStack Query', 'CSS'],
    },
    {
      title: 'Architecture',
      items: ['Design systems', 'Monorepos', 'API contracts', 'Accessibility'],
    },
    {
      title: 'Tooling',
      items: ['Vite', 'ESLint', 'Vitest', 'Playwright', 'CI/CD'],
    },
  ],
  projectsSection: {
    title: 'Featured Projects',
    count: '4 projects',
    linkText: 'portfolio',
  },
  projects: [
    {
      title: 'Portfolio Old VK',
      description: 'Nostalgic VK-style personal site with reusable React UI blocks.',
      stack: ['React', 'TypeScript', 'Tailwind'],
      metric: 'retro UX',
    },
    {
      title: 'Design System',
      description: 'Component library foundations for consistent product delivery.',
      stack: ['React', 'Storybook', 'Tokens'],
      metric: 'faster UI',
    },
    {
      title: 'Analytics Console',
      description: 'Data-heavy dashboard optimized for dense workflows and fast filtering.',
      stack: ['React', 'Charts', 'Query'],
      metric: 'operator UX',
    },
    {
      title: 'Frontend Platform',
      description: 'Build tooling, linting and release conventions for product teams.',
      stack: ['Vite', 'CI', 'Testing'],
      metric: 'better DX',
    },
  ],
  experienceSection: {
    title: 'Experience',
    count: 'senior frontend timeline',
    linkText: 'details',
  },
  experience: [
    {
      company: 'Product Engineering Team',
      role: 'Senior Frontend Developer',
      period: '2022 - now',
      summary:
        'Lead frontend delivery for complex product surfaces, from UI architecture to production quality and team practices.',
      highlights: [
        'Designed React and TypeScript component patterns used across product features.',
        'Improved page performance and reduced avoidable rendering work in critical flows.',
        'Mentored engineers through reviews, pairing and pragmatic frontend standards.',
      ],
      stack: ['React', 'TypeScript', 'Next.js', 'Testing', 'Performance'],
      likes: 'impact 100500',
    },
    {
      company: 'Web Platform Projects',
      role: 'Frontend Developer',
      period: '2018 - 2022',
      summary:
        'Built production web applications with a focus on maintainable UI, predictable state and reliable releases.',
      highlights: [
        'Delivered responsive interfaces for customer-facing and internal products.',
        'Introduced reusable UI pieces and cleaner feature boundaries.',
        'Worked closely with design, backend and QA to ship iterative improvements.',
      ],
      stack: ['React', 'Redux', 'REST', 'CSS Modules', 'Webpack'],
      likes: 'users 1M+',
    },
  ],
  footerLinks: ['GitHub', 'LinkedIn', 'Telegram', 'Email', 'PDF CV'],
  footerCopyright: '© 2006-2026, Pavel Vinogradov',
}

export const resumeContent = {
  ru: resumeContentRu,
  en: resumeContentEn,
} as const

export const defaultResumeLocale = 'ru'
