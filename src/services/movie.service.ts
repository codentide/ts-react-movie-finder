import { adaptMovieDetail } from '../adapters/movie.adapter'
import type {
  MovieDetailFromApi,
  MovieDetail,
  Success,
  Failure,
  CustomError,
} from '../types'

const BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const getMovieDetail = async (
  id: MovieDetail['id']
): Promise<Success<MovieDetail> | Failure> => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
    const data = await response.json()

    if (!response.ok) {
      const errorMessage = await data.status_message
      throw {
        code: response.status,
        message: errorMessage,
        name: 'HTTP_ERROR',
      } as CustomError
    }
    const movie = adaptMovieDetail(data as MovieDetailFromApi)

    if (movie) return { data: movie, error: null }
    else throw new Error('La respuesta de la API no tiene el formato esperado')
  } catch (error) {
    console.error(error)

    return { data: null, error: error as CustomError }
  }
}
