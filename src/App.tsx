import { Hero } from './components/Hero/Hero'
import { MovieList } from './components/MovieList/MovieList'
import { useMovies } from './hooks/useMovies'

export default function App() {
  const { movies, isLoading, error, updateQuery } = useMovies()

  return (
    <main className='super-container'>
      {/* Header */}
      <Hero onQueryChange={updateQuery} featuredMovie={movies[0]} />
      {error && <span>ERROR {error}</span>}
      {isLoading ? <span>Is Loading</span> : <MovieList movies={movies} />}
    </main>
  )
}
