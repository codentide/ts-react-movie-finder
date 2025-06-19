import { Link } from 'react-router'
import type { Movie } from '../types'
import { formatDate } from '../utils/formatDate'

export const MovieCard = ({
  id,
  title,
  posterPath,
  score,
  releaseDate,
  genres,
}: Movie) => {
  return (
    <Link to={`/movie/${id}`}>
      <div
        className='movie-card'
        data-movie-id={id}
        data-genre-id-list={`${genres.join(',')}`}
      >
        <div className='movie-card__average'>
          {/* svg */}
          <p>{score}</p>
        </div>
        <div className='movie-card__info'>
          <h3>{title}</h3>
          {/* YYYY/MM/DD */}
          <time dateTime={releaseDate}>{formatDate(releaseDate)}</time>
        </div>
        <img
          className='movie-card__poster'
          src={posterPath}
          alt={`Poster of '${title}' movie`}
          draggable='false'
        />
      </div>
    </Link>
  )
}
