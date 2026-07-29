import { useEstadoLocal } from '../hooks/useEstadoLocal.js'
import { Portal } from './Motivo.jsx'

// Pizarra de bienvenida con el estado abierto/cerrado calculado en vivo.
export default function Pizarra() {
  const estado = useEstadoLocal()

  return (
    <section id="pizarra" className="relative bg-noche py-16 sm:py-20">
      <div className="contenedor">
        <div
          className="relative mx-auto max-w-3xl overflow-hidden rounded-[22px] border border-salvia/15 bg-carbon/80 px-8 py-10 text-center shadow-[inset_0_1px_0_rgba(196,211,198,0.06)]"
          style={{
            backgroundImage:
              'radial-gradient(60% 120% at 50% -10%, rgba(207,154,78,0.10), transparent 60%)',
          }}
        >
          <Portal className="mx-auto mb-5 h-9 w-8 text-vela/80" strokeWidth={6} />

          <div className="flex flex-col items-center gap-3">
            <span
              className="inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-sm font-medium uppercase tracking-[0.16em]"
              style={
                estado.abierto
                  ? { borderColor: 'rgba(52,211,153,0.4)', color: '#6ee7b7' }
                  : { borderColor: 'rgba(169,112,44,0.5)', color: '#cf9a4e' }
              }
              role="status"
              aria-live="polite"
            >
              <span
                className={[
                  'h-2.5 w-2.5 rounded-full',
                  estado.abierto
                    ? 'bg-emerald-400 shadow-[0_0_12px] shadow-emerald-400/70'
                    : 'bg-brasa',
                ].join(' ')}
                aria-hidden="true"
              />
              {estado.abierto ? 'Ahora abierto' : 'Ahora cerrado'}
            </span>

            <p className="font-display text-2xl italic text-crema sm:text-3xl">
              {estado.detalle}
            </p>
            <p className="max-w-[46ch] font-sans text-sm text-salvia">
              Te esperamos con el café recién hecho y las velas encendidas. La luz de
              la vereda avisa cuando estamos.
            </p>

            {/* @carminiacafe reubicado acá (fuera del hero) */}
            <a
              href="https://www.instagram.com/carminiacafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="boton-arco boton-arco-borde mt-4"
            >
              @carminiacafe
            </a>

            <p className="mt-2 font-sans text-xs uppercase tracking-[0.14em] text-salvia/70">
              Burzaco · Almirante Brown
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
