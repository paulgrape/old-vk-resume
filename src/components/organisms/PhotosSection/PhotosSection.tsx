import { PhotoTile } from '@/components/atoms/PhotoTile/PhotoTile'
import { SectionHeader } from '@/components/molecules/SectionHeader/SectionHeader'

type PhotosSectionProps = {
  title: string
  count: string
  linkText: string
  tileCount: number
}

export function PhotosSection({
  title,
  count,
  linkText,
  tileCount,
}: PhotosSectionProps) {
  return (
    <div className='border-b border-vk-border'>
      <SectionHeader title={title} count={count} linkText={linkText} />
      <div className='grid grid-cols-4 gap-0 p-2 gap-1'>
        {Array.from({ length: tileCount }).map((_, i) => (
          <PhotoTile
            key={i}
            hue={200 + i * 15}
            lightness={55 + i * 5}
          />
        ))}
      </div>
    </div>
  )
}
