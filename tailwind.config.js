/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Paleta de tokens semánticos: los componentes no usan hex directo
      colors: {
        papel: '#F1F2EA',
        blanco: '#FFFFFF',
        tinta: { DEFAULT: '#17251C', suave: '#46564C' },
        hoja: { DEFAULT: '#1F4A32', oscura: '#122B1E' },
        salvia: '#A9C0AE',
        ambar: '#8F6118',
        linea: { DEFAULT: 'rgba(23, 37, 28, 0.16)', oscura: 'rgba(169, 192, 174, 0.22)' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Arial Black"', 'sans-serif'],
        body: ['"Public Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'monospace'],
      },
      // Escala fluida: tracking negativo e interlineado apretado solo en display
      fontSize: {
        fluida: ['clamp(1.1rem, 1rem + 0.5vw, 1.3rem)', { lineHeight: '1.6' }],
        'titulo-menor': ['clamp(1.45rem, 1.2rem + 1.2vw, 2.1rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        titulo: ['clamp(2.2rem, 1.5rem + 3.4vw, 4.2rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        display: ['clamp(2.9rem, 1.4rem + 8.2vw, 8rem)', { lineHeight: '0.96', letterSpacing: '-0.025em' }],
        marca: ['clamp(3rem, 14vw, 9rem)', { lineHeight: '0.9', letterSpacing: '-0.03em' }],
      },
      spacing: {
        seccion: 'clamp(5.5rem, 3.5rem + 7vw, 10rem)',
        gutter: 'clamp(1.25rem, 4vw, 2.5rem)',
      },
      transitionTimingFunction: {
        salida: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'entrada-salida': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      boxShadow: {
        'bloque-hoja': '6px 6px 0 #1F4A32',
        'bloque-salvia': '6px 6px 0 #A9C0AE',
        nav: '0 10px 30px rgba(23, 37, 28, 0.08)',
      },
    },
  },
  plugins: [],
}
