import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  assertResumeLocaleParity,
  parseResume,
  parseSite,
} from './contentSchema'

const rootDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
)
const exampleDir = path.join(rootDir, 'content.example')

function readExample(name: string): unknown {
  return JSON.parse(
    readFileSync(path.join(exampleDir, name), 'utf8'),
  ) as unknown
}

describe('content.example', () => {
  it('parses site.json, en.json, and ru.json', () => {
    const site = parseSite(readExample('site.json'))
    const en = parseResume(readExample('en.json'))
    const ru = parseResume(readExample('ru.json'))

    expect(site.photos.avatar).toBe('placeholder.svg')
    expect(en.user.name).toBe('Alex Sample')
    expect(ru.user.name).toBe('Алекс Сэмпл')
    expect(() => assertResumeLocaleParity(en, ru)).not.toThrow()
  })
})

describe('content schemas', () => {
  it('rejects an empty site object', () => {
    expect(() => parseSite({}, 'site.json')).toThrow(/site\.json/)
  })

  it('rejects resume locale key mismatch', () => {
    const en = parseResume(readExample('en.json'))
    const ru = parseResume(readExample('ru.json'))
    const ruWithoutAchievements = { ...ru }
    Reflect.deleteProperty(ruWithoutAchievements, 'achievements')

    expect(() => assertResumeLocaleParity(en, ruWithoutAchievements)).toThrow(
      /top-level keys differ/,
    )
  })
})
