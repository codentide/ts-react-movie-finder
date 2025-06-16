import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MovieGrid } from './components/MovieGrid'
import { useMovies } from './hooks/useMovies'

export default function App() {
  const { movies, isLoading, error, updateQuery, sort, updateSort } =
    useMovies()

  // [ ]: Añadir nombre y enlace a linkedn y github

  return (
    <main className='super-container'>
      {/* Header */}
      <Header />
      <Hero
        featuredMovie={movies[0]}
        currentSort={sort}
        onQueryChange={updateQuery}
        onSortChange={updateSort}
      />
      {error && <span>ERROR {error}</span>}
      {isLoading ? <span>Is Loading</span> : <MovieGrid movies={movies} />}
    </main>
  )
}
