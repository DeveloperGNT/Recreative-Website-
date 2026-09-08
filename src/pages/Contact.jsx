import { useState } from 'react'
import { useSEO, breadcrumbSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { PageHero } from '../components/ui'
import { SITE } from '../data/site'

export default function Contact() {
  const [sent, setSent] = useState(false)
  useSEO({ title: 'Contact ReCreative | Photography & Videography Studio, Mumbai', description: 'Get in touch with ReCreative’s Mumbai studio for product photography, videography and commercial content.', path: '/contact/', schema: [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Contact', href: '/contact/' }])] })
  return (
    <>
      <PageHero
        label="Start a conversation"
        title={<>Let’s make something <em className="df">worth looking at.</em></>}
        image={{ src: '/images/contact-hero.jpg', alt: 'Product photography setup with studio lights, camera and perfume bottle' }}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      <section className="section contact-page">
        <div className="wrap contact-page__grid">
          <Reveal className="contact-page__aside">
            <p className="section-label"><span className="tick" />Mumbai studio</p>
            <h2>Bring the brief. We’ll bring the <em className="df">light.</em></h2>
            <p>Whether you need a catalogue, a campaign or a product film, start with the essentials. We’ll return with a clear plan, timing and quote.</p>
            <div className="contact-details">
              <a href={`tel:${SITE.phoneHref}`}><span>Call the studio</span><b>{SITE.phone}</b></a>
              <a href={`mailto:${SITE.email}`}><span>Email</span><b>{SITE.email}</b></a>
              <a href="https://maps.app.goo.gl/wLvDFDCc6BtiSpCB6" target="_blank" rel="noreferrer"><span>Visit by appointment</span><b>{SITE.addressLines.slice(0, 2).join(', ')}</b></a>
            </div>
          </Reveal>
          <Reveal className="contact-form-card" delay={100}>
            {sent ? (
              <div className="contact-success"><span className="contact-success__mark">✓</span><p className="meta">Enquiry prepared</p><h2>Thanks. Your project is on our radar.</h2><p>Email the studio at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>, or call <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a> for an immediate response.</p><button className="btn btn--ghost" onClick={() => setSent(false)}>Send another enquiry</button></div>
            ) : (
              <form className="form" onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
                <div><p className="meta">Project enquiry</p><h2>Tell us the essentials.</h2></div>
                <div className="form__row"><label className="field"><span>Your name</span><input required name="name" autoComplete="name" placeholder="Name" /></label><label className="field"><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@company.com" /></label></div>
                <div className="form__row"><label className="field"><span>Mobile number</span><input name="phone" type="tel" autoComplete="tel" placeholder="+91" /></label><label className="field"><span>Interested in</span><select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Product photography</option><option>Videography</option><option>Creative / commercial shoot</option><option>Something else</option></select></label></div>
                <label className="field"><span>Your project</span><textarea name="message" required placeholder="Products, quantities, platforms, target date and any useful references…" /></label>
                <button className="btn btn--solid" type="submit">Send enquiry <span aria-hidden="true">→</span></button>
                <p className="form__note">Or email us directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
      <section className="contact-strip"><div className="wrap"><Reveal><p className="meta">From the first message to final delivery</p><h2>A simple, considered <em className="df">way to work.</em></h2></Reveal><Reveal className="contact-strip__steps" delay={120}>{['Share the brief', 'Plan the shoot', 'Make the work'].map((step, index) => <p key={step}><span>0{index + 1}</span>{step}</p>)}</Reveal></div></section>
    </>
  )
}
