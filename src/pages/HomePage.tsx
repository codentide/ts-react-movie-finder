import type { SortValue } from '../types'
import { useState } from 'react'

import { useMovies } from '../hooks/useMovies'
import { PopularMovies } from '../components/movies'
import { useSearchParams } from 'react-router'

interface Props {
  children?: React.ReactNode | React.ReactNode[]
}

export const HomePage: React.FunctionComponent<
  Props
> = (): React.JSX.Element => {
  const [sort, setSort] = useState<SortValue>('all')

  const { movies, featuredMovie, isLoading, error } = useMovies(sort)

  const [searchParams] = useSearchParams()
  const queryFromUrl = searchParams.get('query') || ''
  console.log(queryFromUrl ? 'WASA' : 'NEL')

  return (
    <section className='home-page'>
      {/* <Hero featuredMovie={featuredMovie}>
        <SearchInput placeholder='Search a movie...' />
       <SortList onSortChange={setSort} currentSort={sort} /> 
      </Hero> */}

      {error && <span>{error}</span>}
      {/* {isLoading ? (
        <LoadingSpinner className='home-page__loading-spinner' />
      ) : (
        <MovieGrid movies={movies || []} />
      )} */}

      <PopularMovies />
    </section>
  )
}
