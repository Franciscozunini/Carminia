import { useEffect, useRef, useState } from 'react'

// Aparición al hacer scroll con IntersectionObserver. Si el visitante pidió
// menos movimiento, aparece de una y no anima.
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const nodo = ref.current
    if (!nodo) return

    const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (sinMovimiento) {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.unobserve(e.target)
          }
        })
      },
      { threshold, rootMargin },
    )
    obs.observe(nodo)
    return () => obs.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}
