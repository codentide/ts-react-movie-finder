import type { Movie, MovieFromAPI } from '../types'

const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function formatMovie(MovieApi: MovieFromAPI): Movie {
  const posterFallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${MovieApi.title}`
  const poster = MovieApi.poster_path
    ? posterUrl + MovieApi.poster_path
    : posterFallback
  const backdrop = MovieApi.backdrop_path
    ? posterUrl + MovieApi.backdrop_path
    : null
  return {
    id: MovieApi.id,
    title: MovieApi.title.toLocaleLowerCase(),
    releaseDate: MovieApi.release_date,
    score: getScoreFromAverage(MovieApi.vote_average),
    popularity: MovieApi.popularity,
    posterPath: poster,
    backdropPath: backdrop,
    genres: MovieApi.genre_ids,
  }
}

export function formatMovieList(unmappedMovies: MovieFromAPI[]): Movie[] {
  return unmappedMovies.map((movie): Movie => formatMovie(movie))
}

export function getScoreFromAverage(average: number) {
  const stars = (average / 10) * 5
  const formattedStars = stars.toFixed(1)
  return formattedStars
}

// function getGenreNames(genres: GenreFromAPI[] | number[]): string[] {
//   if (genres.every((item) => typeof item === 'number')) {
//     const mappedGenres = genres.map((genreId) => {
//       const foundGenre = MOVIE_GENRES.find(
//         (listGenre) => listGenre.id === genreId
//       )

//       return foundGenre ? foundGenre.name : 'Unknown'
//     })

//     return mappedGenres
//   }

//   const mappedGenres = genres.map((genre) => {
//     const foundGenre = MOVIE_GENRES.find(
//       (listGenre) => listGenre.id === genre.id
//     )

//     return foundGenre ? foundGenre.name : 'Unknown'
//   })

//   return mappedGenres
// }
