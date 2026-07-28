# Carminia Café — Landing Page (rediseño v2)

Landing page estática para **Carminia Café** (Burzaco, Almirante Brown, Buenos Aires).

> Esta rama (`rediseno-v2`) contiene el rediseño completo del sitio: nueva paleta, tipografía, estructura de componentes y sistema de animaciones. La versión anterior vive en la rama `claude/carminia-cafe-website-yg2moo`.

## Contenido

- `index.html` — página completa (HTML + CSS en un solo archivo, sin dependencias de build).

## Características

- **Design tokens**: paleta verde (del verde noche al salvia, con papel y dorado), escala tipográfica fluida, espaciado y curvas de easing definidos como variables CSS.
- **Tipografía**: Instrument Serif (display) + Figtree (texto), vía Google Fonts.
- **Componentes**: nav (se oculta al bajar y reaparece al subir, con menú móvil a pantalla completa), hero, marquee, experiencia editorial numerada, cita interludio, feed de Instagram, mapa + tarjetas de visita, cierre CTA y footer. Cada uno con su bloque de CSS documentado.
- **Fotos reales**: el sitio incrusta el feed oficial de Instagram de [@carminiacafe](https://www.instagram.com/carminiacafe/), así las fotos siempre son las del local y se actualizan solas.
- **Ubicación**: mapa interactivo de Google Maps incrustado con el pin exacto del café.
- **Movimiento**: sistema de aparición en scroll con stagger (`data-reveal`), textura de grano, micro-interacciones en botones y links. Todo respeta `prefers-reduced-motion`.
- **Accesibilidad**: skip link, landmarks semánticos, `aria-expanded` en el menú, foco visible, contraste cuidado.
- Diseño responsive. Un solo archivo, sin dependencias ni build. Sin fotos de stock.

## Cómo verla

Abrí `index.html` en el navegador, o publicala con GitHub Pages (Settings → Pages → rama principal, carpeta `/`).

> Nota: el feed de Instagram y el mapa incrustados cargan desde Instagram/Google, por lo que necesitan conexión y se ven mejor con el sitio publicado (no siempre renderizan abriendo el archivo localmente).

## Datos a ajustar

Los horarios son de ejemplo — editalos directamente en `index.html` (sección `#visitanos`).
