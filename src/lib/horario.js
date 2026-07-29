// ---------------------------------------------------------------------------
// Estado abierto/cerrado calculado en tiempo real.
//
// Los horarios son EJEMPLO — ajustalos acá y todo el sitio (pizarra, sección
// "Visitá") se actualiza solo. Se calcula en la zona horaria del local, no en
// la del visitante, para que dé bien desde cualquier lado.
// ---------------------------------------------------------------------------

export const ZONA = 'America/Argentina/Buenos_Aires'

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

// 0 = domingo … 6 = sábado. Cada día es una lista de tramos [apertura, cierre]
// en formato "HH:MM" (24h). Un día sin tramos = cerrado.
export const HORARIOS = {
  0: [['09:00', '13:00']],                 // domingo
  1: [['08:00', '20:00']],                 // lunes
  2: [['08:00', '20:00']],                 // martes
  3: [['08:00', '20:00']],                 // miércoles
  4: [['08:00', '20:00']],                 // jueves
  5: [['08:00', '23:00']],                 // viernes
  6: [['09:00', '23:00']],                 // sábado
}

// Filas listas para mostrar, agrupando días con el mismo horario.
export const HORARIOS_LEGIBLES = [
  { dia: 'Lunes a jueves', hora: '8:00 – 20:00' },
  { dia: 'Viernes', hora: '8:00 – 23:00' },
  { dia: 'Sábados', hora: '9:00 – 23:00' },
  { dia: 'Domingos', hora: '9:00 – 13:00' },
]

const aMinutos = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

const formatearHora = (min) => {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return `${h}:${String(m).padStart(2, '0')}`
}

// "Ahora" en la zona horaria del local, sin depender del reloj del visitante.
function ahoraEnZona(base = new Date()) {
  const partes = new Intl.DateTimeFormat('en-US', {
    timeZone: ZONA,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(base)

  const get = (t) => partes.find((p) => p.type === t)?.value
  const mapaDia = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }
  const dia = mapaDia[get('weekday')]
  let hora = Number(get('hour'))
  if (hora === 24) hora = 0 // algunos motores devuelven "24" a medianoche
  const minuto = Number(get('minute'))
  return { dia, minutosDelDia: hora * 60 + minuto }
}

/**
 * Devuelve el estado del local en este instante.
 * @returns {{
 *   abierto: boolean,
 *   diaNombre: string,
 *   detalle: string,        // frase corta para la pizarra
 *   proximoCambio: string,  // "20:00" o "mañana 8:00", etc.
 * }}
 */
export function estadoActual(base = new Date()) {
  const { dia, minutosDelDia } = ahoraEnZona(base)
  const tramosHoy = HORARIOS[dia] ?? []

  // ¿Estamos dentro de algún tramo de hoy?
  for (const [ini, fin] of tramosHoy) {
    const iniMin = aMinutos(ini)
    const finMin = aMinutos(fin)
    if (minutosDelDia >= iniMin && minutosDelDia < finMin) {
      const faltan = finMin - minutosDelDia
      const cierraPronto = faltan <= 45
      return {
        abierto: true,
        diaNombre: DIAS[dia],
        detalle: cierraPronto
          ? `Cierra pronto, ${faltan} min`
          : `Abierto hasta las ${formatearHora(finMin)}`,
        proximoCambio: formatearHora(finMin),
      }
    }
  }

  // Cerrados: buscamos la próxima apertura (hoy más tarde o próximos 7 días).
  for (let salto = 0; salto <= 7; salto++) {
    const d = (dia + salto) % 7
    for (const [ini] of HORARIOS[d] ?? []) {
      const iniMin = aMinutos(ini)
      if (salto === 0 && iniMin <= minutosDelDia) continue // ya pasó hoy
      const cuando =
        salto === 0
          ? `hoy a las ${formatearHora(iniMin)}`
          : salto === 1
            ? `mañana a las ${formatearHora(iniMin)}`
            : `el ${DIAS[d]} a las ${formatearHora(iniMin)}`
      return {
        abierto: false,
        diaNombre: DIAS[dia],
        detalle: `Cerrado · abre ${cuando}`,
        proximoCambio: cuando,
      }
    }
  }

  return {
    abierto: false,
    diaNombre: DIAS[dia],
    detalle: 'Cerrado por ahora',
    proximoCambio: '—',
  }
}
