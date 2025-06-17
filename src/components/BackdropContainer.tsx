import { useEffect, useState } from 'react'
import type { Movie } from '../types'

interface Props {
  path: Movie['backdrop'] | null | undefined
  children?: React.ReactNode | React.ReactNode[]
  alt?: string
  className?: string
}

export const BackdropContainer: React.FunctionComponent<Props> = ({
  path,
  children,
  alt,
  className,
}) => {
  const [currentPath, setCurrentPath] = useState<string | null>(null)
  const [isActive, setIsActive] = useState<boolean>(true)

  useEffect(() => {
    if (!path || path === null || path === currentPath) return

    setIsActive(false)
    const debouncer = setTimeout(() => {
      setCurrentPath(path)
      setIsActive(true)
    }, 100)

    return () => {
      clearTimeout(debouncer)
    }
  }, [path, currentPath, isActive])

  return (
    <section className={`backdrop-container ${className ? className : ''}`}>
      {children}
      <img
        className={`backdrop-container__backdrop ${
          isActive ? 'active' : 'unactive'
        }`}
        src={currentPath || '#'}
        alt={alt || 'Featured movie cover'}
      />
    </section>
  )
}
