// Site-wide factual constants. Everything here comes from recreative.in.
// Do not add fabricated claims (awards, client counts, statistics).

export const SITE = {
  name: 'ReCreative',
  url: 'https://recreative.in',
  tagline: 'Product photography & videography studio, Mumbai',
  description:
    'ReCreative is a Mumbai-based studio creating professional product photography and videography for websites, e-commerce and social media — trusted by brands from small businesses to Fortune 400+ companies.',
  phone: '+91 70215 71455',
  phoneHref: '+917021571455',
  email: 'inquiry@recreative.in',
  addressLines: [
    'PMGP Colony, Room No. 8, C-Wing',
    'Prince Park Building, Near Maharashtra Nature Park',
    'Sion, Dharavi, Mumbai 400017',
  ],
  founded: 'Founded in Mumbai by Sandeep Prajapati',
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/_recreative.in' },
    { name: 'YouTube', href: 'https://www.youtube.com/@recreative.in' },
    { name: 'Facebook', href: 'https://www.facebook.com/officialrecreative' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/recreativein' },
    { name: 'Pinterest', href: 'https://in.pinterest.com/recreativein' },
  ],
  marketplaces: [
    'Amazon',
    'Flipkart',
    'Meesho',
    'Myntra',
    'Ajio',
    'Nykaa',
    'Snapdeal',
  ],
}

// Reviews are real, verified Google reviews (paraphrased from the live site).
export const REVIEWS = [
  {
    name: 'Anurag Pandey',
    role: 'Google review',
    text:
      'Great work on our event photography and videography. Detailed edits, smooth communication and a team that genuinely cares about the outcome.',
  },
  {
    name: 'Suresh Yame',
    role: 'Google review',
    text:
      'A smooth experience from start to finish — and a high-quality product at the end of it.',
  },
  {
    name: 'Suryansh',
    role: 'Google review',
    text:
      'A great product photography studio with affordable videography. I especially liked their 360 videography.',
  },
  {
    name: 'Kaptan',
    role: 'Bag manufacturer · Google review',
    text:
      'As a bag manufacturer I needed images that sell. The team delivered excellent product images and 360 videos.',
  },
  {
    name: 'Deepa Patwa',
    role: 'Google review',
    text:
      'A professional team — and delivery was right on time.',
  },
  {
    name: 'Arsh Husain',
    role: 'Google review',
    text:
      'My first time working with a studio like this, and it won’t be the last. Planning to work with them long-term.',
  },
]

// Four-step working process (grounded in the studio's shipping/how-it-works flow).
export const PROCESS = [
  {
    n: '01',
    title: 'Brief & planning',
    body: 'Share your products, references and target marketplaces. We plan the shot list, styling direction and logistics together — including pickup or shipping of your items to the Mumbai studio.',
  },
  {
    n: '02',
    title: 'Set & styling',
    body: 'Products are cleaned, prepared and styled. Backgrounds, props and lighting are built around your brand — white background for marketplaces, creative sets for campaigns.',
  },
  {
    n: '03',
    title: 'The shoot',
    body: 'Photography and videography are captured with professional equipment and controlled studio lighting, with attention to colour, texture and true-to-life detail.',
  },
  {
    n: '04',
    title: 'Edit & delivery',
    body: 'Images are retouched, colour-corrected and exported in the formats your platform requires — with revisions available until the result is right.',
  },
]

// Photography craft chapter captions for the exploded-camera scroll experience.
export const CRAFT_CHAPTERS = [
  {
    id: 'optics',
    label: '01 · Optics',
    title: 'Light enters here',
    body: 'Every image we deliver begins as light, focused through glass. Lens choice, aperture and distance-to-subject decide how a product feels before a single edit is made.',
  },
  {
    id: 'focus',
    label: '02 · Focus',
    title: 'Precision, element by element',
    body: 'Groups of lens elements align to render texture honestly — leather grain, brushed metal, condensed droplets. Sharpness is a production decision, not an accident.',
  },
  {
    id: 'shutter',
    label: '03 · Exposure',
    title: 'Controlled exposure',
    body: 'Shutter, aperture and ISO work as one system. In the studio, exposure is engineered — so products keep their true colour across every frame.',
  },
  {
    id: 'sensor',
    label: '04 · Sensor',
    title: 'Where light becomes data',
    body: 'The sensor records what the optics resolve. High-resolution captures give our retouchers detail to work with, from e-commerce grids to billboard-scale crops.',
  },
  {
    id: 'assembly',
    label: '05 · Assembly',
    title: 'The system comes together',
    body: 'Body, glass and light — assembled by a team that treats the camera as an instrument. This is the craft behind every catalogue, campaign and film we produce.',
  },
]

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Photography', href: '/photography/', menu: 'photography' },
  { label: 'Videography', href: '/videography/', menu: 'videography' },
  { label: 'Locations', href: '/locations/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Contact', href: '/contact/' },
]
