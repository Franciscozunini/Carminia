import type { CSSProperties } from 'react'
import { INSTAGRAM_EMBED_URL, INSTAGRAM_URL } from '../data/contenido'
import { IconoFlechaExterna } from './Iconos'
import SeccionCabeza from './SeccionCabeza'

/* Fotos reales del local: el feed oficial de Instagram, nunca stock. */
export default function Instagram() {
  return (
    <section className="border-y border-linea bg-blanco py-seccion" id="instagram">
      <div className="wrap">
        <SeccionCabeza etiqueta="Fotos reales" titulo="Momentos en Carminia" />
        <div
          className="mx-auto max-w-[560px] overflow-hidden rounded-[2px] border border-tinta bg-blanco shadow-bloque-salvia"
          data-reveal
          style={{ '--stagger': 1 } as CSSProperties}
        >
          <iframe
            src={INSTAGRAM_EMBED_URL}
            title="Instagram de Carminia Café"
            loading="lazy"
            className="h-[580px] w-full border-0 bg-blanco"
          ></iframe>
        </div>
        <div className="mt-10 text-center" data-reveal style={{ '--stagger': 2 } as CSSProperties}>
          <p className="mb-2 text-sm text-tinta-suave">Promos, novedades y el día a día del café:</p>
          <a className="enlace" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Ver Instagram completo
            <IconoFlechaExterna />
          </a>
        </div>
      </div>
    </section>
  )
}
