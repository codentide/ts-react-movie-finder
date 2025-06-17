import { Route, Routes } from 'react-router'
import { Header } from './components/Header'

import { HomePage } from './pages/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { DefaultPage } from './pages/404'

// [ ]: Cuando tengo un valor de busqueda y entro en la info de una pelicula pierd mi valor de búsqueda
// [ ]: Traer los genres de las peliculas cuando estan en detail

export default function App() {
  return (
    <main className='super-container'>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='movie/:id' element={<MovieDetailPage />} />
        <Route path='/*' element={<DefaultPage />} />
      </Routes>
    </main>
  )
}
