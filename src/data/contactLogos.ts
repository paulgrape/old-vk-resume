export type ContactId = 'telegram' | 'email' | 'github' | 'linkedin' | 'phone'

export const contactIds: readonly ContactId[] = [
  'telegram',
  'email',
  'github',
  'linkedin',
  'phone',
]

export const contactLogoUrls: Record<ContactId, string> = {
  telegram: 'https://cdn.simpleicons.org/telegram/26A5E4',
  email: 'https://cdn.simpleicons.org/gmail/EA4335',
  github: 'https://cdn.simpleicons.org/github/181717',
  linkedin:
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg',
  phone: 'https://cdn.jsdelivr.net/npm/lucide-static@0.469.0/icons/phone.svg',
}
