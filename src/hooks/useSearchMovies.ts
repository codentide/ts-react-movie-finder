import type { MovieCard } from '../types'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { sortMovies } from '../utils'
import { getMoviesByQuery } from '../services/movie.service'

interface UseMoviesReturn {
  movies: MovieCard[] | null
  featuredMovie: MovieCard | null
  loading: boolean
  error: string | null
}

export function useSearchMovies(): UseMoviesReturn {
  const [movies, setMovies] = useState<MovieCard[] | null>(null)
  const [featuredMovie, setFeaturedMovie] = useState<MovieCard | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [searchParam] = useSearchParams()
  const query = searchParam.get('query')?.trim() || ''
  const sort = searchParam.get('sort')?.trim() || ''

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSearchRef = useRef<string | null>(null)
  const moviesRef = useRef<MovieCard[] | null>(null)

  function getMostPopularMovie(movies: MovieCard[]): MovieCard {
    let movie = movies[0]

    if (movies.length > 0) {
      movie = movies.reduce((prev, current) => {
        return current.popularity > prev.popularity ? current : prev
      })
    }

    return movie
  }

  useEffect(() => {
    if (!query) {
      setMovies([])
      setFeaturedMovie(null)
      return
    }

    if (query === lastSearchRef.current) return

    const updateMovies = async () => {
      setError(null)
      setLoading(true)

      debounceRef.current = setTimeout(async () => {
        const { data, error } = await getMoviesByQuery(query)

        if (error) {
          setError(error.message)
          setMovies([])
          return
        }

        setFeaturedMovie(getMostPopularMovie(data))
        const sortedMovies = sortMovies(data, 'all')
        setMovies(sortedMovies)
        lastSearchRef.current = query
      }, 500)

      setLoading(false)
    }

    updateMovies()

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    if (moviesRef.current) {
      const sortedMovies = sortMovies([...moviesRef.current], 'all')
      setMovies(sortedMovies)
    } else {
      setMovies(null)
    }
  }, [])

  return { movies, featuredMovie, loading, error }
}
