import { readFileSync } from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { resolveContentDir } from './scripts/contentRoot.ts'
import {
  buildDocumentHead,
  documentHeadTags,
  escapeHtml,
} from './src/seo/documentHead.ts'

function viteContentDir(rootDir: string): string {
  try {
    return resolveContentDir(rootDir)
  } catch {
    return path.join(rootDir, 'content')
  }
}

function htmlSeoPlugin(rootDir: string): Plugin {
  return {
    name: 'html-seo',
    transformIndexHtml(html) {
      const contentDir = resolveContentDir(rootDir)
      const resume = JSON.parse(
        readFileSync(path.join(contentDir, 'en.json'), 'utf8'),
      ) as { user: { name: string }; cv: { title: string; summary: string } }
      const head = buildDocumentHead({
        locale: 'en',
        name: resume.user.name,
        role: resume.cv.title,
        description: resume.cv.summary,
        imageUrl: null,
      })

      return {
        html: html.replace(
          /<title>[\s\S]*?<\/title>/,
          `<title>${escapeHtml(head.title)}</title>`,
        ),
        tags: documentHeadTags(head).map(tag => ({
          ...tag,
          injectTo: 'head' as const,
        })),
      }
    },
  }
}

function viteBase(): string {
  const raw = process.env.BASE_PATH?.trim()

  if (!raw || raw === '/') {
    return '/'
  }

  const withLeading = raw.startsWith('/') ? raw : `/${raw}`

  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

const rootDir = path.resolve(__dirname)

export default defineConfig({
  base: viteBase(),
  plugins: [react(), tailwindcss(), htmlSeoPlugin(rootDir)],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
      '@content': viteContentDir(rootDir),
    },
  },
})
