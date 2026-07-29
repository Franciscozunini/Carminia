// ---------------------------------------------------------------------------
// Motivo gráfico de Carminia — el elemento de identidad propia que se repite
// por todo el sitio (logo, divisores, sello, marca de agua).
//
// Es un "portal con llama": el arco de la puerta/marcos del local, y adentro
// una llama de vela — el calor que se ve encendido desde la vereda en las
// fotos. No es un ícono genérico de café: nace de este local puntual.
// ---------------------------------------------------------------------------

// Glifo base: arco + llama.
export function Portal({ className = '', stroke = 'currentColor', strokeWidth = 6 }) {
  return (
    <svg viewBox="0 0 100 120" className={className} fill="none" aria-hidden="true">
      {/* Arco / portal */}
      <path
        d="M18 112V52C18 32 32 16 50 16s32 16 32 36v60"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path d="M14 112h72" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" />
      {/* Llama de vela */}
      <path
        d="M50 58c7 6 10 12 10 19a10 10 0 0 1-20 0c0-4 2-7 5-10-1 4 0 7 3 8 2-6 1-12 2-17z"
        fill={stroke}
        className="motion-safe:animate-titilar origin-bottom"
      />
    </svg>
  )
}

// Marca de la barra de navegación / footer: portal + palabra.
export function Marca({ className = '', compacta = false }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Portal className="h-7 w-6 text-vela" strokeWidth={7} />
      {!compacta && (
        <span className="font-display text-[1.35rem] font-semibold tracking-wide text-crema">
          Carminia
        </span>
      )}
    </span>
  )
}

// Corona: el arco chico que encabeza cada sección. Hace que el motivo aparezca
// de forma deliberada y reconocible en todo el sitio, no una sola vez.
export function Corona({ className = '', align = 'center' }) {
  return (
    <Portal
      className={`h-8 w-7 text-vela/75 ${align === 'center' ? 'mx-auto' : ''} ${className}`}
      strokeWidth={6}
    />
  )
}

// Divisor entre secciones: línea fina + portal al centro.
export function Divisor({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-5 ${className}`} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-salvia/40 sm:w-28" />
      <Portal className="h-8 w-7 text-vela/80" strokeWidth={6} />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-salvia/40 sm:w-28" />
    </div>
  )
}

// Sello circular giratorio con el portal al centro.
export function Sello({ className = '' }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 140 140" className="h-full w-full motion-safe:animate-girar">
        <defs>
          <path id="anillo" d="M70,70 m-54,0 a54,54 0 1,1 108,0 a54,54 0 1,1 -108,0" />
        </defs>
        <circle cx="70" cy="70" r="68" fill="none" stroke="#cf9a4e" strokeOpacity="0.5" />
        <text fill="#cf9a4e" fontSize="11.5" letterSpacing="5" fontFamily="Instrument Sans, sans-serif">
          <textPath href="#anillo">CARMINIA · CAFÉ Y VINOS · BURZACO · </textPath>
        </text>
      </svg>
      <Portal className="absolute h-10 w-8 text-vela" strokeWidth={6} />
    </div>
  )
}
