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
  // La nav NO flota sobre el hero (fidelidad Bellhop). Aparece recién cuando
  // se pasó la imagen a pantalla completa.
  const [visible, setVisible] = useState(false)
  const estado = useEstadoLocal()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <nav
      aria-hidden={!visible}
      className={[
        'fixed inset-x-0 top-0 z-50 border-b border-salvia/15 bg-noche/85 backdrop-blur-md transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0',
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
            tabIndex={visible ? 0 : -1}
          >
            @carminiacafe
          </a>
        </div>
      </div>
    </nav>
  )
}
