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

| File     | Used for                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `avatar` | One photo (`jpg`, `jpeg`, `png`, `webp`, `gif`, or `svg`). Shown at 200px in the profile column (`object-cover`), in the photo viewer, and as the 45px fallback when a job has no `logo`. The sample ships `placeholder.svg` (old-VK dog). |

### `icons/`

Optional svg/png/ico files. Reference them by filename:

- experience entry `"logo": "company.ico"`
- project `"icon": "project.svg"`

Skill names that already have CDN icons in the app need no files.

### `en.json` / `ru.json`

Keep both locales in sync. Required blocks:

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
- Generated PDFs — `npm run cv` writes them to `public/cv/`

## Fresh clone

`content/` is gitignored (your personal data stays local). A fresh clone has no `content/` yet. `npm run setup` (also `predev` / `precv` / `prebuild`) copies `content.example/` → `content/` if `content/site.json` is missing. Then edit `content/` only.

Social preview images (`og:image`) work best as jpg/png. The sample dog is SVG, so skip OG image until you add a raster photo.

## Later: GitHub template

This repo can become a template. `content.example/` is the sample person. Mark the repo as a GitHub Template when ready. Forkers replace `content/` only.

## Scripts

```
npm run setup    # copy content.example/ → content/ if missing
npm run dev      # local
npm run cv       # PDF resume from content cv blocks
npm run build    # dist/ for GitHub Pages
```
