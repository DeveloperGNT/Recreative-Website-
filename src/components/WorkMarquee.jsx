import { useEffect, useRef } from 'react'
import { WORK } from '../data/portfolio'

const ROWS = [
  { items: WORK.slice(0, 12), direction: 'left', duration: 42 },
  { items: WORK.slice(12), direction: 'right', duration: 38 },
]

export default function WorkMarquee() {
  const trackRefs = useRef([])

  useEffect(() => {
    let cancelled = false
    let cleanup = () => {}

    import('gsap').then(({ gsap }) => {
      if (cancelled || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const tweens = trackRefs.current.map((track, index) => {
        if (!track) return null
        const row = ROWS[index]
        const marquee = track.closest('.work-marquee__row')
        const slowDown = () => gsap.to(tween, { timeScale: 0.2, duration: 0.5 })
        const speedUp = () => gsap.to(tween, { timeScale: 1, duration: 0.5 })
        const tween = gsap.fromTo(
          track,
          { xPercent: row.direction === 'left' ? 0 : -50 },
          {
            xPercent: row.direction === 'left' ? -50 : 0,
            duration: row.duration,
            ease: 'none',
            repeat: -1,
          }
        )
        marquee?.addEventListener('mouseenter', slowDown)
        marquee?.addEventListener('mouseleave', speedUp)
        return { marquee, tween, slowDown, speedUp }
      })

      cleanup = () => {
        tweens.forEach((entry) => {
          if (!entry) return
          entry.marquee?.removeEventListener('mouseenter', entry.slowDown)
          entry.marquee?.removeEventListener('mouseleave', entry.speedUp)
          entry.tween.kill()
        })
      }
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [])

  return (
    <section className="work-marquee" aria-labelledby="work-marquee-title">
      <div className="wrap">
        <p className="section-label"><span className="tick" />Selected work</p>
        <h2 id="work-marquee-title" className="h2">A moving edit of <em className="df">the work.</em></h2>
      </div>
      <div className="work-marquee__rows">
        {ROWS.map((row, rowIndex) => (
          <div className="work-marquee__row" key={row.direction}>
            <div
              className="work-marquee__track"
              ref={(node) => { trackRefs.current[rowIndex] = node }}
            >
              {[row.items, row.items].map((group, groupIndex) => (
                <div className="work-marquee__group" key={groupIndex} aria-hidden={groupIndex === 1}>
                  {group.map((item) => (
                    <figure
                      className="work-marquee__item"
                      key={`${groupIndex}-${item.src}`}
                      style={{ aspectRatio: item.ratio }}
                    >
                      <img src={item.src} alt={groupIndex === 1 ? '' : item.alt} loading="lazy" />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
