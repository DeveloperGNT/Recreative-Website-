import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { SITE } from '../data/site'
import { PageHero } from '../components/ui'
import CTASection from '../components/CTASection'

const capabilities = [
  ['01', 'Product photography', 'Clean, conversion-minded imagery for every product and every channel.'],
  ['02', 'Videography', 'Product films and commercial motion that give customers a reason to pause.'],
  ['03', 'Creative direction', 'Sets, styling and visual ideas that give a product its own point of view.'],
  ['04', 'Commercial shoots', 'A considered, end-to-end production process for campaigns and catalogues.'],
]

const marketplaces = ['Amazon', 'Flipkart', 'Meesho', 'Myntra', 'Ajio', 'Nykaa', 'Snapdeal']

function ScrollStory() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const steps = [...section.querySelectorAll('[data-story-step]')]
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.storyStep))
      }),
      { rootMargin: '-36% 0px -42% 0px', threshold: 0 },
    )
    steps.forEach((step) => observer.observe(step))
    return () => observer.disconnect()
  }, [])

  return (
    <section className="about-story" ref={sectionRef}>
      <div className="wrap about-story__layout">
        <div className="about-story__sticky">
          <p className="section-label"><span className="tick" />Made to be noticed</p>
          <h2>Every frame has a <em className="df">job to do.</em></h2>
          <div className="about-story__image ph vf">
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/work-22.webp" alt="Product photography by ReCreative, Mumbai" />
            <span className={`about-story__frame frame-a ${active >= 1 ? 'is-on' : ''}`} aria-hidden="true" />
            <span className={`about-story__frame frame-b ${active >= 2 ? 'is-on' : ''}`} aria-hidden="true" />
            <p className="about-story__counter meta" aria-live="polite">0{active + 1} / 04</p>
          </div>
        </div>
        <div className="about-story__steps">
          {capabilities.map(([n, title, body], index) => (
            <article
              className={`about-story__step ${active === index ? 'is-active' : ''}`}
              data-story-step={index}
              key={title}
            >
              <span className="meta">{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function About() {
  useSEO({
    title: 'About ReCreative | Product Photography Studio, Mumbai',
    description: 'ReCreative is a Mumbai product photography studio, creating product imagery, videography, creative and commercial shoots since 2020.',
    path: '/about/',
    schema: [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'About', href: '/about/' }])],
  })

  return (
    <>
      <PageHero
        label="The studio"
        title={<>Mumbai’s product studio, <em className="df">since 2020.</em></>}
        lede="ReCreative brings brands to life with product photography, videography, creative direction and commercial shoots that make an impact."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
        meta="ReCreative · Mumbai, India"
      >
        <Reveal variant="rv-clip rv-img" className="about-hero__image ph vf ph--zoom" delay={80}>
          <span className="vf-b" aria-hidden="true" />
          <img src="/images/work-22.webp" alt="Product displayed in a styled ReCreative studio photograph" />
          <figcaption className="ph-cap"><span>ReCreative, Mumbai</span><span>Established 2020</span></figcaption>
        </Reveal>
      </PageHero>

      <section className="section about-intro">
        <div className="wrap about-intro__grid">
          <Reveal as="p" className="section-label"><span className="tick" />Our perspective</Reveal>
          <div>
            <Reveal as="h2" className="about-intro__title">A product is never just an object. It is a decision waiting to be <em className="df">made visible.</em></Reveal>
            <Reveal delay={100} className="about-intro__copy">
              <p>ReCreative is Mumbai’s premier product photography studio, capturing excellence since 2020. We pair precise craft with a practical understanding of how brands need to show up — on a marketplace, a product page, a campaign or a social feed.</p>
              <p>From a single hero image to a full catalogue, every production is carefully planned, styled, shot and finished to give products their best light.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <ScrollStory />

      <section className="section about-marketplaces">
        <div className="wrap about-marketplaces__grid">
          <Reveal variant="rv-clip rv-img" className="about-marketplaces__image ph vf ph--zoom">
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/work-12.webp" alt="Creative commercial product photography by ReCreative" loading="lazy" />
          </Reveal>
          <div>
            <Reveal as="p" className="section-label"><span className="tick" />Built for commerce</Reveal>
            <Reveal as="h2" className="h2">Made for the places your customers already <em className="df">shop.</em></Reveal>
            <Reveal as="p" className="about-marketplaces__copy" delay={80}>We create e-commerce product photography for the marketplaces that move modern retail. From white-background masters and flat lays to creative and lifestyle shoots, the final image is considered for the moment a customer sees it.</Reveal>
            <Reveal className="about-marketplaces__chips" delay={160}>
              {marketplaces.map((marketplace) => <span className="chip" key={marketplace}>{marketplace}</span>)}
              <span className="chip">and more</span>
            </Reveal>
            <Reveal delay={220}><Link to="/photography/" className="btn btn--solid">Explore photography <span aria-hidden="true">→</span></Link></Reveal>
          </div>
        </div>
      </section>

      <section className="about-closing">
        <div className="wrap about-closing__in">
          <Reveal as="p" className="meta">Mumbai studio · Brands everywhere</Reveal>
          <Reveal as="h2">Clear process. <em className="df">Memorable work.</em></Reveal>
          <Reveal as="p" delay={100}>Bring us the product, the brief and the ambition. We’ll build the image system that helps it go further.</Reveal>
          <Reveal delay={160}><a className="alink" href={`mailto:${SITE.email}`}>Talk to the studio <span aria-hidden="true">→</span></a></Reveal>
        </div>
      </section>
      <CTASection />
    </>
  )
}
