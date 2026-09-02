# Portfolio styled like old VK

Static resume site with old VK chrome. Personal data lives in `content/`. App chrome stays in `src/`.

## Customize

Replace files in `content/`, then run the app. No component edits.

```
content/
  site.json          # contacts, socials, photo filenames
  en.json            # English resume copy
  ru.json            # Russian resume copy
  photos/            # avatar file named in site.json (jpg/png/webp/gif/svg)
  icons/             # optional logos for jobs and projects
```

1. Edit `content/site.json` (email and profile links).
2. Edit `content/en.json` and `content/ru.json` (name, stats, jobs, projects).
3. Drop one full-size avatar into `content/photos/` using the filename from `site.json`.
4. `npm i && npm run dev`

UI strings (Search, Like, route titles) stay in `src/locales/`.

### `site.json`

Contacts and photo filenames. Keys the contacts page already understands:

`email`, `phone`, `telegram`, `github`, `linkedin`, `whatsapp`, `discord`, `skype`, `signal`, `viber`, `slack`, `vk`, `instagram`, `x`, `facebook`, `messenger`, `youtube`, `gitlab`, `stackoverflow`, `behance`, `dribbble`, `mastodon`, `bluesky`, `reddit`, `twitch`, `calendly`, `microsoftteams`, `wechat`.

Omit any you do not use. `photos` maps filenames in `content/photos/`:

```json
{
  "email": "you@example.com",
  "telegram": "https://t.me/handle",
  "github": "https://github.com/you",
  "linkedin": "https://www.linkedin.com/in/you",
  "photos": {
    "avatar": "placeholder.svg"
  }
}
```

### `photos/`

| File     | Used for                                                                                                                                                                                                                                                                                                                                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `avatar` | One photo (`jpg`, `jpeg`, `png`, `webp`, `gif`, or `svg`). Shown at 200px in the profile column (`object-cover`), in the photo viewer, as the 45px fallback when a job has no `logo`, and on the PDF resume (`npm run cv`) as an 80pt square next to the name. The PDF embed supports `jpg`/`jpeg`/`png`/`svg`; `webp`/`gif` stay site-only. The sample ships `placeholder.svg` (old-VK dog). |

### `icons/`

Optional svg/png/ico files. Reference them by filename:

- experience entry `"logo": "company.ico"`
- project `"icon": "project.svg"`

Skill names that already have CDN icons in the app need no files.

### `en.json` / `ru.json`

Keep both locales in sync. `npm run validate-content` (also `npm run cv` / `npm run build`) checks the Zod schema, EN/RU keys and list lengths, and that the avatar and Roboto fonts exist. Required blocks:

| Block                              | Used for                        |
| ---------------------------------- | ------------------------------- |
| `user`                             | name, status, titlebar subtitle |
| `cv`                               | PDF resume copy (`npm run cv`)  |
| `topNavLinks`                      | header links (`id` + `label`)   |
| `sidebarNavItems`                  | left nav (`id` + `label`)       |
| `appMenuItems`                     | badges under the sidebar        |
| `fields`                           | profile key/value rows          |
| `skillGroups`                      | skills page and home rail       |
| `projects` / `projectsSection`     | projects page and home rail     |
| `experience` / `experienceSection` | experience page and home wall   |
| `footerLinks` / `footerCopyright`  | footer                          |

Link `id`s: resume routes (`home`, `experience`, `projects`, `stack`, `achievements`, `contacts`, `downloadCv`) or external (`github`, `linkedin`, `telegram`, `email`).

Project extras: `demoHref`, `screenshots` (image URLs), `icon`.

### Optional blocks

Omit the array, or pass `[]`, to hide the section.

| Block          | Used for                                                                     |
| -------------- | ---------------------------------------------------------------------------- |
| `education`    | home profile rows (institution, optional department / major / mode / status) |
| `achievements` | My Achievements page (`title`, optional `description` / `year`)              |

Keep a matching `{ "id": "achievements", "label": "…" }` row in `sidebarNavItems` only if you want that nav item when the array is non-empty. Empty achievements also drop the sidebar item and send `#/achievements` back to home.

```json
"achievements": [
  {
    "title": "MVP in 6 months",
    "description": "Shipped a multipage product from scratch.",
    "year": "2025"
  }
]
```

### What not to put in `content/`

- Search, Like, and route titles — `src/locales/`
- Generated PDFs — `npm run cv` writes them to `public/cv/`. Filenames come from the English `user.name` plus locale (`John_Pork_EN.pdf`).

## Fresh clone

`content/` is gitignored (your personal data stays local). A fresh clone has no `content/` yet. `npm run setup` (also `predev` / `precv` / `prebuild`) copies `content.example/` → `content/` if `content/site.json` is missing. Then edit `content/` only.

Social preview images (`og:image`) work best as jpg/png. The sample dog is SVG, so skip OG image until you add a raster photo.

## Deploy

Needs Node 20+ (`.nvmrc` pins 24). `npm run build` writes `dist/`. `@emnapi/core` and `@emnapi/runtime` are direct devDependencies so Linux `npm ci` finds the wasm optional peers that a Windows-generated lockfile otherwise omits. `package.json` overrides `eslint-plugin-jsx-a11y`'s eslint peer so `npm ci` accepts ESLint 10 (the plugin works; its published range still stops at 9).

**GitHub Pages (project site):** `.github/workflows/pages.yml` builds with `BASE_PATH=/<repo>/` so asset URLs work under `https://<user>.github.io/<repo>/`. In the repo: Settings → Pages → Source: GitHub Actions. For a user site (`username.github.io`), set Actions variable `BASE_PATH` to `/`.

Local project-pages build:

```
BASE_PATH=/old-vk-resume/ npm run build
```

**Vercel / Netlify:** import the repo, output `dist/`. `vercel.json` and `public/_headers` set `X-Content-Type-Options`, `Referrer-Policy`, and a CSP that allows skill/contact icons from Simple Icons, jsDelivr, and GitHub user images, plus project screenshots from `raw.githubusercontent.com`. If you add other image hosts, update those files. GitHub Pages does not apply `_headers`; put the same headers on a CDN if you need them there.

## SEO

This is a hash-routed SPA (`#/experience`). Crawlers and most social scrapers see `index.html`, not hash paths — there is no sitemap of `#/` URLs. The build injects English `title` and `description` from `content/en.json` (or `content.example` on a fresh clone). The running app updates `lang`, description, and Open Graph / Twitter tags when the locale changes. `og:image` is set at runtime only when the avatar is jpg/png/webp/gif; the sample `placeholder.svg` is skipped. `public/robots.txt` allows crawlers.

## GitHub template

After the default branch is green, mark the repo as a Template (Settings → General → Template repository). Forkers replace `content/` only.

## Scripts

```
npm run setup             # copy content.example/ → content/ if missing
npm run validate-content  # Zod-check site/en/ru.json, locale parity, avatar and fonts
npm run dev               # local
npm run cv                # validate content, then PDF resume
npm run typecheck         # setup then tsc -b
npm run test              # Vitest (content, contacts, CV slugs, SEO helpers)
npm run format            # Prettier write (src, scripts, configs; not content/)
npm run format:check      # Prettier check
npm run build             # dist/ (respects BASE_PATH)
```
