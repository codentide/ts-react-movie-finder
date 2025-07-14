import { Link, useLocation } from 'react-router'
import { AuthorInfo, HeaderSearchInput, SearchInput } from '../common'
import LogoIcon from '../../assets/svg/logo.svg?react'

export const Header = (): React.JSX.Element => {
  const { pathname } = useLocation()

  return (
    <header className='header'>
      <div className='header__logo-box'>
        <Link to={'/'}>
          <LogoIcon className='logo-box__icon' />
        </Link>
      </div>
      <div className='header__search-box'>
        {pathname === '/search' ? <SearchInput /> : <HeaderSearchInput />}
      </div>
      <AuthorInfo />
    </header>
  )
}
