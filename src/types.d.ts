interface Movie {
  id: number
  title: string
  releaseDate: string
  poster: string
  backdrop?: string
}

// API
interface MovieFromAPI {
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
