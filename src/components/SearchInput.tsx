import { useEffect, useRef, useState } from 'react'
import DeleteIcon from '../assets/svg/delete-text.svg?react'
import { useSearchParams } from 'react-router'

type Props = {
  placeholder?: string
  // onInputChange: (value: string) => void
}

export const SearchInput = ({ placeholder }: Props) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const isFirstRender = useRef<boolean>(true)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const input = event.target
    const inputValue = input.value

    setValue(inputValue)
  }

  useEffect(() => {
    if (!isFirstRender.current) return

    const queryFromUrl = searchParams.get('query') || ''
    setValue(queryFromUrl)
    isFirstRender.current = false
  }, [searchParams])

  useEffect(() => {
    setSearchParams(value ? `query=${value}` : '')
  }, [value, setSearchParams])

  return (
    <div className='input-box'>
      <input
        type='text'
        placeholder={placeholder && placeholder}
        onChange={handleInputChange}
        value={value}
      />
      {error && <span className='input-box__error-msg'>{error}</span>}
      {value.length > 0 && (
        <button
          className='input-box__reset-button'
          onClick={() => setValue('')}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  )
}
