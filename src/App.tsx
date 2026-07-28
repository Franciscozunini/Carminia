import Nav from './components/Nav'
import Hero from './components/Hero'
import LaBarra from './components/LaBarra'
import Instagram from './components/Instagram'
import Visita from './components/Visita'
import Cierre from './components/Cierre'
import Footer from './components/Footer'
import { useRevealEnScroll } from './hooks/useRevealEnScroll'

export default function App() {
  useRevealEnScroll()

  return (
    <>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Nav />
      <main id="contenido">
        <Hero />
        <LaBarra />
        <Instagram />
        <Visita />
        <Cierre />
      </main>
      <Footer />
    </>
  )
}
