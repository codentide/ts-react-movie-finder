import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  ScoreBadge,
  LoadingSpinner,
  GenreList,
  DateString,
  BackdropContainer,
  Runtime,
} from '../components'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { FaArrowLeftLong } from 'react-icons/fa6'
import type { MovieDetail } from '../types'

export const MovieDetailPage = () => {
  const [movieId, setMovieId] = useState<number | null>(null)
  const { movieDetail, isLoading, error } = useMovieDetail(movieId)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) setMovieId(Number(params.id))
  }, [params])

  // [ ]: Mirar si se puede redirigir al 404
  if (error) navigate('/')

  return (
    <section className='detail-page'>
      <BackdropContainer
        path={movieDetail?.coverPath}
        alt={`Cover of "${movieDetail?.title}" movie`}
      />
      {!isLoading && movieDetail ? (
        <MovieDetailContent movieDetail={movieDetail} />
      ) : (
        <LoadingSpinner className='detail-page__loading-spinner' />
      )}
    </section>
  )
}

// SubComponente

const MovieDetailContent = ({ movieDetail }: { movieDetail: MovieDetail }) => {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <>
      <div className='detail-page__header'>
        <div className='poster'>
          <img src={movieDetail.posterPath} />
        </div>
        <div className='metadata-box'>
          <a className='back-button' href='#' onClick={handleGoBack}>
            <FaArrowLeftLong className='icon' />
          </a>
          <div className='metadata-box__metadata'>
            <h2 className='title'>{movieDetail.title}</h2>
            <div className='tag-box '>
              <DateString date={movieDetail.releaseDate} />
              <Runtime time={movieDetail.runtime} />
              <ScoreBadge score={movieDetail.score} />
            </div>
            <GenreList genres={movieDetail.genreIDs} />
          </div>
        </div>
      </div>
      <div className='detail-page__overview-box'>
        <h3 className='title'>{movieDetail.tagline || 'Synopsis'}</h3>
        <p className='overview'>{movieDetail.overview}</p>
      </div>
    </>
  )
}
