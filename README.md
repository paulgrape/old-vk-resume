# old-vk-resume

Vite + React resume site with 2011 VK chrome. Copy lives in `content/` (gitignored). UI chrome lives in `src/`.

MIT. The look is a non-commercial parody of old VK / VKontakte. Not affiliated with VK Company Limited. See [LICENSE](LICENSE).

Needs Node 20+ (`.nvmrc` pins 24).

## Use this template

Repo owner (once): Settings → General → Template repository.

Then:

1. GitHub: **Use this template** (fork also works).
2. Clone. `npm i`. First `npm run dev` (or `npm run setup`) copies `content.example/` → `content/` if `content/site.json` is missing. `prebuild` and `precv` do that copy too.
3. Edit `content/`. Touch `src/` only if you are changing chrome.
4. `npm run dev` locally. `npm run build` writes `dist/`.

```
content/
  site.json          # contacts, socials, photo filenames
  en.json            # English resume
  ru.json            # Russian resume
  photos/            # file named in site.json (jpg/png/webp/gif/svg)
  icons/             # optional job/project logos
```

Edit path:

1. `content/site.json`: email and profile links.
2. `content/en.json` and `content/ru.json`: name, jobs, projects.
3. One avatar in `content/photos/` whose filename matches `site.json`.
4. `npm run dev`

`content.example/` ships a fictional person. The sample avatar is `placeholder.svg` (the old-VK dog).

## `content/` vs `src/locales/`

| Put here                                               | Where                               |
| ------------------------------------------------------ | ----------------------------------- |
| Name, jobs, projects, contacts, photo, PDF/DOCX copy   | `content/`                          |
| Search placeholder, Like, route titles, skip-link, 404 | `src/locales/en.json` and `ru.json` |

`npm run cv` writes `public/cv/`. Filenames use the English `user.name` plus locale: `Alex_Sample_EN.pdf`, `Alex_Sample_EN.docx`. Do not commit those files or root `Pavel_Vinogradov_*` leftovers.

## Deploy

`npm run build` emits `dist/`.

GitHub Pages (project site): `.github/workflows/pages.yml` sets `BASE_PATH=/<repo>/` so assets work at `https://<user>.github.io/<repo>/`. Repo Settings → Pages → Source: GitHub Actions. For `username.github.io`, set Actions variable `BASE_PATH` to `/`.

```
BASE_PATH=/old-vk-resume/ npm run build
```

Vercel / Netlify: import the repo, output `dist/`. `vercel.json` and `public/_headers` set `X-Content-Type-Options`, `Referrer-Policy`, and a CSP that allows skill/contact icons from Simple Icons, jsDelivr, and GitHub user images, plus screenshots from `raw.githubusercontent.com`. Add hosts there if you use others. GitHub Pages ignores `_headers`.

Linux `npm ci`: `@emnapi/core` and `@emnapi/runtime` are pinned so wasm optional peers missing from a Windows lockfile still resolve. `package.json` overrides `eslint-plugin-jsx-a11y`'s eslint peer (published range stops at 9; the plugin runs on 10).

## Hash SEO

Routes are `#/experience`. Crawlers see `index.html`, not hash paths. No sitemap of `#/` URLs. The build writes English title and description from `content/en.json` (or `content.example`). The app updates `lang` and Open Graph tags when the locale changes. `og:image` is set at runtime for jpg/png/webp/gif; SVG (including the sample dog) is skipped. `public/robots.txt` allows crawlers.

## Skill icons

Skill names listed in [`src/data/skillIcons.ts`](src/data/skillIcons.ts) load from a CDN. A skill SVG sitting in `content/icons/` is ignored.

To add a skill with an icon:

1. Put the name in `skillGroups[].items` in `en.json` and `ru.json`.
2. Add a URL for that exact name in `skillIcons.ts`.

Job logos and project icons are local files, referenced by filename:

- experience `"logo": "company.ico"`
- project `"icon": "project.svg"`

If you add image hosts, update the CSP in `vercel.json` and `public/_headers`.

## Content files

### `site.json`

Contact keys the contacts page accepts:

`email`, `phone`, `telegram`, `github`, `linkedin`, `whatsapp`, `discord`, `skype`, `signal`, `viber`, `slack`, `vk`, `instagram`, `x`, `facebook`, `messenger`, `youtube`, `gitlab`, `stackoverflow`, `behance`, `dribbble`, `mastodon`, `bluesky`, `reddit`, `twitch`, `calendly`, `microsoftteams`, `wechat`.

Omit unused keys.

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

| File     | Used for                                                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `avatar` | Profile column (200px, `object-cover`), photo viewer, 45px job-logo fallback, PDF header (80pt, jpg/jpeg/png/svg). webp/gif stay on the site. DOCX embed is jpg/jpeg/png/gif/bmp. Sample: `placeholder.svg`. |

### `en.json` / `ru.json`

Keep EN and RU in sync. `npm run validate-content` (also `precv` / `build`) parses both with Zod. It also checks list lengths, that the avatar file exists, and that Roboto Regular + Bold are under `content/fonts/`.

Required blocks: `user`, `cv`, `topNavLinks`, `sidebarNavItems`, `appMenuItems`, `fields`, `skillGroups`, `projects` / `projectsSection`, `experience` / `experienceSection`, `footerLinks` / `footerCopyright`.

Link `id`s: routes (`home`, `experience`, `projects`, `stack`, `achievements`, `contacts`, `downloadCv`) or contacts (`github`, `linkedin`, `telegram`, `email`).

Project extras: `demoHref`, `screenshots` (image URLs), `icon`.

Optional: omit `education` / `achievements` or pass `[]` to hide them. An empty `achievements` array drops the sidebar item and sends `#/achievements` to home.

```json
"achievements": [
  {
    "title": "MVP in 6 months",
    "description": "Shipped a multipage product from scratch.",
    "year": "2025"
  }
]
```

## Scripts

```
npm run setup             # content.example/ → content/ if missing
npm run validate-content  # Zod + locale parity + avatar + fonts
npm run dev               # local
npm run cv                # PDF and DOCX into public/cv/
npm run typecheck         # setup then tsc -b
npm run test              # Vitest
npm run format            # Prettier (skips content/)
npm run format:check
npm run build             # dist/ (respects BASE_PATH)
```
