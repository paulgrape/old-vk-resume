import type { InputHTMLAttributes } from 'react'

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <input
      type='text'
      placeholder='Поиск'
      className={`w-[190px] px-2 h-5 text-[12px] rounded-xs bg-white text-black placeholder-vk-placeholder border-0 focus:outline-none ${className}`.trim()}
      {...props}
    />
  )
}
