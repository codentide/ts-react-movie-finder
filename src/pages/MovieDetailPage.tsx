import { useParams } from 'react-router'

export const MovieDetailPage = () => {
  const params = useParams()
  console.log(params)

  return (
    <section>
      <h1>Movie id: {params.id}</h1>
    </section>
  )
}
