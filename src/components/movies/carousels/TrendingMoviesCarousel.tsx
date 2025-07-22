import { useState } from 'react'
import { useTrendingMovies } from '../../../hooks'
import { MovieCarousel } from './MovieCarousel'
import type { TrendingTimeRange } from '../../../types'

export const TrendingMoviesCarousel = () => {
  const [time] = useState<TrendingTimeRange>('day')
  const { movies, loading, error } = useTrendingMovies(time)

  // [ ]: Colocar logica de cambio de rango de tiempo
  return (
    <div className='movie-listing'>
      {error && <span>{error}</span>}
      {loading ? (
        ''
      ) : (
        <>
          <h2 className='title'>
            On trend {time === 'day' ? 'today' : 'this week'}
          </h2>
          <MovieCarousel items={movies || []} />
        </>
      )}
    </div>
  )
}
