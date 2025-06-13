import type { Movie } from '../../types'
import { formatDate } from '../../utils/formatDate'
import './MovieItem.scss'

export const MovieItem = ({ title, poster, releaseDate }: Movie) => {
  return (
    <div className='movie-item'>
      <img
        className='movie-item__poster'
        src={poster}
        alt={`Poster of '${title}' movie`}
        draggable='false'
      />
      <div className='movie-item__info'>
        <h3>{title}</h3>
        {/* YYYY/MM/DD */}
        <time dateTime={releaseDate}>{formatDate(releaseDate)}</time>
      </div>
    </div>
  )
}
