import Reveal from './Reveal.jsx'

// Feed real de @carminiacafe embebido con el widget oficial de Instagram.
export default function Instagram() {
  return (
    <section id="instagram" className="relative bg-bosque py-24 sm:py-32">
      <div className="contenedor">
        <div className="mb-12 text-center">
          <Reveal as="span" className="kicker mb-3">
            Día a día
          </Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(2rem,4.6vw,3.1rem)] text-hueso">
            Lo último en <span className="text-vela">@carminiacafe</span>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mx-auto max-w-[560px] overflow-hidden rounded-[24px] border border-salvia/20 bg-hueso shadow-[0_30px_70px_-25px_rgba(0,0,0,0.7)]">
            <iframe
              src="https://www.instagram.com/carminiacafe/embed"
              title="Feed de Instagram de Carminia Café"
              loading="lazy"
              className="h-[560px] w-full border-0 bg-hueso"
              allowTransparency
            />
          </div>
        </Reveal>

        <Reveal delay={180} className="mt-10 text-center">
          <a
            href="https://www.instagram.com/carminiacafe/"
            target="_blank"
            rel="noopener noreferrer"
            className="boton-arco boton-arco-solido"
          >
            Seguinos en Instagram
          </a>
        </Reveal>
      </div>
    </section>
  )
}
