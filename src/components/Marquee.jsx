// Cinta que se desplaza en loop. Decorativa (aria-hidden) y se frena con
// prefers-reduced-motion.
const PALABRAS = [
  'Café de especialidad',
  'Vinos a la luz de las velas',
  'Pastelería casera',
  'Un refugio en Burzaco',
]

export default function Marquee() {
  const tanda = [...PALABRAS, ...PALABRAS]
  return (
    <div
      className="overflow-hidden border-y border-salvia/12 bg-bosque py-4"
      aria-hidden="true"
    >
      <div className="flex w-max motion-safe:animate-desplazar">
        {[0, 1].map((grupo) => (
          <div key={grupo} className="flex shrink-0">
            {tanda.map((p, i) => (
              <span
                key={`${grupo}-${i}`}
                className="mx-6 font-display text-base italic uppercase tracking-[0.12em] text-salvia"
              >
                {p}
                <span className="ml-6 text-vela">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
