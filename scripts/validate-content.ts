import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateContentDir } from './validateContentDir.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

try {
  validateContentDir(path.join(rootDir, 'content'))
  console.log('content/ is valid.')
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exit(1)
}
