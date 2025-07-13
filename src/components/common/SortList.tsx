import { useSearchParams } from 'react-router'
import { SORTS } from '../../constants'
import type { SortValue } from '../../types'

const SORT_BUTTONS = {
  // [SORTS.ALL]: 'All',
  [SORTS.TITLE_AZ]: 'A-Z',
  [SORTS.TITLE_ZA]: 'Z-A',
  [SORTS.LATEST]: 'Latest',
  [SORTS.OLDEST]: 'Oldest',
}

const SORT_BUTTONS_ARRAY = Object.entries(SORT_BUTTONS)

export const SortList = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const currentSort = searchParams.get('sort') || 'all'

  const updateSort = (key: SortValue) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    if (key === currentSort) newSearchParams.delete('sort')
    else newSearchParams.set('sort', key)

    setSearchParams(newSearchParams)
  }

  function FilterButtons() {
    return SORT_BUTTONS_ARRAY.map(([key, label]) => {
      const className = `sort-button ${key === currentSort ? 'active' : ''}`

      return (
        <button
          className={className}
          key={key}
          onClick={() => updateSort(key as SortValue)}
        >
          {label}
        </button>
      )
    })
  }

  return (
    <div className='sort-list'>
      <FilterButtons />
    </div>
  )
}
