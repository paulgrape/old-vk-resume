type SkipLinkProps = {
  label: string
  href?: string
}

export function SkipLink({ label, href = '#main-content' }: SkipLinkProps) {
  return (
    <a href={href} className='skip-link'>
      {label}
    </a>
  )
}
