import { Link } from 'react-router-dom'
import { useSEO, breadcrumbSchema, faqSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { FAQ, PageHero } from '../components/ui'
import { FAQS } from '../data/faqs'
import CTASection from '../components/CTASection'

export default function Faq() {
  useSEO({ title: 'Frequently Asked Questions | ReCreative, Mumbai', description: 'Answers to common questions about ReCreative product photography, videography, booking and delivery.', path: '/faq/', schema: [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'FAQ', href: '/faq/' }]), faqSchema(FAQS)] })
  return (
    <>
      <PageHero
        label="Frequently asked"
        title={<>The details, <em className="df">made clear.</em></>}
        image={{ src: '/images/FAQ-hero.png', alt: 'Creative photography contact sheets on a studio table' }}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />
      <section className="section faq-page">
        <div className="wrap faq-page__grid">
          <Reveal className="faq-page__intro"><p className="section-label"><span className="tick" />Before we begin</p><h2>Good work starts with a good <em className="df">brief.</em></h2><p>These are the questions we hear most often about planning, shooting and receiving your project.</p><Link to="/contact/" className="btn btn--solid">Ask about your project <span aria-hidden="true">→</span></Link></Reveal>
          <Reveal delay={100}><FAQ items={FAQS} /></Reveal>
        </div>
      </section>
      <section className="faq-orbit"><div className="wrap"><Reveal className="faq-orbit__in"><p className="meta">Still deciding?</p><h2>One brief can include white-background masters, creative sets, lifestyle imagery and <em className="df">motion.</em></h2><div>{['Product', 'Light', 'Story', 'Motion'].map((word) => <span key={word}>{word}</span>)}</div></Reveal></div></section>
      <CTASection />
    </>
  )
}
