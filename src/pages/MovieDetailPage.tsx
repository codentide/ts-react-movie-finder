import { useNavigate, useParams } from 'react-router'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useEffect, useState } from 'react'
import { BackdropContainer } from '../components/BackdropContainer'
import { formatDate } from '../utils'

import BackIcon from '../assets/svg/arrow-alt-left.svg?react'

export const MovieDetailPage = () => {
  const [movieId, setMovieId] = useState<number | undefined>()
  const { movieDetail, isLoading, error } = useMovieDetail(movieId)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) setMovieId(Number(params.id))
  }, [params])

  // if (isLoading) return <LoadingSpinner />
  if (error) return <span>{error}</span>

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <BackdropContainer
      className='movie-detail'
      path={movieDetail?.backdropPath}
      alt={`Banner of "${movieDetail?.title}" movie`}
    >
      {!isLoading && movieDetail && (
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
                  dateTime={movieDetail.releaseDate}
                >
                  {formatDate(movieDetail.releaseDate)}
                </time>
                <span className='subtitle-box__score'>
                  {movieDetail.score}/5
                </span>
              </div>
              {/* Genres podia ser un badge que al dar click aplique filtro a una lista en base a ese genero */}
              <ul className='subtitle-box__genre-list'>
                {movieDetail.genres.map((genre) => (
                  <li>
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
      )}
    </BackdropContainer>
  )
}
