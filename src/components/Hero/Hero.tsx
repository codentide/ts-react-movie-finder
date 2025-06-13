import { useState } from 'react'
import './Hero.scss'

interface Props {
  children?: React.ReactNode
  onQueryChange: (value: string) => void
  featuredMovie?: Movie
}

export const Hero = ({ onQueryChange, featuredMovie }: Props) => {
  const [searchValue, setSearchValue] = useState<string>('')

  // useEffect(() => {
  //   console.log(backdrop)
  // }, [backdrop])

  // const backdrop = featuredMovie.backdrop || ''

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target
    const { value } = input
    setSearchValue(value)
    onQueryChange(value)
  }

  function handleImageError(event: React.SyntheticEvent<HTMLImageElement>) {
    event.currentTarget.src =
      'https://image.tmdb.org/t/p/original/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg'
  }

  return (
    <section className='hero'>
      <div className='hero__title-box'>
        <h2>React/TS Movie Finder</h2>
        <p>Look for the first movie that comes to mind!</p>
      </div>
      <div className='hero__input-box'>
        <input
          type='text'
          name='movieSearch'
          placeholder='Search a movie...'
          value={searchValue}
          onChange={handleChange}
        />
      </div>
      {featuredMovie && (
        <img
          className='hero__backdrop'
          src={featuredMovie.backdrop}
          alt='Featured Movie Image'
          onError={handleImageError}
        />
      )}
    </section>
  )
}
