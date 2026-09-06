import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveContentDir } from './contentRoot.ts'

function emptyRoot(): string {
  return mkdtempSync(path.join(tmpdir(), 'content-root-'))
}

describe('resolveContentDir', () => {
  it('uses content/ when site.json is present', () => {
    const root = emptyRoot()
    mkdirSync(path.join(root, 'content'))
    writeFileSync(path.join(root, 'content', 'site.json'), '{}')

    expect(resolveContentDir(root)).toBe(path.join(root, 'content'))
  })

  it('ignores other content.* folders when content/ exists', () => {
    const root = emptyRoot()
    mkdirSync(path.join(root, 'content.frontend'))
    writeFileSync(path.join(root, 'content.frontend', 'site.json'), '{}')
    mkdirSync(path.join(root, 'content'))
    writeFileSync(path.join(root, 'content', 'site.json'), '{}')

    expect(resolveContentDir(root)).toBe(path.join(root, 'content'))
  })

  it('throws when content/site.json is missing', () => {
    expect(() => resolveContentDir(emptyRoot())).toThrow(/Restore content/)
  })
})
