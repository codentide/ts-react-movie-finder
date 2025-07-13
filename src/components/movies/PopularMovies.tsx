import { usePopularMovies } from '../../hooks/usePopularMovies'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { MovieGrid } from './MovieGrid'

export const PopularMovies = () => {
  const { movies, loading, error } = usePopularMovies()

  if (loading) return <LoadingSpinner />
  if (error) return <h1>error</h1>
  return <MovieGrid movies={movies} />
}
