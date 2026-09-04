import { describe, expect, it } from 'vitest'
import { contactHref, contactValue, telHref, telegramHandle } from './contacts'

describe('telHref', () => {
  it('keeps + and digits only', () => {
    expect(telHref('+1 (555) 010-1234')).toBe('tel:+15550101234')
  })
})

describe('telegramHandle', () => {
  it('adds @ to a t.me URL', () => {
    expect(telegramHandle('https://t.me/example')).toBe('@example')
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
    expect(contactHref('phone', '+1 (555) 010-1234')).toBe('tel:+15550101234')
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
