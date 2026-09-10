import { useEffect, useRef, useState } from 'react'
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

const productVideoEmbeds = [
  'https://www.youtube.com/embed/5H0TxkLxTbw',
  'https://www.youtube.com/embed/Gn_dSrfr-qU',
  'https://www.youtube.com/embed/hDs0ABa1l84',
  'https://www.youtube.com/embed/HBA4Xva20g8',
  'https://www.youtube.com/embed/jmi7BqJE0-A',
  'https://www.youtube.com/embed/BFffptvtREA',
  'https://www.youtube.com/embed/i-2XhzR9Iwk',
  'https://www.youtube.com/embed/avan8Pczpag',
  'https://www.youtube.com/embed/xKpPbOTj0Oc',
  'https://www.youtube.com/embed/aTHt6D5W1u0',
  'https://www.youtube.com/embed/XDlZKACmCKc',
  'https://www.youtube.com/embed/5LO_ydT5Hn8',
  'https://www.youtube.com/embed/qlhA-vQQZRI',
  'https://www.youtube.com/embed/-WXO4ocWX78',
  'https://www.youtube.com/embed/vwqF9HmqgrY',
  'https://www.youtube.com/embed/-gl4Se_5ojc',
  'https://www.youtube.com/embed/RXW3Tv5akw4',
  'https://www.youtube.com/embed/wFow7nFtE8Y',
  'https://www.youtube.com/embed/DqPecAfiBMI',
  'https://www.youtube.com/embed/j5EJZPOJgrM',
  'https://www.youtube.com/embed/0tzJ2De6HqY',
  'https://www.youtube.com/embed/War1HczeLBU',
  'https://www.youtube.com/embed/Z9ZFMwfabsE',
  'https://www.youtube.com/embed/SIlI9TKUlBo',
]

const modelVideoEmbeds = [
  'https://www.youtube.com/embed/nZpdrAzHv7U',
  'https://www.youtube.com/embed/b7iZVwSCU0Q',
  'https://www.youtube.com/embed/7E0UvzeR7VA',
  'https://www.youtube.com/embed/Nks3HrwN-cI',
  'https://www.youtube.com/embed/esKC4hZGyo8',
  'https://www.youtube.com/embed/WRPzYJ-iHKU',
  'https://www.youtube.com/embed/wWqopwe0D1U',
  'https://www.youtube.com/embed/Z_sE_BgfCcg',
  'https://www.youtube.com/embed/0H0cVJLU8oQ',
]

const realEstateVideoEmbeds = [
  'https://www.youtube.com/embed/7KFSPFOfqcA',
  'https://www.youtube.com/embed/QEWezU2sCbQ',
  'https://www.youtube.com/embed/ogqtwHdKG4o',
  'https://www.youtube.com/embed/jJ-0j7lahgg',
  'https://www.youtube.com/embed/WuqgU2owk4o',
  'https://www.youtube.com/embed/XotQx1YWr1w',
  'https://www.youtube.com/embed/zecukSTZ_5Y',
  'https://www.youtube.com/embed/o_f2BLnV6ec',
]

function VideoPortfolio({ embeds, label, aspectRatio = '9 / 16' }) {
  return (
    <div className="product-video-portfolio">
      <div className="product-video-grid" aria-label={label}>
        {embeds.map((src, index) => (
          <ProductVideoFrame
            key={src}
            src={src}
            index={index}
            label={label}
            aspectRatio={aspectRatio}
          />
        ))}
      </div>
    </div>
  )
}

function ProductVideoPortfolio() {
  return <VideoPortfolio embeds={productVideoEmbeds} label="Product videoshoot portfolio" />
}

function ModelVideoPortfolio() {
  return <VideoPortfolio embeds={modelVideoEmbeds} label="Model videoshoot portfolio" />
}

function RealEstateVideoPortfolio() {
  return <VideoPortfolio embeds={realEstateVideoEmbeds} label="Real estate videography portfolio" aspectRatio="16 / 9" />
}

function ProductVideoFrame({ src, index, label, aspectRatio }) {
  const frameRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsReady(true)
      setIsVisible(true)
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsVisible(true)
        observer.disconnect()
      },
      { threshold: 0.01, rootMargin: '0px 0px 340px 0px' }
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <figure
      ref={frameRef}
      className={`product-video-grid__item ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 6) * 45}ms`, '--video-aspect-ratio': aspectRatio }}
    >
      <div className="product-video-grid__frame">
        <iframe
          src={src}
          title={`${label} video ${index + 1}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
        />
        <span className="product-video-grid__overlay" aria-hidden="true" />
      </div>
    </figure>
  )
}

/* ---------------- Hub pages ---------------- */

export function PhotographyHub() {
  return (
    <Hub
      kind="photography"
      title="Photography Services"
      lede="Sixteen disciplines of product photography from marketplace-ready white background masters to cinematic creative campaigns."
      intro="Every category below is produced end-to-end in the Mumbai studio: briefed, styled, shot, edited and delivered in the exact formats your platforms require. Choose a discipline to see what's included, how it works and where we deliver it."
      services={PHOTOGRAPHY_SERVICES}
      image={{ src: '/images/contact-hero.jpg', alt: 'Product photography studio setup with camera, lighting and a perfume product' }}
    />
  )
}

export function VideographyHub() {
  return (
    <Hub
      kind="videography"
      title="Videography Services"
      lede="Product films, model shoots and 360° videos — directed in-studio and edited to hold attention."
      intro="Video is where products prove themselves: motion, scale, texture and use. ReCreative directs and produces commercial films end-to-end planning, shooting, editing, grading and delivery — for marketplaces, social and campaigns."
      services={VIDEOGRAPHY_SERVICES}
      image={{ src: '/images/shoot.jpg', alt: 'Cinematic studio setup — camera on tripod lit for a product film shoot' }}
    />
  )
}

function Hub({ kind, title, lede, intro, services, image }) {
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
        intro={intro}
        crumbs={[{ label: 'Home', href: '/' }, { label: title }]}
        meta={`${services.length} services · Delivered from the Mumbai studio`}
        image={image}
      />
      <section className="hub">
        <div className="wrap">
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
  // only vertical (9:16) films fill the Shorts-style reel without black bars
  const verticals = FILMS.filter((f) => f.vertical)
  const films = [...verticals, ...verticals]
  return (
    <section className="service-films" aria-labelledby="service-films-title">
      <div className="wrap">
        <Reveal as="p" className="section-label"><span className="tick" />Selected films</Reveal>
        <Reveal as="h2" id="service-films-title" className="service-films__title">
          Motion that makes products <em className="df">memorable.</em>
        </Reveal>
        <div className="film-marquee" aria-label="Selected videography films">
          <div className="film-marquee__track">
            {films.map((film, index) => (
              <div className="film-marquee__item" key={`${film.id}-${index}`}>
                <VideoCard film={film} ratio="9/16" autoplay />
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

  const detailGallerySlug = ['ecommerce-photography', 'creative-photography', 'flat-lay-photography', 'fashion-photography', 'cosmetic-product-photography', 'commercial-product-photography', 'bags-photography', 'apparel-photography', 'toy-games-photography', 'jewellery-photography', 'industrial-photography', 'handbag-photography', 'footwear-photography', 'food-fmcg-photography'].includes(svc.slug)
  const ecommerceGalleryImages = [
    'imgi_23_272-1-300x300.jpg',
    'imgi_24_IMG_2145-300x300.jpg',
    'imgi_25_1-1-300x300.jpg',
    'imgi_26_IMG_8666-300x300.jpg',
    'imgi_27_5R2A2290-1-300x300.jpg',
    'imgi_28_1-300x300.jpg',
    'imgi_29_5-1-300x300.jpg',
    'imgi_30_0010-300x300.jpg',
    'imgi_31_IMG_00421-300x300.jpg',
    'imgi_32_6-14-300x300.jpg',
    'imgi_33_22-1-2-300x300.jpg',
    'imgi_34_IMG_4524-2-300x300.jpg',
    'imgi_35_24-1-1-300x300.jpg',
    'imgi_36_DSC00434-Recovered--300x300.jpg',
    'imgi_37_1-207x300.jpg',
    'imgi_38_a12-2-300x300.jpg',
    'imgi_40_1--300x300.jpg',
    'imgi_41_01--300x300.jpg',
  ]
  const creativeGalleryImages = [
    'imgi_10_4-1-1-scaled.jpg',
    'imgi_100_3-scaled.jpg',
    'imgi_101_2-scaled.jpg',
    'imgi_102_1-scaled.jpg',
    'imgi_11_1-1-8-scaled.jpg',
    'imgi_12_1165-scaled.jpg',
    'imgi_13_5R2A9199-1-1-scaled.jpg',
    'imgi_14_2-36-scaled.jpg',
    'imgi_15_5R2A9909-scaled.jpg',
    'imgi_16_1-2-2-scaled.jpg',
    'imgi_17_IMG_8770-1-scaled.jpg',
    'imgi_18_13-3-scaled.jpg',
    'imgi_19_12-4-scaled.jpg',
    'imgi_20_11-4-scaled.jpg',
    'imgi_21_10-5-scaled.jpg',
    'imgi_22_11-5-scaled.jpg',
    'imgi_23_2-34-scaled.jpg',
    'imgi_24_2-1-1-scaled.jpg',
    'imgi_25_1-4-1-scaled.jpg',
    'imgi_26_10-3-scaled.jpg',
    'imgi_27_2-2-3-scaled.jpg',
    'imgi_28_IMG_8666-scaled.jpg',
    'imgi_29_4-20-scaled.jpg',
    'imgi_30_10-4-scaled.jpg',
    'imgi_31_2-1-2-scaled.jpg',
    'imgi_32_9963-1-scaled.jpg',
    'imgi_33_1-1-7-scaled.jpg',
    'imgi_34_856-scaled.jpg',
    'imgi_35_11-7-scaled.jpg',
    'imgi_36_31-4-scaled.jpg',
    'imgi_37_1-6-2-scaled.jpg',
    'imgi_38_1-27-scaled.jpg',
    'imgi_39_3-23-scaled.jpg',
    'imgi_40_5R2A9440--scaled.jpg',
    'imgi_41_3-2-2-scaled.jpg',
    'imgi_42_5-17-scaled.jpg',
    'imgi_43_13-4-scaled.jpg',
    'imgi_44_IMG_8644-1-scaled.jpg',
    'imgi_45_3-3-1-scaled.jpg',
    'imgi_46_6-15-scaled.jpg',
    'imgi_47_0-scaled.jpg',
    'imgi_48_21-1-scaled.jpg',
    'imgi_49_6-1-1-scaled.jpg',
    'imgi_5_2--1024x1024.jpg',
    'imgi_50_100-scaled.jpg',
    'imgi_51_2-35-scaled.jpg',
    'imgi_52_4-insta-1-scaled.jpg',
    'imgi_53_7-6-scaled.jpg',
    'imgi_54_IMG_2204-scaled.jpg',
    'imgi_55_5R2A9539-1-scaled.jpg',
    'imgi_56_22-2-scaled.jpg',
    'imgi_57_4-19-scaled.jpg',
    'imgi_58_111121-scaled.jpg',
    'imgi_59_5-16.jpg',
    'imgi_6_1-26-1024x1024.jpg',
    'imgi_60_11-6-scaled.jpg',
    'imgi_61_9-3-scaled.jpg',
    'imgi_62_12546-scaled.jpg',
    'imgi_63_1-28-scaled.jpg',
    'imgi_64_2-1-3-scaled.jpg',
    'imgi_65_000-1-scaled.jpg',
    'imgi_66_12-5-scaled.jpg',
    'imgi_67_33-2-scaled.jpg',
    'imgi_68_6-16-scaled.jpg',
    'imgi_69_1-3-1-scaled.jpg',
    'imgi_7_1-2-1-1024x1024.jpg',
    'imgi_70_1-30-scaled.jpg',
    'imgi_71_3-24-scaled.jpg',
    'imgi_72_0003-1-scaled.jpg',
    'imgi_73_10-6-scaled.jpg',
    'imgi_74_1452256-scaled.jpg',
    'imgi_75_18.jpg',
    'imgi_76_19.jpg',
    'imgi_77_20.jpg',
    'imgi_78_1-scaled.jpg',
    'imgi_79_2-scaled.jpg',
    'imgi_8_5-15-1024x1024.jpg',
    'imgi_80_3-scaled.jpg',
    'imgi_81_4-scaled.jpg',
    'imgi_82_5-scaled.jpg',
    'imgi_83_6-scaled.jpg',
    'imgi_84_7-scaled.jpg',
    'imgi_85_9-scaled.jpg',
    'imgi_86_10-scaled.jpg',
    'imgi_87_12-scaled.jpg',
    'imgi_88_13-scaled.jpg',
    'imgi_89_14-scaled.jpg',
    'imgi_9_2-33-1024x1024.jpg',
    'imgi_90_15-scaled.jpg',
    'imgi_91_16-scaled.jpg',
    'imgi_92_17.jpg',
    'imgi_93_10-scaled.jpg',
    'imgi_94_9-scaled.jpg',
    'imgi_95_8-scaled.jpg',
    'imgi_96_7-scaled.jpg',
    'imgi_97_6-scaled.jpg',
    'imgi_98_5-scaled.jpg',
    'imgi_99_4-scaled.jpg',
  ]
  const flatLayGalleryImages = [
    'imgi_10_1-9-scaled.jpg',
    'imgi_11_16-1-scaled.jpg',
    'imgi_12_04-1-scaled.jpg',
    'imgi_13_4758744758-scaled.jpg',
    'imgi_14_8-1-5-scaled.jpg',
    'imgi_15_IMG_4189_-1.jpg',
    'imgi_17_67410-scaled.jpg',
    'imgi_18_IMG_2145-1-scaled.jpg',
    'imgi_19_DSC09447-scaled.jpg',
    'imgi_20_2-16-scaled.jpg',
    'imgi_21_13-scaled.jpg',
    'imgi_22_DSC0946512-scaled.jpg',
    'imgi_23_852-scaled.jpg',
    'imgi_24_178545-scaled.jpg',
    'imgi_25_0010-scaled.jpg',
    'imgi_26_DSC09451-scaled.jpg',
    'imgi_27_22-1-1-scaled.jpg',
    'imgi_28_DSC094881-scaled.jpg',
    'imgi_29_17854575-scaled.jpg',
    'imgi_30_0011-scaled.jpg',
    'imgi_31_111258741-2-scaled.jpg',
    'imgi_32_196964-scaled.jpg',
    'imgi_33_296363254-1-scaled.jpg',
    'imgi_34_1448878-1-scaled.jpg',
    'imgi_56_03-3-300x300.jpg',
    'imgi_57_1-1-9-300x300.jpg',
    'imgi_58_1-9-300x300.jpg',
    'imgi_59_16-1-300x300.jpg',
    'imgi_5_22--1024x1024.jpg',
    'imgi_60_04-1-300x300.jpg',
    'imgi_61_4758744758-300x300.jpg',
    'imgi_62_8-1-5-300x300.jpg',
    'imgi_63_IMG_4189_-1-300x164.jpg',
    'imgi_64_Trio-f01-300x300.jpg',
    'imgi_65_67410-300x169.jpg',
    'imgi_66_IMG_2145-1-300x300.jpg',
    'imgi_67_DSC09447-300x300.jpg',
    'imgi_68_2-16-300x300.jpg',
    'imgi_69_13-300x300.jpg',
    'imgi_6_111258741-1-1024x1024.jpg',
    'imgi_70_DSC0946512-300x300.jpg',
    'imgi_73_16-2-1024x1024.jpg',
    'imgi_74_03-2-1024x1024.jpg',
    'imgi_75_852-300x169.jpg',
    'imgi_76_178545-300x300.jpg',
    'imgi_77_0010-300x300.jpg',
    'imgi_78_DSC09451-300x300.jpg',
    'imgi_79_22-1-1-300x300.jpg',
    'imgi_7_296363254-1024x1024.jpg',
    'imgi_80_DSC094881-300x300.jpg',
    'imgi_81_17854575-300x300.jpg',
    'imgi_82_0011-300x300.jpg',
    'imgi_83_111258741-2-300x300.jpg',
    'imgi_84_196964-300x300.jpg',
    'imgi_85_296363254-1-300x300.jpg',
    'imgi_86_1448878-1-300x169.jpg',
    'imgi_87_3-3.jpg',
    'imgi_88_IMG_0717-scaled.jpg',
    'imgi_89_Facebook-cover.jpg',
    'imgi_8_03-3-scaled.jpg',
    'imgi_90_IMG_8512-scaled.jpg',
    'imgi_91_Untitled-design-19.jpg',
    'imgi_92_Untitled-design-19-1.jpg',
    'imgi_9_1-1-9-scaled.jpg',
  ]
  const fashionGalleryImages = [
    // 'imgi_100_Untitled-design-19.jpg',
    // 'imgi_101_Untitled-design-19-1.jpg',
    
    // 'imgi_11_3-10-scaled.jpg',
    'imgi_12_5-25-scaled.jpg',
    'imgi_13_5-4-scaled.jpg',
    'imgi_14_7-scaled.jpg',
    'imgi_15_6-1.jpg',
    'imgi_16_6-7-scaled.jpg',
    'imgi_17_1-scaled.jpg',
    'imgi_18_8-scaled.jpg',
    'imgi_19_2-1.jpg',
    'imgi_20_9-scaled.jpg',
    'imgi_21_8-1-6-scaled.jpg',
    'imgi_22_1-1.jpg',
    'imgi_23_4-scaled.jpg',
    'imgi_24_8-scaled.jpg',
    'imgi_25_1-14-scaled.jpg',
    'imgi_26_3-1.jpg',
    'imgi_27_7-1-scaled.jpg',
    'imgi_28_3-1-1-scaled.jpg',
    'imgi_29_4-27-scaled.jpg',
    'imgi_4_6-19-scaled.jpg',
    'imgi_52_9-1-1024x1024.jpg',
    'imgi_53_1-2-1024x1024.jpg',
    'imgi_54_2-2-1024x1024.jpg',
    'imgi_55_3-2-1024x1024.jpg',
    'imgi_56_4-2-1024x1024.jpg',
    'imgi_57_5-2-1024x1024.jpg',
    'imgi_58_6-2-1024x1024.jpg',
    'imgi_59_7-1-1024x1024.jpg',
    'imgi_5_4-1.jpg',
    'imgi_10_Untitled-design-6-scaled.jpg',
    'imgi_60_8-1-1024x1024.jpg',
    'imgi_61_5-1-724x1024.jpg',
    'imgi_62_4-1-724x1024.jpg',
    'imgi_63_3-1024x1024.jpg',
    'imgi_64_4-1024x1024.jpg',
    'imgi_65_5-1024x1024.jpg',
    'imgi_66_6-1-724x1024.jpg',
    'imgi_67_1-1-724x1024.jpg',
    'imgi_68_2-1-724x1024.jpg',
    'imgi_69_3-1-724x1024.jpg',
    'imgi_6_9-scaled.jpg',
    'imgi_70_6-19-300x300.jpg',
    'imgi_71_4-1-212x300.jpg',
    'imgi_72_9-300x300.jpg',
    'imgi_73_2-20-300x226.jpg',
    'imgi_74_3-300x300.jpg',
    'imgi_75_2-27-300x300.jpg',
    'imgi_76_Untitled-design-6-300x201.jpg',
    'imgi_77_3-10-300x226.jpg',
    'imgi_78_5-25-300x300.jpg',
    'imgi_79_5-4-200x300.jpg',
    'imgi_7_2-20-scaled.jpg',
    'imgi_80_7-300x300.jpg',
    'imgi_81_6-1-212x300.jpg',
    'imgi_82_6-7-200x300.jpg',
    'imgi_83_1-300x300.jpg',
    'imgi_84_8-200x300.jpg',
    'imgi_85_2-1-212x300.jpg',
    'imgi_86_9-200x300.jpg',
    'imgi_87_8-1-6-171x300.jpg',
    'imgi_88_1-1-212x300.jpg',
    'imgi_89_4-300x300.jpg',
    'imgi_8_3-scaled.jpg',
    'imgi_90_8-300x300.jpg',
    'imgi_91_1-14-300x226.jpg',
    'imgi_92_3-1-212x300.jpg',
    'imgi_93_7-1-200x300.jpg',
    'imgi_94_3-1-1-300x213.jpg',
    'imgi_95_4-27-300x300.jpg',
    'imgi_96_3-3.jpg',
    'imgi_97_IMG_0717-scaled.jpg',
    'imgi_98_Facebook-cover.jpg',
    'imgi_99_IMG_8512-scaled.jpg',
    'imgi_9_2-27-scaled.jpg',
  ]
  const cosmeticGalleryImages = Object.values(import.meta.glob('/public/images/Cosmetic Product Photography _/*', { eager: true, query: '?url', import: 'default' }))
  const commercialGalleryImages = Object.values(import.meta.glob('/public/images/Commercial Product Photography/*', { eager: true, query: '?url', import: 'default' }))
  const bagsGalleryImages = Object.values(import.meta.glob('/public/images/Bags Photography/*', { eager: true, query: '?url', import: 'default' }))
  const apparelGalleryImages = Object.values(import.meta.glob('/public/images/Apparel Photography/*', { eager: true, query: '?url', import: 'default' }))
  const toyGamesGalleryImages = Object.values(import.meta.glob('/public/images/Toy & Games Photography/*', { eager: true, query: '?url', import: 'default' }))
  const jewelleryGalleryImages = Object.values(import.meta.glob('/public/images/Jewellery Photography/*', { eager: true, query: '?url', import: 'default' }))
  const industrialGalleryImages = Object.values(import.meta.glob('/public/images/Industrial Photography/*', { eager: true, query: '?url', import: 'default' }))
  const handbagGalleryImages = Object.values(import.meta.glob('/public/images/Handbag Photography/*', { eager: true, query: '?url', import: 'default' }))
  const footwearGalleryImages = Object.values(import.meta.glob('/public/images/Footwear Product Photography/*', { eager: true, query: '?url', import: 'default' }))
  const foodFmcgGalleryImages = Object.values(import.meta.glob('/public/images/Food & FMCG Photography/*', { eager: true, query: '?url', import: 'default' }))
  const folderGalleryImages = {
    'cosmetic-product-photography': cosmeticGalleryImages,
    'commercial-product-photography': commercialGalleryImages,
    'bags-photography': bagsGalleryImages,
    'apparel-photography': apparelGalleryImages,
    'toy-games-photography': toyGamesGalleryImages,
    'jewellery-photography': jewelleryGalleryImages,
    'industrial-photography': industrialGalleryImages,
    'handbag-photography': handbagGalleryImages,
    'footwear-photography': footwearGalleryImages,
    'food-fmcg-photography': foodFmcgGalleryImages,
  }

  useEffect(() => {
    if (!detailGallerySlug) return undefined
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const items = Array.from(document.querySelectorAll('.service-gallery__item--detail'))

    if (!items.length) return undefined
    if (reduced) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.04, rootMargin: '0px 0px 36% 0px' }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [detailGallerySlug, svc.slug])

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
        {svc.slug === 'product-videoshoot' ? (
          <ProductVideoPortfolio />
        ) : svc.slug === 'model-videoshoot' ? (
          <ModelVideoPortfolio />
        ) : svc.slug === 'real-estate-videography' ? (
          <RealEstateVideoPortfolio />
        ) : svc.slug === 'ecommerce-photography' ? (
          <div className="service-gallery service-gallery--ecommerce" aria-label="E-commerce photography gallery">
            {ecommerceGalleryImages.map((image, index) => (
              <figure
                key={image}
                className="service-gallery__item service-gallery__item--detail service-gallery__item--ecommerce"
                style={{ transitionDelay: `${index * 70}ms` }}
              >
                <img
                  src={`/images/E-Commerce Photography/${image}`}
                  alt={`E-commerce photography portfolio image ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : svc.slug === 'creative-photography' ? (
          <div className="service-gallery service-gallery--creative" aria-label="Creative photography gallery">
            {creativeGalleryImages.map((image, index) => (
              <figure
                key={image}
                className="service-gallery__item service-gallery__item--detail service-gallery__item--creative"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <img
                  src={`/images/Creative Photography/${image}`}
                  alt={`Creative photography portfolio image ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : svc.slug === 'flat-lay-photography' ? (
          <div className="service-gallery service-gallery--flat-lay" aria-label="Flat lay photography gallery">
            {flatLayGalleryImages.map((image, index) => (
              <figure
                key={image}
                className="service-gallery__item service-gallery__item--detail service-gallery__item--flat-lay"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={`/images/Flat Lay Photography/${image}`}
                  alt={`Flat lay photography portfolio image ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : svc.slug === 'fashion-photography' ? (
          <div className="service-gallery service-gallery--fashion" aria-label="Fashion photography gallery">
            {fashionGalleryImages.map((image, index) => (
              <figure
                key={image}
                className="service-gallery__item service-gallery__item--detail service-gallery__item--fashion"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <img
                  src={`/images/Fashion Photography/${image}`}
                  alt={`Fashion photography portfolio image ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        ) : folderGalleryImages[svc.slug] ? (
          <div className={`service-gallery service-gallery--${svc.slug}`} aria-label={`${svc.name} gallery`}>
            {folderGalleryImages[svc.slug].map((image, index) => (
              <figure
                key={image}
                className="service-gallery__item service-gallery__item--detail"
                style={{ transitionDelay: `${index * 24}ms` }}
              >
                <img src={image} alt={`${svc.name} portfolio image ${index + 1}`} loading="lazy" />
              </figure>
            ))}
          </div>
        ) : (
          <div className="pagehero__images" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem', marginTop: '2.6rem' }}>
            {svc.images.map((im) => (
              <div key={im.src} className="ph vf" style={{ aspectRatio: '4/3' }}>
                <span className="vf-b" aria-hidden="true" />
                <img src={`/images/${im.src}.webp`} alt={im.alt} />
              </div>
            ))}
          </div>
        )}
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
