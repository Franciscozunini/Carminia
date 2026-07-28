import { useEffect, useState } from 'react'
import { DIAS, HORARIOS, minutosAHora } from '../data/horarios'

export interface EstadoLocal {
  abierto: boolean
  /** p. ej. "Abierto · cierra 20:00" */
  texto: string
  /** p. ej. "11:07 h" */
  horaLocal: string
  /** p. ej. "8:00–20:00" */
  horarioHoy: string
}

function ahoraEnBurzaco(): { dia: number; min: number } {
  const partes = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
    weekday: 'short',
  }).formatToParts(new Date())
  const mapa: Record<string, string> = {}
  partes.forEach((p) => {
    mapa[p.type] = p.value
  })
  const claves: Record<string, number> = { dom: 0, lun: 1, mar: 2, mié: 3, jue: 4, vie: 5, sáb: 6 }
  let dia = claves[(mapa.weekday || '').slice(0, 3).toLowerCase()]
  if (dia === undefined) dia = new Date().getDay()
  return { dia, min: parseInt(mapa.hour, 10) * 60 + parseInt(mapa.minute, 10) }
}

function calcular(): EstadoLocal {
  const ahora = ahoraEnBurzaco()
  const rango = HORARIOS[ahora.dia]
  const abierto = ahora.min >= rango[0] && ahora.min < rango[1]

  let texto: string
  if (abierto) {
    texto = `Abierto · cierra ${minutosAHora(rango[1])}`
  } else if (ahora.min < rango[0]) {
    texto = `Cerrado · abre ${minutosAHora(rango[0])}`
  } else {
    const diaSiguiente = (ahora.dia + 1) % 7
    texto = `Cerrado · abre ${DIAS[diaSiguiente]} ${minutosAHora(HORARIOS[diaSiguiente][0])}`
  }

  return {
    abierto,
    texto,
    horaLocal: `${minutosAHora(ahora.min)} h`,
    horarioHoy: `${minutosAHora(rango[0])}–${minutosAHora(rango[1])}`,
  }
}

const FALLBACK: EstadoLocal = { abierto: true, texto: 'Abierto', horaLocal: '—:—', horarioHoy: '8:00–20:00' }

function calcularSeguro(): EstadoLocal {
  try {
    return calcular()
  } catch {
    return FALLBACK
  }
}

/** Estado real del local según la hora de Buenos Aires; se refresca cada 30 s. */
export function useEstadoLocal(): EstadoLocal {
  const [estado, setEstado] = useState<EstadoLocal>(calcularSeguro)

  useEffect(() => {
    const id = setInterval(() => setEstado(calcularSeguro()), 30000)
    return () => clearInterval(id)
  }, [])

  return estado
}
