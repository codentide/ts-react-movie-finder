import { useEffect, useRef, useState } from 'react'
import { useNowPlayingMovies } from '../../hooks'
import { BackdropContainer } from './BackdropContainer'
import { LoadingSpinner } from '../common'
import {
  HeroMovieInfo,
  MovieCarousel,
  type MovieCarouselHandle,
} from '../movies'

export const HomeHero = () => {
  const [focusedMovieIndex, setFocusedMovieIndex] = useState<number>(0)
  const { movies, loading, error } = useNowPlayingMovies()
  const focusedMovie = movies[focusedMovieIndex]

  // Referencia al carrusel
  const movieCarouselRef = useRef<MovieCarouselHandle>(null)

  useEffect(() => {
    // Si la referencia es nula o no hay movies no hace nada
    if (!movieCarouselRef.current || movies.length <= 0) return

    // Ejecutar la función que viene en useImperativeHandle para mover el scroll a un índice en concreto
    movieCarouselRef.current.scrollToIndex(focusedMovieIndex)
  }, [focusedMovieIndex, movies.length])

  const handleNext = () => {
    if (focusedMovieIndex === movies.length - 1) return
    setFocusedMovieIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (focusedMovieIndex <= 0) return
    setFocusedMovieIndex((prev) => prev - 1)
  }

  return (
    <>
      <BackdropContainer
        className='home-page__hero-background'
        path={focusedMovie?.hdCoverPath}
      />
      <div className='home-hero'>
        <HeroMovieInfo movie={focusedMovie} />

        {error && <span>{error}</span>}
        {loading ? (
          <LoadingSpinner className='home-page__loading-spinner' />
        ) : (
          <MovieCarousel
            showMovieInfo={false}
            items={movies || []}
            ref={movieCarouselRef}
            currentIndex={focusedMovieIndex}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </div>
    </>
  )
}
