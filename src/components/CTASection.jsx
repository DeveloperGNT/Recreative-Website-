import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { useRef } from 'react'

// Aperture iris SVG — opens on hover, closes on leave.
function Iris() {
  const ref = useRef(null)
  const blades = 7
  const onEnter = () => ref.current?.classList.add('is-open')
  const onLeave = () => ref.current?.classList.remove('is-open')
  return (
    <div
      className={`iris ${'is-open'}`}
      ref={ref}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100">
        {Array.from({ length: blades }).map((_, i) => (
          <path
            key={i}
            className="iris__blade"
            style={{ transitionDelay: `${i * 30}ms`, transformOrigin: '50px 50px' }}
            d="M50 50 L50 2 A48 48 0 0 1 83.8 16.2 Z"
            transform={`rotate(${(360 / blades) * i} 50 50)`}
          />
        ))}
        <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  )
}

export default function CTASection({
  title = (
    <>
      Let’s put your product <em className="df">in the best light.</em>
    </>
  ),
  body = 'Tell us what you sell and where it needs to be seen — we will reply with a plan, a timeline and a quote.',
}) {
  return (
    <section className="section cta">
      <div className="wrap cta__in">
        <div className="cta__iris"><Iris /></div>
        <p className="section-label"><span className="tick" />Start a project</p>
        <h2 className="cta__title">{title}</h2>
        <p className="cta__body">{body}</p>
        <div className="cta__actions">
          <Link to="/contact/" className="btn btn--mint">
            Get a quote
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
          </Link>
          <a href={`tel:${SITE.phoneHref}`} className="btn btn--ghost">{SITE.phone}</a>
        </div>
      </div>
    </section>
  )
}
