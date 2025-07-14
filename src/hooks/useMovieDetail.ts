import type { MovieDetail, MovieId } from '../types'
import { useEffect, useState } from 'react'

import { getMovieDetail } from '../services/movie.service'

export function useMovieDetail(movieId: MovieId | null): {
  movieDetail: MovieDetail | null
  isLoading: boolean
  error: string | null
} {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const getNewMovieDetail = async (id: MovieId | null) => {
      if (!id) return
      setIsLoading(true)
      setError(null)

      const { data, error } = await getMovieDetail(id)

      if (error) {
        console.error(error)
        setError(error.message)
        return
      }

      setMovieDetail(data)
      setIsLoading(false)
    }

    getNewMovieDetail(movieId)
  }, [movieId])

  return { movieDetail, isLoading, error }
}
