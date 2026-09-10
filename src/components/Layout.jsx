import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Nav from './Nav'
import Footer from './Footer'
import LoadingBuffer from './LoadingBuffer'
import { prefersReducedMotion } from '../lib/motion'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Aperture-veil page transition on route change.
function Veil() {
  const [state, setState] = useState('idle') // idle | in | out
  const { pathname } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (prefersReducedMotion()) return
    setState('in')
    const t1 = setTimeout(() => setState('out'), 60)
    const t2 = setTimeout(() => setState('idle'), 640)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [pathname])

  if (state === 'idle') return null
  return (
    <div className={`veil ${state === 'in' ? 'veil--in' : 'veil--out'}`} aria-hidden="true">
      <span />
    </div>
  )
}

export default function Layout() {
  return (
    <>
      <LoadingBuffer />
      <a href="#main" className="skip">Skip to content</a>
      <ScrollToTop />
      <Veil />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
