import { useEffect, useState } from 'react'
import { estadoActual } from '../lib/horario.js'

// Recalcula el estado abierto/cerrado cada 30s para que la pizarra esté
// siempre al día sin recargar la página.
export function useEstadoLocal(intervaloMs = 30_000) {
  const [estado, setEstado] = useState(() => estadoActual())

  useEffect(() => {
    const tick = () => setEstado(estadoActual())
    tick()
    const id = setInterval(tick, intervaloMs)
    // Recalcular también al volver a la pestaña.
    document.addEventListener('visibilitychange', tick)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
    }
  }, [intervaloMs])

  return estado
}
