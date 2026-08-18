import searchIcon from '@/assets/search-icon.svg'
import type { InputHTMLAttributes } from 'react'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <div
      className={`flex items-center gap-1 w-[144px] h-5 px-1.5 rounded-xs bg-white ${className}`.trim()}
    >
      <img
        src={searchIcon}
        alt=''
        aria-hidden
        className='shrink-0 size-3'
      />
      <input
        type='text'
        className='min-w-0 flex-1 h-full bg-transparent text-[12px] text-black placeholder-vk-placeholder border-0 p-0 focus:outline-none'
        {...props}
      />
    </div>
  )
}
