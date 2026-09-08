import { useEffect, useRef } from 'react'
import { useMedia } from '../lib/motion'

// React wrapper for CameraScene — lazy-loaded (this module is imported
// dynamically), quality-aware, pauses when offscreen.
// poseRef: { current: { p, spin, camZ, camY, lookY } } — updated by the page
// (GSAP ScrollTrigger) and consumed every frame.
export default function CameraCanvas({ poseRef, className = '', onReady }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const sceneRef = useRef(null)
  const lowPower = useMedia('(max-width: 760px)')

  useEffect(() => {
    let scene = null
    let ro
    let io
    let cancelled = false

    import('./CameraScene').then(({ CameraScene }) => {
      if (cancelled || !canvasRef.current) return
      scene = new CameraScene(canvasRef.current, { quality: lowPower ? 'low' : 'high' })
      sceneRef.current = scene

      const resize = () => {
        const el = wrapRef.current
        if (el && scene) scene.resize(el.clientWidth, el.clientHeight)
      }
      resize()
      ro = new ResizeObserver(resize)
      ro.observe(wrapRef.current)

      // pause rendering when offscreen
      io = new IntersectionObserver(
        ([entry]) => {
          if (scene) scene.running = entry.isIntersecting
        },
        { rootMargin: '160px' }
      )
      io.observe(wrapRef.current)

      const onPointer = (e) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        scene.setPointer(nx, ny)
      }
      window.addEventListener('pointermove', onPointer, { passive: true })
      cleanupPointer = () => window.removeEventListener('pointermove', onPointer)

      onReady?.(scene)
    })

    let cleanupPointer = () => {}

    return () => {
      cancelled = true
      ro?.disconnect()
      io?.disconnect()
      cleanupPointer()
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [lowPower])

  // Feed the pose each frame.
  useEffect(() => {
    let raf
    const tick = () => {
      if (sceneRef.current && poseRef?.current) sceneRef.current.setPose(poseRef.current)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [poseRef])

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} aria-label="Interactive 3D model of a professional camera" role="img" />
    </div>
  )
}
