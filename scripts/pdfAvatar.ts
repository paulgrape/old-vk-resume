import { readFileSync } from 'node:fs'
import path from 'node:path'

const PDF_AVATAR_EXTS = new Set(['.jpg', '.jpeg', '.png', '.svg'])
const DOCX_AVATAR_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.bmp'])

export type DocxImageType = 'jpg' | 'png' | 'gif' | 'bmp'

export type DocxAvatar = {
  data: Buffer
  type: DocxImageType
}

export function isPdfEmbeddableAvatar(fileName: string): boolean {
  return PDF_AVATAR_EXTS.has(path.extname(fileName).toLowerCase())
}

export function isDocxEmbeddableAvatar(fileName: string): boolean {
  return DOCX_AVATAR_EXTS.has(path.extname(fileName).toLowerCase())
}

export function docxImageType(fileName: string): DocxImageType | null {
  const ext = path.extname(fileName).toLowerCase()

  if (ext === '.jpg' || ext === '.jpeg') {
    return 'jpg'
  }

  if (ext === '.png' || ext === '.gif' || ext === '.bmp') {
    return ext.slice(1) as DocxImageType
  }

  return null
}

export function readPdfAvatar(
  contentDir: string,
  fileName: string,
): Buffer | null {
  if (!isPdfEmbeddableAvatar(fileName)) {
    return null
  }

  return readFileSync(path.join(contentDir, 'photos', fileName))
}

export function readDocxAvatar(
  contentDir: string,
  fileName: string,
): DocxAvatar | null {
  const type = docxImageType(fileName)

  if (!type) {
    return null
  }

  return {
    type,
    data: readFileSync(path.join(contentDir, 'photos', fileName)),
  }
}
