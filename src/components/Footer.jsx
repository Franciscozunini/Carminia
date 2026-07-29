import { Sello } from './Motivo.jsx'

const ENLACES = [
  { href: '#espacio', texto: 'El espacio' },
  { href: '#galeria', texto: 'Galería' },
  { href: '#instagram', texto: 'Instagram' },
  { href: '#visita', texto: 'Visitá' },
]

export default function Footer() {
  return (
    <footer className="border-t border-salvia/12 bg-noche py-16">
      <div className="contenedor flex flex-col items-center text-center">
        <Sello className="h-24 w-24" />

        <p className="mt-6 font-display text-2xl text-crema">Carminia Café</p>
        <p className="mt-1 font-sans text-sm text-salvia">
          Burzaco · Almirante Brown · Buenos Aires
        </p>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3">
          {ENLACES.map((e) => (
            <li key={e.href}>
              <a
                href={e.href}
                className="font-sans text-xs uppercase tracking-[0.14em] text-salvia transition-colors hover:text-vela"
              >
                {e.texto}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.instagram.com/carminiacafe/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs uppercase tracking-[0.14em] text-salvia transition-colors hover:text-vela"
            >
              @carminiacafe
            </a>
          </li>
        </ul>

        <p className="mt-10 font-sans text-xs text-salvia/50">
          © {new Date().getFullYear()} Carminia Café · Landing informativa
        </p>
      </div>
    </footer>
  )
}
