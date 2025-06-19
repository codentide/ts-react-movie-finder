import type { Movie } from '../types'
import { MovieCard } from './MovieCard'

interface Props {
  movies: Movie[]
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
    <ul className='movie-list'>
      {hasMovies ? (
        renderMovies()
      ) : (
        <span className='message_no-movies'>Theres is no movies...</span>
      )}
    </ul>
  )
}
