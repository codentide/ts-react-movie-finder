import { MovieItem } from '../MovieItem/MovieItem'
import './MovieList.scss'

interface Props {
  movies: Movie[]
}

export const MovieList: React.FunctionComponent<Props> = ({ movies }) => {
  return (
    <ul className='movie-list'>
      {movies.map((movie, index) => (
        <li key={index} className='movie-list__item'>
          <MovieItem {...movie} />
        </li>
      ))}
    </ul>
  )
}
