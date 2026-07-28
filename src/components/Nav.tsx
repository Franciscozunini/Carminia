import { useEffect, useState } from 'react'
import { ENLACES_NAV } from '../data/contenido'

export default function Nav() {
  const [abierto, setAbierto] = useState(false)
  const [conSombra, setConSombra] = useState(false)

  /* Sombra de borde al scrollear (sin divisor duro) */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setConSombra(window.scrollY > 24)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Con el menú móvil abierto, el fondo no scrollea */
  useEffect(() => {
    document.body.style.overflow = abierto ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [abierto])

  return (
    <header className={`nav-material fixed inset-x-0 top-0 z-[200] ${conSombra ? 'is-scrolled' : ''}`}>
      <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-4 px-gutter py-3">
        <a
          className="inline-flex min-h-[44px] items-center font-display text-[1.35rem] font-bold tracking-[-0.01em] text-tinta no-underline"
          href="#"
        >
          Carminia
        </a>
        <button
          className="nav-toggle relative z-[220] h-11 w-11 cursor-pointer border-0 bg-transparent"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setAbierto(!abierto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul
          className={`nav-links flex items-center gap-1.5 ${abierto ? 'is-open' : ''}`}
          id="menu-principal"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setAbierto(false)
          }}
        >
          {ENLACES_NAV.map((enlace) => (
            <li key={enlace.href}>
              <a
                className="inline-flex min-h-[44px] items-center rounded px-3 text-sm font-medium text-tinta no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline [@media(hover:hover)_and_(pointer:fine)]:hover:decoration-ambar [@media(hover:hover)_and_(pointer:fine)]:hover:underline-offset-[5px]"
                href={enlace.href}
              >
                {enlace.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="nav-cta inline-flex min-h-[44px] items-center rounded-lg bg-hoja px-[18px] text-sm font-medium text-papel no-underline transition-[transform,background-color] duration-[160ms] ease-out active:scale-[0.97] [@media(hover:hover)_and_(pointer:fine)]:hover:bg-hoja-oscura"
              href="#visitanos"
            >
              Cómo llegar
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
