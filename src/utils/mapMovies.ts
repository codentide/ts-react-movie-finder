import type { Movie, MovieFromAPI } from '../types'

const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function mapMovies(unmappedMovies: MovieFromAPI[]): Movie[] {
  const mappedMovies = unmappedMovies.map(
    ({
      id,
      title,
      release_date,
      poster_path,
      backdrop_path,
      vote_average,
    }): Movie => {
      const posterFallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
      const poster = poster_path ? posterUrl + poster_path : posterFallback
      const backdrop = backdrop_path ? posterUrl + backdrop_path : null

      return {
        id,
        title: title.toLocaleLowerCase(),
        releaseDate: release_date,
        poster,
        backdrop,
        stars: voteAverageToStars(vote_average),
      }
    }
  )
  return mappedMovies
}

function voteAverageToStars(average: number) {
  const stars = (average / 10) * 5
  const formattedStars = stars.toFixed(1)
  return formattedStars
}
