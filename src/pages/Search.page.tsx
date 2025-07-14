import { BackdropContainer, MovieGrid, SortList } from '../components'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { useSearchMovies } from '../hooks/useSearchMovies'

export const SearchPage = () => {
  const { movies, featuredMovie, loading, error } = useSearchMovies()

  return (
    <section className='search-page'>
      <BackdropContainer
        className='search-page__hero'
        path={featuredMovie?.coverPath}
      />
      <div className='heading'>
        <h2 className='heading__title'>Search and find without limits</h2>
        <p className='heading__subtitle'>
          From classics to new releases, search for any movie that comes to mind
          and enjoy!
        </p>
      </div>
      <SortList />

      {error && <span>{error}</span>}
      {loading ? (
        <LoadingSpinner className='home-page__loading-spinner' />
      ) : (
        <MovieGrid movies={movies || []} />
      )}
    </section>
  )
}
