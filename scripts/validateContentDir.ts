import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import {
  assertResumeLocaleParity,
  parseResume,
  parseSite,
  type ResumeJson,
  type SiteConfig,
} from '../src/data/contentSchema.ts'

function readJson(filePath: string): unknown {
  return JSON.parse(readFileSync(filePath, 'utf8')) as unknown
}

function requireFile(filePath: string, label: string): void {
  if (!existsSync(filePath)) {
    throw new Error(`Missing ${label}: ${filePath}`)
  }
}

export function validateContentDir(contentDir: string): {
  site: SiteConfig
  en: ResumeJson
  ru: ResumeJson
} {
  const sitePath = path.join(contentDir, 'site.json')
  const enPath = path.join(contentDir, 'en.json')
  const ruPath = path.join(contentDir, 'ru.json')

  requireFile(sitePath, 'site.json')
  requireFile(enPath, 'en.json')
  requireFile(ruPath, 'ru.json')

  const site = parseSite(readJson(sitePath), 'site.json')
  const en = parseResume(readJson(enPath), 'en.json')
  const ru = parseResume(readJson(ruPath), 'ru.json')

  assertResumeLocaleParity(en, ru)

  requireFile(
    path.join(contentDir, 'photos', site.photos.avatar),
    `photos/${site.photos.avatar}`,
  )
  requireFile(path.join(contentDir, 'fonts', 'Roboto-Regular.ttf'), 'fonts/Roboto-Regular.ttf')
  requireFile(path.join(contentDir, 'fonts', 'Roboto-Bold.ttf'), 'fonts/Roboto-Bold.ttf')

  const iconNames = new Set(
    [...en.projects, ...ru.projects]
      .flatMap(project => (project.icon ? [project.icon] : []))
      .concat(
        [...en.experience, ...ru.experience].flatMap(entry =>
          entry.logo ? [entry.logo] : [],
        ),
      ),
  )

  for (const iconName of iconNames) {
    const iconPath = path.join(contentDir, 'icons')
    const matches = [
      path.join(iconPath, iconName),
      path.join(iconPath, 'projects', iconName),
      path.join(iconPath, 'companies', iconName),
      path.join(iconPath, 'skills', iconName),
    ]

    if (!matches.some(candidate => existsSync(candidate))) {
      throw new Error(
        `Missing content/icons file for "${iconName}" (looked in icons/, icons/projects/, icons/companies/, icons/skills/).`,
      )
    }
  }

  return { site, en, ru }
}
