import { usePopularMovies } from '../hooks/usePopularMovies'
import { MovieGrid } from './MovieGrid'

// traer populares

export const PopularMovieGrid: React.FunctionComponent =
  (): React.JSX.Element => {
    // const { data, isLoading, error } = useMovies({
    //   type: 'popular',
    // })

    const { movies, sort, updateSort, isLoading, error } = usePopularMovies()

    return (
      <>
        {isLoading ? (
          <span>Is Loading</span>
        ) : movies ? (
          <MovieGrid movies={movies} />
        ) : (
          ''
        )}
        {error && <span>ERROR {error}</span>}
      </>
    )
  }
