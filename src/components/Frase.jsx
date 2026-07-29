import Reveal from './Reveal.jsx'
import { Portal } from './Motivo.jsx'

export default function Frase() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-noche to-bosque py-28 text-center">
      <Portal
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-auto -translate-x-1/2 -translate-y-1/2 text-vela/[0.05]"
        strokeWidth={2}
      />
      <div className="contenedor relative">
        <Reveal as="blockquote" className="mx-auto max-w-[24ch] text-[clamp(1.7rem,4.5vw,2.7rem)] italic leading-tight text-salvia">
          “El buen café no se apura. El buen vino, tampoco.”
        </Reveal>
        <Reveal as="p" delay={120} className="mt-6 text-xs uppercase tracking-marca text-vela">
          — Carminia Café
        </Reveal>
      </div>
    </section>
  )
}
