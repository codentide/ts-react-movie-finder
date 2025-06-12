import './MovieItem.scss'

export const MovieItem = ({ title, poster, releaseDate }: Movie) => {
  return (
    <div className='movie-item'>
      <img className='movie-item__poster' src={poster} alt='' />
      <div className='movie-item__info'>
        <h3>{title}</h3>
        {/* YYYY/MM/DD */}
        <time dateTime={releaseDate}>{releaseDate}</time>
      </div>
    </div>
  )
}
