import { useEffect } from 'react'

/** Aparición en scroll con stagger para todo elemento [data-reveal].
    Respeta prefers-reduced-motion: si está activo, muestra todo directo. */
export function useRevealEnScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealables = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window) || reduceMotion) {
      revealables.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )
    revealables.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}
