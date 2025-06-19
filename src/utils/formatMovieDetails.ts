import type { MovieDetail, MovieDetailFromApi } from '../types'
import { getScoreFromAverage } from './formatMovies'

const BASE_IMG_URL = import.meta.env.VITE_IMG_BASE_URL

export function formatMovieDetail({
  id,
  title,
  genres,
  overview,
  poster_path,
  backdrop_path,
  release_date,
  vote_average,
}: MovieDetailFromApi): MovieDetail {
  const posterFallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
  const poster = poster_path ? BASE_IMG_URL + poster_path : posterFallback
  const backdrop = backdrop_path ? BASE_IMG_URL + backdrop_path : null
  const genreNameList = genres.map((genre) => genre.name)

  return {
    id: id,
    title: title,
    overview: overview,
    releaseDate: release_date,
    score: getScoreFromAverage(vote_average),
    posterPath: poster,
    backdropPath: backdrop,
    genres: genreNameList,
  }
}
