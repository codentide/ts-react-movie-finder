import { Link } from 'react-router'
import type { MovieCard as MovieCardType } from '../types'
import { formatDate } from '../utils/formatDate'

export const MovieCard = ({
  id,
  title,
  poster,
  stars,
  releaseDate,
}: MovieCardType) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className='movie-card' movie-id={id}>
        <div className='movie-card__average'>
          {/* svg */}
          <p>{stars}</p>
        </div>
        <div className='movie-card__info'>
          <h3>{title}</h3>
          {/* YYYY/MM/DD */}
          <time dateTime={releaseDate}>{formatDate(releaseDate)}</time>
        </div>
        <img
          className='movie-card__poster'
          src={poster}
          alt={`Poster of '${title}' movie`}
          draggable='false'
        />
      </div>
    </Link>
  )
}
