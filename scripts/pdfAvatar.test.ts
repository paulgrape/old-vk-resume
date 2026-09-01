import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { isPdfEmbeddableAvatar, readPdfAvatar } from './pdfAvatar.ts'

const exampleDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../content.example',
)

describe('pdfAvatar', () => {
  it('embeds jpg, jpeg, png, and svg', () => {
    expect(isPdfEmbeddableAvatar('me.jpg')).toBe(true)
    expect(isPdfEmbeddableAvatar('me.JPEG')).toBe(true)
    expect(isPdfEmbeddableAvatar('me.png')).toBe(true)
    expect(isPdfEmbeddableAvatar('placeholder.svg')).toBe(true)
  })

  it('skips webp and gif (react-pdf cannot embed them)', () => {
    expect(isPdfEmbeddableAvatar('me.webp')).toBe(false)
    expect(isPdfEmbeddableAvatar('me.gif')).toBe(false)
  })

  it('reads the sample avatar from content.example', () => {
    const avatar = readPdfAvatar(exampleDir, 'placeholder.svg')

    expect(avatar).not.toBeNull()
    expect(avatar?.byteLength).toBeGreaterThan(0)
  })
})
