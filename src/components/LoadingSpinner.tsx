import SpinnerIcon from '../assets/svg/logo.svg?react'

export const LoadingSpinner = (): React.JSX.Element => {
  return (
    <div className='loading-spinner'>
      <SpinnerIcon className='spinner' />
    </div>
  )
}
