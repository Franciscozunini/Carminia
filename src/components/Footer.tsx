import { ENLACES_NAV } from '../data/contenido'

export default function Footer() {
  return (
    <footer className="oscuro border-t border-linea-oscura bg-hoja-oscura pb-10 pt-14 text-salvia">
      <div className="wrap">
        <p className="font-display text-marca font-[750] text-papel" aria-hidden="true">
          Carminia
        </p>
        <div className="mt-[30px] flex flex-wrap items-center justify-between gap-5 border-t border-linea-oscura pt-6 text-sm">
          <p>Burzaco · Almirante Brown · Buenos Aires</p>
          <ul className="flex flex-wrap gap-1">
            {ENLACES_NAV.map((enlace) => (
              <li key={enlace.href}>
                <a
                  className="inline-flex min-h-[44px] items-center px-2.5 text-salvia no-underline [@media(hover:hover)_and_(pointer:fine)]:hover:text-papel [@media(hover:hover)_and_(pointer:fine)]:hover:underline [@media(hover:hover)_and_(pointer:fine)]:hover:underline-offset-[5px]"
                  href={enlace.href}
                >
                  {enlace.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-5 border-t border-linea-oscura pt-6 text-sm">
          <p>© {new Date().getFullYear()} Carminia Café — Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
