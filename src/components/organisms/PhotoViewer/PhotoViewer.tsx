import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { LikeControl } from '@/components/atoms/LikeControl/LikeControl'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { interpolate } from '@/i18n/interpolate'
import { useLocale } from '@/i18n/LocaleContext'
import type { Locale } from '@/i18n/locales'

export type PhotoViewerPhoto = {
  src: string
  alt: string
  authorName: string
  authorAvatar: string
}

type PhotoViewerProps = {
  photos: PhotoViewerPhoto[]
  index: number
  onClose: () => void
  onIndexChange?: (index: number) => void
}

function preventNav(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

function formatPhotoAddedDate(locale: Locale, date: Date): string {
  return new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function PhotoViewer({
  photos,
  index,
  onClose,
  onIndexChange,
}: PhotoViewerProps) {
  const { locale, messages } = useLocale()
  const ui = messages.ui
  const photo = photos[index]
  const total = photos.length
  const showNav = total > 1 && onIndexChange != null
  const [likesBySrc, setLikesBySrc] = useState<Record<string, number>>({})
  const openedAt = useMemo(() => new Date(), [])
  const addedDate = useMemo(
    () => formatPhotoAddedDate(locale, openedAt),
    [locale, openedAt],
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (!showNav) {
        return
      }

      if (event.key === 'ArrowLeft') {
        onIndexChange?.((index - 1 + total) % total)
      }

      if (event.key === 'ArrowRight') {
        onIndexChange?.((index + 1) % total)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, onClose, onIndexChange, showNav, total])

  if (!photo) {
    return null
  }

  const photoOfLabel = interpolate(ui.photoOf, {
    current: index + 1,
    total,
  })
  const likes = likesBySrc[photo.src] ?? 0

  return createPortal(
    <div
      className='fixed inset-0 z-[1000] flex items-center justify-center bg-black/70'
      onClick={onClose}
      role='presentation'
    >
      <button
        type='button'
        aria-label={ui.close}
        className='absolute top-[10px] right-[14px] border-0 bg-transparent p-0 text-[24px] leading-none text-[#c8c8c8] hover:text-white cursor-pointer'
        onClick={event => {
          event.stopPropagation()
          onClose()
        }}
      >
        ×
      </button>

      {showNav ? (
        <button
          type='button'
          className='absolute left-2 border-0 bg-transparent px-2 py-8 text-[28px] leading-none text-white/50 hover:text-white cursor-pointer'
          onClick={event => {
            event.stopPropagation()
            onIndexChange?.((index - 1 + total) % total)
          }}
        >
          ‹
        </button>
      ) : null}

      <div
        className='relative w-fit max-w-[calc(100vw-48px)] bg-white text-left shadow-[0_2px_16px_rgba(0,0,0,0.45)]'
        onClick={event => event.stopPropagation()}
        role='dialog'
        aria-modal='true'
        aria-label={photoOfLabel}
      >
        <div className='flex items-baseline justify-between gap-6 px-5 pt-2 pb-2'>
          <span className='text-[11px] text-vk-heading-dark'>
            {photoOfLabel}
          </span>
          <button
            type='button'
            className='border-0 bg-transparent p-0 text-[11px] text-vk-link hover:underline cursor-pointer'
            onClick={onClose}
          >
            {ui.close}
          </button>
        </div>

        <div className='px-5'>
          <img
            src={photo.src}
            alt={photo.alt}
            className='block max-h-[calc(100vh-200px)] max-w-[calc(100vw-88px)] h-auto w-auto mx-auto'
          />
        </div>

        <div className='flex items-start justify-between gap-8 px-5 pt-3 pb-4'>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center text-[11px] text-vk-muted'>
              <span>
                {interpolate(ui.photoAdded, { date: addedDate })}
              </span>
              <LikeControl
                likeLabel={ui.like}
                count={likes}
                onLike={() =>
                  setLikesBySrc(prev => ({
                    ...prev,
                    [photo.src]: (prev[photo.src] ?? 0) + 1,
                  }))
                }
              />
            </div>

            <p className='mt-5 mb-0 max-w-[280px] text-[11px] leading-[1.45] text-vk-muted'>
              {ui.commentsHidden}
            </p>
          </div>

          <div className='w-[158px] shrink-0 text-[11px] leading-[1.45]'>
            <div className='text-vk-muted'>
              {ui.photoAlbumLabel}{' '}
              <VkLink
                href='#'
                size='sm'
                onClick={preventNav}
              >
                {ui.photoAlbum}
              </VkLink>
            </div>

            <div className='mt-2 text-vk-muted'>{ui.photoSenderLabel}</div>
            <div className='mt-1 flex items-center gap-1.5'>
              <img
                src={photo.authorAvatar}
                alt=''
                className='h-8 w-8 shrink-0 object-cover'
              />
              <VkLink
                href='#'
                size='sm'
                bold
                onClick={preventNav}
              >
                {photo.authorName}
              </VkLink>
            </div>
          </div>
        </div>
      </div>

      {showNav ? (
        <button
          type='button'
          className='absolute right-2 border-0 bg-transparent px-2 py-8 text-[28px] leading-none text-white/50 hover:text-white cursor-pointer'
          onClick={event => {
            event.stopPropagation()
            onIndexChange?.((index + 1) % total)
          }}
        >
          ›
        </button>
      ) : null}
    </div>,
    document.body,
  )
}
