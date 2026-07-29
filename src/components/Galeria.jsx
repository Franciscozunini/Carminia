import Reveal from './Reveal.jsx'
import { Divisor, Corona } from './Motivo.jsx'

// Galería editorial asimétrica con las 3 fotos reales. Evita a propósito el
// patrón genérico de fotos redondeadas superpuestas en diagonal.
const FOTOS = [
  {
    src: './fotos/interior.jpg',
    alt: 'Mesa de madera y araña de caireles encendida en la penumbra de Carminia',
    pie: 'El salón',
    clase: 'sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto',
  },
  {
    src: './fotos/vinoteca.jpg',
    alt: 'La barra larga y la pared de vinos de Carminia',
    pie: 'La barra',
    clase: 'aspect-square',
  },
  {
    src: './fotos/fachada.jpg',
    alt: 'La fachada de Carminia de noche, con las luces cálidas encendidas',
    pie: 'La entrada',
    clase: 'aspect-square',
  },
]

export default function Galeria() {
  return (
    <section id="galeria" className="relative bg-gradient-to-b from-noche to-bosque py-24 sm:py-32">
      <div className="contenedor">
        <div className="mb-14 text-center">
          <Reveal>
            <Corona className="mb-4" />
          </Reveal>
          <Reveal as="span" className="kicker mb-3">
            Adentro
          </Reveal>
          <Reveal as="h2" delay={80} className="text-[clamp(2rem,4.6vw,3.1rem)] text-hueso">
            Así se ve Carminia
          </Reveal>
        </div>

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-4 sm:grid-cols-3">
          {FOTOS.map((f, i) => (
            <Reveal
              key={f.src}
              delay={i * 110}
              className={`group relative overflow-hidden rounded-2xl border border-salvia/12 ${f.clase}`}
            >
              <div
                role="img"
                aria-label={f.alt}
                className="h-full w-full bg-cover bg-center transition-transform duration-[1.3s] ease-out group-hover:scale-[1.05]"
                style={{
                  backgroundColor: '#14291d',
                  backgroundImage: `url('${f.src}'), linear-gradient(145deg, #1a3a29, #0b1510)`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-40"
                aria-hidden="true"
                style={{ background: 'linear-gradient(to top, rgba(11,21,16,0.7), transparent 55%)' }}
              />
              <span className="absolute bottom-4 left-4 font-display text-lg italic text-hueso/90">
                {f.pie}
              </span>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160}>
          <Divisor className="mt-16" />
        </Reveal>
      </div>
    </section>
  )
}
