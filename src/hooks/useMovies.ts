import type { Movie, MovieFromAPI, SortValue } from '../types'
import { useEffect, useRef, useState } from 'react'
import { formatMovies, sortMovies } from '../utils'
import { useSearchParams } from 'react-router'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface UseMoviesReturn {
  movies: Movie[] | null
  featuredMovie: Movie | null
  isLoading: boolean
  error: string | null
}

export function useMovies(sort: SortValue = 'all'): UseMoviesReturn {
  const [movies, setMovies] = useState<Movie[] | null>(null)
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null)
  const [query, setQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [searchParam] = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSearchRef = useRef<string | null>(null)

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

  // useEffect(() => {
  //   const currentQuery = searchParam.get('query')?.trim() || ''
  //   setQuery(currentQuery)
  // }, [searchParam])

  useEffect(() => {
    const currentQuery = searchParam.get('query')?.trim() || ''

    if (currentQuery === lastSearchRef.current) return

    if (!currentQuery) {
      const endpoint = `/movie/popular?api_key=${API_KEY}`
      updateMovies(`${BASE_URL}${endpoint}`)
      lastSearchRef.current = currentQuery
      return
    }

    debounceRef.current = setTimeout(() => {
      const endpoint = `/search/movie?api_key=${API_KEY}&query=${currentQuery}`
      updateMovies(`${BASE_URL}${endpoint}`)
      lastSearchRef.current = currentQuery
    }, 500)

    async function updateMovies(url: string) {
      const unformattedMovies = await fetchMovies(url)
      if (unformattedMovies) {
        const formattedMovies = formatMovies(unformattedMovies)
        const mostPopularMovie = getMostPopularMovie(formattedMovies)
        const sortedMovies = sortMovies(formattedMovies, sort)
        setFeaturedMovie(mostPopularMovie)
        setMovies(sortedMovies)
      }
    }

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [sort, searchParam])

  return { movies, featuredMovie, isLoading, error }
}
