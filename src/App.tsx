import { Navigate, Route, Routes } from 'react-router'
import { Header } from './components/Header'

import { HomePage } from './pages/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { DefaultPage } from './pages/DefaultPage'

export default function App() {
  // const location = useLocation()
  // console.log(location)

  return (
    <main className='super-container'>
      <Header />
      <Routes>
        <Route index element={<Navigate to={'/movies'} replace />} />
        <Route path='movies' element={<HomePage />} />
        <Route path='movie/:id' element={<MovieDetailPage />} />
        <Route path='/*' element={<DefaultPage />} />
      </Routes>
    </main>
  )
}
