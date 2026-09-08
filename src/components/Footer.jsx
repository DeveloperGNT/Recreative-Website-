import { Link } from 'react-router-dom'
import { SITE } from '../data/site'
import { PHOTOGRAPHY_SERVICES, VIDEOGRAPHY_SERVICES, serviceHref } from '../data/services'
import { LOCATIONS, locationHref } from '../data/locations'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo dark />
            <p>
              A Mumbai studio creating professional product photography and videography for
              websites, e-commerce and social media — trusted by brands from small businesses
              to Fortune 400+ companies.
            </p>
            <div className="footer__socials">
              {SITE.socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="footer__soc">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div className="footer__cols">
            <div>
              <h3 className="footer__h">Photography</h3>
              <ul>
                {PHOTOGRAPHY_SERVICES.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link to={serviceHref(s)}>{s.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/photography/" className="footer__more">
                    All photography →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer__h">Videography</h3>
              <ul>
                {VIDEOGRAPHY_SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link to={serviceHref(s)}>{s.name}</Link>
                  </li>
                ))}
                <li>
                  <Link to="/locations/" className="footer__more">
                    Locations →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="footer__h">Locations</h3>
              <ul>
                {LOCATIONS.map((l) => (
                  <li key={l.slug}>
                    <Link to={locationHref(l)}>{l.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="footer__h">Studio</h3>
              <ul>
                <li><Link to="/about/">About</Link></li>
                <li><Link to="/blog/">Blog</Link></li>
                <li><Link to="/faq/">FAQ</Link></li>
                <li><Link to="/contact/">Contact</Link></li>
                <li><a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a></li>
                <li><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
              </ul>
              <address className="footer__addr">
                {SITE.addressLines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
            </div>
          </div>
        </div>

        <div className="footer__bar">
          <p>© {new Date().getFullYear()} ReCreative. All rights reserved.</p>
          <p className="meta">Made in Mumbai · Shot everywhere</p>
        </div>
      </div>
    </footer>
  )
}
