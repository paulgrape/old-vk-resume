import { describe, expect, it } from 'vitest'
import {
  resolveSkillIconSrc,
  skillGroupUsesGrid,
  skillIconSlug,
} from './skillIcons'

describe('skillIconSlug', () => {
  it('lowercases and hyphenates', () => {
    expect(skillIconSlug('TanStack Query')).toBe('tanstack-query')
    expect(skillIconSlug('CI/CD')).toBe('ci-cd')
    expect(skillIconSlug('Vue.js')).toBe('vue-js')
  })

  it('strips combining marks', () => {
    expect(skillIconSlug('Café')).toBe('cafe')
  })
})

describe('resolveSkillIconSrc', () => {
  const files: Record<string, string> = {
    'tanstack-query.svg': '/icons/tanstack-query.svg',
    'custom-tool.png': '/icons/custom-tool.png',
  }

  function resolveIcon(filename: string) {
    return files[filename]
  }

  it('prefers a local slug.svg over the CDN map', () => {
    expect(resolveSkillIconSrc('TanStack Query', resolveIcon)).toBe(
      '/icons/tanstack-query.svg',
    )
  })

  it('falls back to slug.png', () => {
    expect(resolveSkillIconSrc('Custom Tool', resolveIcon)).toBe(
      '/icons/custom-tool.png',
    )
  })

  it('falls back to the CDN map', () => {
    expect(resolveSkillIconSrc('React', resolveIcon)).toContain('simpleicons')
  })

  it('returns undefined when nothing matches', () => {
    expect(resolveSkillIconSrc('No Such Skill', resolveIcon)).toBeUndefined()
  })
})

describe('skillGroupUsesGrid', () => {
  it('uses the friends grid when every item has an icon', () => {
    expect(
      skillGroupUsesGrid([{ iconSrc: '/react.svg' }, { iconSrc: '/vite.svg' }]),
    ).toBe(true)
  })

  it('uses tags when a group is mixed', () => {
    expect(skillGroupUsesGrid([{ iconSrc: '/react.svg' }, {}])).toBe(false)
  })

  it('uses tags when a group is empty', () => {
    expect(skillGroupUsesGrid([])).toBe(false)
  })
})
