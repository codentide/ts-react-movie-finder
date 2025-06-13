import type { Movie, SortValue } from '../types'

function dateCompare(dateA: string, dateB: string) {
  const numberDateA = new Date(dateA).getTime()
  const numberDateB = new Date(dateB).getTime()

  if (isNaN(numberDateA) && isNaN(numberDateB)) return 0
  if (isNaN(numberDateA)) return 1
  if (isNaN(numberDateB)) return -1

  return numberDateA - numberDateB
}

export function sortMovies(movies: Movie[], sortType: SortValue): Movie[] {
  let sortedMovies = movies

  switch (sortType) {
    case 'a-z':
      sortedMovies = movies.sort((movieA, movieB) => {
        return movieA.title.localeCompare(movieB.title)
      })
      break
    case 'z-a':
      sortedMovies = movies.sort((movieA, movieB) => {
        return movieB.title.localeCompare(movieA.title)
      })
      break
    case 'oldest':
      sortedMovies = movies.sort((a, b) =>
        dateCompare(a.releaseDate, b.releaseDate)
      )
      break
    case 'latest':
      sortedMovies = movies.sort((a, b) =>
        dateCompare(b.releaseDate, a.releaseDate)
      )
      break
  }

  return sortedMovies
}
