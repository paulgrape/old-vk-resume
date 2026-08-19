# Portfolio styled like old VK

Static resume site with old VK chrome. Personal data lives in `content/`. App chrome stays in `src/`.

## Customize

Replace files in `content/`, then run the app. No component edits.

```
content/
  site.json          # email, GitHub, LinkedIn, photo filenames
  en.json            # English resume copy
  ru.json            # Russian resume copy
  photos/
    avatar.jpg       # profile photo (200px column)
    avatar-full.jpg  # viewer / full-size
    avatar-icon.jpg  # experience list avatar
```

1. Edit `content/site.json` (email and profile links).
2. Edit `content/en.json` and `content/ru.json` (name, stats, jobs, projects).
3. Drop three photos into `content/photos/` using the filenames from `site.json`.
4. `npm i && npm run dev`

UI strings (Search, Like, route titles) stay in `src/locales/`.

## Later: GitHub template

This repo can become a template. Duplicate it, swap `content/` for a sample person, then mark the repo as a GitHub Template. Forkers replace `content/` only.

## Scripts

```
npm run dev      # local
npm run build    # dist/ for GitHub Pages
```
