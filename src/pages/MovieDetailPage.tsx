import { useNavigate, useParams } from 'react-router'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useEffect, useState } from 'react'
import { BackdropContainer } from '../components/BackdropContainer'
import { formatDate } from '../utils'

import BackIcon from '../assets/svg/arrow-alt-left.svg?react'
import { ScoreBadge } from '../components/ScoreBadge'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const MovieDetailPage = () => {
  const [movieId, setMovieId] = useState<number | null>(null)
  const { movieDetail, isLoading, error } = useMovieDetail(movieId)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) setMovieId(Number(params.id))
  }, [params])

  // [ ]: Mejorar performance
  if (error) {
    return <span>{error}</span>
  }

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <BackdropContainer
      className='movie-detail'
      path={movieDetail?.coverPath}
      alt={`Banner of "${movieDetail?.title}" movie`}
    >
      {!isLoading && movieDetail ? (
        <div className='movie-detail__content'>
          <div className='movie-detail__poster'>
            <img src={movieDetail.posterPath} />
          </div>
          <div className='info-container'>
            <a
              className='info-container__back-button'
              href='#'
              onClick={handleGoBack}
            >
              <BackIcon />
            </a>
            <div className='info-container__header'>
              <h2 className='header__title'>{movieDetail.title}</h2>
              <div className='header__subtitle-box '>
                <time
                  className='subtitle-box__date'
                  dateTime={movieDetail.releaseDate.toLocaleString()}
                >
                  {formatDate(movieDetail.releaseDate, 'en')}
                </time>
                <ScoreBadge score={movieDetail.score} />
              </div>
              {/* Genres podia ser un badge que al dar click aplique filtro a una lista en base a ese genero */}
              <ul className='subtitle-box__genre-list'>
                {movieDetail.genres.map((genre, index) => (
                  <li key={index}>
                    <span>{genre}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className='info-container__overview-box'>
              <h3 className='overview-box__title'>Overview</h3>
              <p className='overview-box__overview'>{movieDetail.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner className='movie-detail__loading-spinner' />
      )}
    </BackdropContainer>
  )
}
