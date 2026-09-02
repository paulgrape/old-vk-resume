import { describe, expect, it } from 'vitest'
import { contactHref, contactValue, telHref, telegramHandle } from './contacts'

describe('telHref', () => {
  it('keeps + and digits only', () => {
    expect(telHref('+7 (952) 365-8584')).toBe('tel:+79523658584')
  })
})

describe('telegramHandle', () => {
  it('adds @ to a t.me URL', () => {
    expect(telegramHandle('https://t.me/paul_grape')).toBe('@paul_grape')
  })

  it('keeps an existing @ handle', () => {
    expect(telegramHandle('@name')).toBe('@name')
  })
})

describe('contactHref', () => {
  it('wraps a bare email', () => {
    expect(contactHref('email', 'a@b.com')).toBe('mailto:a@b.com')
  })

  it('builds a tel: link', () => {
    expect(contactHref('phone', '+7 (952) 365-8584')).toBe('tel:+79523658584')
  })

  it('builds a t.me link from a handle', () => {
    expect(contactHref('telegram', '@foo')).toBe('https://t.me/foo')
  })

  it('leaves https URLs unchanged', () => {
    expect(contactHref('github', 'https://github.com/x')).toBe(
      'https://github.com/x',
    )
  })
})

describe('contactValue', () => {
  it('shows the last path segment of an https contact', () => {
    expect(
      contactValue(
        'github',
        'https://github.com/example',
        'https://github.com/example',
      ),
    ).toBe('example')
  })
})
