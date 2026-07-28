import type { CSSProperties } from 'react'
import { ITEMS_BARRA } from '../data/contenido'
import SeccionCabeza from './SeccionCabeza'

/* Carta de la barra: filas con etiqueta mono, sin tarjetas ni collage. */
export default function LaBarra() {
  return (
    <section className="py-seccion" id="la-barra">
      <div className="wrap">
        <SeccionCabeza etiqueta="La barra" titulo="Hecho con calma, servido con cariño">
          <p
            className="mt-4 max-w-[52ch] text-tinta-suave"
            data-reveal
            style={{ '--stagger': 2 } as CSSProperties}
          >
            Un lugar donde el café se disfruta sin apuro, rodeado de plantas, luz y aroma a horno
            recién abierto.
          </p>
        </SeccionCabeza>
        <ul className="border-t border-linea">
          {ITEMS_BARRA.map((item, i) => (
            <li
              key={item.etiqueta}
              className="grid grid-cols-[140px_1fr_1.4fr] items-baseline gap-[clamp(1rem,4vw,3.5rem)] border-b border-linea py-[clamp(1.8rem,4vw,2.8rem)] max-[760px]:grid-cols-1 max-[760px]:gap-2"
              data-reveal
              style={{ '--stagger': i } as CSSProperties}
            >
              <span className="etiqueta" aria-hidden="true">
                {item.etiqueta}
              </span>
              <h3 className="font-display text-titulo-menor font-[650] text-tinta">{item.titulo}</h3>
              <p className="max-w-[52ch] text-tinta-suave">{item.descripcion}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
