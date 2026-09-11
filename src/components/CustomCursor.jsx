import { useEffect, useRef } from 'react'

// Dot + trailing ring cursor in the brand teal. Desktop pointer devices only;
// touch and reduced-motion users keep the native cursor.
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const dot = dotRef.current
    const ring = ringRef.current
    document.documentElement.classList.add('has-cursor')

    const mouse = { x: -100, y: -100 }
    const ringPos = { x: -100, y: -100 }
    const dotPos = { x: -100, y: -100 }
    const target = { scale: 1 }
    const ringScale = { value: 1 }
    let visible = false
    let hovering = false
    let pressed = false
    let raf = 0

    const render = () => {
      dot.style.transform = `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)`
      dot.style.opacity = visible ? '1' : '0'
      ring.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) ` +
        `scale(${ringScale.value})`
      ring.style.opacity = visible ? '1' : '0'
    }

    const loop = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16
      ringPos.y += (mouse.y - ringPos.y) * 0.16
      // keep the dot inside the ring: clamp its offset to just within the ring edge
      const maxDist = 13 * ringScale.value
      let dx = mouse.x - ringPos.x
      let dy = mouse.y - ringPos.y
      const dist = Math.hypot(dx, dy)
      if (dist > maxDist) {
        dx = (dx / dist) * maxDist
        dy = (dy / dist) * maxDist
      }
      dotPos.x = ringPos.x + dx
      dotPos.y = ringPos.y + dy
      target.scale = (hovering ? 1.7 : 1) * (pressed ? 0.82 : 1)
      ringScale.value += (target.scale - ringScale.value) * 0.18
      render()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        visible = true
        ringPos.x = e.clientX
        ringPos.y = e.clientY
      }
    }

    const onOver = (e) => {
      hovering = !!e.target.closest('a, button, [role="button"], input, textarea, select, label, summary')
    }

    const onDown = () => { pressed = true }
    const onUp = () => { pressed = false }
    const onLeave = () => { visible = false }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
