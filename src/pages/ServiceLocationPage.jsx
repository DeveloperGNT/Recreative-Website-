import { Link, useParams } from 'react-router-dom'
import { useSEO, breadcrumbSchema, serviceSchema, faqSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { serviceBySlug, typeOf, PHOTOGRAPHY_SERVICES, VIDEOGRAPHY_SERVICES } from '../data/services'
import { locationBySlug, LOCATIONS, locationHref } from '../data/locations'
import { SITE } from '../data/site'
import { PageHero, FAQSection } from '../components/ui'
import CTASection from '../components/CTASection'
import NotFound from './NotFound'

// ---------------------------------------------------------------------------
// Service + Location landing page — the dynamic template behind
//   /photography/[service]/[location]/  and  /videography/[service]/[location]/
// Content is composed from service + location data so every page carries
// genuinely useful, specific information (no city-name-only duplication).
// ---------------------------------------------------------------------------

export default function ServiceLocationPage({ kind }) {
  const { service, location } = useParams()
  const svc = serviceBySlug(service)
  const loc = locationBySlug(location)
  const valid = !!svc && !!loc && typeOf(svc) === kind

  const path = valid ? `/${kind}/${svc.slug}/${loc.slug}/` : '/'
  const title = valid ? `${svc.name} in ${loc.name}` : 'Page not found'

  const locationFaqs = valid
    ? [
        {
          q: `How does ${svc.name.toLowerCase()} work from ${loc.name}?`,
          a: `Your products travel to our Mumbai studio — the safest way to keep production quality consistent. We agree the shot list, styling and platform requirements with you remotely before anything ships, then deliver the finished images digitally, usually within a few business days of the shoot.`,
        },
        {
          q: `Do you work with ${loc.name}-based businesses of every size?`,
          a: `Yes. ReCreative's clients range from small businesses to Fortune 400+ companies. Whether you need a single hero product photographed or a full catalogue, the same production standard applies.`,
        },
      ]
    : []

  useSEO({
    title: valid ? `${title} | ReCreative` : 'Page not found | ReCreative',
    description: valid
      ? `${title} — ${svc.lede} Produced in our Mumbai studio and delivered digitally for ${loc.name}-based brands. Get a quote.`
      : SITE.description,
    path,
    image: valid ? `${SITE.url}/images/${svc.images[0].src}.webp` : undefined,
    schema: valid
      ? [
          breadcrumbSchema([
            { label: 'Home', href: '/' },
            { label: kind === 'photography' ? 'Photography' : 'Videography', href: `/${kind}/` },
            { label: svc.name, href: `/${kind}/${svc.slug}/` },
            { label: title, href: path },
          ]),
          serviceSchema({ name: `${title}`, description: `${svc.lede} Serving ${loc.name}.`, path }),
          faqSchema([...svc.faqs.slice(0, 3), ...locationFaqs]),
        ]
      : [],
  })

  if (!valid) return <NotFound />

  const otherLocations = LOCATIONS.filter((l) => l.slug !== loc.slug)
  const siblingServices = (kind === 'photography' ? PHOTOGRAPHY_SERVICES : VIDEOGRAPHY_SERVICES).filter(
    (s) => s.slug !== svc.slug
  )

  return (
    <>
      <PageHero
        label={kind === 'photography' ? 'Photography service' : 'Videography service'}
        title={title}
        lede={`${svc.lede} — for brands based in ${loc.name} and across ${loc.region}.`}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: kind === 'photography' ? 'Photography' : 'Videography', href: `/${kind}/` },
          { label: svc.name, href: `/${kind}/${svc.slug}/` },
          { label: title },
        ]}
        meta={`Mumbai studio · Delivering to ${loc.name} (${loc.kind}) · Quote on request`}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '1rem', marginTop: '2.4rem' }}>
          <div className="ph vf rv-clip" style={{ aspectRatio: '16/9' }}>
            <span className="vf-b" aria-hidden="true" />
            <img src={`/images/${svc.images[0].src}.webp`} alt={`${svc.altBase || svc.images[0].alt} — for a ${loc.name}-based brand`} />
          </div>
          <div className="ph vf rv-clip" style={{ aspectRatio: '4/3.32' }}>
            <span className="vf-b" aria-hidden="true" />
            <img src={`/images/${svc.images[1].src}.webp`} alt={`${svc.images[1].alt}`} loading="lazy" />
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="wrap sloc__body">
          <div className="prose">
            <Reveal as="h2">{title} — what it involves</Reveal>
            <Reveal as="p" delay={40}>{svc.intro}</Reveal>
            <Reveal as="h2" delay={60}>Working from {loc.name}</Reveal>
            <Reveal as="p" delay={80}>{loc.intro}</Reveal>
            <Reveal as="p" delay={100}>
              For {loc.name}-based brands, the workflow is simple: products are shipped to the
              Mumbai studio, the shot list and styling are approved remotely, and the finished
              {kind === 'photography' ? ' images' : ' films'} are delivered digitally — with
              formats matched to your target platforms, from Amazon and Flipkart to Myntra,
              Nykaa and your own webstore.
            </Reveal>

            <Reveal as="h2" delay={120}>What's included</Reveal>
            <ul style={{ margin: '0 0 1.2rem', paddingLeft: '1.2rem', color: 'var(--ink-2)' }}>
              {svc.offers.map((o) => (
                <li key={o} style={{ marginBottom: '0.4rem' }}>{o}</li>
              ))}
            </ul>

            <Reveal as="h2" delay={140}>Typical uses</Reveal>
            <Reveal as="p" delay={160}>
              {svc.uses.map((u) => `${u} for ${loc.name} brands`).slice(0, 3).join(', ')} — and
              everything in between. If your products face customers on a screen, this service
              is built for it.
            </Reveal>
          </div>

          <aside className="sloc__aside">
            <div className="sloc__img ph vf">
              <span className="vf-b" aria-hidden="true" />
              <img src={`/images/${svc.images[0].src}.webp`} alt="" loading="lazy" />
            </div>
            <div className="sloc__box">
              <h3>{svc.name} — other locations</h3>
              <div className="chipgrid">
                {otherLocations.slice(0, 6).map((l) => (
                  <Link key={l.slug} className="chip" to={`/${kind}/${svc.slug}/${l.slug}/`}>
                    {l.name}
                  </Link>
                ))}
                <Link className="chip" to={`/${kind}/${svc.slug}/`}>All →</Link>
              </div>
            </div>
            <div className="sloc__box">
              <h3>More services in {loc.name}</h3>
              <ul>
                {siblingServices.slice(0, 6).map((s) => (
                  <li key={s.slug}>
                    <Link to={`/${kind}/${s.slug}/${loc.slug}/`}>
                      {s.name} in {loc.name}
                    </Link>
                  </li>
                ))}
                <li><Link to={locationHref(loc)}>All {kind} in {loc.name} →</Link></li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <FAQSection
        items={[...svc.faqs.slice(0, 3), ...locationFaqs]}
        title={`${title} — questions`}
        label="FAQ"
      />
      <CTASection
        title={<>Book <em className="df">{title.toLowerCase()}.</em></>}
        body={`Tell us what you sell and where it needs to be seen. We'll plan the shoot, confirm a timeline and give you an itemised quote for ${title.toLowerCase()}.`}
      />
    </>
  )
}
