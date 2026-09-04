import type { AnchorHTMLAttributes, ReactNode } from 'react'

type NavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
}

export function NavLink({
  children,
  className = '',
  href = '#',
  ...props
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={`text-white font-bold text-[11px] no-underline hover:underline ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
