# Carminia Café — Landing Page (rediseño v2)

Landing page estática para **Carminia Café** (Burzaco, Almirante Brown, Buenos Aires).

> Esta rama (`rediseno-v2`) contiene el rediseño completo del sitio, hecho siguiendo
> las skills de diseño del repo (`.claude/skills/`): `web-diseno-premium`,
> `emil-design-eng`, `apple-design` y `ui-ux-pro-max`.

## Contenido

- `index.html` — página completa (HTML + CSS en un solo archivo, sin dependencias de build).
- `.claude/skills/` — skills de diseño que guían cualquier rediseño futuro.

## Sistema de diseño

- **Paleta**: verde botánico sobre papel claro (`--hoja #1F4A32`, `--papel #F1F2EA`,
  `--hoja-oscura #122B1E`, `--salvia #A9C0AE`) con acento ámbar de horno (`--ambar #8F6118`).
  Tokens semánticos como variables CSS; los componentes no usan hex directo.
- **Tipografía**: Bricolage Grotesque (display, con eje óptico y pesos 260–750) +
  Public Sans (texto) + JetBrains Mono (etiquetas y datos), vía Google Fonts.
  Tracking negativo e interlineado apretado solo en tamaños display.
- **Elemento firma**: *la pizarra de la barra* — un panel mono estilo ticket en el hero
  que muestra el estado real del local (abierto/cerrado calculado con la hora de
  Buenos Aires), la hora local y el horario del día. Se repite como línea de estado
  en la sección de visita.
- **Componentes**: nav translúcida (el contenido pasa por debajo; sombra suave al
  scrollear en vez de borde duro), hero tipográfico asimétrico, carta de la barra en
  filas con etiqueta mono, feed de Instagram, mapa + fichas de visita, cierre y footer
  con marca gigante.
- **Movimiento**: dos momentos — entrada del hero (CSS `@starting-style`, sin JS) y
  aparición en scroll con stagger de 60 ms. Transiciones (no keyframes), curvas
  custom, botones con `scale(0.97)` al presionar. Respeta `prefers-reduced-motion`,
  `prefers-reduced-transparency` y `prefers-contrast`.
- **Fotos reales**: el sitio incrusta el feed oficial de Instagram de
  [@carminiacafe](https://www.instagram.com/carminiacafe/), así las fotos siempre son
  las del local y se actualizan solas. Sin fotos de stock.
- **Ubicación**: mapa interactivo de Google Maps incrustado con el pin exacto del café.
- **Accesibilidad**: skip link, landmarks semánticos, `aria-expanded` en el menú, foco
  visible, contraste ≥ 4.5:1, íconos SVG (sin emojis), áreas táctiles ≥ 44 px.

## Cómo verla

Abrí `index.html` en el navegador, o publicala con GitHub Pages (Settings → Pages → rama principal, carpeta `/`).

> Nota: el feed de Instagram y el mapa incrustados cargan desde Instagram/Google, por lo que necesitan conexión y se ven mejor con el sitio publicado (no siempre renderizan abriendo el archivo localmente).

## Datos a ajustar

Los horarios son de ejemplo — editalos en `index.html` en **dos** lugares que deben
coincidir: la tabla visible (sección `#visitanos`) y la constante `HORARIOS` del
script (que calcula el estado abierto/cerrado de la pizarra).
