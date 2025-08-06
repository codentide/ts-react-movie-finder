import { useTopRatedMovies } from '../../../hooks'
import { MovieCarousel } from './MovieCarousel'

export const TopRatedMoviesCarousel = () => {
  const { movies, loading, error } = useTopRatedMovies()

  // [ ]: Colocar logica de cambio de rango de tiempo
  return (
    <div className='movie-listing'>
      {error && <span>{error}</span>}
      {loading ? (
        ''
      ) : (
        <>
          <h2 className='title'>Top rated</h2>
          <MovieCarousel items={movies || []} />
        </>
      )}
    </div>
  )
}
