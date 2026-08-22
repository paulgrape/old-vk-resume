export const contactLogoUrls = {
  telegram: 'https://cdn.simpleicons.org/telegram/26A5E4',
  email: 'https://cdn.simpleicons.org/gmail/EA4335',
  github: 'https://cdn.simpleicons.org/github/181717',
  linkedin:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  phone: 'https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/phone.svg',
  whatsapp: 'https://cdn.simpleicons.org/whatsapp/25D366',
  discord: 'https://cdn.simpleicons.org/discord/5865F2',
  skype: 'https://cdn.simpleicons.org/skype/00AFF0',
  signal: 'https://cdn.simpleicons.org/signal/3A76F0',
  viber: 'https://cdn.simpleicons.org/viber/7360F2',
  slack: 'https://cdn.simpleicons.org/slack/4A154B',
  vk: 'https://cdn.simpleicons.org/vk/0077FF',
  instagram: 'https://cdn.simpleicons.org/instagram/E4405F',
  x: 'https://cdn.simpleicons.org/x/000000',
  facebook: 'https://cdn.simpleicons.org/facebook/1877F2',
  messenger: 'https://cdn.simpleicons.org/messenger/00B2FF',
  youtube: 'https://cdn.simpleicons.org/youtube/FF0000',
  gitlab: 'https://cdn.simpleicons.org/gitlab/FC6D26',
  stackoverflow: 'https://cdn.simpleicons.org/stackoverflow/F58025',
  behance: 'https://cdn.simpleicons.org/behance/1769FF',
  dribbble: 'https://cdn.simpleicons.org/dribbble/EA4C89',
  mastodon: 'https://cdn.simpleicons.org/mastodon/6364FF',
  bluesky: 'https://cdn.simpleicons.org/bluesky/0285FF',
  reddit: 'https://cdn.simpleicons.org/reddit/FF4500',
  twitch: 'https://cdn.simpleicons.org/twitch/9146FF',
  calendly: 'https://cdn.simpleicons.org/calendly/006BFF',
  microsoftteams: 'https://cdn.simpleicons.org/microsoftteams/6264A7',
  wechat: 'https://cdn.simpleicons.org/wechat/07C160',
} as const

export type ContactId = keyof typeof contactLogoUrls

export const contactIds = Object.keys(contactLogoUrls) as ContactId[]

export function isContactId(value: string): value is ContactId {
  return value in contactLogoUrls
}
