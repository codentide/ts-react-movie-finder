import { HomeHero } from '../components'

export const HomePage = () => {
  return (
    <section className='home-page'>
      <HomeHero />
      {/* [ ]: Para home, el hero se usara enteramente una movie por snap, es decir el scroll mostrará highligts de solo una película, el scroll, servia para funcionar fuera del estado */}
    </section>
  )
}
