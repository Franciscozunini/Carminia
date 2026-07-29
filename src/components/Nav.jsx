import { useEffect, useState } from 'react'
import { Marca } from './Motivo.jsx'
import { useEstadoLocal } from '../hooks/useEstadoLocal.js'

const ENLACES = [
  { href: '#espacio', texto: 'El espacio' },
  { href: '#galeria', texto: 'Galería' },
  { href: '#instagram', texto: 'Instagram' },
  { href: '#visita', texto: 'Visitá' },
]

export default function Nav() {
  const [compacta, setCompacta] = useState(false)
  const estado = useEstadoLocal()

  useEffect(() => {
    const onScroll = () => setCompacta(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        compacta
          ? 'border-b border-salvia/15 bg-noche/80 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-[1160px] items-center justify-between px-6 py-4">
        <a href="#top" className="rounded" aria-label="Carminia Café, ir al inicio">
          <Marca />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                className="font-sans text-sm uppercase tracking-[0.12em] text-niebla/85 transition-colors hover:text-vela"
              >
                {e.texto}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {/* Estado en vivo, también en la barra */}
          <span className="hidden items-center gap-2 text-xs uppercase tracking-[0.14em] text-salvia sm:inline-flex">
            <span
              className={[
                'h-2 w-2 rounded-full',
                estado.abierto ? 'bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400/70' : 'bg-brasa',
              ].join(' ')}
              aria-hidden="true"
            />
            {estado.abierto ? 'Abierto' : 'Cerrado'}
          </span>
          <a
            href="https://www.instagram.com/carminiacafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="boton-arco boton-arco-borde !px-4 !py-2 !text-xs"
          >
            @carminiacafe
          </a>
        </div>
      </div>
    </nav>
  )
}
