import { formatDate } from '../../utils'

interface Props {
  date: Date
  lang?: string
}

export const DateString = ({ date, lang }: Props) => {
  return (
    <time className='date-string' dateTime={date.toISOString()}>
      {formatDate(date, lang || 'en')}
    </time>
  )
}
