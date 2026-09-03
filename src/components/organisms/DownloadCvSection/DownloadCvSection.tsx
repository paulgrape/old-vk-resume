import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'
import { cvDownloadList, type CvFile } from '@/data/cvFiles'
import { interpolate } from '@/i18n/interpolate'
import { locales, type Locale, type LocaleMessages } from '@/i18n/locales'

type DownloadCvLabels = LocaleMessages['ui']['downloadCv']

type DownloadCvSectionProps = {
  title: string
  count?: string
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
      <span className='shrink-0 border border-vk-border bg-white px-1.5 py-0.5 text-[11px] font-bold text-vk-text'>
        {labels.formats[file.format]}
      </span>
      <span className='min-w-0'>
        <span className='block text-[16px] font-bold text-vk-link group-hover:underline'>
          {interpolate(labels.download, {
            format: labels.formats[file.format],
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
  locale,
  personName,
  labels,
}: DownloadCvSectionProps) {
  const files = cvDownloadList(personName, locale)
  const orderedLocales = [locale, ...locales.filter(item => item !== locale)]

  return (
    <section className='border-b border-vk-border'>
      <SectionHeader title={title} count={count} />
      <div className='flex flex-col gap-3 p-2 text-left'>
        {orderedLocales.map(item => (
          <div key={item} className='flex flex-col gap-2'>
            <div className='px-1 text-[11px] text-vk-muted'>
              {labels.languages[item]}
            </div>
            {files
              .filter(file => file.locale === item)
              .map(file => (
                <DownloadCvButton
                  key={`${file.locale}-${file.format}`}
                  file={file}
                  labels={labels}
                />
              ))}
          </div>
        ))}
      </div>
    </section>
  )
}
