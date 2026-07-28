# Carminia Café — Sitio web (rediseño v2)

Sitio de **Carminia Café** (Burzaco, Almirante Brown, Buenos Aires). Proyecto
**Vite + React + TypeScript + Tailwind CSS**, estructurado según las skills de
diseño del repo (`.claude/skills/`): `web-scaffold-completo`, `web-diseno-premium`,
`emil-design-eng`, `apple-design` y `ui-ux-pro-max`.

## Cómo correrlo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # servir el build localmente
npm run lint      # ESLint
```

## Estructura

```
├── index.html                  # entry point de Vite (meta, fuentes, favicon)
├── vite.config.ts              # base './' para GitHub Pages
├── tailwind.config.js          # tokens: paleta, tipografía fluida, sombras, easings
├── .github/workflows/deploy.yml# build + deploy automático a GitHub Pages
├── public/favicon.svg
└── src/
    ├── main.tsx
    ├── App.tsx                 # solo importa y ordena las secciones
    ├── index.css               # Tailwind + sistema de movimiento + nav material
    ├── components/
    │   ├── Nav.tsx             # barra translúcida + menú móvil
    │   ├── Hero.tsx            # hero tipográfico asimétrico
    │   ├── Pizarra.tsx         # elemento firma: estado real abierto/cerrado
    │   ├── SeccionCabeza.tsx   # etiqueta mono + título display
    │   ├── LaBarra.tsx         # carta de la barra (filas mapeadas de datos)
    │   ├── Instagram.tsx       # feed real de @carminiacafe
    │   ├── Visita.tsx          # mapa con pin real + horarios + estado
    │   ├── Cierre.tsx
    │   ├── Footer.tsx
    │   └── Iconos.tsx          # SVG inline (sin emojis como íconos)
    ├── hooks/
    │   ├── useEstadoLocal.ts   # abierto/cerrado según hora de Buenos Aires
    │   └── useRevealEnScroll.ts# aparición en scroll con stagger
    └── data/
        ├── contenido.ts        # textos, enlaces y URLs (arrays mapeados en JSX)
        └── horarios.ts         # tabla única de horarios (alimenta UI y cálculo)
```

## Deploy

El workflow `.github/workflows/deploy.yml` corre en cada push a `main`:
instala dependencias, ejecuta `npm run build` y publica `dist/` en GitHub Pages.
En Settings → Pages hay que elegir **Source: GitHub Actions** (una sola vez).

## Sistema de diseño

- **Paleta**: verde botánico sobre papel claro (`hoja #1F4A32`, `papel #F1F2EA`,
  `hoja-oscura #122B1E`, `salvia #A9C0AE`) con acento ámbar de horno (`ambar #8F6118`).
  Tokens semánticos en `tailwind.config.js`; los componentes no usan hex directo.
- **Tipografía**: Bricolage Grotesque (display, eje óptico, pesos 260–750) +
  Public Sans (texto) + JetBrains Mono (etiquetas y datos). Tracking negativo e
  interlineado apretado solo en tamaños display.
- **Elemento firma**: *la pizarra de la barra* (`Pizarra.tsx`) — ticket mono con el
  estado real del local calculado con la hora de Buenos Aires, refrescado cada 30 s.
- **Movimiento**: entrada del hero con CSS `@starting-style` (sin JS) y aparición en
  scroll con stagger de 60 ms. Transiciones (no keyframes), curvas custom,
  `scale(0.97)` al presionar. Respeta `prefers-reduced-motion`,
  `prefers-reduced-transparency` y `prefers-contrast`.
- **Fotos reales**: feed oficial de Instagram incrustado; sin stock.
- **Accesibilidad**: skip link, landmarks, `aria-expanded`, foco visible,
  contraste ≥ 4.5:1, íconos SVG, áreas táctiles ≥ 44 px.

> El feed de Instagram y el mapa cargan desde Instagram/Google: necesitan conexión
> y se ven mejor con el sitio publicado.

## Datos a ajustar

Los horarios son de ejemplo — editá `src/data/horarios.ts` (la constante `HORARIOS`).
La tabla visible y el cálculo de abierto/cerrado salen de esa única fuente, así que
no pueden desincronizarse.
