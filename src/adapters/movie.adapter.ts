import type {
  MovieDetail,
  MovieDetailFromAPI,
  MovieCardFromAPI,
  MovieCard,
  ProductionCompany,
  ProductionCompanyAPI,
} from '../types'

// [ ]: Usar el tamaño original para quitar el blur

const BASE_IMG_URL_500 = 'https://image.tmdb.org/t/p/w500'
const BASE_IMG_URL_OG = 'https://image.tmdb.org/t/p/original'

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
  overview,
}: MovieCardFromAPI): MovieCard => {
  const poster_fallback = `https://placehold.co/300x500/1a2637/3b567d?font=roboto&text=${title}`
  const coverPath = backdrop_path ? BASE_IMG_URL_500 + backdrop_path : null
  const hdCoverPath = backdrop_path ? BASE_IMG_URL_OG + backdrop_path : null
  const posterPath = poster_path
    ? BASE_IMG_URL_500 + poster_path
    : poster_fallback

  return {
    id,
    title,
    releaseDate: new Date(release_date),
    overview,
    popularity,
    posterPath,
    coverPath,
    hdCoverPath,
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
  const posterPath = poster_path
    ? BASE_IMG_URL_500 + poster_path
    : poster_fallback
  const coverPath = backdrop_path ? BASE_IMG_URL_500 + backdrop_path : null
  const hdCoverPath = backdrop_path ? BASE_IMG_URL_OG + backdrop_path : null
  const releaseDate = new Date(release_date)
  // const genre_names = genres.map((genre) => genre.name)
  const productionCompanies = mapProductionCompanyArray(production_companies)
  const genreIDs = genres.map((item) => item.id)

  return {
    id,
    title,
    status,
    releaseDate,
    genreIDs,
    overview,
    score: vote_average,
    voteCount: vote_count,
    posterPath,
    hdCoverPath,
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
