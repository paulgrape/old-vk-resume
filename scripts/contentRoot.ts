import { existsSync } from 'node:fs'
import path from 'node:path'

export const contentDirName = 'content'

export function resolveContentDir(rootDir: string): string {
  const contentDir = path.join(rootDir, contentDirName)

  if (existsSync(path.join(contentDir, 'site.json'))) {
    return contentDir
  }

  throw new Error(
    'No content pack found. Restore content/ from git (git checkout -- content), or add content/site.json.',
  )
}
