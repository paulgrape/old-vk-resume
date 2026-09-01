import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { validateContentDir } from './validateContentDir.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

describe('validateContentDir', () => {
  it('accepts content.example', () => {
    expect(() =>
      validateContentDir(path.join(rootDir, 'content.example')),
    ).not.toThrow()
  })
})
