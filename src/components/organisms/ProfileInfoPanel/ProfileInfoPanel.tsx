import { VkLink } from '@/components/atoms/VkLink/VkLink'
import { ProfileFieldRow } from '@/components/molecules/ProfileFieldRow/ProfileFieldRow'
import type { ProfileField } from '@/data/profile'

type ProfileInfoPanelProps = {
  name: string
  status: string
  education: string
  fields: ProfileField[]
  showDetailsLabel: string
}

export function ProfileInfoPanel({
  name,
  status,
  education,
  fields,
  showDetailsLabel,
}: ProfileInfoPanelProps) {
  return (
    <div className='pt-3 pb-2 border-b border-vk-border'>
      <div className='flex justify-between items-start mb-1 mr-auto'>
        <div className='text-left'>
          <div className='text-[13px] font-bold text-vk-heading leading-tight'>
            {name}
          </div>
          <div className='leading-none text-[13px] text-black mt-1 mb-2'>
            {status}
          </div>
        </div>
        <div className='text-[12px] text-vk-link shrink-0 ml-4 border'>
          {education}
        </div>
      </div>

      <table className='border-collapse w-full'>
        <tbody>
          {fields.map(field => (
            <ProfileFieldRow
              key={field.label}
              {...field}
            />
          ))}
        </tbody>
      </table>

      <VkLink
        href='#'
        className='mt-2 block'
      >
        {showDetailsLabel}
      </VkLink>
    </div>
  )
}
