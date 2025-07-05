import type { SortValue } from '../types'
import { useState } from 'react'
import { SearchBanner } from '../components/SearchBanner'
import { SearchInput } from '../components/SearchInput'

import { MovieGrid } from '../components/MovieGrid'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { useSearchMovies } from '../hooks/useSearchMovies'
import { SortList } from '../components/SortList'

export const SearchPage = () => {
  const [sort, setSort] = useState<SortValue>('all')
  const { movies, featuredMovie, loading, error } = useSearchMovies()

  return (
    <section className='home-page'>
      <SearchBanner featuredMovie={featuredMovie}>
        <SearchInput placeholder='Search a movie...' />
        <SortList onSortChange={setSort} currentSort={sort} />
      </SearchBanner>

      {error && <span>{error}</span>}
      {loading ? (
        <LoadingSpinner className='home-page__loading-spinner' />
      ) : (
        <MovieGrid movies={movies || []} />
      )}
    </section>
  )
}
