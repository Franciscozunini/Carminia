import type { CSSProperties } from 'react'
import { MAPS_EMBED_URL, MAPS_URL } from '../data/contenido'
import { FILAS_HORARIOS } from '../data/horarios'
import { useEstadoLocal } from '../hooks/useEstadoLocal'
import { IconoPin, IconoReloj } from './Iconos'
import SeccionCabeza from './SeccionCabeza'

/* Mapa con el pin real del café + fichas de ubicación y horarios. */
export default function Visita() {
  const estado = useEstadoLocal()

  return (
    <section className="py-seccion" id="visitanos">
      <div className="wrap">
        <SeccionCabeza etiqueta="Te esperamos" titulo="Dónde encontrarnos" />
        <div className="grid grid-cols-[1.15fr_0.85fr] items-stretch gap-7 max-[860px]:grid-cols-1">
          <div
            className="min-h-[440px] overflow-hidden rounded-[2px] border border-tinta bg-salvia shadow-bloque-hoja"
            data-reveal
          >
            <iframe
              src={MAPS_EMBED_URL}
              title="Mapa de Carminia Café en Burzaco"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full min-h-[440px] w-full border-0"
            ></iframe>
          </div>
          <div className="grid content-start gap-7">
            <div
              className="rounded-lg border border-linea bg-blanco px-7 py-[30px]"
              data-reveal
              style={{ '--stagger': 1 } as CSSProperties}
            >
              <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-fluida font-[650] text-tinta [&_.icono]:text-hoja">
                <IconoPin />
                Ubicación
              </h3>
              <p className="text-tinta-suave">
                Estamos en <strong>Burzaco</strong>, partido de Almirante Brown, zona sur del Gran
                Buenos Aires.
              </p>
              <a
                className="btn mt-[18px] min-h-[48px] text-sm"
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Cómo llegar
              </a>
            </div>
            <div
              className="rounded-lg border border-linea bg-blanco px-7 py-[30px]"
              data-reveal
              style={{ '--stagger': 2 } as CSSProperties}
            >
              <h3 className="mb-3.5 flex items-center gap-2.5 font-display text-fluida font-[650] text-tinta [&_.icono]:text-hoja">
                <IconoReloj />
                Horarios
              </h3>
              <dl className="font-mono text-sm">
                {FILAS_HORARIOS.map((fila) => (
                  <div key={fila.dias} className="fila-ticket !py-2.5">
                    <dt className="text-tinta-suave">{fila.dias}</dt>
                    <dd className="font-medium">{fila.horas}</dd>
                  </div>
                ))}
              </dl>
              <p
                className="mt-3.5 flex items-center gap-2 font-mono text-sm"
                data-abierto={estado.abierto}
              >
                <span className="punto-estado" aria-hidden="true"></span>
                <span>Ahora: {estado.texto.toLowerCase()}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
