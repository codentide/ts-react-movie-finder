import { Link } from 'react-router'
import { MOVIE_GENRES_BY_ID } from '../../constants'

interface Props {
  genres: number[]
}

export const GenreList = ({ genres }: Props) => {
  return (
    <ul className='genre-badge-list'>
      {genres.map((id) => (
        <li key={id}>
          <GenreBadge id={id} />
        </li>
      ))}
    </ul>
  )
}

const GenreBadge = ({ id }: { id: number }) => {
  const genreName = MOVIE_GENRES_BY_ID[id] || 'Unknown'

  return (
    <Link to={`/genre/${id}`} className='genre-badge'>
      {genreName}
    </Link>
  )
}
