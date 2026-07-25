# Carminia Café — Landing Page

Landing page estática para **Carminia Café** (Burzaco, Almirante Brown, Buenos Aires).

## Contenido

- `index.html` — página completa (HTML + CSS en un solo archivo, sin dependencias de build).

## Características

- Paleta verde predominante (verde noche, bosque y salvia) con acentos crema y dorado.
- Tipografías: Fraunces (títulos) + Jost (texto), vía Google Fonts.
- Secciones: hero con collage de fotos y sello giratorio, cinta marquee, nosotros, galería, menú, horarios/ubicación/Instagram y frase de cierre.
- Animaciones: aparición al hacer scroll (IntersectionObserver), fotos flotantes, hovers con zoom. Respeta `prefers-reduced-motion`.
- Diseño responsive. Un solo archivo, JS mínimo.
- Links reales: [Google Maps](https://www.google.com/maps/place/Carminia+Caf%C3%A9/@-34.7763438,-58.4050123,17z) e Instagram [@carminiacafe](https://www.instagram.com/carminiacafe/).

## Cómo verla

Abrí `index.html` en el navegador, o publicala con GitHub Pages (Settings → Pages → rama principal, carpeta `/`).

## ⚠️ Fotos: reemplazar por las del local

Las fotos actuales son de stock (Unsplash), usadas como relleno. Para poner las fotos reales del café:

1. Descargá tus fotos (por ejemplo, las que ya tenés en Instagram o Google Maps).
2. Creá una carpeta `img/` en el repo y guardalas ahí (ej. `img/local-1.jpg`).
3. En `index.html`, buscá las etiquetas `<img src="https://images.unsplash.com/...">` (hay 6: 2 en el hero, 1 en "Nosotros" y 4 en la galería... son fáciles de ubicar por los comentarios `<!-- Reemplazá ... -->`) y cambiá cada `src` por la ruta local.

## Datos a ajustar

Los horarios y el menú son de ejemplo — editalos directamente en `index.html` (secciones `#menu` y `#visitanos`).
