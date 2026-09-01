import { readFileSync } from 'node:fs'
import path from 'node:path'

const PDF_AVATAR_EXTS = new Set(['.jpg', '.jpeg', '.png', '.svg'])

export function isPdfEmbeddableAvatar(fileName: string): boolean {
  return PDF_AVATAR_EXTS.has(path.extname(fileName).toLowerCase())
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
