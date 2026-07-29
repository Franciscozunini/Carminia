// ---------------------------------------------------------------------------
// HERO — una sola imagen a pantalla completa (criterio Bellhop) con zoom lento
// Ken Burns en CSS puro. Un solo título, una línea de subtítulo, y solo un
// indicador sutil de scroll (sin botones duplicados).
//
// Composición propuesta (la que planteaba el brief): foto grande de fondo +
// un detalle chico en la esquina con tratamiento distinto — la fachada de
// noche en duotono verde de marca. Nada del patrón genérico de dos fotos
// redondeadas en diagonal.
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

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-marca text-vela">
          <span className="h-px w-8 bg-vela/60" />
          Burzaco · Almirante Brown
          <span className="h-px w-8 bg-vela/60" />
        </p>

        <h1 className="font-display text-[clamp(3.4rem,11vw,7.5rem)] font-medium leading-[0.95] text-hueso">
          Carminia
        </h1>

        <p className="mt-6 max-w-[34ch] font-display text-lg italic text-niebla/90 sm:text-xl">
          Café de día, vinos y penumbra de noche. Un refugio para quedarse sin apuro.
        </p>
      </div>

      {/* Detalle en esquina: la fachada de noche, duotono verde de marca */}
      <figure className="absolute bottom-8 right-6 z-10 hidden w-[210px] sm:block lg:w-[240px]">
        <div
          className="relative overflow-hidden border border-vela/25 shadow-[0_18px_50px_-15px_rgba(0,0,0,0.7)]"
          style={{ borderRadius: '999px 999px 8px 8px' }}
        >
          <div
            role="img"
            aria-label="La fachada de Carminia al caer la noche, con las luces cálidas encendidas"
            className="aspect-[4/5] bg-cover bg-center"
            style={{
              backgroundImage: "url('./fotos/fachada.jpg')",
              filter: 'grayscale(1) contrast(1.05) brightness(0.95)',
            }}
          />
          {/* Duotono: sombras en verde de marca, luces en crema */}
          <span
            className="pointer-events-none absolute inset-0 mix-blend-color"
            style={{ background: '#245038' }}
            aria-hidden="true"
          />
          <span
            className="pointer-events-none absolute inset-0 mix-blend-lighten opacity-40"
            style={{ background: 'radial-gradient(60% 50% at 50% 60%, rgba(240,200,119,0.5), transparent 70%)' }}
            aria-hidden="true"
          />
        </div>
        <figcaption className="mt-2 text-center font-sans text-[0.7rem] uppercase tracking-[0.18em] text-salvia">
          Al caer la noche
        </figcaption>
      </figure>

      {/* Indicador de scroll (único CTA del hero) */}
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
