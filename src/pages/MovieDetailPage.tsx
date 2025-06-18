import { useNavigate, useParams } from 'react-router'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useEffect, useState } from 'react'
import { BackdropContainer } from '../components/BackdropContainer'
import { formatDate } from '../utils'
import { LoadingSpinner } from '../components/LoadingSpinner'

export const MovieDetailPage = () => {
  const [movieId, setMovieId] = useState<number | undefined>()
  const { movieDetail, isLoading, error } = useMovieDetail(movieId)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.id) setMovieId(Number(params.id))
  }, [params])

  if (isLoading) return <LoadingSpinner />
  if (error) return <span>{error}</span>

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <BackdropContainer
      className='movie-detail'
      path={movieDetail?.backdrop}
      alt={`Banner of "${movieDetail?.title}" movie`}
    >
      {movieDetail && (
        <div className='content'>
          <div className='movie-detail__movie-poster'>
            <img src={movieDetail.poster} />
          </div>
          <div className='movie-info'>
            <div className='movie-info__heading'>
              <a href='#' onClick={handleGoBack}>
                Back
              </a>
              <h2 className='title'>{movieDetail.title}</h2>
              <div>
                <time dateTime={movieDetail.releaseDate}>
                  {formatDate(movieDetail.releaseDate)}
                </time>
                <span>{movieDetail.stars}</span>
              </div>
            </div>
            <div className='movie-info__overview'>
              <h3>Overview</h3>
              <p>{movieDetail.overview}</p>
            </div>

            {/* Aqui iran los genres */}
            {/* <h1 style={{ marginTop: 'auto' }}>genres</h1> */}
          </div>
        </div>
      )}
    </BackdropContainer>
  )
}
