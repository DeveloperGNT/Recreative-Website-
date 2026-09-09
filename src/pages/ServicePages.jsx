import { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSEO, breadcrumbSchema, serviceSchema, faqSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { SERVICES, PHOTOGRAPHY_SERVICES, VIDEOGRAPHY_SERVICES, serviceBySlug, typeOf, serviceHref } from '../data/services'
import { LOCATIONS } from '../data/locations'
import { SITE } from '../data/site'
import { FILMS } from '../data/videos'
import { PageHero, FAQSection } from '../components/ui'
import CTASection from '../components/CTASection'
import VideoCard from '../components/VideoCard'
import WorkMarquee from '../components/WorkMarquee'
import NotFound from './NotFound'

/* ---------------- Hub pages ---------------- */

export function PhotographyHub() {
  return (
    <Hub
      kind="photography"
      title="Photography Services"
      lede="Sixteen disciplines of product photography from marketplace-ready white background masters to cinematic creative campaigns."
      intro="Every category below is produced end-to-end in the Mumbai studio: briefed, styled, shot, edited and delivered in the exact formats your platforms require. Choose a discipline to see what's included, how it works and where we deliver it."
      services={PHOTOGRAPHY_SERVICES}
    />
  )
}

export function VideographyHub() {
  return (
    <Hub
      kind="videography"
      title="Videography Services"
      lede="Product films, model shoots and 360° videos — directed in-studio and edited to hold attention."
      intro="Video is where products prove themselves: motion, scale, texture and use. ReCreative directs and produces commercial films end-to-end — planning, shooting, editing, grading and delivery — for marketplaces, social and campaigns."
      services={VIDEOGRAPHY_SERVICES}
    />
  )
}

function Hub({ kind, title, lede, intro, services }) {
  useSEO({
    title: `${title} | ReCreative`,
    description: lede,
    path: `/${kind}/`,
    schema: [
      breadcrumbSchema([{ label: 'Home', href: '/' }, { label: title, href: `/${kind}/` }]),
      serviceSchema({ name: `${title} — Mumbai studio`, description: lede, path: `/${kind}/` }),
    ],
  })

  return (
    <>
      <PageHero
        label={`${kind} — services`}
        title={title}
        lede={lede}
        crumbs={[{ label: 'Home', href: '/' }, { label: title }]}
        meta={`${services.length} services · Delivered from the Mumbai studio`}
      />
      <section className="hub">
        <div className="wrap">
          <Reveal as="p" className="prose" style={{ fontSize: '1.08rem' }}>{intro}</Reveal>
          <div className="hub__list">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 30}>
                <Link to={serviceHref(s)} className="hub__row">
                  <span className="n">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{s.name}</h3>
                  <p>{s.lede}</p>
                  <span className="arr" aria-hidden="true">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
          {kind === 'videography' && <VideographyShowcase />}
        </div>
      </section>
      {kind === 'photography' && <WorkMarquee />}
      <FAQSection
        label="Common questions"
        title={`${title} — the essentials`}
        items={[
          {
            q: `Where is the ${kind} studio?`,
            a: `Our studio is in Sion, Mumbai. Clients across India and abroad ship products to us for ${kind}; Mumbai clients can also visit by appointment.`,
          },
          {
            q: 'How do I get a quote?',
            a: `Send your product list, references and target platforms to ${SITE.email} or call ${SITE.phone}. We reply with a plan, timeline and itemised quote.`,
          },
          {
            q: 'Can I combine photography and videography?',
            a: 'Yes — combining stills and film in one schedule is common and keeps your visual language consistent across both.',
          },
        ]}
      />
      <CTASection />
    </>
  )
}

function VideographyShowcase() {
  const films = [...FILMS, ...FILMS]
  const loadedFilms = useRef(new Set())
  const [loadedCount, setLoadedCount] = useState(0)
  const isReady = loadedCount === films.length

  const handleFilmLoad = (index) => {
    if (loadedFilms.current.has(index)) return
    loadedFilms.current.add(index)
    setLoadedCount(loadedFilms.current.size)
  }

  return (
    <section className="service-films" aria-labelledby="service-films-title">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />Selected films</Reveal>
        <Reveal as="h2" id="service-films-title" className="service-films__title">
          Motion that makes products <em className="df">memorable.</em>
        </Reveal>
        <div className={`film-marquee ${isReady ? 'is-ready' : ''}`} aria-label="Selected videography films">
          <div className="film-marquee__buffer" aria-live="polite" aria-hidden={isReady}>
            <p className="film-marquee__buffer-label">Preparing the film reel</p>
            <div className="film-marquee__buffer-track" role="progressbar" aria-valuenow={loadedCount} aria-valuemin="0" aria-valuemax={films.length}>
              <span style={{ width: `${(loadedCount / films.length) * 100}%` }} />
            </div>
            <p className="film-marquee__buffer-meta">Loading selected films <b>{loadedCount}/{films.length}</b></p>
          </div>
          <div className="film-marquee__track">
            {films.map((film, index) => (
              <div className="film-marquee__item" key={`${film.id}-${index}`}>
                <VideoCard film={film} ratio="4/5" autoplay onLoad={() => handleFilmLoad(index)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- Service page (per service) ---------------- */

export function ServicePage({ kind }) {
  const { service } = useParams()
  const svc = serviceBySlug(service)
  const valid = svc && typeOf(svc) === kind

  const path = valid ? `/${kind}/${svc.slug}/` : '/'
  const locationLinks = valid ? LOCATIONS.slice(0, 10) : []

  useSEO({
    title: valid ? `${svc.name} in Mumbai | ReCreative` : 'Page not found | ReCreative',
    description: valid ? `${svc.name} by ReCreative, Mumbai. ${svc.lede} Get a plan, timeline and quote.` : SITE.description,
    path,
    schema: valid
      ? [
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: kind === 'photography' ? 'Photography' : 'Videography', href: `/${kind}/` },
            { label: svc.name, href: path },
          ]),
          serviceSchema({ name: svc.name, description: svc.lede, path }),
          faqSchema(svc.faqs),
        ]
      : [],
  })

  if (!valid) return <NotFound />

  const siblings = SERVICES.filter((s) => s.type === svc.type && s.slug !== svc.slug)

  return (
    <>
      <PageHero
        label={kind}
        title={svc.name}
        lede={svc.lede}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: kind === 'photography' ? 'Photography' : 'Videography', href: `/${kind}/` },
          { label: svc.name },
        ]}
        meta="Studio: Sion, Mumbai · Serving brands across India & Bangladesh"
      >
        <div className="pagehero__images" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginTop: '2.6rem' }}>
          {svc.images.map((im) => (
            <div key={im.src} className="ph vf" style={{ aspectRatio: '4/3' }}>
              <span className="vf-b" aria-hidden="true" />
              <img src={`/images/${im.src}.webp`} alt={im.alt} />
            </div>
          ))}
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap sloc__body">
          <div className="prose">
            <h2>{svc.name} — what we do</h2>
            <p>{svc.intro}</p>
            <h2>What's included</h2>
            <ul style={{ margin: '0 0 1.2rem', paddingLeft: '1.2rem', color: 'var(--ink-2)' }}>
              {svc.offers.map((o) => <li key={o} style={{ marginBottom: '0.4rem' }}>{o}</li>)}
            </ul>
            <h2>Where it's used</h2>
            <p>{svc.uses.join(' · ')}.</p>
          </div>

          <aside className="sloc__aside">
            <div className="sloc__box">
              <h3>Available in your city</h3>
              <div className="chipgrid">
                {locationLinks.map((l) => (
                  <Link key={l.slug} className="chip" to={`/${kind}/${svc.slug}/${l.slug}/`}>
                    {svc.name} in {l.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="sloc__box">
              <h3>Related services</h3>
              <ul>
                {siblings.slice(0, 6).map((s) => (
                  <li key={s.slug}><Link to={serviceHref(s)}>{s.name}</Link></li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FAQSection items={svc.faqs} title={`${svc.name} — questions`} label="FAQ" />
      <CTASection
        title={<>Ready to shoot <em className="df">{svc.name.toLowerCase()}?</em></>}
        body={`Tell us about your products and where the images will run — we'll reply with a plan, a timeline and a quote for ${svc.name.toLowerCase()}.`}
      />
    </>
  )
}
