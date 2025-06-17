import { Link } from 'react-router'

export const DefaultPage = () => {
  return (
    <section className='default-page'>
      <h2>404</h2>
      <p>This page not found!</p>
      <Link to={'/'} children='Back to home'></Link>
    </section>
  )
}
