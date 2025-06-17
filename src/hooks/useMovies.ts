import type { Movie, MovieFromAPI, SortValue } from '../types'
import { useEffect, useState } from 'react'
import { formatMovies, sortMovies } from '../utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface UseMoviesReturn {
  movies: Movie[] | null
  featuredMovie: Movie | null
  isLoading: boolean
  error: string | null
}

export function useMovies(
  query: string,
  sort: SortValue = 'all'
): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const debouncer = setTimeout(() => setSearchQuery(query), 500)
    return () => clearTimeout(debouncer)
  }, [query])

  function getMostPopularMovie(movies: Movie[]): Movie {
    let movie = movies[0]

    if (movies.length > 0) {
      movie = movies.reduce((prev, current) => {
        return current.popularity > prev.popularity ? current : prev
      })
    }

    return movie
  }

  async function fetchMovies(url: string): Promise<MovieFromAPI[] | null> {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        const httpError = await response.text()
        throw new Error(`Error HTTP: ${response.status} - ${httpError}`)
      }
      const data = await response.json()
      if (data && Array.isArray(data.results)) {
        return data.results as MovieFromAPI[]
      } else {
        throw new Error('La respuesta de la API no tiene el formato esperado')
      }
    } catch (error) {
      setError(
        'Ocurrió un error trayendo las películas' + (error || 'Desconocido')
      )
      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    async function getMovies() {
      let endpoint: string = ''

      if (searchQuery.length > 0) {
        endpoint = `/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      } else {
        endpoint = `/movie/popular?api_key=${API_KEY}`
      }

      const unformattedMovies = await fetchMovies(`${BASE_URL}${endpoint}`)
      if (unformattedMovies) {
        const formattedMovies = formatMovies(unformattedMovies)
        const mostPopularMovie = getMostPopularMovie(formattedMovies)
        const sortedMovies = sortMovies(formattedMovies, sort)
        setFeaturedMovie(mostPopularMovie)
        setMovies(sortedMovies)
      }
    }

    getMovies()
  }, [searchQuery, sort])

  return { movies, featuredMovie, isLoading, error }
}
