import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import {
  docxImageType,
  isDocxEmbeddableAvatar,
  isPdfEmbeddableAvatar,
  readDocxAvatar,
  readPdfAvatar,
} from './pdfAvatar.ts'

const contentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../content',
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

  it('embeds jpg, jpeg, png, gif, and bmp in Word', () => {
    expect(isDocxEmbeddableAvatar('me.jpg')).toBe(true)
    expect(isDocxEmbeddableAvatar('me.JPEG')).toBe(true)
    expect(isDocxEmbeddableAvatar('me.png')).toBe(true)
    expect(isDocxEmbeddableAvatar('me.gif')).toBe(true)
    expect(docxImageType('avatar-full.jpg')).toBe('jpg')
    expect(docxImageType('me.JPEG')).toBe('jpg')
  })

  it('skips svg and webp in Word', () => {
    expect(isDocxEmbeddableAvatar('placeholder.svg')).toBe(false)
    expect(docxImageType('placeholder.svg')).toBeNull()
  })

  it('reads the sample avatar from content/', () => {
    const avatar = readPdfAvatar(contentDir, 'placeholder.svg')

    expect(avatar).not.toBeNull()
    expect(avatar?.byteLength).toBeGreaterThan(0)
  })

  it('does not treat the sample svg as a Word photo', () => {
    expect(readDocxAvatar(contentDir, 'placeholder.svg')).toBeNull()
  })
})
