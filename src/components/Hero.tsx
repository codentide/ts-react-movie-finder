import { useEffect, useState } from 'react'

import type { Movie } from '../types'

interface Props {
  children?: React.ReactNode
  featuredMovie?: Movie | null
}

export const Hero = ({ featuredMovie, children }: Props) => {
  const [backdrop, setBackdrop] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    if (!featuredMovie) return
    if (featuredMovie.backdrop === null) return
    if (featuredMovie.backdrop === backdrop) return

    setIsActive(false)
    const debouncer = setTimeout(() => {
      setBackdrop(featuredMovie.backdrop as string)
      setIsActive(true)
    }, 1000)

    return () => {
      clearTimeout(debouncer)
    }
  }, [featuredMovie, backdrop])

  return (
    <section className='hero'>
      <div className='hero__title-box'>
        <h2>React/TS Movie Finder</h2>
        <p>Look for the first movie that comes to mind!</p>
      </div>
      <div className='hero__search-box'>
        {/* <SearchInput
          onInputChange={onQueryChange}
          placeholder='Search a movie...'
        />
        <SortList onSortChange={onSortChange} currentSort={currentSort} /> */}
        {children}
      </div>
      <img
        className={`hero__backdrop ${isActive ? 'active' : 'unactive'}`}
        src={backdrop || '#'}
        alt='Featured Movie Image'
      />
    </section>
  )
}
