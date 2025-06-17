import type { Movie, MovieFromAPI } from '../types'
// import genreList from '../constants/genres.json'

// https://developer.themoviedb.org/reference/genre-movie-list

const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function formatMovie({
  id,
  title,
  overview,
  release_date,
  poster_path,
  backdrop_path,
  vote_average,
  popularity,
}: // genre_ids,
MovieFromAPI): Movie {
  const posterFallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
  const poster = poster_path ? posterUrl + poster_path : posterFallback
  const backdrop = backdrop_path ? posterUrl + backdrop_path : null

  return {
    id,
    title: title.toLocaleLowerCase(),
    overview,
    releaseDate: release_date,
    stars: voteAverageToStars(vote_average),
    popularity,
    poster,
    backdrop,
    // genres,
  }
}

// function getGenres(genres: { id: number; name: string }[]): string[] {
//   return genres.map((item) => item.name)
// }

export function formatMovies(unmappedMovies: MovieFromAPI[]): Movie[] {
  return unmappedMovies.map((movie): Movie => formatMovie(movie))
}

function voteAverageToStars(average: number) {
  const stars = (average / 10) * 5
  const formattedStars = stars.toFixed(1)
  return formattedStars
}
