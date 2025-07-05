import type {
  MovieDetail,
  MovieDetailFromAPI,
  MovieCardFromAPI,
  MovieCard,
  ProductionCompany,
  ProductionCompanyAPI,
} from '../types'

// [ ]: Usar el tamaño original para quitar el blur

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500'

// MOVIE

export const mapMovieCard = ({
  id,
  title,
  release_date,
  popularity,
  poster_path,
  backdrop_path,
  genre_ids,
  vote_average,
  vote_count,
}: MovieCardFromAPI): MovieCard => {
  const poster_fallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
  const coverPath = backdrop_path ? BASE_IMG_URL + backdrop_path : null
  const posterPath = poster_path ? BASE_IMG_URL + poster_path : poster_fallback

  return {
    id,
    title,
    releaseDate: new Date(release_date),
    popularity,
    posterPath,
    coverPath,
    genreIDs: genre_ids,
    score: vote_average,
    voteCount: vote_count,
  }
}

export const mapMovieCardArray = (list: MovieCardFromAPI[]): MovieCard[] => {
  return list.map((item) => mapMovieCard(item))
}

// MOVIE_DETAIL

export const mapMovieDetail = ({
  id,
  title,
  genres,
  overview,
  poster_path,
  backdrop_path,
  release_date,
  vote_average,
  vote_count,
  runtime,
  homepage,
  status,
  tagline,
  production_companies,
}: MovieDetailFromAPI): MovieDetail => {
  const poster_fallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
  const posterPath = poster_path ? BASE_IMG_URL + poster_path : poster_fallback
  const coverPath = backdrop_path ? BASE_IMG_URL + backdrop_path : null
  const releaseDate = new Date(release_date)
  const genre_names = genres.map((genre) => genre.name)
  const productionCompanies = mapProductionCompanyArray(production_companies)

  return {
    id,
    title,
    status,
    releaseDate,
    genres: genre_names,
    overview,
    score: vote_average,
    voteCount: vote_count,
    posterPath,
    coverPath,
    runtime,
    homepage,
    productionCompanies,
    tagline,
  }
}

export const mapMovieDetailArray = (
  list: MovieDetailFromAPI[]
): MovieDetail[] => {
  return list.map((item) => mapMovieDetail(item))
}

// PRODUCTION COMPANY

const mapProductionCompany = ({
  id,
  logo_path,
  name,
  origin_country,
}: ProductionCompanyAPI): ProductionCompany => {
  return {
    id,
    logoPath: logo_path,
    name,
    originCountry: origin_country,
  }
}

const mapProductionCompanyArray = (
  list: ProductionCompanyAPI[]
): ProductionCompany[] => {
  return list.map((item) => mapProductionCompany(item))
}
