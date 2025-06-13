import type { Movie, MovieFromAPI } from '../types'

const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function mapMovies(unmappedMovies: MovieFromAPI[]): Movie[] {
  const mappedMovies = unmappedMovies.map(
    ({ id, title, release_date, poster_path, backdrop_path }): Movie => {
      const poster = poster_path
        ? posterUrl + poster_path
        : `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`

      const backdrop = backdrop_path ? posterUrl + backdrop_path : null

      return {
        id,
        title: title.toLocaleLowerCase(),
        releaseDate: release_date,
        poster,
        backdrop,
      }
    }
  )
  return mappedMovies
}
