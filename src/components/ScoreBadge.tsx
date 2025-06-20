import StarIcon from '../assets/svg/star.svg?react'

interface Prop {
  score: string
}

export const ScoreBadge: React.FunctionComponent<Prop> = ({ score }) => {
  return (
    <div className='score-badge'>
      <StarIcon className='score-badge__icon' />
      <span className='score-badge__score'>{score}/5</span>
    </div>
  )
}

// interface Prop {
//   date: string | Date
// }

// export const ScoreBadge: React.FunctionComponent<Prop> = (date) => {
//   return <time dateTime={date}>{formatDate(date, 'en')}</time>
// }
