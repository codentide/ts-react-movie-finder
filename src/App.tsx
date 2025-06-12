import { useState } from 'react'
import { MovieList } from './components/MovieList/MovieList'
import movieMocks from './movie-list.json'

export default function App() {
  const [movies] = useState<Movie[]>(movieMocks)
  return (
    <main className='super-container'>
      <br />
      <h1>Movies</h1>

      <MovieList movies={movies} />
    </main>
  )
}
