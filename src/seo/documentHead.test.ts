import { describe, expect, it } from 'vitest'
import {
  buildDocumentHead,
  isSocialPreviewImage,
  metaDescription,
  toAbsoluteUrl,
} from './documentHead'

describe('metaDescription', () => {
  it('trims and collapses whitespace', () => {
    expect(metaDescription('  Hello   world  ')).toBe('Hello world')
  })

  it('cuts long text at a word boundary', () => {
    const text = `${'word '.repeat(50)}end`
    const result = metaDescription(text, 40)

    expect(result.endsWith('…')).toBe(true)
    expect(result.length).toBeLessThanOrEqual(40)
  })
})

describe('isSocialPreviewImage', () => {
  it('accepts raster filenames and hashed asset URLs', () => {
    expect(isSocialPreviewImage('avatar-full.jpg')).toBe(true)
    expect(isSocialPreviewImage('/assets/avatar-full-abc123.webp')).toBe(true)
  })

  it('rejects SVG', () => {
    expect(isSocialPreviewImage('placeholder.svg')).toBe(false)
  })
})

describe('toAbsoluteUrl', () => {
  it('resolves a site-root path', () => {
    expect(
      toAbsoluteUrl('/assets/a.jpg', 'https://example.com', '/repo/'),
    ).toBe('https://example.com/assets/a.jpg')
  })

  it('leaves an absolute URL alone', () => {
    expect(
      toAbsoluteUrl('https://cdn.example/a.jpg', 'https://example.com'),
    ).toBe('https://cdn.example/a.jpg')
  })
})

describe('buildDocumentHead', () => {
  it('uses a summary card when there is no raster image', () => {
    const head = buildDocumentHead({
      locale: 'en',
      name: 'Alex Sample',
      role: 'Frontend Developer',
      description: 'Sample resume.',
      imageUrl: '/photos/placeholder.svg',
    })

    expect(head.title).toBe('Alex Sample — Frontend Developer')
    expect(head.ogImage).toBeNull()
    expect(head.twitterCard).toBe('summary')
    expect(head.ogLocale).toBe('en_US')
  })

  it('uses a large image card for a jpg', () => {
    const head = buildDocumentHead({
      locale: 'ru',
      name: 'Alex',
      role: 'Dev',
      description: 'Hi',
      imageUrl: 'https://example.com/me.jpg',
    })

    expect(head.ogImage).toBe('https://example.com/me.jpg')
    expect(head.twitterCard).toBe('summary_large_image')
    expect(head.ogLocale).toBe('ru_RU')
  })
})
