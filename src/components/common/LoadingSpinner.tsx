import SpinnerIcon from '../../assets/svg/logo.svg?react'

interface Props {
  className?: string
}

export const LoadingSpinner = ({ className }: Props): React.JSX.Element => {
  return (
    <div className={`loading-spinner ${className ? className : ''}`}>
      <SpinnerIcon className='spinner' />
    </div>
  )
}
