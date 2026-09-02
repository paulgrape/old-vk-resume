import { describe, expect, it } from 'vitest'
import { cvFileName, slugifyPersonName } from './cvFiles'

describe('slugifyPersonName', () => {
  it('turns spaces into underscores', () => {
    expect(slugifyPersonName('Alex Sample')).toBe('Alex_Sample')
  })

  it('falls back when nothing latin remains', () => {
    expect(slugifyPersonName('Алекс Сэмпл')).toBe('Resume')
  })
})

describe('cvFileName', () => {
  it('uses the English name plus locale', () => {
    expect(cvFileName('Alex Sample', 'en')).toBe('Alex_Sample_EN.pdf')
    expect(cvFileName('Alex Sample', 'ru')).toBe('Alex_Sample_RU.pdf')
  })
})
