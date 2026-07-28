import type { CSSProperties } from 'react'
import { useEstadoLocal } from '../hooks/useEstadoLocal'

/* Elemento firma del sitio: la pizarra de la barra, un ticket mono con
   el estado real del local (abierto/cerrado según la hora de Burzaco). */
export default function Pizarra() {
  const estado = useEstadoLocal()

  return (
    <dl
      className="rounded-[2px] border border-tinta bg-blanco px-6 py-[22px] font-mono text-sm shadow-bloque-hoja"
      data-entrada
      style={{ '--stagger': 3 } as CSSProperties}
    >
      <div className="flex justify-between gap-3 border-b border-dashed border-linea pb-3.5 text-xs uppercase tracking-[0.22em] text-tinta-suave">
        <span>En la barra</span>
        <span aria-hidden="true">Nº 001</span>
      </div>
      <div className="fila-ticket">
        <dt className="text-tinta-suave">Estado</dt>
        <dd className="text-right font-medium">
          <span className="inline-flex items-center gap-2" data-abierto={estado.abierto}>
            <span className="punto-estado" aria-hidden="true"></span>
            <span>{estado.texto}</span>
          </span>
        </dd>
      </div>
      <div className="fila-ticket">
        <dt className="text-tinta-suave">Hora local</dt>
        <dd className="text-right font-medium">{estado.horaLocal}</dd>
      </div>
      <div className="fila-ticket">
        <dt className="text-tinta-suave">Hoy</dt>
        <dd className="text-right font-medium">{estado.horarioHoy}</dd>
      </div>
      <div className="fila-ticket">
        <dt className="text-tinta-suave">Dónde</dt>
        <dd className="text-right font-medium">Burzaco, Alte. Brown</dd>
      </div>
    </dl>
  )
}
