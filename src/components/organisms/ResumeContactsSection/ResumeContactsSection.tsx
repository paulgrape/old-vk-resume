import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { ContactEntry } from '@/data/resume'
import type { LocaleMessages } from '@/i18n/locales'

type ContactLabels = LocaleMessages['ui']['contacts']

type ResumeContactsSectionProps = {
  title: string
  count?: string
  description?: string
  contacts: readonly ContactEntry[]
  labels: ContactLabels
}

function isExternalHref(href: string): boolean {
  return href.startsWith('http://') || href.startsWith('https://')
}

function ContactRow({
  contact,
  label,
}: {
  contact: ContactEntry
  label: string
}) {
  const external = isExternalHref(contact.href)

  return (
    <a
      href={contact.href}
      className='group flex min-h-18 items-center gap-3 border border-vk-border-light bg-vk-friends-count px-3 py-2 no-underline hover:bg-vk-section-bg'
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <img
        src={contact.logoSrc}
        alt=''
        aria-hidden='true'
        referrerPolicy='no-referrer'
        className='size-16 shrink-0 object-contain'
      />
      <span className='min-w-0 text-left'>
        <span className='block text-[16px] font-bold text-vk-link group-hover:underline'>
          {label}
        </span>
        <span className='block truncate text-[13px] text-vk-muted'>
          {contact.value}
        </span>
      </span>
    </a>
  )
}

export function ResumeContactsSection({
  title,
  count,
  description,
  contacts,
  labels,
}: ResumeContactsSectionProps) {
  return (
    <section className='border-b border-vk-border'>
      <SectionHeader
        title={title}
        count={count}
      />
      {description ? (
        <p className='px-2 pt-2 text-left text-[13px] leading-[1.45] text-vk-text'>
          {description}
        </p>
      ) : null}
      <ul className='m-0 flex list-none flex-col gap-2 p-2'>
        {contacts.map(contact => (
          <li key={contact.id}>
            <ContactRow
              contact={contact}
              label={labels[contact.id] ?? contact.id}
            />
          </li>
        ))}
      </ul>
    </section>
  )
}
