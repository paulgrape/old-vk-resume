import { z } from 'zod'
import { contactIds } from '@/data/contactLogos'

const nonEmpty = z.string().min(1)

const contactFields = Object.fromEntries(
  contactIds.map(id => [id, nonEmpty.optional()]),
) as Record<(typeof contactIds)[number], z.ZodOptional<z.ZodString>>

export const siteSchema = z
  .object({
    photos: z.object({
      avatar: nonEmpty,
    }),
    ...contactFields,
  })
  .strict()

const navRefSchema = z
  .object({
    id: nonEmpty,
    label: nonEmpty,
  })
  .strict()

const appMenuItemSchema = z
  .object({
    label: nonEmpty,
    badge: z.string().nullable(),
  })
  .strict()

const profileFieldSchema = z
  .object({
    label: nonEmpty,
    value: nonEmpty,
    link: z.boolean(),
    href: nonEmpty.optional(),
  })
  .strict()

const skillGroupSchema = z
  .object({
    title: nonEmpty,
    items: z.array(nonEmpty),
  })
  .strict()

const sectionMetaSchema = z
  .object({
    title: nonEmpty,
    count: nonEmpty,
    linkText: nonEmpty,
  })
  .strict()

export const resumeJsonProjectSchema = z
  .object({
    title: nonEmpty,
    description: nonEmpty,
    features: z.array(nonEmpty),
    stack: z.array(nonEmpty),
    metric: nonEmpty,
    href: nonEmpty,
    demoHref: nonEmpty.optional(),
    icon: nonEmpty.optional(),
    screenshots: z.array(nonEmpty).optional(),
  })
  .strict()

export const resumeJsonExperienceSchema = z
  .object({
    company: nonEmpty,
    role: nonEmpty,
    period: nonEmpty,
    summary: nonEmpty,
    highlights: z.array(nonEmpty),
    stack: z.array(nonEmpty),
    logo: nonEmpty.optional(),
  })
  .strict()

const resumeJsonEducationSchema = z
  .object({
    institution: nonEmpty,
    department: nonEmpty.optional(),
    major: nonEmpty.optional(),
    mode: nonEmpty.optional(),
    status: nonEmpty.optional(),
  })
  .strict()

const resumeJsonAchievementSchema = z
  .object({
    title: nonEmpty,
    description: nonEmpty.optional(),
    year: nonEmpty.optional(),
  })
  .strict()

const resumeJsonCvSchema = z
  .object({
    title: nonEmpty,
    location: nonEmpty,
    summary: nonEmpty,
    languages: z.array(nonEmpty),
    education: z.array(
      z
        .object({
          degree: nonEmpty,
          institution: nonEmpty,
          period: nonEmpty,
        })
        .strict(),
    ),
    sections: z
      .object({
        summary: nonEmpty,
        skills: nonEmpty,
        experience: nonEmpty,
        projects: nonEmpty,
        stack: nonEmpty,
        education: nonEmpty,
        languages: nonEmpty,
      })
      .strict(),
    updated: nonEmpty,
  })
  .strict()

export const resumeSchema = z
  .object({
    user: z
      .object({
        name: nonEmpty,
        titlebarSubtitle: nonEmpty,
        status: nonEmpty,
        profileStatus: nonEmpty,
        specialization: nonEmpty.optional(),
      })
      .strict(),
    cv: resumeJsonCvSchema,
    topNavLinks: z.array(navRefSchema),
    sidebarNavItems: z.array(navRefSchema),
    appMenuItems: z.array(appMenuItemSchema),
    fields: z.array(profileFieldSchema),
    skillGroups: z.array(skillGroupSchema),
    projectsSection: sectionMetaSchema,
    projects: z.array(resumeJsonProjectSchema),
    education: z.array(resumeJsonEducationSchema).optional(),
    achievements: z.array(resumeJsonAchievementSchema).optional(),
    experienceSection: sectionMetaSchema,
    experience: z.array(resumeJsonExperienceSchema),
    footerLinks: z.array(navRefSchema),
    footerCopyright: nonEmpty,
  })
  .strict()

export type SiteConfig = z.infer<typeof siteSchema>
export type ResumeJson = z.infer<typeof resumeSchema>
export type ResumeJsonCv = z.infer<typeof resumeJsonCvSchema>
export type ResumeJsonProject = z.infer<typeof resumeJsonProjectSchema>
export type ResumeJsonExperience = z.infer<typeof resumeJsonExperienceSchema>
export type ResumeJsonEducation = z.infer<typeof resumeJsonEducationSchema>
export type ResumeJsonAchievement = z.infer<typeof resumeJsonAchievementSchema>
export type ResumeNavRef = z.infer<typeof navRefSchema>

export function parseSite(data: unknown, label = 'site.json'): SiteConfig {
  const result = siteSchema.safeParse(data)

  if (!result.success) {
    throw new Error(`${label}:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}

export function parseResume(data: unknown, label = 'resume.json'): ResumeJson {
  const result = resumeSchema.safeParse(data)

  if (!result.success) {
    throw new Error(`${label}:\n${z.prettifyError(result.error)}`)
  }

  return result.data
}

function sortedKeys(value: object): string {
  return Object.keys(value).sort().join(', ')
}

function arrayLength(value: unknown[] | undefined): number {
  return value?.length ?? 0
}

export function assertResumeLocaleParity(en: ResumeJson, ru: ResumeJson): void {
  const enKeys = sortedKeys(en)
  const ruKeys = sortedKeys(ru)

  if (enKeys !== ruKeys) {
    throw new Error(
      `en.json and ru.json top-level keys differ.\nEN: ${enKeys}\nRU: ${ruKeys}`,
    )
  }

  const lengthChecks = [
    ['projects', en.projects, ru.projects],
    ['experience', en.experience, ru.experience],
    ['skillGroups', en.skillGroups, ru.skillGroups],
    ['education', en.education, ru.education],
    ['achievements', en.achievements, ru.achievements],
  ] as const

  for (const [label, enItems, ruItems] of lengthChecks) {
    const enLen = arrayLength(enItems)
    const ruLen = arrayLength(ruItems)

    if (enLen !== ruLen) {
      throw new Error(
        `en.json and ru.json ${label} length differ (EN ${enLen}, RU ${ruLen}). Keep locales in sync.`,
      )
    }
  }
}
