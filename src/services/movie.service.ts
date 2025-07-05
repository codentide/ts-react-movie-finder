import { mapMovieCardArray, mapMovieDetail } from '../adapters/movie.adapter'
import type {
  MovieDetailFromAPI,
  MovieDetail,
  CustomError,
  Success,
  Failure,
  MovieCardFromAPI,
  MovieCard,
} from '../types'

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_API_KEY

// Get a list with most popular movies

export const getMovieDetail = async (
  id: MovieDetail['id']
): Promise<Success<MovieDetail> | Failure> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.status_message
      throw {
        code: response.status,
        message: errorMessage || 'Error inesperado',
        name: 'HTTP_ERROR',
      } as CustomError
    }
    const movie = mapMovieDetail(data as MovieDetailFromAPI)

    if (movie) return { data: movie, error: null }
    else throw new Error('La respuesta de la API no tiene el formato esperado')
  } catch (error) {
    console.error(error)
    return { data: null, error: error as CustomError }
  }
}

// Search a list of movies by a string query

export const getMoviesByQuery = async (
  query: string
): Promise<Success<MovieCard[]> | Failure> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
    )
    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.status_message
      throw {
        code: response.status,
        message: errorMessage || 'Error inesperado',
        name: 'HTTP_ERROR',
      } as CustomError
    }

    if (data && Array.isArray(data.results)) {
      const movies = mapMovieCardArray(data.results as MovieCardFromAPI[])
      return { data: movies, error: null }
    } else {
      throw {
        code: 500,
        message: 'La respuesta de la API no tiene el formato esperado.',
        name: 'API_RESPONSE_FORMAT_ERROR',
      } as CustomError
    }
  } catch (error) {
    console.error(error)

    return { data: null, error: error as CustomError }
  }
}

export const getPopularMovies = async (): Promise<
  Success<MovieCard[]> | Failure
> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json()

    if (!response.ok) {
      const errorMessage = data.status_message
      throw {
        code: response.status,
        message: errorMessage || 'Error inesperado',
        name: 'HTTP_ERROR',
      } as CustomError
    }

    if (data && Array.isArray(data.results)) {
      const movies = mapMovieCardArray(data.results as MovieCardFromAPI[])
      return { data: movies, error: null }
    } else {
      throw {
        code: 500,
        message: 'La respuesta de la API no tiene el formato esperado.',
        name: 'API_RESPONSE_FORMAT_ERROR',
      } as CustomError
    }
  } catch (error) {
    console.error(error)

    return { data: null, error: error as CustomError }
  }
}
