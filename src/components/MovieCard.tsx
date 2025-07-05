import { Link } from 'react-router'
import type { MovieCard as MovieCardType } from '../types'
import { formatDate } from '../utils/formatDate'
import { ScoreBadge } from './ScoreBadge'

export const MovieCard = ({
  id,
  title,
  posterPath,
  genreIDs,
  score,
  releaseDate,
}: MovieCardType) => {
  return (
    <Link to={`/movie/${id}`}>
      <div
        className='movie-card'
        data-movie-id={id}
        data-genre-id-list={`${genreIDs.join(',')}`}
      >
        <div className='movie-card__average'>
          <ScoreBadge score={score} />
        </div>
        <div className='movie-card__info'>
          <h3>{title}</h3>
          {/* [ ]: Componentizar time */}
          <time dateTime={releaseDate.toString()}>
            {formatDate(releaseDate, 'en')}
          </time>
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
