import { usePopularMovies } from '../../../hooks'
import { MovieCarousel } from './MovieCarousel'

export const PopularMoviesCarousel = () => {
  const { movies, loading, error } = usePopularMovies()

  return (
    <div className='movie-listing'>
      {error && <span>{error}</span>}
      {loading ? (
        ''
      ) : (
        <>
          <h2 className='title'>Popular Movies</h2>
          <MovieCarousel items={movies || []} />
        </>
      )}
    </div>
  )
}
