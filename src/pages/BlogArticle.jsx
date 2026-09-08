import { Link, useParams } from 'react-router-dom'
import { useSEO, breadcrumbSchema } from '../lib/seo'
import { Reveal } from '../lib/motion'
import { PageHero } from '../components/ui'
import CTASection from '../components/CTASection'
import { BLOGS, blogBySlug } from '../data/blogs'
import NotFound from './NotFound'

export default function BlogArticle() {
  const { slug } = useParams()
  const post = blogBySlug(slug)
  useSEO({ title: post ? `${post.title} | ReCreative Journal` : 'Page Not Found | ReCreative', description: post?.excerpt || 'The requested article could not be found.', path: post ? `/blog/${post.slug}/` : '/404', schema: post ? [breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog/' }, { label: post.title, href: `/blog/${post.slug}/` }])] : [] })
  if (!post) return <NotFound />
  const related = BLOGS.filter((item) => item.slug !== post.slug).slice(0, 2)
  return (
    <>
      <PageHero label={post.category} title={post.title} lede={post.intro} crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal', href: '/blog/' }, { label: 'Article' }]} meta={`ReCreative Journal · ${post.date}`}>
        <Reveal variant="rv-clip rv-img" className="article-hero ph vf"><span className="vf-b" aria-hidden="true" /><img src={`/images/${post.image}.webp`} alt="" /></Reveal>
      </PageHero>
      <article className="section article">
        <div className="wrap article__grid">
          <aside className="article__rail"><p className="meta">In this article</p>{post.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.heading}>0{index + 1} · {section.heading}</a>)}</aside>
          <div className="article__body">
            <Reveal as="p" className="article__standfirst">{post.intro}</Reveal>
            {post.sections.map((section, index) => <Reveal as="section" id={`section-${index + 1}`} key={section.heading} className="article__section" delay={80}><p className="meta">0{index + 1}</p><h2>{section.heading}</h2><p>{section.body}</p></Reveal>)}
            <Reveal className="article__takeaways" delay={100}><p className="meta">Key takeaways</p><ul>{post.takeaways.map((item) => <li key={item}>{item}</li>)}</ul></Reveal>
          </div>
        </div>
      </article>
      <section className="section article-related"><div className="wrap"><p className="section-label"><span className="tick" />Continue reading</p><div>{related.map((item) => <Link to={`/blog/${item.slug}/`} key={item.slug}><span className="meta">{item.category}</span><h2>{item.title}</h2><span aria-hidden="true">→</span></Link>)}</div></div></section>
      <CTASection />
    </>
  )
}
