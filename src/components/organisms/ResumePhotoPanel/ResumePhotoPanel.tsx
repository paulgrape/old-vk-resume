import { useState } from 'react'
import { Divider } from '@/components/atoms/Divider/Divider'
import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { PhotoViewer } from '@/components/organisms/PhotoViewer/PhotoViewer'

type ResumePhotoPanelProps = {
  name: string
  avatarSrc: string
  avatarFullSrc: string
  writeMessageHref: string
  writeMessageLabel: string
}

export function ResumePhotoPanel({
  name,
  avatarSrc,
  avatarFullSrc,
  writeMessageHref,
  writeMessageLabel,
}: ResumePhotoPanelProps) {
  const [photoOpen, setPhotoOpen] = useState(false)

  return (
    <div>
      <button
        type='button'
        className='block m-0 p-0 border-0 bg-transparent cursor-pointer'
        onClick={() => setPhotoOpen(true)}
      >
        <img
          src={avatarSrc}
          alt={name}
          className='w-[200px] h-[200px] object-cover'
        />
      </button>

      {photoOpen ? (
        <PhotoViewer
          photos={[
            {
              src: avatarFullSrc,
              alt: name,
              likes: '12',
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
        className='flex items-center gap-1.5'
      >
        {writeMessageLabel}
      </VkLink>

      <Divider className='my-2' />
    </div>
  )
}
