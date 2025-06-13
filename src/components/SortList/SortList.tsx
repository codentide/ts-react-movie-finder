import { SORTS } from '../../constants'
import type { SortValue } from '../../types'
import './SortList.scss'

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
  // function handleSortChange(event: React.SyntheticEvent<HTMLButtonElement>) {
  //   const button = event.target as HTMLButtonElement
  //   const sortValue = button.getAttribute('data-sort') as SortValue
  //   onSortChange(sortValue)
  // }

  function renderButtons() {
    return SORT_BUTTONS_ARRAY.map(([key, label]) => (
      <button
        className={`sort-button ${key === currentSort ? 'active' : ''}`}
        key={key}
        onClick={() => {
          onSortChange((key === currentSort ? 'all' : key) as SortValue)
        }}
      >
        {label}
      </button>
    ))
  }

  return <div className='sort-list'>{renderButtons()}</div>
}
