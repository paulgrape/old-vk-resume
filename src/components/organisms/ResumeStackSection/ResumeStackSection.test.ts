import { describe, expect, it } from 'vitest'
import { skillGroupUsesGrid } from '@/data/skillIcons'

describe('skillGroupUsesGrid', () => {
  it('uses the friends grid when every item has an icon', () => {
    expect(
      skillGroupUsesGrid([
        { name: 'React', iconSrc: '/react.svg' },
        { name: 'Vite', iconSrc: '/vite.svg' },
      ]),
    ).toBe(true)
  })

  it('uses tags when a group is mixed', () => {
    expect(
      skillGroupUsesGrid([
        { name: 'React', iconSrc: '/react.svg' },
        { name: 'Obscure Tool' },
      ]),
    ).toBe(false)
  })

  it('uses tags when a group has no icons', () => {
    expect(skillGroupUsesGrid([{ name: 'Obscure Tool' }])).toBe(false)
  })
})
