import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router'
import DeleteIcon from '../../assets/svg/delete-text.svg?react'
import { CustomInput } from './CustomInput'

export const SearchInput = () => {
  const [value, setValue] = useState<string>('')
  const [searchParams, setSearchParams] = useSearchParams()
  const isFirstRender = useRef<boolean>(true)

  const updateParams = useCallback(
    (key: string, value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (!value) newSearchParams.delete(key)
      else newSearchParams.set(key, value)
      setSearchParams(newSearchParams)
    },
    [searchParams, setSearchParams]
  )

  useEffect(() => {
    if (isFirstRender.current) {
      const queryFromUrl = searchParams.get('query')
      setValue(queryFromUrl || '')
      isFirstRender.current = false
      return
    }

    updateParams('query', value)
  }, [searchParams, value, updateParams])

  return (
    <div className='input-box'>
      <CustomInput
        className='search-input'
        placeholder='Search a movie...'
        onInputChange={(value) => setValue(value)}
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
