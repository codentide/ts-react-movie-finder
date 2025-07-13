import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  ScoreBadge,
  LoadingSpinner,
  GenreList,
  DateString,
  BackdropContainer,
} from '../components'
import { useMovieDetail } from '../hooks/useMovieDetail'

import BackIcon from '../assets/svg/arrow-alt-left.svg?react'

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
    navigate('/')
    // return <span>{error}</span>
  }

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <section className='detail-page'>
      <BackdropContainer
        // className='detail-page'
        path={movieDetail?.coverPath}
        alt={`Cover of "${movieDetail?.title}" movie`}
      />
      {!isLoading && movieDetail ? (
        <div className='detail-page__content'>
          <div className='detail-page__poster'>
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
                <DateString date={movieDetail.releaseDate} />
                {/* {'-'}
                <small>{movieDetail.runtime}mins</small> */}
                <ScoreBadge score={movieDetail.score} />
              </div>
              <GenreList genres={movieDetail.genreIDs} />
            </div>
            <div className='info-container__overview-box'>
              <h3 className='overview-box__title'>
                {movieDetail.tagline || 'Synopsis'}
              </h3>
              <p className='overview-box__overview'>{movieDetail.overview}</p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner className='detail-page__loading-spinner' />
      )}
    </section>
  )
}

// export const RuntimeBadge = () => {
//   return (
//     <>
//       (
//       <time
//         className='subtitle-box__date'
//         dateTime={movieDetail.releaseDate.toLocaleString()}
//       >
//         {formatDate(movieDetail.releaseDate, 'en')}
//       </time>
//       ) - <small>{movieDetail.runtime}mins</small>
//     </>
//   )
// }
