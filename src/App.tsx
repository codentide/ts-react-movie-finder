import { Route, Routes } from 'react-router'
import { Header } from './components/layout'
import { DefaultPage, HomePage, MovieDetailPage, SearchPage } from './pages'

export default function App() {
  return (
    <main className='super-container'>
      <Header />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='search/' element={<SearchPage />} />
        <Route path='movie/:id' element={<MovieDetailPage />} />
        <Route path='/*' element={<DefaultPage />} />
      </Routes>
    </main>
  )
}
