type ProfileFieldRowProps = {
  label: string
  value: string
  link: boolean
}

export function ProfileFieldRow({ label, value, link }: ProfileFieldRowProps) {
  return (
    <tr>
      <td className='text-[12px] text-vk-muted pr-2 align-top whitespace-nowrap text-left'>
        {label}
      </td>
      <td
        className={`text-[12px] align-top text-left ${link ? 'text-vk-link' : 'text-vk-text'}`}
      >
        {value}
      </td>
    </tr>
  )
}
