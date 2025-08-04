import { FaClock } from 'react-icons/fa6'

interface Props {
  time: number
}

export const Runtime = ({ time }: Props) => {
  function minutesToHours(time: number) {
    const hours = Math.floor(time / 60)
    const minutes = time % 60

    const formattedHours = String(hours).padStart(2, '0')
    const formattedMinutes = String(minutes).padStart(2, '0')
    return formattedHours + ':' + formattedMinutes
  }

  return (
    <div className='runtime'>
      <FaClock className='runtime__icon' />
      <span className='runtime__time'>{minutesToHours(time)}</span>
    </div>
  )
}
