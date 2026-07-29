import { useReveal } from '../hooks/useReveal.js'

// Envoltorio de aparición al scroll. `as` permite elegir la etiqueta.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...props }) {
  const { ref, visible } = useReveal()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={[
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(.22,.61,.36,1)] motion-reduce:transition-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </Tag>
  )
}
