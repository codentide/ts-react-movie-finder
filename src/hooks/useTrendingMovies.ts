import type { MovieCard, TrendingTimeRange } from '../types'
import { useEffect, useState } from 'react'
import { getTrendingMovies } from '../services/movie.service'

export const useTrendingMovies = (
  time: TrendingTimeRange
): {
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
      const { data, error } = await getTrendingMovies(time)

      if (error) {
        console.error(error)
        setError(error.message)
        return
      }

      setMovies(data)
      setLoading(false)
    }

    updateMovies()
  }, [time])

  return { movies, loading, error }
}
