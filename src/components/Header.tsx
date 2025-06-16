import { AuthorInfo } from './AuthorInfo'
import LogoIcon from '../assets/svg/logo.svg?react'

export const Header = (): React.JSX.Element => {
  return (
    <header className='header'>
      <div className='header__logo-box'>
        <LogoIcon className='logo-box__icon' />
      </div>
      <AuthorInfo />
    </header>
  )
}
