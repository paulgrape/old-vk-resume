import { ProfileFieldRow } from '@/components/molecules/ProfileFieldRow/ProfileFieldRow'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import type { EducationEntry } from '@/data/resume'
import { interpolate } from '@/i18n/interpolate'
import type { LocaleMessages } from '@/i18n/locales'

type EducationLabels = LocaleMessages['ui']['education']

type EducationFieldKey =
  | 'institution'
  | 'department'
  | 'major'
  | 'mode'
  | 'status'

const EDUCATION_FIELDS: EducationFieldKey[] = [
  'institution',
  'department',
  'major',
  'mode',
  'status',
]

const LINKED_FIELDS = new Set<EducationFieldKey>([
  'institution',
  'department',
  'major',
])

type ResumeEducationSectionProps = {
  labels: EducationLabels
  entries: EducationEntry[]
}

function rowsForEntry(entry: EducationEntry, labels: EducationLabels) {
  return EDUCATION_FIELDS.flatMap(key => {
    const value = entry[key]
    if (!value) {
      return []
    }

    return [
      {
        key,
        label: labels[key],
        value,
        link: LINKED_FIELDS.has(key),
      },
    ]
  })
}

export function ResumeEducationSection({
  labels,
  entries,
}: ResumeEducationSectionProps) {
  if (entries.length === 0) {
    return null
  }

  return (
    <section>
      <SectionHeader
        title={labels.title}
        count={interpolate(labels.count, { count: entries.length })}
      />
      {entries.map((entry, index) => {
        const rows = rowsForEntry(entry, labels)

        return (
          <div
            key={`${entry.institution}-${index}`}
            className={`px-2 py-2 ${
              index < entries.length - 1
                ? 'border-b border-vk-border-light'
                : ''
            }`}
          >
            <table className='border-collapse w-full'>
              <tbody>
                {rows.map(row => (
                  <ProfileFieldRow
                    key={row.key}
                    label={row.label}
                    value={row.value}
                    link={row.link}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )
      })}
    </section>
  )
}
