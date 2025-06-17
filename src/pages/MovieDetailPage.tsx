import { useParams } from 'react-router'
import type { Movie, MovieFromAPI } from '../types'
import { useEffect, useState } from 'react'
import { formatMovie } from '../utils'
import { MovieCard } from '../components/MovieCard'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const MovieDetailPage = () => {
  const [movie, setMovie] = useState<Movie | null>(null)

  const params = useParams()

  async function fetchMovie(url: string): Promise<MovieFromAPI | null> {
    // setIsLoading(true)
    // setError(null)

    try {
      const response = await fetch(url)
      if (!response.ok) {
        const httpError = await response.text()
        throw new Error(`Error HTTP: ${response.status} - ${httpError}`)
      }
      const data = await response.json()
      if (data) {
        return data as MovieFromAPI
      } else {
        throw new Error('La respuesta de la API no tiene el formato esperado')
      }
    } catch (error) {
      // setError(
      //   'Ocurrió un error trayendo las películas' + (error || 'Desconocido')
      // )
      return null
    } finally {
      // setIsLoading(false)
    }
  }

  useEffect(() => {
    async function getMovies() {
      const endpoint: string = `/movie/${params.id}?api_key=${API_KEY}`

      //
      const unformattedMovies = await fetchMovie(`${BASE_URL}${endpoint}`)
      // const unformattedMovies = await fetchMovie(
      //   'https://api.themoviedb.org/3/movie/{movie_id}`api_key=a9b423c452ea93f0eef4650dbb652aea`
      // )

      if (unformattedMovies) {
        const formattedMovie = formatMovie(unformattedMovies)
        setMovie(formattedMovie)
      }
    }

    if (params.id) {
      getMovies()
    }
  }, [params.id])

  return (
    <section>
      <h1>Movie id: {params.id}</h1>

      {movie && <MovieCard {...movie} />}
    </section>
  )
}
