import { useEffect, useState } from 'react'

import type { Movie } from '../types'
import { BackdropContainer } from './BackdropContainer'

interface Props {
  children?: React.ReactNode
  featuredMovie?: Movie | null
}

export const Hero = ({ featuredMovie, children }: Props) => {
  const [backdrop, setBackdrop] = useState<string>('')

  // Limpiar mejor el efecto
  useEffect(() => {
    if (!featuredMovie) return
    if (featuredMovie.backdropPath === null) return

    setBackdrop(featuredMovie.backdropPath as string)
  }, [featuredMovie])

  return (
    <BackdropContainer className='hero' path={backdrop}>
      <div className='title-box'>
        <h2 className='title-box__title'>React/TS Movie Finder</h2>
        <p className='title-box__slogan'>
          Look for the first movie that comes to mind!
        </p>
      </div>
      <div className='hero__search-box'>{children}</div>
    </BackdropContainer>
  )
}
