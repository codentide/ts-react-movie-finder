import type { MovieCard, SortValue } from '../types'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { getMoviesByQuery } from '../services/movie.service'
import { sortMovies } from '../utils'
import { getMostPopularMovie } from '../utils/getMostPopular'

export function useSearchMovies(): {
  movies: MovieCard[] | null
  featuredMovie: MovieCard | null
  loading: boolean
  error: string | null
} {
  const [movies, setMovies] = useState<MovieCard[] | null>(null)
  const [rawMovies, setRawMovies] = useState<MovieCard[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [featuredMovie, setFeaturedMovie] = useState<MovieCard | null>(null)

  const [searchParams] = useSearchParams()
  const query = searchParams.get('query') || ''
  const sort = (searchParams.get('sort') || 'all') as SortValue

  const debounceTimerRef = useRef<number | null>(null)
  const lastQuery = useRef<string | null>(null)

  useEffect(() => {
    const getMovies = () => {
      // Cambia sort
      if (query === lastQuery.current) {
        if (!rawMovies) return
        const sortedMovies = sortMovies([...rawMovies], sort)
        setMovies(sortedMovies)
        // Cambia query
      } else {
        setLoading(true)
        debounceTimerRef.current = setTimeout(async () => {
          const { data: movies, error } = await getMoviesByQuery(query)

          if (error) {
            setError(error.message)
            setLoading(false)
            return
          }

          // const sortedMovies = sortMovies(movies, sort)
          // setMovies(movies)
          setRawMovies(movies)
          setFeaturedMovie(getMostPopularMovie(movies))
          lastQuery.current = query
          setLoading(false)
        }, 500)
      }
    }

    getMovies()

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [query, sort, rawMovies])

  return { movies, featuredMovie, loading, error }
}
