import Reveal from './Reveal.jsx'
import { Corona } from './Motivo.jsx'
import { HORARIOS_LEGIBLES } from '../lib/horario.js'
import { useEstadoLocal } from '../hooks/useEstadoLocal.js'

const MAPA_EMBED =
  'https://www.google.com/maps?q=Carminia%20Caf%C3%A9%2C%20Burzaco%2C%20Almirante%20Brown%2C%20Buenos%20Aires&ll=-34.7763438,-58.4050123&z=16&hl=es&output=embed'
const MAPA_LINK =
  'https://www.google.com/maps/place/Carminia+Caf%C3%A9/@-34.7763438,-58.4050123,17z'

export default function Visita() {
  const estado = useEstadoLocal()

  return (
    <section id="visita" className="relative bg-noche py-24 sm:py-32">
      <div className="contenedor">
        <div className="mb-14 text-center">
          <Reveal>
            <Corona className="mb-4" />
          </Reveal>
          <Reveal as="span" className="kicker mb-3">
            Te esperamos
          </Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(2rem,4.6vw,3.1rem)] text-hueso">
            Dónde encontrarnos
          </Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Mapa */}
          <Reveal className="min-h-[380px] overflow-hidden rounded-[24px] border border-salvia/15 bg-bosque">
            <iframe
              src={MAPA_EMBED}
              title="Mapa de Carminia Café en Burzaco"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[380px] w-full border-0"
              allowFullScreen
            />
          </Reveal>

          {/* Datos */}
          <div className="flex flex-col gap-6">
            <Reveal delay={90} className="rounded-[22px] border border-salvia/15 bg-carbon/70 p-8">
              <h3 className="mb-3 font-display text-xl text-crema">Ubicación</h3>
              <p className="font-sans text-sm leading-relaxed text-salvia">
                Estamos en <strong className="text-niebla">Burzaco</strong>, partido de
                Almirante Brown, zona sur del Gran Buenos Aires. Buscá la fachada con la
                luz cálida encendida.
              </p>
              <a
                href={MAPA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="boton-arco boton-arco-borde mt-5 !px-5 !py-2.5 !text-xs"
              >
                Cómo llegar
              </a>
            </Reveal>

            <Reveal delay={160} className="rounded-[22px] border border-salvia/15 bg-carbon/70 p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-xl text-crema">Horarios</h3>
                <span
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em]"
                  style={{ color: estado.abierto ? '#6ee7b7' : '#cf9a4e' }}
                >
                  <span
                    className={[
                      'h-2 w-2 rounded-full',
                      estado.abierto ? 'bg-emerald-400' : 'bg-brasa',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                  {estado.abierto ? 'Abierto' : 'Cerrado'}
                </span>
              </div>
              <ul>
                {HORARIOS_LEGIBLES.map((h) => (
                  <li
                    key={h.dia}
                    className="flex justify-between border-b border-salvia/10 py-2.5 text-sm last:border-0"
                  >
                    <span className="text-salvia">{h.dia}</span>
                    <span className="text-niebla">{h.hora}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
