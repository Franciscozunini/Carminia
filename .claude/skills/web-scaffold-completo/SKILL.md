---
name: web-scaffold-completo
description: >
  Usar SIEMPRE que el usuario pida crear una web, sitio, página, landing,
  landing page, mini-sitio, "algo para mostrar mi negocio/producto", o
  cualquier variante de "hacé/armá/creá una web/página/landing". Esto
  aplica incluso si el usuario pide algo que suena simple o chico
  ("landing simple", "una página básica", "algo rápido") — el usuario
  SIEMPRE quiere un proyecto completo, nunca un archivo HTML suelto.
  No preguntar si quiere el proyecto completo: es la política por defecto.
---

# Scaffold completo de proyecto web

## Regla no negociable

Cuando el usuario pida cualquier tipo de sitio web — landing, página de
producto, portfolio, sitio institucional, lo que sea — **nunca entregues
un único archivo `index.html` autocontenido**, aunque el pedido suene a
"algo simple" o "una landing nada más". Siempre armá un proyecto completo,
con build tool y estructura de carpetas real.

Si el usuario en algún momento pide explícitamente "un solo HTML, sin
build, para pegar en cualquier lado" — ahí sí, priorizá lo que pide
explícitamente. Pero por defecto, sin que lo aclare: proyecto completo.

## Stack por defecto

- **Vite** como build tool
- **React** para los componentes
- **Tailwind CSS** para estilos
- **TypeScript** si el usuario no dice lo contrario (si prefiere JS puro, respetalo)

## Estructura mínima esperada

```
proyecto/
├── package.json
├── package-lock.json
├── vite.config.js (o .ts)
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── index.html          (entry point de Vite, no la página final)
├── .gitignore
├── README.md
├── public/
│   └── (assets estáticos: favicon, imágenes, etc.)
└── src/
    ├── main.jsx (o .tsx)
    ├── App.jsx
    ├── index.css (con directivas de Tailwind)
    ├── components/
    │   ├── Hero.jsx
    │   ├── Features.jsx
    │   ├── CTA.jsx
    │   ├── Footer.jsx
    │   └── ... (una sección = un componente, nunca todo en App.jsx)
    └── assets/
        └── (imágenes, íconos usados por componentes)
```

## Por qué componentizado y no todo en un archivo

Cada sección va en su propio componente dentro de src/components/.
App.jsx solo importa y ordena, no contiene JSX de secciones completas.
Esto permite pedir "cambiame solo el Hero" sin tocar todo el archivo.

## Hacelo dinámico, no estático

- Formularios de contacto con estado y validación (useState)
- Animaciones/transiciones con Tailwind o framer-motion si aplica
- Datos repetibles (tarjetas, testimonios) como arrays mapeados en JSX
- Funciones de submit separadas, preparadas para conectar a backend después

## Después de generar

1. Correr npm install y npm run build para confirmar que compila.
2. Avisar cómo correrlo (npm run dev) y generar build (npm run build).
3. No borrar la carpeta .claude/ si ya existe.
