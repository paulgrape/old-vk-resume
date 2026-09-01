import type { AppMenuItem, ProfileField } from '@/data/profile'
import type { ContactId } from '@/data/contactLogos'

export type SiteConfig = {
  photos: {
    avatar: string
  }
} & Partial<Record<ContactId, string>>

export type ResumeNavRef = {
  id: string
  label: string
}

export type ResumeJsonCv = {
  title: string
  location: string
  summary: string
  languages: string[]
  education: {
    degree: string
    institution: string
    period: string
  }[]
  sections: {
    summary: string
    skills: string
    experience: string
    projects: string
    stack: string
    education: string
    languages: string
  }
  updated: string
}

export type ResumeJsonProject = {
  title: string
  description: string
  features: string[]
  stack: string[]
  metric: string
  href: string
  demoHref?: string
  icon?: string
  screenshots?: string[]
}

export type ResumeJsonExperience = {
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
  stack: string[]
  logo?: string
}

export type ResumeJsonEducation = {
  institution: string
  department?: string
  major?: string
  mode?: string
  status?: string
}

export type ResumeJsonAchievement = {
  title: string
  description?: string
  year?: string
}

export type ResumeJson = {
  user: {
    name: string
    titlebarSubtitle: string
    status: string
    profileStatus: string
    specialization?: string
  }
  cv: ResumeJsonCv
  topNavLinks: ResumeNavRef[]
  sidebarNavItems: ResumeNavRef[]
  appMenuItems: AppMenuItem[]
  fields: ProfileField[]
  skillGroups: {
    title: string
    items: string[]
  }[]
  projectsSection: {
    title: string
    count: string
    linkText: string
  }
  projects: ResumeJsonProject[]
  education?: ResumeJsonEducation[]
  achievements?: ResumeJsonAchievement[]
  experienceSection: {
    title: string
    count: string
    linkText: string
  }
  experience: ResumeJsonExperience[]
  footerLinks: ResumeNavRef[]
  footerCopyright: string
}
