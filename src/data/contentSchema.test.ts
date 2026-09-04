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

function readPack(dir: string, name: string): unknown {
  return JSON.parse(readFileSync(path.join(dir, name), 'utf8')) as unknown
}

function assertSamplePack(dir: string) {
  const site = parseSite(readPack(dir, 'site.json'))
  const en = parseResume(readPack(dir, 'en.json'))
  const ru = parseResume(readPack(dir, 'ru.json'))

  expect(site.photos.avatar).toBe('placeholder.svg')
  expect(en.user.name).toBe('Alex Sample')
  expect(ru.user.name).toBe('Алекс Сэмпл')
  expect(() => assertResumeLocaleParity(en, ru)).not.toThrow()
}

describe('sample content pack', () => {
  it('parses committed content/', () => {
    assertSamplePack(path.join(rootDir, 'content'))
  })
})

describe('content schemas', () => {
  it('rejects an empty site object', () => {
    expect(() => parseSite({}, 'site.json')).toThrow(/site\.json/)
  })

  it('rejects resume locale key mismatch', () => {
    const en = parseResume(readPack(path.join(rootDir, 'content'), 'en.json'))
    const ru = parseResume(readPack(path.join(rootDir, 'content'), 'ru.json'))
    const ruWithoutAchievements = { ...ru }
    Reflect.deleteProperty(ruWithoutAchievements, 'achievements')

    expect(() => assertResumeLocaleParity(en, ruWithoutAchievements)).toThrow(
      /top-level keys differ/,
    )
  })
})
