import type { CSSProperties, ReactNode } from 'react'

interface Props {
  etiqueta: string
  titulo: string
  children?: ReactNode
}

/** Cabecera de sección: etiqueta mono + título display (+ bajada opcional). */
export default function SeccionCabeza({ etiqueta, titulo, children }: Props) {
  return (
    <div className="mb-[clamp(2.6rem,5vw,4rem)] max-w-[660px]">
      <span className="etiqueta" data-reveal>
        {etiqueta}
      </span>
      <h2
        className="mt-3.5 font-display text-titulo font-bold text-tinta [text-wrap:balance]"
        data-reveal
        style={{ '--stagger': 1 } as CSSProperties}
      >
        {titulo}
      </h2>
      {children}
    </div>
  )
}
