import { useEffect, useState } from 'react'
import { mapMovies } from '../utils/mapMovies'

const baseUrl = import.meta.env.VITE_BASE_URL
const apiKey = import.meta.env.VITE_API_KEY

export function useMovies(): {
  movies: Movie[]
  isLoading: boolean
  error: string | null
  updateQuery: (query: string) => void
} {
  const [movies, setMovies] = useState<Movie[]>([])
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  function updateQuery(query: string) {
    setDebouncedQuery(query)
  }

  useEffect(() => {
    const debouncer = setTimeout(() => setQuery(debouncedQuery), 300)
    return () => {
      clearTimeout(debouncer)
    }
  }, [debouncedQuery])

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
        console.log(data.results)
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
        setMovies(mappedMovies)
      }
    }

    if (query === '') {
      getMovies(`${baseUrl}/movie/popular?api_key=${apiKey}`)
    } else {
      getMovies(`${baseUrl}/search/movie?api_key=${apiKey}&query=${query}`)
    }
  }, [query])

  return { movies, isLoading, error, updateQuery }
}
