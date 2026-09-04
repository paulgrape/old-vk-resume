import { existsSync } from 'node:fs'
import path from 'node:path'

export const contentFrontendDirName = 'content.frontend'
export const contentDirName = 'content'

export function resolveContentDir(rootDir: string): string {
  const frontendDir = path.join(rootDir, contentFrontendDirName)

  if (existsSync(path.join(frontendDir, 'site.json'))) {
    return frontendDir
  }

  const contentDir = path.join(rootDir, contentDirName)

  if (existsSync(path.join(contentDir, 'site.json'))) {
    return contentDir
  }

  throw new Error(
    'No content pack found. Restore content/ from git (git checkout -- content), or add content/site.json.',
  )
}
