import { useEffect, useState } from 'react'
import { BackdropContainer } from './BackdropContainer'
import type { MovieCard } from '../../types'

interface Props {
  featuredMovie?: MovieCard | null
}

export const SearchBanner = ({ featuredMovie }: Props) => {
  const [backdrop, setBackdrop] = useState<string>('')

  useEffect(() => {
    if (!featuredMovie) return
    if (featuredMovie.coverPath === null) return

    setBackdrop(featuredMovie.coverPath as string)
  }, [featuredMovie])

  return <BackdropContainer className='hero' path={backdrop} />
}
