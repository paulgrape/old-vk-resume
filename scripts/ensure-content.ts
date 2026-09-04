import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const markerFile = path.join(rootDir, 'content', 'site.json')

if (existsSync(markerFile)) {
  process.exit(0)
}

console.error(
  'Missing content/site.json. Restore content/ from git (git checkout -- content).',
)
process.exit(1)
