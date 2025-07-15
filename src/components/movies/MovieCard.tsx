import type { MovieCard as MovieCardType } from '../../types'
import { DateString, ScoreBadge } from '../common'
import { Link } from 'react-router'
import React from 'react'

interface Props {
  movie: MovieCardType
  showInfo?: boolean
}

export const MovieCard = ({ movie, showInfo = true }: Props) => {
  if (!movie) return
  const { id, score, title, releaseDate, posterPath } = movie

  return (
    <Link to={`/movie/${id}`}>
      <div
        className={`movie-card ${!showInfo ? 'no-info' : ''}`}
        data-movie-id={id}
      >
        <div className='movie-card__average'>
          <ScoreBadge score={score} />
        </div>
        <div className='movie-card__info'>
          <h3>{title}</h3>
          <DateString date={releaseDate} />
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
export const MemoizedMovieCard = React.memo(MovieCard)
