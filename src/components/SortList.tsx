import { SORTS } from '../constants'
import type { SortValue } from '../types'

const SORT_BUTTONS = {
  // [SORTS.ALL]: 'All',
  [SORTS.TITLE_AZ]: 'A-Z',
  [SORTS.TITLE_ZA]: 'Z-A',
  [SORTS.LATEST]: 'Latest',
  [SORTS.OLDEST]: 'Oldest',
}

const SORT_BUTTONS_ARRAY = Object.entries(SORT_BUTTONS)

interface Props {
  onSortChange: (sortValue: SortValue) => void
  currentSort: SortValue
}

export const SortList = ({ onSortChange, currentSort }: Props) => {
  function renderButtons() {
    return SORT_BUTTONS_ARRAY.map(([key, label]) => {
      const className = `sort-button ${key === currentSort ? 'active' : ''}`
      function handleSortChange() {
        onSortChange((key === currentSort ? 'all' : key) as SortValue)
      }

      return (
        <button className={className} key={key} onClick={handleSortChange}>
          {label}
        </button>
      )
    })
  }

  return <div className='sort-list'>{renderButtons()}</div>
}
