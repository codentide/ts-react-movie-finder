import { forwardRef, useImperativeHandle, useRef } from 'react'
import { MemoizedMovieCard } from './MovieCard'
import type { MovieCard } from '../../types'

// Representa el contrato de los elemento expuestos a través de useImperativeHandle
export interface MovieCarouselHandle {
  scrollToIndex: (index: number) => void
}

interface Props {
  items: MovieCard[]
  currentIndex?: number
  onPrev?: () => void
  onNext?: () => void
}

type Direction = 'left' | 'right'

// ForwardRef para admitir referencias desde el padre
export const MovieCarousel = forwardRef<MovieCarouselHandle, Props>(
  ({ items, currentIndex, onPrev, onNext }, ref) => {
    const scrollContainerRef = useRef<HTMLUListElement | null>(null)
    const isExternallyControlled = !!ref

    // Este objeto se expone al padre por medio de la referencia
    useImperativeHandle(ref, () => ({
      scrollToIndex: (index: number) => {
        // Si el contenedor es null fuera
        if (!scrollContainerRef.current) return
        // Extraer el element en base al index recibido por parámetro
        const target = scrollContainerRef.current.children[index]
        if (!target) return
        // scrollIntoView expone el elemento en el scroll de manera que sea visible, lo "busca" por asi decirlo
        target.scrollIntoView({
          inline: 'start',
          behavior: 'smooth',
        })
      },
    }))

    // Scroll normal basado en el width del elemento
    function scrollByElement(direction: Direction) {
      if (!scrollContainerRef.current) return
      const firstElement = scrollContainerRef.current.querySelector('li')
      if (!firstElement) return

      const elementWidth = firstElement.clientWidth
      const gapString = getComputedStyle(scrollContainerRef.current).gap || '0'
      const gap = parseFloat(gapString)
      const scrollAmount = elementWidth + gap

      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }

    function handleScroll(direction: Direction) {
      if (isExternallyControlled) {
        if (direction === 'right' && onNext) {
          onNext()
        } else if (direction === 'left' && onPrev) {
          onPrev()
        }
      } else {
        scrollByElement(direction)
      }
    }

    function renderItems() {
      return items.map((movie, index) => (
        <li
          key={movie.id}
          className={`movie-row__item ${
            currentIndex === index ? 'active' : ''
          }`}
        >
          <MemoizedMovieCard movie={movie} showInfo={false} />
        </li>
      ))
    }

    return (
      <div className='movie-carousel'>
        <button
          className='movie-carousel__button --left'
          onClick={() => handleScroll('left')}
        >
          LEFT
        </button>
        <ul className='movie-carousel__wrapper' ref={scrollContainerRef}>
          {renderItems()}
        </ul>
        <button
          className='movie-carousel__button --right'
          onClick={() => handleScroll('right')}
        >
          RIGHT
        </button>
      </div>
    )
  }
)
