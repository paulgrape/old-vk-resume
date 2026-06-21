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
    { label: 'English', badge: 'Fluent' },
    { label: 'Relocation', badge: 'EU' },
  ],
  stats: [
    { label: 'Лет во frontend', count: '7+' },
    { label: 'Production-проектов', count: '20+' },
    { label: 'Размер команды', count: 'до 6' },
    { label: 'Performance wins', count: 'Core Web Vitals' },
  ],
  fields: [
    { label: 'Город:', value: 'Санкт-Петербург / remote', link: true },
    { label: 'Опыт:', value: 'Senior frontend, UI architecture, delivery', link: false },
    { label: 'Основной стек:', value: 'React, TypeScript, Next.js, Zustand, Tailwind', link: false },
    { label: 'Фокус:', value: 'Карты, дата-виз, enterprise-таблицы, performance', link: false },
    { label: 'Языки:', value: 'Русский, English, Italiano', link: false },
  ],
  skillGroups: [
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Zustand', 'TanStack Query', 'TanStack Table'],
    },
    {
      title: 'Архитектура',
      items: ['Feature-Sliced Design', 'Micro-frontends', 'Design systems', 'Accessibility'],
    },
    {
      title: 'Data & Viz',
      items: ['OpenLayers', 'Recharts', 'GraphQL', 'WebSockets'],
    },
    {
      title: 'Tooling',
      items: ['Vite', 'Webpack', 'Docker', 'CI/CD', 'Vitest', 'Playwright'],
    },
  ],
  projectsSection: {
    title: 'Избранные проекты',
    count: '4 проекта',
    linkText: 'портфолио',
  },
  projects: [
    {
      title: 'Self-Organizing Network Platform',
      description: 'Высоконагруженный UI для платформы SON: карты, кластеризация 10K+ объектов, кастомные векторные слои.',
      stack: ['React', 'Next.js', 'OpenLayers'],
      metric: '10K+ объектов',
    },
    {
      title: 'Многофункциональная таблица',
      description: 'Переиспользуемый компонент на TanStack Table: выбор, фильтры, контекстное меню, автообновление, редактирование.',
      stack: ['React', 'TanStack Table', 'TypeScript'],
      metric: 'reusable UI',
    },
    {
      title: 'Виртуализированное дерево',
      description: 'Дерево с догрузкой данных по API при раскрытии и подгрузкой на скролле для узлов с тысячами детей.',
      stack: ['React', 'TanStack Query', 'Virtualization'],
      metric: 'big data UX',
    },
    {
      title: 'Визуализация 5G (NSSF)',
      description: 'Интерактивные инструменты визуализации сетей 5G и импорт/экспорт CSV для массовых операций.',
      stack: ['Vue.js', 'Charts', 'CSV'],
      metric: '5G networks',
    },
  ],
  experienceSection: {
    title: 'Опыт работы',
    count: 'senior frontend timeline',
    linkText: 'подробнее',
  },
  experience: [
    {
      company: 'Bercut Ltd.',
      role: 'Senior Frontend Developer',
      period: 'январь 2025 - сейчас',
      summary:
        'Веду frontend сложной платформы Self-Organizing Network: архитектура UI, карты, таблицы и визуализация данных.',
      highlights: [
        'Спроектировал и с нуля внедрил высокопроизводительный UI для нескольких сервисов (React, Next.js, Tailwind, Zustand) на архитектуре FSD.',
        'Построил картографическое решение с кластеризацией 10K+ объектов и кастомными векторными слоями.',
        'Создал многофункциональную таблицу на TanStack Table и дерево с догрузкой данных по API.',
        'Снизил размер бандла на 40% за счёт code splitting и lazy loading; задал frontend-стандарты для 5+ проектов.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'OpenLayers', 'TanStack Table'],
      likes: 'impact 100500',
    },
    {
      company: 'Pixel Point Ltd.',
      role: 'Frontend Developer',
      period: 'январь 2024 - декабрь 2024',
      summary:
        'Агентская работа над несколькими клиентскими проектами: pixel-perfect интерфейсы, дизайн-системы, SEO/GEO.',
      highlights: [
        'Верстал адаптивные pixel-perfect интерфейсы из Figma и поддерживал переиспользуемые компонентные системы.',
        'Интегрировал REST/GraphQL API, headless CMS и сторонние сервисы.',
        'Пересобрал UI-систему крупного клиента (30+ компонентов) и поднял конверсию на 31%.',
        'Настроил SEO/GEO (JSON-LD, sitemap/robots, llms.txt), индексируемость страниц достигла 98%.',
      ],
      stack: ['Next.js', 'TypeScript', 'GraphQL', 'Headless CMS', 'Vercel'],
      likes: 'conversion +31%',
    },
    {
      company: 'Nexign Ltd.',
      role: 'Senior Frontend Developer',
      period: 'сентябрь 2018 - декабрь 2023',
      summary:
        'Развивал библиотеку UI-компонентов и инструменты визуализации для телеком-продуктов.',
      highlights: [
        'Построил и поддерживал библиотеку UI-компонентов по принципам atomic design (Vue.js).',
        'Провёл миграцию с Vue.js 2 на Vue.js 3.',
        'Разработал интерактивную визуализацию сетей 5G (NSSF) и импорт/экспорт CSV для массовых операций.',
      ],
      stack: ['Vue.js', 'JavaScript', 'Atomic Design', 'CSV'],
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
    { label: 'English', badge: 'Fluent' },
    { label: 'Relocation', badge: 'EU' },
  ],
  stats: [
    { label: 'Years in frontend', count: '7+' },
    { label: 'Production projects', count: '20+' },
    { label: 'Team size led', count: '6' },
    { label: 'Performance wins', count: 'Core Web Vitals' },
  ],
  fields: [
    { label: 'Location:', value: 'Saint Petersburg / remote', link: true },
    { label: 'Experience:', value: 'Senior frontend, UI architecture, delivery', link: false },
    { label: 'Core stack:', value: 'React, TypeScript, Next.js, Zustand, Tailwind', link: false },
    { label: 'Focus:', value: 'Maps, data viz, enterprise tables, performance', link: false },
    { label: 'Languages:', value: 'Russian, English, Italian', link: false },
  ],
  skillGroups: [
    {
      title: 'Frontend',
      items: ['React', 'TypeScript', 'Next.js', 'Zustand', 'TanStack Query', 'TanStack Table'],
    },
    {
      title: 'Architecture',
      items: ['Feature-Sliced Design', 'Micro-frontends', 'Design systems', 'Accessibility'],
    },
    {
      title: 'Data & Viz',
      items: ['OpenLayers', 'Recharts', 'GraphQL', 'WebSockets'],
    },
    {
      title: 'Tooling',
      items: ['Vite', 'Webpack', 'Docker', 'CI/CD', 'Vitest', 'Playwright'],
    },
  ],
  projectsSection: {
    title: 'Featured Projects',
    count: '4 projects',
    linkText: 'portfolio',
  },
  projects: [
    {
      title: 'Self-Organizing Network Platform',
      description: 'High-performance SON platform UI: maps, clustering for 10K+ objects, custom vector layers.',
      stack: ['React', 'Next.js', 'OpenLayers'],
      metric: '10K+ objects',
    },
    {
      title: 'Multifunctional Table',
      description: 'Reusable TanStack Table component: selection, filtering, context menu, auto-refresh, editing.',
      stack: ['React', 'TanStack Table', 'TypeScript'],
      metric: 'reusable UI',
    },
    {
      title: 'Virtualized Tree',
      description: 'Tree that loads API data on expand and lazy-loads on scroll for nodes with thousands of children.',
      stack: ['React', 'TanStack Query', 'Virtualization'],
      metric: 'big data UX',
    },
    {
      title: '5G Visualization (NSSF)',
      description: 'Interactive 5G network visualization tools and CSV import/export for bulk operations.',
      stack: ['Vue.js', 'Charts', 'CSV'],
      metric: '5G networks',
    },
  ],
  experienceSection: {
    title: 'Experience',
    count: 'senior frontend timeline',
    linkText: 'details',
  },
  experience: [
    {
      company: 'Bercut Ltd.',
      role: 'Senior Frontend Developer',
      period: 'January 2025 - Present',
      summary:
        'Lead frontend for the complex Self-Organizing Network platform: UI architecture, maps, tables and data visualization.',
      highlights: [
        'Architected and shipped a high-performance UI for multiple services from scratch (React, Next.js, Tailwind, Zustand) on Feature-Sliced Design.',
        'Built a mapping solution with clustering for 10K+ objects and custom optimized vector layers.',
        'Created a multifunctional TanStack Table component and a tree that lazy-loads API data.',
        'Reduced bundle size by 40% via code splitting and lazy loading; set frontend standards across 5+ projects.',
      ],
      stack: ['React', 'Next.js', 'TypeScript', 'Zustand', 'OpenLayers', 'TanStack Table'],
      likes: 'impact 100500',
    },
    {
      company: 'Pixel Point Ltd.',
      role: 'Frontend Developer',
      period: 'January 2024 - December 2024',
      summary:
        'Agency work across several client projects: pixel-perfect interfaces, design systems and SEO/GEO.',
      highlights: [
        'Built responsive, pixel-perfect interfaces from Figma and maintained reusable component systems.',
        'Integrated REST/GraphQL APIs, headless CMS platforms and third-party services.',
        'Rebuilt a major client UI system (30+ components) and contributed to a 31% conversion lift.',
        'Set up SEO/GEO (JSON-LD, sitemap/robots, llms.txt), reaching 98% page indexability.',
      ],
      stack: ['Next.js', 'TypeScript', 'GraphQL', 'Headless CMS', 'Vercel'],
      likes: 'conversion +31%',
    },
    {
      company: 'Nexign Ltd.',
      role: 'Senior Frontend Developer',
      period: 'September 2018 - December 2023',
      summary:
        'Grew a UI component library and visualization tools for telecom products.',
      highlights: [
        'Built and maintained a UI component library following atomic design principles (Vue.js).',
        'Implemented migration from Vue.js 2 to Vue.js 3.',
        'Developed interactive 5G network visualization (NSSF) and CSV import/export for bulk operations.',
      ],
      stack: ['Vue.js', 'JavaScript', 'Atomic Design', 'CSV'],
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
