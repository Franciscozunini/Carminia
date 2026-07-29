import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Pizarra from './components/Pizarra.jsx'
import Marquee from './components/Marquee.jsx'
import Espacio from './components/Espacio.jsx'
import Galeria from './components/Galeria.jsx'
import Instagram from './components/Instagram.jsx'
import Visita from './components/Visita.jsx'
import Frase from './components/Frase.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      {/* Salto directo al contenido para lectores de teclado/pantalla */}
      <a
        href="#espacio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-vela focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-noche"
      >
        Saltar al contenido
      </a>

      <Nav />
      <main>
        <Hero />
        <Pizarra />
        <Marquee />
        <Espacio />
        <Galeria />
        <Instagram />
        <Visita />
        <Frase />
      </main>
      <Footer />
    </>
  )
}
