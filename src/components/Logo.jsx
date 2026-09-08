import { Link } from 'react-router-dom'

export default function Logo({ dark = false, className = '' }) {
  return (
    <Link to="/" className={`logo ${dark ? 'logo--dark' : ''} ${className}`} aria-label="ReCreative — home">
      <img src="/ReCreative-Logo-og.webp" alt="ReCreative" width="64" height="64" />
    </Link>
  )
}
