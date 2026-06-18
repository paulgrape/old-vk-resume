import headerBg from '@/assets/xhead2.gif'
import { NavLink } from '@/components/atoms/NavLink/NavLink'
import { SearchInput } from '@/components/atoms/SearchInput/SearchInput'

type TopNavbarProps = {
  links: readonly string[]
}

export function TopNavbar({ links }: TopNavbarProps) {
  return (
    <header
      className='relative w-full max-w-[791px] h-[45px] mx-auto rounded-b-[10px] bg-no-repeat bg-size-[100%_100%]'
      style={{ backgroundImage: `url(${headerBg})` }}
    >
      <div className='relative z-10 flex h-full w-full items-center gap-3 pl-[150px] pr-2'>
        <SearchInput />

        <nav className='flex flex-1 flex-wrap items-center justify-end gap-5 pr-1.5'>
          {links.map(link => (
            <NavLink
              key={link}
              href='#'
            >
              {link}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
