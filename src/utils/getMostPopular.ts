import type { MovieCard } from '../types'

export const getMostPopularMovie = (movies: MovieCard[]): MovieCard => {
  if (movies.length > 0) {
    return movies.reduce((prev, current) => {
      return current.popularity > prev.popularity ? current : prev
    })
  }

  return movies[0]
}
