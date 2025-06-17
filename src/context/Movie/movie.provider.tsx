import { MovieContext } from './movie.context'

interface Props {
  children: React.ReactNode | React.ReactNode[]
}

export const MovieProvider: React.FunctionComponent<Props> = ({ children }) => {
  const text = 'gay'
  return (
    <MovieContext.Provider value={{ text }}>{children}</MovieContext.Provider>
  )
}
