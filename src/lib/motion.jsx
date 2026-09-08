import { useEffect, useRef, useState } from 'react'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Adds .is-in when the element scrolls into view (one-shot).
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.classList.add('is-in')
      return
    }

    // Immediately reveal if already in or near viewport on mount
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 150 && rect.bottom > -150) {
      el.classList.add('is-in')
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0, rootMargin: '150px 0px 50px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export function Reveal({ as: Tag = 'div', className = '', variant = '', delay = 0, children, ...rest }) {
  const ref = useReveal()
  const cls = `rv ${variant} ${className}`.trim()
  return (
    <Tag ref={ref} className={cls} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}

// Media query hook
export function useMedia(q) {
  const [match, setMatch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(q).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(q)
    const fn = () => setMatch(mq.matches)
    fn()
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [q])
  return match
}

// Page transition veil state via a tiny event bus (used by Layout + Link veil)
export const transitionBus = {
  emitStart() {
    window.dispatchEvent(new CustomEvent('rc:transition'))
  },
}
