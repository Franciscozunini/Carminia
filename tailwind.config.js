/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Paleta derivada de las fotos reales del local: verde profundo casi
      // negro con luz de vela cálida. El "verde de marca" (@carminiacafe) vive
      // en `musgo` / `pino`; si tenés el hex exacto de Instagram, cambialo ahí.
      colors: {
        noche: '#0b1510',   // fondo dominante, verde-negro
        carbon: '#101d16',  // paneles apenas más claros
        bosque: '#14291d',  // verde bosque
        pino: '#1a3a29',    // verde de marca profundo
        musgo: '#245038',   // verde de marca medio  ← ajustar al hex real de IG
        salvia: '#93ab98',  // verde salvia apagado (texto secundario)
        niebla: '#c4d3c6',  // verde muy claro (textos sobre oscuro)
        vela: '#cf9a4e',    // ámbar de vela (acento cálido de las fotos)
        brasa: '#a9702c',   // ámbar profundo
        resplandor: '#f0c877', // brillo cálido
        crema: '#ece3d0',   // texto principal sobre oscuro
        hueso: '#f7f2e7',   // casi blanco cálido
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        marca: '0.32em',
      },
      keyframes: {
        // Ken Burns: zoom + paneo lento, en CSS puro (sin video).
        kenburns: {
          '0%': { transform: 'scale(1.04) translate(0, 0)' },
          '100%': { transform: 'scale(1.16) translate(-1.5%, -2%)' },
        },
        flotar: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        girar: {
          to: { transform: 'rotate(360deg)' },
        },
        desplazar: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        titilar: {
          '0%,100%': { opacity: '0.85', transform: 'scaleY(1)' },
          '45%': { opacity: '1', transform: 'scaleY(1.06)' },
          '70%': { opacity: '0.7', transform: 'scaleY(0.96)' },
        },
        bajarScroll: {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        kenburns: 'kenburns 26s ease-in-out infinite alternate',
        flotar: 'flotar 8s ease-in-out infinite',
        girar: 'girar 26s linear infinite',
        desplazar: 'desplazar 34s linear infinite',
        titilar: 'titilar 4.5s ease-in-out infinite',
        bajarScroll: 'bajarScroll 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
