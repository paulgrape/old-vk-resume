---
name: fill-resume
license: MIT
description: >-
  Fills content/site.json, content/en.json, and content/ru.json for the old-vk-resume
  template. Use when the user wants to personalize the resume, replace Alex Sample,
  update jobs/projects/contacts, add an avatar, or mentions content/, CV, or résumé.
---

# Fill resume content

Edit the live content pack only. Do not change `src/` to personalize a site.

## Live pack

1. If `content.frontend/site.json` exists, edit `content.frontend/` (local overlay; do not commit it).
2. Otherwise edit `content/`.

That matches `scripts/contentRoot.ts`.

## Workflow

1. Read `site.json`, `en.json`, and `ru.json` in the live pack.
2. Apply the user's details. Keep EN and RU list lengths in sync (`projects`, `experience`, `skillGroups`, `education`, `achievements`).
3. Omit unused keys in `site.json`.
4. Put the avatar in `photos/` and set `photos.avatar` to that filename.
5. Prefer `content/icons/skills/{slug}.svg` (or `.png`) for a skill icon. Slug: lowercase, strip marks, non-alphanumerics to `-`. Do not edit `src/data/skillIcons.ts` unless adding a CDN URL the user asked for.
6. Run `npm run validate-content`. Fix until it passes.
7. Remind the user: commit `content/` (not `content.frontend/`); enable GitHub Pages with source **GitHub Actions**.

Do not invent a LinkedIn scrape. Use text the user pastes.

Field lists and contact keys: [references/schema.md](references/schema.md)
