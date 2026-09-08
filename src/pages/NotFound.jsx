import { Link } from 'react-router-dom'
import { useSEO } from '../lib/seo'

export default function NotFound() {
  useSEO({
    title: 'Page Not Found | ReCreative',
    description: 'The requested page could not be found.',
    path: '/404',
  })

  return (
    <section className="section" style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
      <div className="wrap">
        <p className="section-label" style={{ justifyContent: 'center' }}>
          <span className="tick" />
          404 Error
        </p>
        <h1 className="display" style={{ marginBottom: '1.2rem' }}>
          Page <em className="df">not found.</em>
        </h1>
        <p style={{ maxWidth: '48ch', margin: '0 auto 2.4rem', color: 'var(--ink-2)' }}>
          The page you are looking for does not exist, has been removed, or has moved to another address.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn--solid">
            Return to Home
          </Link>
          <Link to="/photography/" className="btn btn--ghost">
            Explore Photography
          </Link>
        </div>
      </div>
    </section>
  )
}
