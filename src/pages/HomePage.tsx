// import { Hero } from '../components/Hero'
// import { MovieGrid } from '../components/MovieGrid'
import { PopularMovieGrid } from '../components/PopularMovieGrid'
// import { useMovies } from '../hooks/useMovies'

interface Props {
  children?: React.ReactNode | React.ReactNode[]
}

export const HomePage: React.FunctionComponent<
  Props
> = (): React.JSX.Element => {
  // const { movies, isLoading, error, updateQuery, sort, updateSort } =
  //   useMovies()

  return (
    <section className='home-page'>
      {/* <Hero
        featuredMovie={movies[0]}
        currentSort={sort}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
      /> */}
      {/* {error && <span>ERROR {error}</span>}
      {isLoading ? <span>Is Loading</span> : <MovieGrid movies={movies} />} */}

      <PopularMovieGrid />
    </section>
  )
}
