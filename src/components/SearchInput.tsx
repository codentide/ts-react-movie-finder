import { useEffect, useState } from 'react'

type Props = {
  placeholder?: string
  onInputChange: (value: string) => void
}

export const SearchInput = ({ placeholder, onInputChange }: Props) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError(null)
    const input = event.target
    const inputValue = input.value

    if (inputValue === '' || inputValue.trim() === '') {
      setValue('')
      // setError('No se puede buscar una película vacía')
      return
    }

    setValue(inputValue)
  }

  useEffect(() => {
    onInputChange(value)
  }, [value, onInputChange])

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
          🡐
        </button>
      )}
    </div>
  )
}
