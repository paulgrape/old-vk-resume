import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { parseResume, parseSite } from './contentSchema'
import { hydrateResume } from './resume'

const contentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../../content',
)

function readContent(name: string): unknown {
  return JSON.parse(
    readFileSync(path.join(contentDir, name), 'utf8'),
  ) as unknown
}

describe('hydrateResume', () => {
  const site = parseSite(readContent('site.json'))
  const en = parseResume(readContent('en.json'))
  const resume = hydrateResume(
    en,
    site,
    { avatar: '/photos/placeholder.svg' },
    () => undefined,
  )

  it('copies the sample person and photo', () => {
    expect(resume.user.name).toBe('Alex Sample')
    expect(resume.photos.avatar).toBe('/photos/placeholder.svg')
  })

  it('builds contacts from optional site keys', () => {
    expect(resume.contacts.map(entry => entry.id)).toEqual([
      'telegram',
      'email',
      'github',
      'linkedin',
    ])
    expect(resume.email).toBe('hello@example.com')
    expect(resume.telegram).toBe('https://t.me/example')
    expect(resume.phone).toBeUndefined()
  })

  it('keeps the achievements nav item when the list is non-empty', () => {
    expect(
      resume.sidebarNavItems.some(item => item.href === '#/achievements'),
    ).toBe(true)
  })

  it('drops the achievements nav item when the list is empty', () => {
    const without = hydrateResume(
      { ...en, achievements: [] },
      site,
      { avatar: '/a.jpg' },
      () => undefined,
    )

    expect(
      without.sidebarNavItems.some(item => item.href === '#/achievements'),
    ).toBe(false)
  })

  it('skips a nav contact that is missing from site.json', () => {
    const siteWithoutGithub = { ...site }
    Reflect.deleteProperty(siteWithoutGithub, 'github')
    const hydrated = hydrateResume(
      en,
      siteWithoutGithub,
      { avatar: '/a.jpg' },
      () => undefined,
    )

    expect(
      hydrated.topNavLinks.some(item => item.href.includes('github')),
    ).toBe(false)
  })

  it('uses a local skill icon file when resolveIcon returns a slug match', () => {
    const hydrated = hydrateResume(en, site, { avatar: '/a.jpg' }, filename =>
      filename === 'react.svg' ? '/icons/react.svg' : undefined,
    )

    expect(
      hydrated.skillGroups[0]?.items.find(item => item.name === 'React')
        ?.iconSrc,
    ).toBe('/icons/react.svg')
  })

  it('falls back to the CDN map when no skill file exists', () => {
    expect(
      resume.skillGroups[0]?.items.find(item => item.name === 'React')?.iconSrc,
    ).toContain('simpleicons')
  })
})
