import { cpSync, existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateContentDir } from './validateContentDir.ts'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const exampleDir = path.join(rootDir, 'content.example')
const contentDir = path.join(rootDir, 'content')
const markerFile = path.join(contentDir, 'site.json')

if (existsSync(markerFile)) {
  process.exit(0)
}

if (!existsSync(exampleDir)) {
  console.error('Missing content.example/. Cannot create content/.')
  process.exit(1)
}

cpSync(exampleDir, contentDir, { recursive: true })
console.log(
  'Copied content.example/ → content/. Edit content/ with your details.',
)
validateContentDir(contentDir)
