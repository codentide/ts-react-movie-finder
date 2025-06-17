import { useEffect, useState } from 'react'
import type { Movie, MovieFromAPI, SortValue } from '../types'
import { formatMovies, sortMovies } from '../utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export function usePopularMovies() {
  const [movies, setMovies] = useState<Movie[] | undefined>(undefined)
  const [sort, setSort] = useState<SortValue>('all')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  function updateSort(sortValue: SortValue) {
    setSort(sortValue)
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
      setError('Ocurrió un error trayendo las películas' + error)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Efecto encargado de traer las peliculas populares en el home
  useEffect(() => {
    async function getMovies() {
      const unmappedMovies = await fetchMovies(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      )
      if (unmappedMovies !== null) {
        const mappedMovies = formatMovies(unmappedMovies)
        const sortedMovies = sortMovies(mappedMovies, sort)
        setMovies(sortedMovies)
      }
    }

    getMovies()
  }, [sort])

  return { movies, isLoading, error, sort, updateSort }
}
