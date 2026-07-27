# Carminia Café — Landing Page

Landing page estática para **Carminia Café** (Burzaco, Almirante Brown, Buenos Aires).

## Contenido

- `index.html` — página completa (HTML + CSS en un solo archivo, sin dependencias de build).

## Características

- Paleta verde predominante (verde noche, bosque y salvia) con acentos crema y dorado.
- Tipografías: Fraunces (títulos) + Jost (texto), vía Google Fonts.
- Secciones: hero limpio con sello giratorio, cinta marquee, nosotros, feed de Instagram, mapa de ubicación y frase de cierre.
- **Fotos reales**: el sitio incrusta el feed oficial de Instagram de [@carminiacafe](https://www.instagram.com/carminiacafe/), así las fotos siempre son las del local y se actualizan solas.
- **Ubicación**: mapa interactivo de Google Maps incrustado con el pin exacto del café, más botón "Cómo llegar".
- Animaciones: aparición al hacer scroll (IntersectionObserver), hojas flotantes, hovers. Respeta `prefers-reduced-motion`.
- Diseño responsive. Un solo archivo, JS mínimo. Sin fotos de stock.

## Cómo verla

Abrí `index.html` en el navegador, o publicala con GitHub Pages (Settings → Pages → rama principal, carpeta `/`).

> Nota: el feed de Instagram y el mapa incrustados cargan desde Instagram/Google, por lo que necesitan conexión y se ven mejor con el sitio publicado (no siempre renderizan abriendo el archivo localmente).

## Datos a ajustar

Los horarios son de ejemplo — editalos directamente en `index.html` (sección `#visitanos`).
