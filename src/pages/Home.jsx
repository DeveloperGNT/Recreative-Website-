import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../lib/seo'
import { Reveal, prefersReducedMotion } from '../lib/motion'
import { SITE, REVIEWS, PROCESS, CRAFT_CHAPTERS } from '../data/site'
import { PHOTOGRAPHY_SERVICES, serviceHref } from '../data/services'
import { LOCATIONS, photographyLocationHref } from '../data/locations'
import { FILMS } from '../data/videos'
import { FAQS } from '../data/faqs'
import CTASection from '../components/CTASection'
import VideoCard from '../components/VideoCard'
import { FAQSection } from '../components/ui'
import ScrollSequence from '../three/ScrollSequence'

const CameraCanvas = () =>
  import('../three/CameraCanvas').then((m) => m.default)

export default function Home() {
  useSEO({
    title: 'ReCreative — Product Photography & Videography Studio, Mumbai',
    description: SITE.description,
    path: '/',
    schema: [
      breadcrumbSchema([{ label: 'Home', href: '/' }]),
      faqHomeSchema(),
    ],
  })

  return (
    <>
      <Hero />
      <Statement />
      <Band />
      <VisualStatement />
      <Craft />
      <PhotographyIndex />
      <VideographyIndex />
      <SelectedWork />
      <Process />
      <Reviews />
      <LocationsTeaser />
      <FAQSection items={FAQS.slice(0, 6)} title="Before you ask" label="FAQ" />
      <CTASection />
    </>
  )
}

function ModelBuffer({ progress, ready }) {
  return (
    <div className={`model-buffer ${ready ? 'is-ready' : ''}`} aria-hidden={ready}>
      <div className="model-buffer__inner">
        <div className="model-buffer__mark">
          <img src="/ReCreative-Logo-og.webp" alt="" width="72" height="72" />
        </div>
        <p className="model-buffer__eyebrow">ReCreative studio</p>
        <h2>Preparing the view.</h2>
        <p className="model-buffer__status">Loading the interactive camera experience</p>
        <div className="model-buffer__track" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="model-buffer__meta"><span>Initialising 3D scene</span><b>{progress}%</b></div>
      </div>
    </div>
  )
}

function faqHomeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.slice(0, 6).map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/* ------------------------------------------------ 01 · HERO */

function Hero() {
  const [Canvas, setCanvas] = useState(null)
  const [modelProgress, setModelProgress] = useState(0)
  const [modelReady, setModelReady] = useState(false)
  const poseRef = useRef({ p: 0, spin: 0, camZ: 12.2, camY: 0.7, lookY: 0 })

  useEffect(() => {
    let live = true
    CameraCanvas().then((C) => live && setCanvas(() => C))
    return () => {
      live = false
    }
  }, [])

  return (
    <section className="hero">
      <ModelBuffer progress={modelProgress} ready={modelReady} />
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <p className="hero__specs" aria-hidden="true">
        PRODUCT PHOTOGRAPHY · E-COMMERCE · CAMPAIGNS · MUMBAI STUDIO
      </p>

      <div className="hero__inner">
        <div className="hero__copy">
          <p className="hero__status meta">
            <span className="dot" aria-hidden="true" />
            Rec · Mumbai studio — booking now
          </p>
          <h1 className="hero__title">
            We make products <em className="df">impossible</em> to scroll past.
          </h1>
          <p className="hero__lede">
            ReCreative is a Mumbai-based studio creating professional product photography and
            videography for websites, e-commerce and social media — trusted by brands from
            small businesses to Fortune 400+ companies.
          </p>
          <div className="hero__actions">
            <Link to="/contact/" className="btn btn--solid">
              Start a project
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2 8h11M9 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
            </Link>
            <Link to="/photography/" className="btn btn--ghost">Explore photography</Link>
          </div>
        </div>

        <div className="hero__canvas">
          {Canvas && (
            <Canvas
              poseRef={poseRef}
              modelUrl="/DSLR_Camera_Model.glb"
              onModelProgress={setModelProgress}
              onModelReady={() => setModelReady(true)}
              className="hero__canvas-inner"
            />
          )}
          <div className={`hero__loader ${modelReady ? 'is-ready' : ''}`} aria-hidden={modelReady}>
            <div className="hero__loader-mark">
              <img src="/ReCreative-Logo-og.webp" alt="" width="64" height="64" />
            </div>
            <p className="hero__loader-label">Preparing the studio</p>
            <div className="hero__loader-track" role="progressbar" aria-valuenow={modelProgress} aria-valuemin="0" aria-valuemax="100">
              <span style={{ width: `${modelProgress}%` }} />
            </div>
            <div className="hero__loader-meta">
              <span>Loading camera model</span>
              <b>{modelProgress}%</b>
            </div>
          </div>
          <div className="hero__hud" aria-hidden="true">
            <span>MODE <b>A</b></span>
            <span>LEN <b>35MM</b></span>
            <span>ƒ/<b>1.8</b></span>
            <span>ISO <b>100</b></span>
          </div>
        </div>
      </div>

      <p className="hero__scroll" aria-hidden="true">SCROLL</p>
    </section>
  )
}

/* ------------------------------------------------ 02 · STATEMENT */

function Statement() {
  return (
    <section className="section statement">
      <div className="wrap statement__in">
        <div className="statement__meta">
          <Reveal as="p" className="meta">What ReCreative does</Reveal>
          <Reveal variant="rv-clip rv-img" className="ph vf statement__img ph--zoom" delay={60} style={{ marginTop: '1.8rem', aspectRatio: '4/3' }}>
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/blog-hero-studio.png" alt="Professional product photography studio with lighting, camera and perfume setup" />
          </Reveal>
        </div>
        <div>
          <Reveal as="h2" className="statement__big">
            Every product has a moment where it looks its best. We build that moment —
            in <em className="df">glass, light and pixels</em> — then deliver it wherever
            your customers are looking.
          </Reveal>
          <Reveal className="statement__side" delay={120}>
            <div style={{ marginTop: '1.6rem', display: 'grid', gap: '1.1rem', maxWidth: '58ch', color: 'var(--ink-2)' }}>
              <p>
                Founded in Mumbai by Sandeep Prajapati, the studio shoots full catalogues
                and single heroes with the same discipline: controlled light, honest colour,
                and detail that survives a zoom.
              </p>
              <p>
                From white-background marketplace masters to cinematic ad films, the work is
                produced end-to-end in-house — briefed, shot, edited and delivered ready for
                platforms like Amazon, Flipkart, Myntra and Nykaa.
              </p>
            </div>
            <Reveal className="chipgrid" delay={200} style={{ marginTop: '1.8rem' }}>
              <Link className="alink" to="/about/">More about the studio</Link>
              <Link className="alink" to="/photography/">Photography services</Link>
            </Reveal>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 03 · BAND (marquee) */

function Band() {
  const items = SITE.marketplaces
  const track = (
    <>
      {items.map((m) => (
        <span key={m}>{m} <i>●</i></span>
      ))}
    </>
  )
  return (
    <div className="band marquee" aria-label="Marketplaces ReCreative delivers for">
      <div className="marquee__track">{track}</div>
      <div className="marquee__track" aria-hidden="true">{track}</div>
    </div>
  )
}

/* ------------------------------------------------ 04 · VISUAL STATEMENT */

function VisualStatement() {
  return (
    <section className="section vis">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />Selected imagery</Reveal>
        <div className="vis__grid">
          <Reveal variant="rv-clip rv-img" className="ph vf vis__a ph--zoom" delay={0}>
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/work-23.webp" alt="Golden ghee pouring beside a packaged jar — food and FMCG photography by ReCreative" />
          </Reveal>
          <Reveal variant="rv-clip rv-img" className="ph vf vis__b ph--zoom" delay={120}>
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/work-18.webp" alt="Silver statement necklace styled on deep purple — jewellery photography" />
          </Reveal>
          <Reveal variant="rv-clip rv-img" className="ph vf vis__c ph--zoom" delay={240}>
            <span className="vf-b" aria-hidden="true" />
            <img src="/images/work-21.webp" alt="Spray bottle staged on a dark tropical leaf — creative product photography" />
          </Reveal>
          {/* <figcaption className="ph-cap vis__cap">
            <span>Real productions</span>
            <span>Shot in the Mumbai studio</span>
          </figcaption> */}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 05 · CRAFT (exploded camera) */

function Craft() {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const progressRef = useRef(0)
  const reduced = prefersReducedMotion()

  const chaptersRef = useRef([])
  const barsRef = useRef([])

  const updateChapters = (progress) => {
    const n = CRAFT_CHAPTERS.length
    const idx = Math.min(n - 1, Math.floor(progress * n * 0.999))
    chaptersRef.current.forEach((el, i) => el && el.classList.toggle('is-active', i === idx))
    barsRef.current.forEach((el, i) => {
      if (!el) return
      el.classList.toggle('done', i < idx)
      el.classList.toggle('on', i === idx)
    })
  }

  useEffect(() => {
    if (reduced) return
    let st
    let cancelled = false
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return
      gsap.registerPlugin(ScrollTrigger)
      // scroll position maps 1:1 onto the disassembly sequence (0 → frame 1,
      // 1 → frame 300); reversing the scroll reverses the animation.
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressRef.current = self.progress
          updateChapters(self.progress)
        },
      })
      progressRef.current = st.progress
      updateChapters(st.progress)
    })
    return () => {
      cancelled = true
      st?.kill()
    }
  }, [reduced])

  return (
    <section className="craft" ref={sectionRef} aria-label="The craft behind the camera">
      {reduced ? (
        <div className="section wrap">
          <p className="section-label"><span className="tick" />The craft</p>
          <h2 className="h2" style={{ marginBottom: '2rem' }}>
            Every image begins as <em className="df">light, focused through glass.</em>
          </h2>
          <div className="craft__static">
            {CRAFT_CHAPTERS.map((c) => (
              <div key={c.id} className="craft__chapter-static">
                <p className="meta">{c.label}</p>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="craft__sticky" ref={stickyRef}>
            <div className="craft__canvas">
              <ScrollSequence progressRef={progressRef} />
            </div>
            <div className="craft__head">
              <p className="section-label"><span className="tick" />The craft — scroll to disassemble</p>
            </div>
            <div className="craft__copy">
              <div className="craft__chapters">
                {CRAFT_CHAPTERS.map((c, i) => (
                  <div
                    key={c.id}
                    className={`craft__chapter ${i === 0 ? 'is-active' : ''}`}
                    ref={(el) => (chaptersRef.current[i] = el)}
                  >
                    <p className="meta">{c.label}</p>
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="craft__progress" aria-hidden="true">
              {CRAFT_CHAPTERS.map((c, i) => (
                <span key={c.id} ref={(el) => (barsRef.current[i] = el)} />
              ))}
            </div>
          </div>
          <div className="craft__spacer" aria-hidden="true" style={{ marginTop: '-100vh', height: '350vh' }} />
        </>
      )}
    </section>
  )
}

/* ------------------------------------------------ 06 · PHOTOGRAPHY INDEX */

function PhotographyIndex() {
  const [active, setActive] = useState(0)
  const rows = PHOTOGRAPHY_SERVICES.slice(0, 12)
  const images = rows.map((s) => ({ src: `/images/${s.images[0].src}.webp`, alt: s.images[0].alt }))

  return (
    <section className="section svc">
      <div className="wrap">
        <div className="svc__head">
          <div>
            <Reveal as="p" className="section-label"><span className="tick" />Photography</Reveal>
            <Reveal as="h2" className="h2">
              Sixteen disciplines. One <em className="df">standard.</em>
            </Reveal>
          </div>
          <Link to="/photography/" className="alink">
            All photography services
          </Link>
        </div>

        <div className="svc__grid">
          <div
            className="svc__list"
            onMouseLeave={() => setActive(0)}
          >
            {rows.map((s, i) => (
              <Reveal as="div" className="svc__row" key={s.slug} delay={i * 40}>
                <Link
                  to={serviceHref(s)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                >
                  <h3>
                    <span className="n">{String(i + 1).padStart(2, '0')}</span>
                    {s.name}
                  </h3>
                  <span className="arr">VIEW →</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="svc__preview" aria-hidden="true">
            {images.map((im, i) => (
              <img key={im.src} src={im.src} alt="" loading="lazy" className={i === active ? 'is-on' : ''} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 07 · VIDEOGRAPHY */

function VideographyIndex() {
  const feature = FILMS[0]
  const rest = FILMS.slice(1, 5)
  return (
    <section className="section vid">
      <div className="wrap">
        <div className="vid__head">
          <div>
            <Reveal as="p" className="section-label"><span className="tick" />Videography</Reveal>
            <Reveal as="h2" className="h2">
              Films that make products <em className="df">move people.</em>
            </Reveal>
          </div>
          <Reveal as="p" delay={120}>
            Product films, model shoots and 360° videos — directed in-studio, edited to
            convert, cut for every platform.
          </Reveal>
        </div>

        <div className="vid__feature">
          <Reveal variant="rv-clip">
            <VideoCard film={feature} />
          </Reveal>
          <Reveal className="vid__filmnote vf vf--dark" delay={140}>
            <span className="vf-b" aria-hidden="true" />
            <p className="meta meta--dark">Featured film</p>
            <h3>{feature.title}</h3>
            <p>
              A cosmetic product film produced end-to-end in the Mumbai studio — macro
              textures, controlled light and an edit built for reels and product pages.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link to="/videography/" className="alink">Explore videography</Link>
            </p>
          </Reveal>
        </div>

        <div className="vid__grid">
          {rest.map((f, i) => (
            <Reveal key={f.id} delay={i * 80}>
              <VideoCard film={f} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 08 · SELECTED WORK */

const WORK_SLOTS = ['work-18', 'work-01', 'work-09', 'img-i', 'work-24', 'work-23', 'work-08']
const WORK_ALTS = {
  'work-18': 'Jewellery photography — silver statement set on purple',
  'work-01': 'Bags photography — navy backpack on white',
  'work-09': 'Creative fragrance shoot in deep red',
  'img-i': 'Ecommerce flat lay with phone, earbuds and macarons',
  'work-24': 'Footwear photography — black formal shoes',
  'work-23': 'Food photography — golden ghee pour',
  'work-08': 'Apparel photography — printed t-shirt',
}

function SelectedWork() {
  const items = WORK_SLOTS.map((s, i) => ({ src: s, g: `g${i + 1}` }))
  return (
    <section className="section work">
      <div className="wrap">
        <div className="work__head">
          <div>
            <Reveal as="p" className="section-label"><span className="tick" />Selected work</Reveal>
            <Reveal as="h2" className="h2">
              Let the photography <em className="df">do the talking.</em>
            </Reveal>
          </div>
        </div>
        <div className="work__grid">
          {items.map((it, i) => (
            <Reveal
              key={it.src}
              variant="rv-clip rv-img"
              className={`ph vf work__item work__${it.g} ph--zoom`}
              delay={(i % 3) * 90}
            >
              <span className="vf-b" aria-hidden="true" />
              <img src={`/images/${it.src}.webp`} alt={WORK_ALTS[it.src]} loading="lazy" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 09 · PROCESS */

function Process() {
  return (
    <section className="section proc">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />How it works</Reveal>
        <Reveal as="h2" className="h2" style={{ marginBottom: '2.4rem' }}>
          From your shelf to every screen — <em className="df">in four steps.</em>
        </Reveal>
        <div className="proc__grid">
          {PROCESS.map((p, i) => (
            <Reveal as="div" className="proc__step" key={p.n} delay={i * 80}>
              <span className="n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 10 · REVIEWS */

function Reviews() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />Client words</Reveal>
        <Reveal as="h2" className="h2" style={{ marginBottom: '2.4rem' }}>
          Reviewed on <em className="df">Google.</em>
        </Reveal>
        <div className="rev__grid">
          {REVIEWS.map((r, i) => (
            <Reveal as="blockquote" className="rev__card" key={r.name} delay={i * 60} style={{ margin: 0 }}>
              <span className="rev__stars" aria-label="Five star review">★★★★★</span>
              <p className="rev__text">“{r.text}”</p>
              <footer className="rev__who">
                <span className="av" aria-hidden="true">{r.name.slice(0, 1)}</span>
                <span>
                  <b>{r.name}</b>
                  <span>{r.role}</span>
                </span>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------ 11 · LOCATIONS */

function LocationsTeaser() {
  const others = LOCATIONS.filter((l) => !l.primary)
  return (
    <section className="section locs">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />Locations</Reveal>
        <Reveal as="h2" className="h2" style={{ marginBottom: '2.4rem' }}>
          Rooted in Mumbai. <em className="df">Shipping everywhere.</em>
        </Reveal>
        <div className="locs__grid">
          <div className="locs__primary">
            {LOCATIONS.filter((l) => l.primary).map((l, i) => (
              <Reveal as="div" key={l.slug} delay={i * 100}>
                <Link to={photographyLocationHref(l)} className="loc__card">
                  <p className="meta">{l.kind} · {l.region}</p>
                  <h3>{l.name}</h3>
                  <p>{l.blurb}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={140}>
            <p style={{ color: 'var(--ink-2)', maxWidth: '46ch', marginBottom: '1.4rem' }}>
              Products travel to the Mumbai studio from brands across India and beyond —
              shot to a briefed standard and returned, with imagery delivered digitally.
            </p>
            <div className="locs__list chipgrid">
              {others.map((l) => (
                <Link key={l.slug} to={photographyLocationHref(l)} className="chip">
                  {l.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
