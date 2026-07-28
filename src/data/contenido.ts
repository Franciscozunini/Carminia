/* Datos del negocio: todo lo repetible vive acá, los componentes solo mapean. */

export const INSTAGRAM_URL = 'https://www.instagram.com/carminiacafe/'
export const INSTAGRAM_EMBED_URL = 'https://www.instagram.com/carminiacafe/embed'

export const MAPS_URL =
  'https://www.google.com/maps/place/Carminia+Caf%C3%A9/@-34.7763438,-58.4050123,17z/data=!3m1!4b1!4m6!3m5!1s0x95bcd3001dcc42d5:0xcb14a5a820d39179!8m2!3d-34.7763438!4d-58.4050123!16s%2Fg%2F11w4ystm8l'

export const MAPS_EMBED_URL =
  'https://www.google.com/maps?q=Carminia%20Caf%C3%A9%2C%20Burzaco%2C%20Almirante%20Brown%2C%20Buenos%20Aires&ll=-34.7763438,-58.4050123&z=16&hl=es&output=embed'

export interface ItemBarra {
  etiqueta: string
  titulo: string
  descripcion: string
}

export const ITEMS_BARRA: ItemBarra[] = [
  {
    etiqueta: 'Barra',
    titulo: 'Espresso y filtrados',
    descripcion:
      'Granos seleccionados y métodos cuidados: del espresso clásico al filtrado del día, cada taza sale como tiene que salir.',
  },
  {
    etiqueta: 'Horno',
    titulo: 'Pastelería casera',
    descripcion:
      'Horneamos todos los días: medialunas, tortas, budines y cookies para acompañar cada momento del día.',
  },
  {
    etiqueta: 'Salón',
    titulo: 'Un espacio para quedarse',
    descripcion:
      'Tranquilo, verde y luminoso. Ideal para leer, trabajar o encontrarte con alguien querido.',
  },
]

export interface EnlaceNav {
  href: string
  label: string
}

export const ENLACES_NAV: EnlaceNav[] = [
  { href: '#la-barra', label: 'La barra' },
  { href: '#instagram', label: 'Instagram' },
  { href: '#visitanos', label: 'Visitanos' },
]
