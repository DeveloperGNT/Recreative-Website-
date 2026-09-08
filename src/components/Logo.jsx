import { Link } from 'react-router-dom'

// Transparent cut of the official ReCreative mark + wordmark typeset.
export default function Logo({ dark = false, className = '' }) {
  return (
    <Link to="/" className={`logo ${dark ? 'logo--dark' : ''} ${className}`} aria-label="ReCreative — home">
      <img src="/images/logo-rc.png" alt="" width="34" height="27" />
      <span className="logo__word">
        RE<i>CREATIVE</i>
      </span>
    </Link>
  )
}
