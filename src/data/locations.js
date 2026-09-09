// The 10 locations from the ReCreative sitemap.
// Mumbai is the studio's home city; all listed locations are cities/regions
// the studio serves (as stated on recreative.in).

export const LOCATIONS = [
  {
    slug: 'mumbai',
    name: 'Mumbai',
    primary: true,
    kind: 'City',
    region: 'Maharashtra',
    blurb:
      'Home of the ReCreative studio. Our Sion-based studio handles the full production — from receiving and preparing your products to shooting, editing and shipping them back.',
    intro:
      'ReCreative’s studio is in Sion, Mumbai — in the middle of the city’s commercial supply lines. Mumbai brands can visit for briefed shoots, drop products directly, or have them picked up. It is where every ReCreative production is planned, shot and finished.',
  },
  {
    slug: 'pune',
    name: 'Pune',
    primary: true,
    kind: 'City',
    region: 'Maharashtra',
    blurb:
      'A primary service city for ReCreative. Pune brands ship products to our Mumbai studio for photography and videography, with edits delivered digitally.',
    intro:
      'Pune’s growing D2C and manufacturing brands are a core part of ReCreative’s client base. Products travel from Pune to the Mumbai studio for their shoot and return after production — with the edited imagery delivered digitally, usually within days.',
  },
  {
    slug: 'panipat',
    name: 'Panipat',
    primary: false,
    kind: 'City',
    region: 'Haryana',
    blurb:
      'Serving Panipat’s textile and home-furnishing manufacturers with catalogue photography and product films.',
    intro:
      'Panipat’s manufacturers — from textiles to home furnishings — ship products to the ReCreative studio for consistent catalogue photography, with everything planned remotely: shot lists, references and marketplace requirements agreed before the products travel.',
  },
  {
    slug: 'chennai',
    name: 'Chennai',
    primary: false,
    kind: 'City',
    region: 'Tamil Nadu',
    blurb:
      'Product photography and videography services for Chennai brands, ecommerce sellers and manufacturers.',
    intro:
      'For Chennai’s ecommerce sellers and manufacturers, ReCreative works as the remote production studio: products are shipped to Mumbai, shot to a briefed standard, and returned — while the imagery is delivered digitally the moment it is ready.',
  },
  {
    slug: 'kolkata',
    name: 'Kolkata',
    primary: false,
    kind: 'City',
    region: 'West Bengal',
    blurb:
      'Catalogue and creative photography for Kolkata sellers, brands and legacy manufacturers.',
    intro:
      'Kolkata brands — from legacy manufacturers to new D2C labels — use ReCreative for marketplace-compliant catalogues and creative campaign imagery, produced in the Mumbai studio and delivered online.',
  },
  {
    slug: 'jaipur',
    name: 'Jaipur',
    primary: false,
    kind: 'City',
    region: 'Rajasthan',
    blurb:
      'Photography and videography for Jaipur’s jewellery, apparel and handicraft exporters.',
    intro:
      'Jaipur’s jewellery, apparel and handicraft businesses trust ReCreative with product imagery where colour and material honesty decide the sale — shipped to the studio, shot with colour-critical precision, returned safely.',
  },
  {
    slug: 'rajkot',
    name: 'Rajkot',
    primary: false,
    kind: 'City',
    region: 'Gujarat',
    blurb:
      'Serving Rajkot’s manufacturing and engineering brands with product and catalogue photography.',
    intro:
      'Rajkot’s manufacturing and engineering brands rely on ReCreative for catalogues that make capability visible — tools, components and hardware photographed with the clarity industrial buyers need.',
  },
  {
    slug: 'surat',
    name: 'Surat',
    primary: false,
    kind: 'City',
    region: 'Gujarat',
    blurb:
      'Textile, saree and apparel photography for Surat’s fabric and fashion trade.',
    intro:
      'Surat’s textile and apparel trade shoots with ReCreative for a reason: fabric must read as fabric. Products travel from Surat to the studio and return as a consistent, marketplace-ready catalogue.',
  },
  {
    slug: 'bengaluru',
    name: 'Bengaluru',
    primary: false,
    kind: 'City',
    region: 'Karnataka',
    blurb:
      'Product photography and video for Bengaluru’s D2C brands, startups and tech-enabled sellers.',
    intro:
      'Bengaluru’s D2C and startup brands use ReCreative as their production partner — briefed remotely, shot in Mumbai, delivered digitally — for everything from launch creatives to full marketplace catalogues.',
  },
  {
    slug: 'bangladesh',
    name: 'Bangladesh',
    primary: false,
    kind: 'Country',
    region: 'International',
    blurb:
      'International product photography and videography services for brands across Bangladesh.',
    intro:
      'ReCreative serves brands across Bangladesh with the same production pipeline used across India: products are shipped to the Mumbai studio, photographed and filmed to a briefed standard, and returned with the imagery delivered digitally.',
  },
]

export const locationBySlug = (slug) => LOCATIONS.find((l) => l.slug === slug)
export const locationHref = (loc) => `/locations/${loc.slug}/`
export const photographyLocationHref = (loc) => `/photography/commercial-product-photography/${loc.slug}/`
