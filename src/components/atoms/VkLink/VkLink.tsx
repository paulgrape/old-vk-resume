import type { AnchorHTMLAttributes, ReactNode } from 'react'

type VkLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  size?: 'xs' | 'sm' | 'md'
  bold?: boolean
  block?: boolean
  hoverUnderline?: boolean
}

const sizeClasses = {
  xs: 'text-[10px]',
  sm: 'text-[11px]',
  md: 'text-[13px]',
} as const

export function VkLink({
  children,
  size = 'sm',
  bold = false,
  block = false,
  hoverUnderline = true,
  className = '',
  href = '#',
  ...props
}: VkLinkProps) {
  return (
    <a
      href={href}
      className={`text-vk-link no-underline ${hoverUnderline ? 'hover:underline' : ''} ${sizeClasses[size]} ${bold ? 'font-bold' : ''} ${block ? 'block' : ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
