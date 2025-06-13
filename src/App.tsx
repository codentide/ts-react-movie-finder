import { Hero } from './components/Hero/Hero'
import { MovieList } from './components/MovieList/MovieList'
import { useMovies } from './hooks/useMovies'

export default function App() {
  const { movies, isLoading, error, updateQuery, sort, updateSort } =
    useMovies()

  return (
    <main className='super-container'>
      {/* Header */}
      <Hero
        featuredMovie={movies[0]}
        currentSort={sort}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
      />
      {error && <span>ERROR {error}</span>}
      {isLoading ? <span>Is Loading</span> : <MovieList movies={movies} />}
    </main>
  )
}
