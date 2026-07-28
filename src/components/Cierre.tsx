import type { CSSProperties } from 'react'
import { INSTAGRAM_URL, MAPS_URL } from '../data/contenido'
import { IconoFlechaExterna } from './Iconos'

export default function Cierre() {
  return (
    <section className="oscuro bg-hoja-oscura py-seccion text-papel" aria-label="Invitación">
      <div className="wrap">
        <span className="etiqueta" data-reveal>
          Sin apuro
        </span>
        <h2
          className="mt-3.5 max-w-[20ch] font-display text-titulo font-[750] [text-wrap:balance]"
          data-reveal
          style={{ '--stagger': 1 } as CSSProperties}
        >
          Tu próximo café te espera en Burzaco
        </h2>
        <p
          className="mt-[18px] max-w-[46ch] text-salvia"
          data-reveal
          style={{ '--stagger': 2 } as CSSProperties}
        >
          Vení a conocernos: el rincón verde de Almirante Brown.
        </p>
        <div
          className="mt-[34px] flex flex-wrap items-center gap-5"
          data-reveal
          style={{ '--stagger': 3 } as CSSProperties}
        >
          <a className="btn btn--claro" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            Abrir en Maps
          </a>
          <a
            className="enlace text-papel decoration-salvia"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            @carminiacafe
            <IconoFlechaExterna />
          </a>
        </div>
      </div>
    </section>
  )
}
