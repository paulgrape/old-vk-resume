import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Packer } from 'docx'
import { describe, expect, it } from 'vitest'
import {
  createCvDocument,
  type CvDocxResume,
  type CvDocxSite,
} from './buildCvDocx.ts'

const contentDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../content',
)

function readContent<T>(name: string): T {
  return JSON.parse(readFileSync(path.join(contentDir, name), 'utf8')) as T
}

describe('createCvDocument', () => {
  it('packs a zip-shaped docx from the sample resume', async () => {
    const resume = readContent<CvDocxResume>('en.json')
    const site = readContent<CvDocxSite>('site.json')
    const buffer = await Packer.toBuffer(createCvDocument(resume, site))

    expect(buffer[0]).toBe(0x50)
    expect(buffer[1]).toBe(0x4b)
    expect(buffer.byteLength).toBeGreaterThan(2000)
  })

  it('embeds a raster photo next to the name', async () => {
    const resume = readContent<CvDocxResume>('en.json')
    const site = readContent<CvDocxSite>('site.json')
    const photo = Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
      'base64',
    )
    const withoutPhoto = await Packer.toBuffer(createCvDocument(resume, site))
    const withPhoto = await Packer.toBuffer(
      createCvDocument(resume, site, { type: 'png', data: photo }),
    )

    expect(withPhoto.byteLength).toBeGreaterThan(withoutPhoto.byteLength)
  })
})
