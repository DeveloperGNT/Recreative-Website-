import { useEffect } from 'react'
import { SITE } from '../data/site'

// Small document-head manager: title, description, canonical, OG/Twitter, JSON-LD.
export function useSEO({ title, description, path = '/', image, schema = [] }) {
  useEffect(() => {
    const url = SITE.url + path
    document.title = title
    setMeta('meta', 'name', 'description', description)
    setMeta('meta', 'property', 'og:title', title)
    setMeta('meta', 'property', 'og:description', description)
    setMeta('meta', 'property', 'og:url', url)
    setMeta('meta', 'property', 'og:type', 'website')
    setMeta('meta', 'property', 'og:site_name', SITE.name)
    setMeta('meta', 'name', 'twitter:card', 'summary_large_image')
    setMeta('meta', 'name', 'twitter:title', title)
    setMeta('meta', 'name', 'twitter:description', description)
    if (image) {
      setMeta('meta', 'property', 'og:image', image)
      setMeta('meta', 'name', 'twitter:image', image)
    }
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
  }, [title, description, path, image])

  useEffect(() => {
    const nodes = (schema.length ? schema : []).map((s) => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.dataset.dynamic = 'true'
      el.textContent = JSON.stringify(s)
      document.head.appendChild(el)
      return el
    })
    return () => nodes.forEach((n) => n.remove())
  }, [JSON.stringify(schema)])
}

function setMeta(tag, attr, key, content) {
  let el = document.head.querySelector(`${tag}[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content || '')
}

// ---- schema builders ----

export const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.label,
    item: SITE.url + it.href,
  })),
})

export const serviceSchema = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name,
  description,
  url: SITE.url + path,
  provider: {
    '@type': 'LocalBusiness',
    name: SITE.name,
    url: SITE.url,
    telephone: SITE.phoneHref,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400017',
      addressCountry: 'IN',
    },
  },
  areaServed: ['Mumbai', 'Pune', 'Bengaluru', 'Chennai', 'Kolkata', 'Jaipur', 'Surat', 'Rajkot', 'Panipat', 'Bangladesh'],
})

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})
