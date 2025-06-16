import GithubIcon from '../assets/svg/github.svg?react'
import LinkedinIcon from '../assets/svg/linkedin.svg?react'

export const AuthorInfo = (): React.JSX.Element => {
  return (
    <div className='author-info'>
      <p className='author-info__name'>marco del boccio</p>
      <ul className='link-list'>
        <li>
          <a
            className='link-list__link'
            target='_blank'
            href={'https://github.com/codentide/ts-react-movie-finder'}
          >
            <GithubIcon className='link__icon' />
          </a>
        </li>
        <li>
          <a
            className='link-list__link'
            target='_blank'
            href='https://www.linkedin.com/in/marco-del-boccio-99b31824a/'
          >
            <LinkedinIcon className='link__icon' />
          </a>
        </li>
      </ul>
    </div>
  )
}
