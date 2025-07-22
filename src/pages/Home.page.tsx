import {
  HomeHero,
  PopularMoviesCarousel,
  TopRatedMoviesCarousel,
  TrendingMoviesCarousel,
  UpcomingMoviesCarousel,
} from '../components'

export const HomePage = () => {
  return (
    <section className='home-page'>
      <HomeHero />

      <div className='movie-listing-container'>
        {/* Trending today/week */}
        <TrendingMoviesCarousel />
        {/* popular */}
        <PopularMoviesCarousel />
        {/* top_rated */}
        <TopRatedMoviesCarousel />
        {/* upcoming */}
        <UpcomingMoviesCarousel />
      </div>
    </section>
  )
}
