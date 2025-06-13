import { useEffect, useState } from 'react'
import { mapMovies } from '../utils/mapMovies'
import { sortMovies } from '../utils/sortMovies'
import type { Movie, MovieFromAPI, SortValue } from '../types'

const baseUrl = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

export function useMovies(): {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  sort: SortValue
  updateQuery: (query: string) => void
  updateSort: (sortValue: SortValue) => void
} {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState<string>('')
  const [sort, setSort] = useState<SortValue>('all')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const debouncer = setTimeout(() => setQuery(debouncedQuery), 500)
    return () => {
      clearTimeout(debouncer)
    }
  }, [debouncedQuery])

  function updateQuery(query: string) {
    setDebouncedQuery(query)
  }

  function updateSort(sortValue: SortValue) {
    setSort(sortValue)
  }

  // Transformar las movies que llegan al tipo que usamos
  async function fetchMovies(url: string): Promise<MovieFromAPI[] | null> {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url)
      // Controlar respuesta HTTP
      if (!response.ok) {
        const httpError = await response.text()
        throw new Error(`Error HTTP: ${response.status} - ${httpError}`)
      }

      const data = await response.json()
      // Controlar existencia y formato de data
      if (data && Array.isArray(data.results)) {
        // console.log(data.results)
        return data.results as MovieFromAPI[]
      } else {
        throw new Error('La respuesta de la API no tiene el formato esperado')
      }
    } catch (error) {
      setError('Ocurrió un error trayendo las películas' + error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto encargado de traer las peliculas populares en el home
  useEffect(() => {
    async function getMovies(url: string) {
      const unmappedMovies = await fetchMovies(url)
      if (unmappedMovies !== null) {
        const mappedMovies = mapMovies(unmappedMovies)
        const sortedMovies = sortMovies(mappedMovies, sort)
        setMovies(sortedMovies)
      }
    }

    if (query === '') {
      getMovies(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    } else {
      getMovies(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    }
  }, [query, sort])

  return { movies, isLoading, error, sort, updateQuery, updateSort }
}
