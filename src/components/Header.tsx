import { AuthorInfo } from './AuthorInfo'
import LogoIcon from '../assets/svg/logo.svg?react'
import { Link } from 'react-router'

export const Header = (): React.JSX.Element => {
  return (
    <header className='header'>
      <div className='header__logo-box'>
        <Link to={'/'}>
          <LogoIcon className='logo-box__icon' />
        </Link>
      </div>
      <AuthorInfo />
    </header>
  )
}
