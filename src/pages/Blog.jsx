import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import CTASection from '../components/CTASection'
import { BLOGS } from '../data/blogs'

export default function Blog() {
  useSEO({
    title: 'Journal | ReCreative Studio, Mumbai',
    description: 'Ideas, practical guides and production insight from ReCreative, Mumbai’s product photography and videography studio.',
    path: '/blog/',
    schema: [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog/' }])],
  })

  const [featured, ...articles] = BLOGS
  return (
    <>
      <section className="journal-hero">
        <div className="journal-hero__grain" aria-hidden="true" />
        <div className="wrap journal-hero__in">
          <div className="journal-hero__copy">
            <Reveal as="p" className="section-label"><span className="tick" />The ReCreative journal</Reveal>
            <Reveal as="h1" delay={70}>A closer look at <em className="df">what sells.</em></Reveal>
            <Reveal as="p" className="journal-hero__lede" delay={140}>Practical guides and sharp perspectives for brands creating imagery with purpose.</Reveal>
            <Reveal className="journal-hero__rule" delay={210}><span>Product</span><i /><span>Light</span><i /><span>Story</span><i /><span>Motion</span></Reveal>
          </div>
          <Reveal className="journal-hero__visual ph vf rv-clip rv-img" delay={120}>
            <span className="vf-b" aria-hidden="true" /><img src="/images/blog-hero-studio.png" alt="Professional product photography studio with camera, lighting and fragrance shoot setup" />
            <span className="journal-hero__tag">Studio notes<br />Mumbai</span><span className="journal-hero__page">01 — 09</span>
          </Reveal>
        </div>
      </section>
      <section className="section journal">
        <div className="wrap">
          <Reveal as={Link} to={`/blog/${featured.slug}/`} className="journal-feature">
            <div className="journal-feature__image ph vf"><span className="vf-b" aria-hidden="true" /><img src={`/images/${featured.image}.webp`} alt="" /></div>
            <div className="journal-feature__copy">
              <p className="meta">Featured read · {featured.category}</p>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="alink">Read article <span aria-hidden="true">↗</span></span>
              <time>{featured.date}</time>
            </div>
          </Reveal>
          <div className="journal-grid">
            {articles.map((article, index) => (
              <Reveal key={article.slug} delay={index * 90}>
                <Link to={`/blog/${article.slug}/`} className="journal-card">
                  <div className="journal-card__image ph vf ph--zoom"><span className="vf-b" aria-hidden="true" /><img src={`/images/${article.image}.webp`} alt="" loading="lazy" /></div>
                  <div className="journal-card__top meta"><span>{article.category}</span><time>{article.date}</time></div>
                  <h2>{article.title}</h2>
                  <p>{article.excerpt}</p>
                  <span className="journal-card__arrow" aria-hidden="true">↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection title={<>Need images with a stronger <em className="df">point of view?</em></>} />
    </>
  )
}
