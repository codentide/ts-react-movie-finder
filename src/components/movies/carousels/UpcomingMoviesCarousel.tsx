import { useUpcomingMovies } from '../../../hooks'
import { MovieCarousel } from './MovieCarousel'

export const UpcomingMoviesCarousel = () => {
  const { movies, loading, error } = useUpcomingMovies()

  return (
    <div className='movie-listing'>
      {error && <span>{error}</span>}
      {loading ? (
        ''
      ) : (
        <>
          <h2 className='title'>Upcoming</h2>
          <MovieCarousel items={movies || []} />
        </>
      )}
    </div>
  )
}
