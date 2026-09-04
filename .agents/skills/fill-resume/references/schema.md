# Content schema

## `site.json`

Required: `photos.avatar` (filename under `photos/`).

Optional contact keys (omit unused):

`email`, `phone`, `telegram`, `github`, `linkedin`, `whatsapp`, `discord`, `skype`, `signal`, `viber`, `slack`, `vk`, `instagram`, `x`, `facebook`, `messenger`, `youtube`, `gitlab`, `stackoverflow`, `behance`, `dribbble`, `mastodon`, `bluesky`, `reddit`, `twitch`, `calendly`, `microsoftteams`, `wechat`

## `en.json` / `ru.json`

Required blocks: `user`, `cv`, `topNavLinks`, `sidebarNavItems`, `appMenuItems`, `fields`, `skillGroups`, `projects`, `projectsSection`, `experience`, `experienceSection`, `footerLinks`, `footerCopyright`.

Optional: `education`, `achievements` (omit or `[]` to hide). Empty `achievements` drops the sidebar item.

Nav `id`s: `home`, `experience`, `projects`, `stack`, `achievements`, `contacts`, `downloadCv`, or a contact key from `site.json`.

Project extras: `demoHref`, `screenshots` (image URLs), `icon` (filename under `icons/`).

Experience extra: `logo` (filename under `icons/`).

## Parity

`npm run validate-content` fails if EN and RU top-level keys differ, or if these arrays differ in length: `projects`, `experience`, `skillGroups`, `education`, `achievements`.

## Skill icon files

`{slug}.svg` or `{slug}.png` in `icons/` or `icons/skills/`. Example: `TanStack Query` → `tanstack-query.svg`. Unmapped names still render as tags if the group is mixed.
