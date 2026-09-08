import { ProfileFieldRow } from '@/components/molecules/ProfileFieldRow/ProfileFieldRow'
import type { ProfileField } from '@/data/profile'
import type { EducationEntry } from '@/data/resume'

type ProfileInfoPanelProps = {
  name: string
  status: string
  education: EducationEntry[]
  fields: ProfileField[]
}

export function ProfileInfoPanel({
  name,
  status,
  education,
  fields,
}: ProfileInfoPanelProps) {
  const educationLabel = education[0]?.institution

  return (
    <div className='pt-3 pb-2 border-b border-vk-border max-vk:px-2'>
      <div className='flex justify-between items-start mb-1 mr-auto max-vk:hidden'>
        <div className='text-left'>
          <div className='text-[13px] font-bold text-vk-heading leading-tight'>
            {name}
          </div>
          <div className='leading-none text-[13px] text-black mt-1 mb-2'>
            {status}
          </div>
        </div>
        {educationLabel ? (
          <div className='text-[12px] leading-tight text-vk-link shrink-0 self-start ml-4 max-vk:ml-0'>
            {educationLabel}
          </div>
        ) : null}
      </div>

      <table className='border-collapse w-full'>
        <tbody>
          {fields.map(field => (
            <ProfileFieldRow key={field.label} {...field} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
