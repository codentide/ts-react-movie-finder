import type { MovieCard, SortValue } from '../types'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import { sortMovies } from '../utils'
import { getMoviesByQuery, getPopularMovies } from '../services/movie.service'

interface UseMoviesReturn {
  movies: MovieCard[] | null
  featuredMovie: MovieCard | null
  isLoading: boolean
  error: string | null
}

export function useMovies(sort: SortValue = 'all'): UseMoviesReturn {
  const [movies, setMovies] = useState<MovieCard[] | null>(null)
  const [featuredMovie, setFeaturedMovie] = useState<MovieCard | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const [searchParam] = useSearchParams()
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const lastSearchRef = useRef<string | null>(null)
  const moviesRef = useRef<MovieCard[] | null>(null)

  // function getMostPopularMovie(movies: MovieCard[]): MovieCard {
  //   let movie = movies[0]

  //   if (movies.length > 0) {
  //     movie = movies.reduce((prev, current) => {
  //       return current.popularity > prev.popularity ? current : prev
  //     })
  //   }

  //   return movie
  // }

  useEffect(() => {
    const updateMovies = async () => {
      let movies: MovieCard[] = []
      const currentQuery = searchParam.get('query')?.trim() || ''

      if (currentQuery === lastSearchRef.current) return

      if (currentQuery) {
        debounceRef.current = setTimeout(async () => {
          const { data, error } = await getMoviesByQuery(currentQuery)

          if (error) {
            setError(error.message)
            return
          }
          movies = data
        }, 500)
      } else {
        const { data, error } = await getPopularMovies()
        if (error) {
          setError(error.message)
          return
        }

        movies = data
      }

      const sortedMovies = sortMovies(movies, sort)
      setMovies(sortedMovies)
      lastSearchRef.current = currentQuery
    }

    updateMovies()

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [sort, searchParam])

  useEffect(() => {
    if (moviesRef.current) {
      const sortedMovies = sortMovies([...moviesRef.current], sort)
      setMovies(sortedMovies)
    } else {
      setMovies(null)
    }
  }, [sort])

  return { movies, featuredMovie, isLoading, error }
}
