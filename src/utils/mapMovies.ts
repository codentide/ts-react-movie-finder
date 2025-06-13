const posterUrl = import.meta.env.VITE_IMG_BASE_URL

export function mapMovies(unmappedMovies: MovieFromAPI[]): Movie[] {
  const mappedMovies = unmappedMovies.map(
    ({ id, title, release_date, poster_path, backdrop_path }): Movie => {
      const poster = poster_path
        ? posterUrl + poster_path
        : `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`

      return {
        id,
        title,
        releaseDate: release_date,
        poster,
        backdrop: posterUrl + backdrop_path,
      }
    }
  )
  return mappedMovies
}
