import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { cvFilesFor, type CvFile } from '@/data/cvFiles'
import { interpolate } from '@/i18n/interpolate'
import { locales, type Locale, type LocaleMessages } from '@/i18n/locales'

type DownloadCvLabels = LocaleMessages['ui']['downloadCv']

type DownloadCvSectionProps = {
  title: string
  count?: string
  description?: string
  locale: Locale
  personName: string
  labels: DownloadCvLabels
}

function DownloadCvButton({
  file,
  labels,
}: {
  file: CvFile
  labels: DownloadCvLabels
}) {
  return (
    <a
      href={file.href}
      download={file.fileName}
      className='group flex items-center gap-3 border border-vk-border-light bg-vk-friends-count px-3 py-2 no-underline hover:bg-vk-section-bg'
    >
      <span className='min-w-0'>
        <span className='block text-[16px] font-bold text-vk-link group-hover:underline'>
          {interpolate(labels.download, {
            language: labels.languages[file.locale],
          })}
        </span>
        <span className='block truncate text-[12px] text-vk-muted'>
          {file.fileName}
        </span>
      </span>
    </a>
  )
}

export function DownloadCvSection({
  title,
  count,
  description,
  locale,
  personName,
  labels,
}: DownloadCvSectionProps) {
  const filesByLocale = cvFilesFor(personName)
  const files = [
    filesByLocale[locale],
    ...locales.filter(item => item !== locale).map(item => filesByLocale[item]),
  ]

  return (
    <section className='border-b border-vk-border'>
      <SectionHeader title={title} count={count} />
      {description ? (
        <p className='px-2 pt-2 text-left text-[13px] leading-[1.45] text-vk-text'>
          {description}
        </p>
      ) : null}
      <div className='flex flex-col gap-2 p-2 text-left'>
        {files.map(file => (
          <DownloadCvButton key={file.locale} file={file} labels={labels} />
        ))}
      </div>
    </section>
  )
}
