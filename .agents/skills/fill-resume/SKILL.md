---
name: fill-resume
license: MIT
description: >-
  Fills content/site.json, content/en.json, and content/ru.json for the old-vk-resume
  template. Use when the user wants to personalize the resume, replace Alex Sample,
  update jobs/projects/contacts, add an avatar, or mentions content/, CV, or résumé.
---

# Fill resume content

Edit `content/` only. Do not change `src/` to personalize a site.

## Workflow

1. Read `content/site.json`, `content/en.json`, and `content/ru.json`.
2. Apply the user's details. Keep EN and RU list lengths in sync (`projects`, `experience`, `skillGroups`, `education`, `achievements`).
3. Omit unused keys in `site.json`.
4. Put the avatar in `content/photos/` and set `photos.avatar` to that filename.
5. Prefer `content/icons/skills/{slug}.svg` (or `.png`) for a skill icon. Slug: lowercase, strip marks, non-alphanumerics to `-`. Do not edit `src/data/skillIcons.ts` unless adding a CDN URL the user asked for.
6. Run `npm run validate-content`. Fix until it passes.
7. Remind the user: commit `content/`; enable GitHub Pages with source **GitHub Actions**.

Do not invent a LinkedIn scrape. Use text the user pastes.

Field lists and contact keys: [references/schema.md](references/schema.md)
