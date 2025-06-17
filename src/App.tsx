import { Route, Routes } from 'react-router'
import { Header } from './components/Header'

import { HomePage } from './pages/HomePage'
import { MovieDetailPage } from './pages/MovieDetailPage'
import { DefaultPage } from './pages/404'

export default function App() {
  return (
    <main className='super-container'>
      {/* Header */}
      <Header />

      <Routes>
        <Route index element={<HomePage />} />
        <Route path='movie/:id' element={<MovieDetailPage />} />
        <Route path='/*' element={<DefaultPage />} />
      </Routes>
    </main>
  )
}
