import type { MovieCard } from '../types'
import { useEffect, useState } from 'react'
import { getTopRatedMovies } from '../services/movie.service'

export const useTopRatedMovies = (): {
  movies: MovieCard[]
  loading: boolean
  error: string | null
} => {
  const [movies, setMovies] = useState<MovieCard[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const updateMovies = async () => {
      setLoading(true)
      setError(null)
      const { data, error } = await getTopRatedMovies()

      if (error) {
        console.error(error)
        setError(error.message)
        return
      }

      setMovies(data)
      setLoading(false)
    }

    updateMovies()
  }, [])

  return { movies, loading, error }
}
