import { createContext } from 'react'

interface MovieContextValue {
  text: string
}

export const MovieContext = createContext<MovieContextValue | undefined>(
  undefined
)
