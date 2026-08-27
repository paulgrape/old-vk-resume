import { useState } from 'react'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { PhotoViewer } from '@/components/organisms/PhotoViewer/PhotoViewer'

type ResumePhotoPanelProps = {
  name: string
  status?: string
  avatarSrc: string
  avatarFullSrc: string
  writeMessageHref: string
  writeMessageLabel: string
}

export function ResumePhotoPanel({
  name,
  status,
  avatarSrc,
  avatarFullSrc,
  writeMessageHref,
  writeMessageLabel,
}: ResumePhotoPanelProps) {
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <div>
      <div className='max-vk:flex max-vk:items-start max-vk:gap-3 max-vk:px-2 max-vk:pt-2'>
        <button
          type='button'
          className='block m-0 p-0 border-0 bg-transparent cursor-pointer shrink-0'
          onClick={() => setPhotoOpen(true)}
        >
          <img
            src={avatarSrc}
            alt={name}
            className='w-[200px] h-[200px] object-cover max-vk:size-[120px]'
          />
        </button>

        {status ? (
          <div className='hidden min-w-0 pt-1 text-left max-vk:block'>
            <div className='text-[15px] font-bold text-vk-heading leading-tight'>
              {name}
            </div>
            <div className='mt-1 text-[13px] text-black leading-snug'>
              {status}
            </div>
          </div>
        ) : null}
      </div>

      {photoOpen ? (
        <PhotoViewer
          photos={[
            {
              src: avatarFullSrc,
              alt: name,
              authorName: name,
              authorAvatar: avatarSrc,
            },
          ]}
          index={0}
          onClose={() => setPhotoOpen(false)}
        />
      ) : null}

      <Divider className='my-2' />

      <VkLink
        href={writeMessageHref}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-1.5 max-vk:px-2'
      >
        {writeMessageLabel}
      </VkLink>

      <Divider className='my-2' />
    </div>
  )
}
