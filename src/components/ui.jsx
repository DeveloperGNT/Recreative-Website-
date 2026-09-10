import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqSchema } from '../lib/seo'

export function Breadcrumbs({ items, dark = false }) {
  return (
    <nav className={`crumbs ${dark ? 'crumbs--dark' : ''}`} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1
        return (
          <span key={it.href || it.label} style={{ display: 'inline-flex', gap: '0.55rem', alignItems: 'center' }}>
            {it.href && !last ? (
              <Link to={it.href}>{it.label}</Link>
            ) : (
              <span aria-current={last ? 'page' : undefined}>{it.label}</span>
            )}
            {!last && <span className="sep" aria-hidden="true">/</span>}
          </span>
        )
      })}
    </nav>
  )
}

export function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="faq">
      {items.map((f, index) => {
        const isOpen = openIndex === index
        return (
        <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
          <button
            type="button"
            className="faq__q"
            aria-expanded={isOpen}
            onClick={() => setOpenIndex(isOpen ? null : index)}
          >
            {f.q}
            <span className="ix" aria-hidden="true" />
          </button>
          <div className="faq__a">
            <div>{f.a}</div>
          </div>
        </div>
        )
      })}
    </div>
  )
}

export function FAQSection({ items, title = 'Questions, answered', label = 'FAQ' }) {
  if (!items?.length) return null
  return (
    <section className="section">
      <div className="wrap faq-wrap">
        <p className="section-label"><span className="tick" />{label}</p>
        <h2 className="h2">{title}</h2>
        <FAQ items={items} />
      </div>
      <FaqSchema items={items} />
    </section>
  )
}

export function FaqSchema({ items }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }}
    />
  )
}

// Shared inner-page hero with breadcrumbs
export function PageHero({ label, title, lede, intro, crumbs, children, meta, image }) {
  return (
    <section className="pagehero">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <p className="section-label" style={{ marginTop: '1.6rem' }}>
          <span className="tick" />
          {label}
        </p>
        <div className="pagehero__row">
          <div className={`pagehero__copy ${intro ? 'pagehero__copy--intro' : ''}`}>
            <h1 className="pagehero__title">{title}</h1>
            {intro && <p className="pagehero__intro">{intro}</p>}
          </div>
          {image ? (
            <div className="pagehero__media">
              <img src={image.src} alt={image.alt} />
            </div>
          ) : lede ? (
            <p className="pagehero__lede">{lede}</p>
          ) : null}
        </div>
        {children}
        {meta && <p className="meta pagehero__meta">{meta}</p>}
      </div>
    </section>
  )
}

// Scroll cue / progress — a thin focus ring that fills as you read.
export function FocusBar() {
  return <div className="focusbar" aria-hidden="true"><span /></div>
}
