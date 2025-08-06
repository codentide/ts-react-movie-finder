import { mapMovieCardArray, mapMovieDetail } from '../adapters/movie.adapter'
import { movieAPI } from '../api/movieAPI'
import type {
  MovieDetailFromAPI,
  MovieDetail,
  CustomError,
  MovieCard,
  APIResponse,
  MovieListFromAPI,
  TrendingTimeRange,
} from '../types'
import { sortMovies } from '../utils'

// Get a list with most popular movies

export const getMovieDetail = async (
  id: MovieDetail['id']
): Promise<APIResponse<MovieDetail>> => {
  try {
    const response = await movieAPI.get<MovieDetailFromAPI>(`/movie/${id}`)
    const movie = mapMovieDetail(response.data)
    return { data: movie, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Search a list of movies by a string query

export const getMoviesByQuery = async (
  query: string
): Promise<APIResponse<MovieCard[]>> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>(
      `/search/movie?query=${query}`
    )
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    return { data: movies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Popular movies

export const getPopularMovies = async (): Promise<APIResponse<MovieCard[]>> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>('/movie/popular')
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    return { data: movies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Now playing movies

export const getNowPlayingMovies = async (): Promise<
  APIResponse<MovieCard[]>
> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>('movie/now_playing')
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    const lastReleasedMovies = sortMovies(movies, 'latest')
    return { data: lastReleasedMovies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Trending

export const getTrendingMovies = async (
  time: TrendingTimeRange
): Promise<APIResponse<MovieCard[]>> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>(
      `trending/movie/${time}`
    )
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    return { data: movies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Top Rated

export const getTopRatedMovies = async (): Promise<
  APIResponse<MovieCard[]>
> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>('movie/top_rated')
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    return { data: movies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}

// Upcoming

export const getUpcomingMovies = async (): Promise<
  APIResponse<MovieCard[]>
> => {
  try {
    const response = await movieAPI.get<MovieListFromAPI>('movie/upcoming')
    const { results } = response.data
    const movies = mapMovieCardArray(results)
    return { data: movies, error: null }
  } catch (error) {
    return { data: null, error: error as CustomError }
  }
}
