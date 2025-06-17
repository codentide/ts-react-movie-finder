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
    if (featuredMovie.backdrop === null) return

    setBackdrop(featuredMovie.backdrop as string)
  }, [featuredMovie])

  return (
    <BackdropContainer className='hero' path={backdrop}>
      <div className='hero__title-box'>
        <h2>React/TS Movie Finder</h2>
        <p>Look for the first movie that comes to mind!</p>
      </div>
      <div className='hero__search-box'>{children}</div>
    </BackdropContainer>
  )
}
