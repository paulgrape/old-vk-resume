import { describe, expect, it } from 'vitest'
import { cvDownloadList, cvFileName, slugifyPersonName } from './cvFiles'

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

  it('can emit a docx name', () => {
    expect(cvFileName('Alex Sample', 'en', 'docx')).toBe('Alex_Sample_EN.docx')
  })
})

describe('cvDownloadList', () => {
  it('lists the current locale first, pdf then docx', () => {
    expect(
      cvDownloadList('Alex Sample', 'ru').map(
        file => `${file.locale}.${file.format}`,
      ),
    ).toEqual(['ru.pdf', 'ru.docx', 'en.pdf', 'en.docx'])
  })
})
