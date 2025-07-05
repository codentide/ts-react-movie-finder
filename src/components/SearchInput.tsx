import { useEffect, useRef, useState } from 'react'
import DeleteIcon from '../assets/svg/delete-text.svg?react'
import { useSearchParams } from 'react-router'

type Props = {
  placeholder?: string
  onInputChange: (value: string) => void
}

export const SearchInput = ({ placeholder, onInputChange }: Props) => {
  const [value, setValue] = useState<string>('')
  const isFirstRender = useRef<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  // Cambio de valor de input
  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target
    setValue(input.value)

    if (onInputChange) onInputChange(input.value)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      const queryFromUrl = searchParams.get('query')
      setValue(queryFromUrl || '')
      isFirstRender.current = false
      return
    }

    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (!value) newSearchParams.delete('query')
    else newSearchParams.set('query', value)
    setSearchParams(newSearchParams)
  }, [searchParams, setSearchParams, value])

  return (
    <div className='input-box'>
      <input
        type='text'
        placeholder={placeholder && placeholder}
        onChange={handleInputChange}
        value={value}
      />

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
