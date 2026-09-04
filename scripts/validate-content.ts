import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveContentDir } from './contentRoot.ts'
import { validateContentDir } from './validateContentDir.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = resolveContentDir(rootDir)

try {
  validateContentDir(contentDir)
  console.log(`${path.relative(rootDir, contentDir) || 'content/'} is valid.`)
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exit(1)
}
