import { useEffect, useRef } from 'react'

const pad = (n) => String(n).padStart(3, '0')

// Scroll-driven frame-sequence player. Preloads a numbered 30 FPS image
// sequence, maps a 0..1 scroll-progress ref onto the frame index and repaints
// the canvas only when the active frame changes. Scrolling up naturally
// reverses playback because the frame is derived purely from scroll position.
export default function ScrollSequence({
  progressRef,
  frameCount = 300,
  basePath = '/3D-Nikon-Camera/',
  className = '',
}) {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')

    let cancelled = false
    let raf = null
    let visible = true
    let ready = false
    let drawn = -1
    let loaded = 0
    const frames = new Array(frameCount).fill(null)

    // --- preload, in order, limited concurrency ---
    let next = 0
    const PARALLEL = 10
    const pump = () => {
      while (!cancelled && next < frameCount && next - loaded < PARALLEL) {
        const i = next++
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => {
          if (cancelled) return
          frames[i] = img
          loaded++
          if (!ready && loaded >= 6) {
            ready = true
            canvas.classList.add('is-ready')
          }
          pump()
        }
        img.onerror = () => {
          if (!cancelled) {
            loaded++
            pump()
          }
        }
        img.src = `${basePath}ezgif-frame-${pad(i + 1)}.jpg`
      }
    }
    pump()

    // --- sizing ---
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(wrap.clientWidth * dpr))
      canvas.height = Math.max(1, Math.round(wrap.clientHeight * dpr))
      drawn = -1
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)

    const draw = (i) => {
      const img = frames[i]
      if (!img || !canvas.width || !canvas.height) return
      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const sW = canvas.width / iw
      const sH = canvas.height / ih
      // always contain the full frame inside the canvas region so the
      // widest explosion is never cropped, then zoom toward the assembled
      // camera so it reads as the hero of the section; the zoom eases out
      // exactly as parts separate and back in as they reassemble.
      const spread = Math.abs(2 * current - 1) // 1 assembled, 0 fully exploded
      const scale = Math.min(sW, sH) * (1 + 0.7 * spread)
      const dw = iw * scale
      const dh = ih * scale
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, (canvas.width - dw) / 2, (canvas.height - dh) / 2, dw, dh)
      drawn = i
    }

    // --- scroll-synced playback (lightly damped for cinematic smoothness) ---
    let current = 0
    let last = performance.now()
    const tick = (now) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (!visible || !ready) return
      const target = Math.min(1, Math.max(0, progressRef?.current ?? 0))
      current += (target - current) * (1 - Math.pow(0.0001, dt))
      if (Math.abs(target - current) < 0.0004) current = target
      const idx = Math.round(current * (frameCount - 1))
      if (idx !== drawn) {
        if (frames[idx]) draw(idx)
        else {
          // nearest loaded frame while the sequence is still streaming in
          for (let d = 1; d < frameCount; d++) {
            if (frames[idx - d]) return draw(idx - d)
            if (frames[idx + d]) return draw(idx + d)
          }
        }
      }
    }
    raf = requestAnimationFrame(tick)

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
      },
      { rootMargin: '300px' }
    )
    io.observe(wrap)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [progressRef, frameCount, basePath])

  return (
    <div
      ref={wrapRef}
      className={`camera-canvas-wrap ${className}`.trim()}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <canvas
        ref={canvasRef}
        aria-label="Scroll-driven disassembly animation of a professional DSLR camera"
        role="img"
        className="seq-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  )
}
