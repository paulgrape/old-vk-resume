import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function viteBase(): string {
  const raw = process.env.BASE_PATH?.trim()

  if (!raw || raw === '/') {
    return '/'
  }

  const withLeading = raw.startsWith('/') ? raw : `/${raw}`

  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`
}

export default defineConfig({
  base: viteBase(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@content': path.resolve(__dirname, './content'),
    },
  },
})
