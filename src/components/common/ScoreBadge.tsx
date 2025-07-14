import StarIcon from '../../assets/svg/star.svg?react'

interface Prop {
  score: number
  limit?: number
}

export const ScoreBadge: React.FunctionComponent<Prop> = ({
  score,
  limit = 10,
}) => {
  return (
    <div className='score-badge'>
      <StarIcon className='score-badge__icon' />
      <span className='score-badge__score'>
        {score.toFixed(1)}/{limit}
      </span>
    </div>
  )
}

// interface Prop {
//   date: string | Date
// }

// export const ScoreBadge: React.FunctionComponent<Prop> = (date) => {
//   return <time dateTime={date}>{formatDate(date, 'en')}</time>
// }
