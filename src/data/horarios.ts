/* Horarios del local. Deben coincidir con lo que se muestra en la sección
   de visita: la misma tabla alimenta la fila visible y el cálculo de
   estado abierto/cerrado de la pizarra.
   [aperturaMin, cierreMin] por día (0 = domingo). */

export const HORARIOS: Record<number, [number, number]> = {
  0: [9 * 60, 13 * 60],
  1: [8 * 60, 20 * 60],
  2: [8 * 60, 20 * 60],
  3: [8 * 60, 20 * 60],
  4: [8 * 60, 20 * 60],
  5: [8 * 60, 20 * 60],
  6: [9 * 60, 20 * 60 + 30],
}

export const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

/* Filas visibles de la tabla de horarios (derivadas de HORARIOS para que
   nunca se desincronicen del cálculo de estado). */
export function minutosAHora(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}:${m < 10 ? '0' + m : m}`
}

export const FILAS_HORARIOS: { dias: string; horas: string }[] = [
  { dias: 'Lunes a viernes', horas: `${minutosAHora(HORARIOS[1][0])} – ${minutosAHora(HORARIOS[1][1])}` },
  { dias: 'Sábados', horas: `${minutosAHora(HORARIOS[6][0])} – ${minutosAHora(HORARIOS[6][1])}` },
  { dias: 'Domingos', horas: `${minutosAHora(HORARIOS[0][0])} – ${minutosAHora(HORARIOS[0][1])}` },
]
