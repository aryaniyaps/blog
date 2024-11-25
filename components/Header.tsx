import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@nextui-org/react'
import Logo from '@/data/logo.svg'

const Header = () => {
  return (
    <Navbar isBordered isBlurred={false}>
      <NavbarBrand className="flex items-center">
        {typeof siteMetadata.headerTitle === 'string' ? (
          <Link href={'/'}>
            <div className="mr-3">
              <Logo />
            </div>
            <p className="font-bold text-inherit">{siteMetadata.headerTitle}</p>
          </Link>
        ) : (
          siteMetadata.headerTitle
        )}
      </NavbarBrand>
      <NavbarContent justify="end">
        {headerNavLinks
          .filter((link) => link.href !== '/')
          .map((link) => (
            <NavbarItem key={link.title}>
              <Link href={link.href} color="foreground">
                {link.title}
              </Link>
            </NavbarItem>
          ))}
        <NavbarItem>
          <SearchButton />
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}

export default Header
