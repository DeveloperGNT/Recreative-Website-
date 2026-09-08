import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV } from '../data/site'
import { PHOTOGRAPHY_SERVICES, VIDEOGRAPHY_SERVICES, serviceHref } from '../data/services'
import { LOCATIONS } from '../data/locations'
import Logo from './Logo'

const MENUS = {
  photography: {
    base: '/photography/',
    title: 'Photography',
    items: PHOTOGRAPHY_SERVICES.map((s) => ({ label: s.name, href: serviceHref(s) })),
  },
  videography: {
    base: '/videography/',
    title: 'Videography',
    items: VIDEOGRAPHY_SERVICES.map((s) => ({ label: s.name, href: serviceHref(s) })),
  },
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [openMenu, setOpenMenu] = useState(null) // 'photography' | 'videography' | null
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 300 && y > lastY.current && !openMenu)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [openMenu])

  useEffect(() => {
    setMobileOpen(false)
    setOpenMenu(null)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [mobileOpen])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden && !mobileOpen ? 'nav--hidden' : ''}`}>
      <div className="nav__in">
        <Logo />
        <nav className="nav__links" aria-label="Primary">
          {NAV.map((item) =>
            item.menu ? (
              <div
                key={item.label}
                className="nav__item"
                onMouseEnter={() => setOpenMenu(item.menu)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <NavLink
                  to={item.href}
                  end
                  className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
                  aria-expanded={openMenu === item.menu}
                >
                  {item.label}
                  <svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
                </NavLink>
                <div className={`nav__panel ${openMenu === item.menu ? 'is-open' : ''}`}>
                  <Panel menu={MENUS[item.menu]} />
                </div>
              </div>
            ) : (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
              >
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div className="nav__cta">
          <a className="btn btn--solid nav__btn" href="/contact/">
            Start a project
          </a>
        </div>
        <button
          className={`burger ${mobileOpen ? 'is-open' : ''}`}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mnav ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mnav__scroll">
          {NAV.map((item) =>
            item.menu ? (
              <details key={item.label} className="mnav__group">
                <summary>{item.label}</summary>
                <div className="mnav__sub">
                  <Link to={item.href} className="mnav__sub-all">All {item.label}</Link>
                  {MENUS[item.menu].items.map((it) => (
                    <Link key={it.href} to={it.href}>
                      {it.label}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link key={item.label} to={item.href} className="mnav__link">
                {item.label}
              </Link>
            )
          )}
        </div>
        <div className="mnav__foot">
          <a className="btn btn--solid" href="/contact/">Start a project</a>
          <p className="meta">{LOCATIONS.length} locations served · Mumbai studio</p>
        </div>
      </div>
    </header>
  )
}

function Panel({ menu }) {
  return (
    <div className="nav__panel-in">
      <div className="nav__panel-head">
        <Link to={menu.base} className="alink">
          All {menu.title}
        </Link>
        <span className="meta">{menu.items.length} services</span>
      </div>
      <ul className="nav__panel-list">
        {menu.items.map((it) => (
          <li key={it.href}>
            <Link to={it.href}>{it.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
