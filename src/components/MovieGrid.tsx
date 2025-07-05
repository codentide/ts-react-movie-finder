import type { MovieCard as MovieCardType } from '../types'
import { MovieCard } from './MovieCard'

interface Props {
  movies: MovieCardType[]
}

export const MovieGrid: React.FunctionComponent<Props> = ({ movies }) => {
  const hasMovies: boolean = !(movies.length === 0)

  function renderMovies() {
    return movies.map((movie) => (
      <li key={movie.id} className='movie-list__item'>
        <MovieCard {...movie} />
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
