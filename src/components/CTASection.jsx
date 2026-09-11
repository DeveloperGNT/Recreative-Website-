import { Link } from 'react-router-dom'
import { SITE } from '../data/site'

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
