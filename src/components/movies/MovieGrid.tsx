import type { MovieCard } from '../../types'
import { MemoizedMovieCard } from './MovieCard'

interface Props {
  movies: MovieCard[]
}

export const MovieGrid: React.FunctionComponent<Props> = ({ movies }) => {
  const hasMovies: boolean = !(movies.length === 0)

  function renderMovies() {
    return movies.map((movie) => (
      <li key={movie.id} className='movie-list__item'>
        <MemoizedMovieCard movie={movie} />
      </li>
    ))
  }

  return (
    <>
      {hasMovies ? (
        <ul className='movie-list'>{renderMovies()}</ul>
      ) : (
        <span className='message_no-movies'>No movies found...</span>
      )}
    </>
  )
}
