import type { SortValue } from '../types'
import { useState } from 'react'
import { Hero } from '../components/Hero'
import { SortList } from '../components/SortList'
import { SearchInput } from '../components/SearchInput'
import { MovieGrid } from '../components/MovieGrid'
import { useMovies } from '../hooks/useMovies'

interface Props {
  children?: React.ReactNode | React.ReactNode[]
}

export const HomePage: React.FunctionComponent<
  Props
> = (): React.JSX.Element => {
  const [sort, setSort] = useState<SortValue>('all')

  const { movies, featuredMovie, isLoading, error } = useMovies(sort)
  const Loading = () => <h2>LOADING</h2>

  return (
    <section className='home-page'>
      <Hero featuredMovie={featuredMovie}>
        <SearchInput placeholder='Search a movie...' />
        <SortList onSortChange={setSort} currentSort={sort} />
      </Hero>

      {error && <span>{error}</span>}
      {isLoading ? <Loading /> : <MovieGrid movies={movies || []} />}
    </section>
  )
}
