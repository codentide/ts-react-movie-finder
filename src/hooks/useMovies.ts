import type { Movie, MovieFromAPI, SortValue } from '../types'
import { useEffect, useState } from 'react'
import { mapMovies, sortMovies } from '../utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

interface PopularMoviesProps {
  type: 'popular'
}

interface SearchMoviesProps {
  type: 'search'
}

interface MovieByIdProps {
  type: 'id'
  id: string
}

type Props = PopularMoviesProps | SearchMoviesProps | MovieByIdProps

// Retornos

interface UseMoviesReturn {
  data: Movie[] | Movie | undefined
  isLoading: boolean
  error: string | null
  sort: SortValue
  updateQuery: (query: string) => void
  updateSort: (sortValue: SortValue) => void
}

interface UseMoviesListReturn {
  data: Movie[] | undefined // Aquí 'data' es un array de Movie
  isLoading: boolean
  error: string | null
  sort: SortValue
  updateQuery: (query: string) => void
  updateSort: (sortValue: SortValue) => void
}

interface UseMoviesDetailReturn {
  data: Movie | undefined // Aquí 'data' es una sola Movie
  isLoading: boolean
  error: string | null
  sort: SortValue // Aunque no uses sort en el detalle, el hook lo retorna igual.
  updateQuery: (query: string) => void
  updateSort: (sortValue: SortValue) => void
}

// Sobrecarga de retorno
export function useMovies(props: PopularMoviesProps): UseMoviesListReturn
export function useMovies(props: SearchMoviesProps): UseMoviesListReturn
export function useMovies(props: MovieByIdProps): UseMoviesDetailReturn

export function useMovies(props: Props): UseMoviesReturn {
  // Resultado
  const [data, setData] = useState<Movie[] | Movie | undefined>(undefined)
  // Query con el que se busca la película
  const [searchQuery, setQuery] = useState<string>('')
  // Query auxiliar para debounce de la busqueda de película
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  // Sort de las películas
  const [sort, setSort] = useState<SortValue>('all')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (props.type !== 'search') {
      setDebouncedQuery('')
    }

    const handler = setTimeout(() => setQuery(debouncedQuery), 500)
    return () => clearTimeout(handler)
  }, [props.type, debouncedQuery])

  function updateQuery(query: string) {
    setDebouncedQuery(query)
  }

  function updateSort(sortValue: SortValue) {
    setSort(sortValue)
  }

  async function fetchMovies(
    url: string
  ): Promise<MovieFromAPI[] | MovieFromAPI | null> {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        const httpError = await response.text()
        throw new Error(`Error HTTP: ${response.status} - ${httpError}`)
      }

      const data = await response.json()
      if (data) {
        if (Array.isArray(data.results)) {
          return data.results as MovieFromAPI[]
        }
        return data as MovieFromAPI
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
      let endpoint: string = ''

      switch (props.type) {
        case 'search':
          endpoint = `/search/movie?api_key=${API_KEY}&query=${searchQuery}`
          break
        case 'id':
          endpoint = `/movie/movie_id?api_key=${API_KEY}`
          break
        case 'popular':
        default:
          endpoint = `/movie/popular?api_key=${API_KEY}`
          break
      }

      const unmappedMovies = await fetchMovies(`${BASE_URL}${endpoint}`)
      if (unmappedMovies !== null) {
        const mappedMovies = mapMovies(unmappedMovies)
        const sortedMovies = sortMovies(mappedMovies, sort)
        setData(sortedMovies)
      }
    }

    getMovies()
  }, [searchQuery, sort, props.type])

  return { data, isLoading, error, sort, updateSort, updateQuery }
}
