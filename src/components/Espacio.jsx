import Reveal from './Reveal.jsx'

const RASGOS = [
  {
    titulo: 'Café de especialidad',
    texto:
      'Grano seleccionado y métodos cuidados. El espresso corto de la mañana o el filtrado que se estira toda la tarde.',
  },
  {
    titulo: 'Una pared de vinos',
    texto:
      'Etiquetas para descorchar acá o llevarte. Cuando baja la luz, Carminia se vuelve una vinoteca de barrio con banda de sonido baja.',
  },
  {
    titulo: 'Penumbra que abraza',
    texto:
      'Madera, velas y una araña de caireles. Pensado para conversar sin apuro, leer, o no hacer nada — que también vale.',
  },
]

export default function Espacio() {
  return (
    <section id="espacio" className="relative bg-noche py-24 sm:py-32">
      <div className="contenedor grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        {/* Texto con personalidad */}
        <div>
          <Reveal as="span" className="kicker mb-4">
            Quiénes somos
          </Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(2rem,4.6vw,3.1rem)] leading-tight text-hueso">
            No es un café con luz de oficina.
            <span className="text-vela"> Es un rincón con hora de vela.</span>
          </Reveal>
          <Reveal as="p" delay={140} className="mt-6 max-w-[52ch] font-sans text-base leading-relaxed text-niebla/80">
            Carminia abrió en Burzaco para ser lo contrario del apuro. De día, un café
            de especialidad con pastelería casera. De noche, la araña se enciende, se
            descorcha una botella y la pared de etiquetas hace el resto. Mismo lugar,
            dos maneras de quedarse.
          </Reveal>

          <div className="mt-9 space-y-6">
            {RASGOS.map((r, i) => (
              <Reveal key={r.titulo} delay={200 + i * 90} className="flex gap-4">
                <span className="mt-2 h-px w-8 shrink-0 bg-vela/70" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-xl text-crema">{r.titulo}</h3>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-salvia">{r.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Foto de la vinoteca, a sangre */}
        <Reveal delay={120}>
          <figure className="relative overflow-hidden rounded-[26px] border border-salvia/15 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
            <div
              role="img"
              aria-label="La barra de Carminia con la pared de vinos y mesas de madera bajo luz cálida"
              className="aspect-[4/5] bg-cover bg-center transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
              style={{
                backgroundColor: '#14291d',
                backgroundImage:
                  "url('./fotos/vinoteca.jpg'), linear-gradient(135deg, #1a3a29, #0b1510)",
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{ background: 'linear-gradient(to top, rgba(11,21,16,0.55), transparent 45%)' }}
            />
            <figcaption className="absolute bottom-5 left-5 font-display text-lg italic text-hueso/90">
              La pared de etiquetas
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
