import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { resolveContentDir } from './contentRoot.ts'

function emptyRoot(): string {
  return mkdtempSync(path.join(tmpdir(), 'content-root-'))
}

describe('resolveContentDir', () => {
  it('prefers content.frontend when site.json exists there', () => {
    const root = emptyRoot()
    mkdirSync(path.join(root, 'content.frontend'))
    writeFileSync(path.join(root, 'content.frontend', 'site.json'), '{}')
    mkdirSync(path.join(root, 'content'))
    writeFileSync(path.join(root, 'content', 'site.json'), '{}')

    expect(resolveContentDir(root)).toBe(path.join(root, 'content.frontend'))
  })

  it('uses content/ when the overlay has no site.json', () => {
    const root = emptyRoot()
    mkdirSync(path.join(root, 'content.frontend'))
    mkdirSync(path.join(root, 'content'))
    writeFileSync(path.join(root, 'content', 'site.json'), '{}')

    expect(resolveContentDir(root)).toBe(path.join(root, 'content'))
  })

  it('uses content/ when the overlay is missing', () => {
    const root = emptyRoot()
    mkdirSync(path.join(root, 'content'))
    writeFileSync(path.join(root, 'content', 'site.json'), '{}')

    expect(resolveContentDir(root)).toBe(path.join(root, 'content'))
  })

  it('throws when neither pack exists', () => {
    expect(() => resolveContentDir(emptyRoot())).toThrow(/Restore content/)
  })
})
