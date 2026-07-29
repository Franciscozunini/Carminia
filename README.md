# Carminia Café — Landing

Landing **informativa** de Carminia Café (Burzaco, Almirante Brown, Buenos Aires).
No vende nada online: es sólo la carta de presentación del local. Reconstruida en
**React + Vite + Tailwind**, con la dirección de arte sacada de las fotos reales del
local — oscuro, cálido, a la luz de las velas, verde de marca profundo.

## Poner las fotos (único paso manual)

El sitio referencia 3 fotos por ruta fija. Copiá los archivos en `public/fotos/`
con estos nombres exactos (no hay que tocar código):

| Archivo          | Foto                                              |
|------------------|---------------------------------------------------|
| `interior.jpg`   | El salón (mesa + araña de caireles). Va al hero.  |
| `vinoteca.jpg`   | La barra con la pared de vinos.                   |
| `fachada.jpg`    | La fachada de noche con las luces encendidas.     |

Mientras no estén, el sitio muestra gradientes verdes de fallback — nada se rompe.
Ver `public/fotos/LEEME.md` para más detalle.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción → dist/
npm run preview  # sirve el build
```

## Estructura

```
src/
  App.jsx                  # composición de secciones
  index.css                # tokens base, foco visible, botón-arco, reduced-motion
  lib/horario.js           # horarios + estado abierto/cerrado en tiempo real (zona AR)
  hooks/
    useEstadoLocal.js      # recalcula el estado cada 30s
    useReveal.js           # aparición al scroll (respeta reduced-motion)
  components/
    Motivo.jsx             # motivo gráfico propio: "portal con llama" (se repite)
    Nav, Hero, Pizarra, Marquee, Espacio, Galeria,
    Instagram, Visita, Frase, Footer, Reveal
```

## Qué mantiene de la versión anterior

- **Pizarra con estado abierto/cerrado en tiempo real** (ahora calculado en la zona
  horaria del local y actualizándose solo cada 30s).
- **Feed real de Instagram** de [@carminiacafe](https://www.instagram.com/carminiacafe/) embebido.
- **Mapa** de Google Maps con el pin del local.
- **Accesibilidad**: foco visible, `prefers-reduced-motion`, contraste alto,
  textos alternativos, `aria-live` en el estado, link "saltar al contenido".

## Datos a ajustar

- **Horarios**: son de ejemplo. Editá `HORARIOS` y `HORARIOS_LEGIBLES` en
  `src/lib/horario.js`.
- **Verde de marca**: el token `musgo`/`pino` en `tailwind.config.js` es un verde
  profundo aproximado. Si tenés el hex exacto de Instagram, cambialo ahí.
- **Dirección exacta**: la sección "Visitá" usa Burzaco + el pin del mapa; sumá la
  calle y número cuando lo confirmes.
