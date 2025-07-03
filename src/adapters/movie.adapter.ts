import type { MovieDetail, MovieDetailFromApi } from '../types/movie.types'
import { getScore } from '../utils'

const BASE_IMG_URL = import.meta.env.VITE_IMG_BASE_URL

export const adaptMovieDetail = ({
  id,
  title,
  genres,
  overview,
  poster_path,
  backdrop_path,
  release_date,
  vote_average,
}: MovieDetailFromApi): MovieDetail => {
  const coverFallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`

  return {
    id: id,
    title: title,
    overview: overview,
    releaseDate: release_date,
    score: getScore(vote_average),
    posterPath: poster_path ? BASE_IMG_URL + poster_path : coverFallback,
    backdropPath: backdrop_path ? BASE_IMG_URL + backdrop_path : null,
    genres: genres.map((genre) => genre.name),
  }
}
