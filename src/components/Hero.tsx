import type { CSSProperties } from 'react'
import { INSTAGRAM_URL } from '../data/contenido'
import { IconoFlechaExterna } from './Iconos'
import Pizarra from './Pizarra'

/* Hero tipográfico asimétrico sobre papel claro. */
export default function Hero() {
  return (
    <section
      className="grid min-h-[92svh] content-center pb-[clamp(3rem,8vh,5rem)] pt-[clamp(7rem,16vh,10rem)]"
      aria-label="Presentación"
    >
      <div className="wrap grid grid-cols-[minmax(0,1.5fr)_minmax(260px,0.9fr)] items-end gap-[clamp(2rem,5vw,5rem)] max-[860px]:grid-cols-1 max-[860px]:items-start">
        <div>
          <h1
            className="font-display text-display font-[750] text-tinta [font-optical-sizing:auto] [text-wrap:balance]"
            data-entrada
          >
            <span className="block">
              <span className="font-[260]">Café de</span>
            </span>
            <span className="ml-[clamp(1.5rem,9vw,7rem)] block">especialidad</span>
            <span className="block">
              <span className="font-[260]">en</span> <span className="text-hoja">Burzaco</span>
            </span>
          </h1>
          <p
            className="mt-[clamp(1.4rem,3vw,2.2rem)] max-w-[44ch] text-fluida text-tinta-suave"
            data-entrada
            style={{ '--stagger': 1 } as CSSProperties}
          >
            Espresso y filtrados hechos con calma, pastelería que sale del horno todos los días y un
            salón lleno de plantas para quedarse.
          </p>
          <div
            className="mt-[clamp(1.6rem,3vw,2.4rem)] flex flex-wrap items-center gap-5"
            data-entrada
            style={{ '--stagger': 2 } as CSSProperties}
          >
            <a className="btn" href="#visitanos">
              Cómo llegar
            </a>
            <a className="enlace" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              @carminiacafe
              <IconoFlechaExterna />
            </a>
          </div>
        </div>

        <Pizarra />
      </div>
    </section>
  )
}
