import { formatDate } from '../../utils'

interface Props {
  date: Date
  lang?: string
}

export const DateString = ({ date, lang }: Props) => {
  const dateIsValid = date instanceof Date && !isNaN(date.getTime())

  if (!dateIsValid)
    return <time className='date-string'>Date not available</time>

  return (
    <time className='date-string' dateTime={date.toISOString()}>
      {formatDate(date, lang || 'en')}
    </time>
  )
}
