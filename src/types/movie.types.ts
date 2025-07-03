import type { SORTS } from '../constants'

export type MovieFromAPI = {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type Movie = {
  id: number
  title: string
  releaseDate: string
  posterPath: string
  backdropPath: string | null
  popularity: number
  score: string
  genres: number[]
}

export type MovieId = Movie['id']

export type MovieDetailFromApi = {
  id: number
  title: string
  genres: { id: number; name: string }[]
  overview: string
  release_date: string
  status: string
  backdrop_path: string
  poster_path: string
  production_companies: {
    id: number
    logo_path: string | null
    name: string
    origin_country: string
  }
  vote_average: number
  // popularity: number
  // imdb_id: string
  // original_title: 'Life After Fighting'
}

export type MovieDetail = {
  id: number
  title: string
  overview: string
  posterPath: string
  backdropPath: string | null
  releaseDate: string
  score: string
  genres: string[]
}

export type SortValue = (typeof SORTS)[keyof typeof SORTS]
