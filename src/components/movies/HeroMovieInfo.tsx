import type { MovieCard } from '../../types'
import { useNavigate } from 'react-router'
import { GenreList } from './GenreList'

interface Props {
  movie: MovieCard | null
}

export const HeroMovieInfo = ({ movie }: Props) => {
  const navigate = useNavigate()

  if (!movie) return <></>

  return (
    <div className='hero-movie-info'>
      <h1 className='hero-movie-info__title'>{movie.title}</h1>
      {/* <div className='hero-movie-info__row-box'> */}
      <GenreList genres={movie.genreIDs} />
      {/* <ScoreBadge score={movie.score} /> */}
      {/* </div> */}
      <p className='hero-movie-info__overview'>{movie.overview}</p>
      {/* navigate to movie detail */}
      <button
        className='hero-movie-info__button'
        onClick={() => navigate(`/movie/${movie.id}`)}
      >
        See more
      </button>
    </div>
  )
}
