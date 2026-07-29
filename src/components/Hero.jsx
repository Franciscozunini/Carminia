// ---------------------------------------------------------------------------
// HERO — fidelidad estricta a la estructura de Bellhop: una sola imagen a
// pantalla completa con zoom lento Ken Burns en CSS puro y NADA más que
// título + una línea de subtítulo + indicador de scroll.
//
// Vacío deliberado: sin eyebrow con guiones (patrón genérico de gastro), sin
// badge de estado, sin botones, sin nav flotando encima. La ubicación va
// dentro del subtítulo, no como eyebrow sobre el título.
// ---------------------------------------------------------------------------
export default function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-bosque via-noche to-noche px-6 text-center"
    >
      {/* Capa de foto con Ken Burns. Si la foto todavía no está, queda el
          gradiente de arriba como fondo intencional (no se rompe). */}
      <div
        role="img"
        aria-label="Interior de Carminia: mesa de madera bajo una araña de caireles encendida, en penumbra cálida"
        className="absolute inset-0 bg-cover bg-center motion-safe:animate-kenburns"
        style={{ backgroundImage: "url('./fotos/interior.jpg')" }}
      />

      {/* Vignette + resplandor de vela para integrar el título con la foto */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(120% 75% at 50% 22%, rgba(207,154,78,0.16), transparent 58%),' +
            'linear-gradient(to bottom, rgba(11,21,16,0.55) 0%, rgba(11,21,16,0.30) 42%, rgba(11,21,16,0.92) 100%)',
        }}
      />

      {/* Único contenido: título + subtítulo. La ubicación vive en el subtítulo. */}
      <div className="relative z-10 flex flex-col items-center">
        <h1 className="font-display text-[clamp(3.4rem,11vw,7.5rem)] font-medium leading-[0.95] text-hueso">
          Carminia
        </h1>

        <p className="mt-6 max-w-[36ch] font-display text-lg italic text-niebla/90 sm:text-xl">
          Café de día, vinos y penumbra de noche. Un refugio en Burzaco para
          quedarse sin apuro.
        </p>
      </div>

      {/* Indicador de scroll — el único elemento además de título y subtítulo */}
      <a
        href="#pizarra"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-salvia transition-colors hover:text-vela"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="font-sans text-[0.65rem] uppercase tracking-[0.3em]">Pasá</span>
        <span className="relative block h-9 w-px overflow-hidden bg-salvia/30">
          <span className="absolute inset-x-0 top-0 h-3 bg-vela motion-safe:animate-bajarScroll" />
        </span>
      </a>
    </header>
  )
}
