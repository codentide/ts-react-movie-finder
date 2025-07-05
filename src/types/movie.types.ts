import { MovieCard } from '../components/MovieCard'
import { SORTS } from '../constants'

export type SortValue = (typeof SORTS)[keyof typeof SORTS]

export type ProductionCompany = {
  id: number
  logoPath: string | null
  name: string
  originCountry: string
}

export type Genre = {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  releaseDate: Date
  // popularity: number
  coverPath: string | null
  posterPath: string
  score: number
  voteCount: number
}

export type MovieID = Movie['id']

//

export interface MovieCard extends Movie {
  genreIDs: Genre['id'][]
  popularity: number
}

export interface MovieDetail extends Movie {
  overview: string
  status: string
  runtime: number
  homepage: string | null
  // productionCountry: string
  productionCompanies: ProductionCompany[]
  tagline: string | null
  genres: Genre['name'][]
}

// API RESPONSE TYPES

export type MovieCardFromAPI = {
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

export interface MovieDetailFromAPI {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: null
  budget: number
  genres: { id: number; name: string }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path: null | string
    name: string
    origin_country: string
  }[]
  production_countries: { iso_3166_1: string; name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type ProductionCompanyAPI =
  MovieDetailFromAPI['production_companies'][number]
