import type { MovieDetail, MovieFromAPI, MovieId } from '../types'
import { useEffect, useState } from 'react'
import { formatMovie } from '../utils'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export function useMovieDetail(movieId: MovieId | undefined): {
  movieDetail: MovieDetail | null
  isLoading: boolean
  error: string | null
} {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchMovie(url: string): Promise<MovieFromAPI | null> {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        const httpError = await response.text()
        throw new Error(`${response.status}: ${httpError}`)
      }
      const data = await response.json()
      if (data) {
        return data as MovieFromAPI
      } else {
        throw new Error('La respuesta de la API no tiene el formato esperado')
      }
    } catch (error) {
      setError(
        'Ocurrió un error en la petición, revisar logs para mas información'
      )

      console.error(error)

      return null
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!movieId) return

    async function getMovies() {
      const endpoint: string = `/movie/${movieId}?api_key=${API_KEY}`
      const unformattedMovie = await fetchMovie(`${BASE_URL}${endpoint}`)

      if (unformattedMovie) {
        const formattedMovie = formatMovie(unformattedMovie)
        setMovieDetail(formattedMovie)
      }
    }

    getMovies()
  }, [movieId])

  return { movieDetail, isLoading, error }
}
