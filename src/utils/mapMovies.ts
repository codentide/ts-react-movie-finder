const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function mapMovies(unmappedMovies: MovieFromAPI[]): Movie[] {
  const mappedMovies = unmappedMovies.map(
    ({ id, title, release_date, poster_path, backdrop_path }): Movie => ({
      id,
      title,
      releaseDate: release_date,
      poster: posterUrl + poster_path,
      backdrop: posterUrl + backdrop_path,
    })
  )
  return mappedMovies
}
