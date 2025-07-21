import { useNavigate } from 'react-router'
import { CustomInput } from './CustomInput'

export const HeaderSearchInput = () => {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const { query } = Object.fromEntries(new FormData(form))

    if ((query as string).trim().length > 0) {
      navigate(`/search?query=${query}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CustomInput
        className='search-input'
        name='query'
        placeholder='Search a movie..'
      />
    </form>
  )
}
