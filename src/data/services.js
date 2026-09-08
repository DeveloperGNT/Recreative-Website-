// The 19 services defined in the ReCreative sitemap.
// Copy is rewritten from recreative.in's factual descriptions; no invented claims.

const P = 'photography'
const V = 'videography'

export const SERVICES = [
  // ------------------------------------------------------- PHOTOGRAPHY
  {
    slug: 'event-photography',
    type: P,
    name: 'Event Photography',
    lede: 'Conferences, launches and brand events — documented as a coherent visual story.',
    intro:
      'Your event is over in a day; its imagery works for years. ReCreative covers brand events, launches and corporate gatherings with a documentary eye — key moments, candid reactions and clean formal frames, delivered quickly enough to power your post-event coverage.',
    offers: [
      'Full-event coverage with a shot list agreed in advance',
      'Candid, guest and speaker coverage',
      'Fast selection of highlight images for same-week use',
      'Professional edits, colour-corrected and retouched',
      'Photos and video coverage can be combined',
    ],
    uses: [
      'Product launches',
      'Corporate conferences and seminars',
      'Store openings',
      'Exhibitions and trade days',
      'Team and culture shoots',
    ],
    faqs: [
      {
        q: 'How far in advance should we book event coverage?',
        a: 'As early as you can — ideally a week or more ahead — so we can plan the schedule and shot list. Short-notice bookings are often possible; call us to check availability for your date.',
      },
      {
        q: 'How quickly will we receive the photos?',
        a: 'A curated set of highlights is delivered first, followed by the complete edited gallery. Exact timing depends on the event length and the number of images.',
      },
      {
        q: 'Do you cover events outside Mumbai?',
        a: 'Yes. The studio is Mumbai-based and we travel for events across India — see our locations pages for the cities we regularly serve.',
      },
    ],
    images: [
      { src: 'img-k', alt: 'Brand event coverage by ReCreative — two presenters in coordinated brand apparel' },
      { src: 'work-11', alt: 'ReCreative lighting equipment prepared for an event shoot' },
    ],
    related: ['ecommerce-photography', 'creative-photography', 'fashion-photography'],
  },
  {
    slug: 'ecommerce-photography',
    type: P,
    name: 'Ecommerce Photography',
    lede: 'Marketplace-ready product images for Amazon, Flipkart, Meesho, Myntra, Ajio, Nykaa and Snapdeal.',
    intro:
      'E-commerce lives or dies on imagery. ReCreative produces clean, consistent, platform-compliant product photography that helps customers judge your product quickly — and helps your listings convert. From white-background hero shots to lifestyle sets and infographic images, every frame is delivered in the exact formats your marketplace requires.',
    offers: [
      'White background images that meet Amazon, Flipkart and other marketplace standards',
      'Creative and lifestyle shoots for listings, ads and social',
      'Flat lay photography for range and bundle presentations',
      'Infographic images that explain features at a glance',
      'Consistent framing and colour across entire catalogues',
      'Delivery in marketplace-specified sizes and formats',
    ],
    uses: [
      'Amazon / Flipkart / Meesho listings',
      'Myntra, Ajio and Nykaa catalogues',
      'Own webstore product pages',
      'Catalogue refreshes and seasonal ranges',
    ],
    faqs: [
      {
        q: 'Do the images meet Amazon and Flipkart requirements?',
        a: 'Yes. We shoot and export to marketplace standards — pure white backgrounds, correct resolution, framing and file formats — so your listings are approved without rework.',
      },
      {
        q: 'Can you shoot a large catalogue?',
        a: 'Yes. Bulk catalogue work is a core part of the studio, with consistent lighting and framing across every SKU. Bulk pricing is available — contact us with your catalogue size.',
      },
      {
        q: 'How many images do I need per product?',
        a: 'Most listings perform well with a white-background hero, two to four detail angles, a lifestyle or scale shot, and an infographic. We will recommend a set based on your category and platform.',
      },
    ],
    images: [
      { src: 'img-i', alt: 'Ecommerce product photography by ReCreative — styled flat lay with phone, earbuds and macarons' },
      { src: 'work-10', alt: 'Pattern composition of cosmetic jars — ecommerce photography for online listings' },
    ],
    related: ['commercial-product-photography', 'flat-lay-photography', 'creative-photography'],
  },
  {
    slug: 'creative-photography',
    type: P,
    name: 'Creative Photography',
    lede: 'Concept-led product imagery with props, colour and story — built to stop the scroll.',
    intro:
      'When a plain packshot is not enough, creative photography gives your product a world to live in. ReCreative builds visual stories around your product with lighting, composition, props and colour — imagery with mood, authenticity and a point of view that carries from your ads to your social feed.',
    offers: [
      'Concept development around your brand and campaign',
      'Set design, props and art direction',
      'Dramatic and natural-light styles',
      'Brand-integrated compositions',
      'Hero images for ads, launches and packaging',
    ],
    uses: [
      'Ad campaigns and launch creatives',
      'Social media content',
      'Brand lookbooks',
      'Festive and seasonal campaigns',
    ],
    faqs: [
      {
        q: 'Do you develop the concept, or do we bring one?',
        a: 'Both work. Bring a reference or a finished brief and we will build on it — or describe the feeling you want and our team will propose concepts, props and colour directions.',
      },
      {
        q: 'How is creative photography priced compared to white background?',
        a: 'Creative sets take more planning and styling, so they are quoted per project. Share your concept and quantity and we will give you a clear estimate.',
      },
      {
        q: 'Can you match our brand colours and guidelines?',
        a: 'Yes. Props, backgrounds and lighting are planned around your brand palette, and we colour-match on final edits to keep everything on-brand.',
      },
    ],
    images: [
      { src: 'work-21', alt: 'Creative product photography — spray bottle staged on a dark tropical leaf' },
      { src: 'work-09', alt: 'Creative fragrance shoot with deep red styling by ReCreative' },
    ],
    related: ['ecommerce-photography', 'cosmetic-product-photography', 'food-fmcg-photography'],
  },
  {
    slug: 'flat-lay-photography',
    type: P,
    name: 'Flat Lay Photography',
    lede: 'Composed top-down imagery for ranges, bundles and editorial layouts.',
    intro:
      'Flat lay photography turns a group of products into a single considered composition. Shot precisely from above and styled with restraint, flat lays are perfect for showing a full range, a bundle, or the contents of a kit — popular for e-commerce, social and print alike.',
    offers: [
      'Overhead product compositions, styled and colour-balanced',
      'Single-product and multi-product arrangements',
      'Kit and "what’s inside" presentations',
      'Consistent series for catalogue pages',
    ],
    uses: [
      'Range and collection pages',
      'Bundle and combo listings',
      'Social media grids',
      'Packaging inserts and print',
    ],
    faqs: [
      {
        q: 'What products work best as flat lays?',
        a: 'Flat products and small goods photograph beautifully from above — apparel, accessories, cosmetics, stationery, food and electronics kits. We will advise what suits your range.',
      },
      {
        q: 'Can you include props from our brand?',
        a: 'Yes — send props with your products or tell us what to source. Brand-coloured backgrounds and props are a common request.',
      },
      {
        q: 'Do you also offer flat lays as part of an ecommerce package?',
        a: 'Yes, flat lay images are frequently combined with white background and lifestyle shots in a single ecommerce package.',
      },
    ],
    images: [
      { src: 'work-14', alt: 'Flat lay photography — cables and device accessories composed from above' },
      { src: 'img-g', alt: 'Dark flat lay of earphones and accessories by ReCreative' },
    ],
    related: ['ecommerce-photography', 'electronic-photography', 'apparel-photography'],
  },
  {
    slug: 'fashion-photography',
    type: P,
    name: 'Fashion Photography',
    lede: 'Editorial and campaign imagery that gives your collection a point of view.',
    intro:
      'Fashion photography is about attitude as much as garment. ReCreative shoots lookbooks and campaign imagery with direction on styling, pose and light — work that presents your collection with intent, whether for marketplace brand pages, your own store or social campaigns.',
    offers: [
      'Lookbook and campaign shoots',
      'Model coordination and styling direction',
      'Studio or styled-set environments',
      'Full-length, detail and movement frames',
    ],
    uses: [
      'Seasonal lookbooks',
      'Brand store and campaign pages',
      'Social campaigns',
      'Myntra / Ajio brand imagery',
    ],
    faqs: [
      {
        q: 'Do you provide models?',
        a: 'We work with trusted modelling coordinators and can cast from your brief, or shoot with models you supply. Casting preferences are planned during the briefing stage.',
      },
      {
        q: 'Studio or location?',
        a: 'Most fashion work is shot in-studio with controlled light and styled sets. Location shoots are possible on request and quoted per project.',
      },
      {
        q: 'How many outfits can we shoot in a day?',
        a: 'It depends on the number of looks and changes per look, but we will plan a realistic shot list with you so every outfit gets the time it needs.',
      },
    ],
    images: [
      { src: 'img-k', alt: 'Fashion photography for a coordinated apparel label, shot by ReCreative' },
      { src: 'work-27', alt: 'Fashion detail photograph — rakhi styled on pleated red fabric' },
    ],
    related: ['apparel-photography', 'model-videoshoot', 'creative-photography'],
  },
  {
    slug: 'apparel-photography',
    type: P,
    name: 'Apparel Photography',
    lede: 'Catalogue-consistent clothing photography — on form, on model, on brand.',
    intro:
      'Clothing needs to read as fabric, fit and finish. ReCreative photographs apparel for catalogues and marketplaces with consistent lighting and framing across every SKU — ghost mannequin, flat, hanger or on-model — so your range looks like one brand, not a hundred separate shoots.',
    offers: [
      'Ghost mannequin and flat lay apparel shots',
      'On-model catalogue photography',
      'Fabric texture and detail close-ups',
      'Consistent series processing for full ranges',
    ],
    uses: [
      'Marketplace apparel catalogues',
      'Own webstore product pages',
      'Size and fit guides',
      'Seasonal collection pages',
    ],
    faqs: [
      {
        q: 'Which apparel styles do you shoot?',
        a: 'Everything from t-shirts and kurtas to activewear and kidswear. Steam-and-prepare is part of the process — garments arrive at the camera looking their best.',
      },
      {
        q: 'Can you shoot without a model?',
        a: 'Yes. Ghost mannequin and flat lay formats present fit and shape without a model, and are the most cost-efficient way to photograph large catalogues.',
      },
      {
        q: 'How do you keep large ranges consistent?',
        a: 'Fixed lighting, fixed framing and a locked editing recipe. The first approved images become the reference for the entire range.',
      },
    ],
    images: [
      { src: 'work-08', alt: 'Apparel photography — printed black t-shirt on white background' },
      { src: 'work-25', alt: 'Kidswear footwear and apparel catalogue photography' },
    ],
    related: ['fashion-photography', 'ecommerce-photography', 'flat-lay-photography'],
  },
  {
    slug: 'bags-photography',
    type: P,
    name: 'Bags Photography',
    lede: 'Backpacks, handbags and travel goods — structured, tactile, true to material.',
    intro:
      'A bag is architecture: shape, structure and material. ReCreative photographs backpacks, handbags, wallets and travel goods so the silhouette reads instantly and the material feels touchable — white background for marketplaces, styled sets for brand campaigns.',
    offers: [
      'White background marketplace shots',
      'Structured three-quarter and front compositions',
      'Material and hardware close-ups',
      'Inside and capacity presentations',
      '360° product videos on request',
    ],
    uses: [
      'Backpack and luggage brands',
      'Handbag and purse labels',
      'Wallets and small leather goods',
      'School and travel bag catalogues',
    ],
    faqs: [
      {
        q: 'How do you make bags hold their shape?',
        a: 'Bags are internally filled and positioned before shooting so silhouettes look full and upright — the same preparation a marketplace buyer expects.',
      },
      {
        q: 'Can you shoot 360° videos of bags?',
        a: 'Yes — 360° product videos are a popular add-on for bag brands. They let customers inspect every side of the product directly on the listing.',
      },
      {
        q: 'We are a bag manufacturer with many models. Can you handle volume?',
        a: 'Yes. Bulk catalogue work with consistent framing across models is exactly what the studio is built for.',
      },
    ],
    images: [
      { src: 'work-01', alt: 'Bags photography — navy backpack on white background for marketplace listing' },
      { src: 'img-e', alt: 'Brown leather handbag photographed by ReCreative' },
    ],
    related: ['handbag-photography', 'ecommerce-photography', 'product-videoshoot'],
  },
  {
    slug: 'commercial-product-photography',
    type: P,
    name: 'Commercial Product Photography',
    lede: 'Advertising-grade product imagery for brands that need more than a listing photo.',
    intro:
      'Commercial product photography is imagery built to sell at scale — across marketplaces, your webstore, retail media and print. ReCreative combines precise studio technique with brand-aware art direction, producing hero images that hold up everywhere your product is sold.',
    offers: [
      'Hero and packshot photography',
      'Campaign sets with art direction',
      'Marketplace-compliant masters plus campaign crops',
      'Colour-critical product matching',
    ],
    uses: [
      'Brand campaigns and ads',
      'Marketplace brand stores',
      'Packaging and print collateral',
      'Retail media and banners',
    ],
    faqs: [
      {
        q: 'What is the difference between commercial and regular product photography?',
        a: 'Commercial work is planned around a brand objective — campaign, launch or rebrand — with art direction, set building and usage in mind, not just catalogue compliance.',
      },
      {
        q: 'Can you handle fragile or high-value products?',
        a: 'Yes. Products are handled with care protocols agreed in advance, and we can plan insured shipping both ways for high-value items.',
      },
      {
        q: 'Do you deliver print-ready files?',
        a: 'Yes. We deliver high-resolution masters suitable for print as well as web-optimised exports for marketplaces and social.',
      },
    ],
    images: [
      { src: 'work-06', alt: 'Commercial product photography — leather gift set styled by ReCreative' },
      { src: 'img-h', alt: 'Commercial product infographic for a rechargeable trimmer' },
    ],
    related: ['ecommerce-photography', 'creative-photography', 'product-videoshoot'],
  },
  {
    slug: 'cosmetic-product-photography',
    type: P,
    name: 'Cosmetic Product Photography',
    lede: 'Beauty imagery with true colour, clean texture and editorial polish.',
    intro:
      'Cosmetics are bought on faith in a finish — so the photograph must render shade, texture and packaging with total honesty. ReCreative photographs lipsticks, serums, sprays and skincare with colour-critical lighting and beauty-grade retouching for Nykaa-style listings and campaign work alike.',
    offers: [
      'Shade-accurate white background shots',
      'Texture photography — swatches, drops, creams',
      'Styled creative sets for launches',
      'Packaging and range photography',
    ],
    uses: [
      'Nykaa, Amazon and brand webstore listings',
      'Beauty campaign creatives',
      'Social content for beauty brands',
      'Range and shade-chart pages',
    ],
    faqs: [
      {
        q: 'How do you keep shades accurate?',
        a: 'Colour-calibrated lighting, controlled exposure and calibrated editing — we match the product’s real shade across every delivered image.',
      },
      {
        q: 'Can you shoot texture shots like swatches and droplets?',
        a: 'Yes. Texture and macro work is a specialism — swatches, smears, droplets and cream textures that make beauty listings feel premium.',
      },
      {
        q: 'Do you shoot full ranges with many shades?',
        a: 'Yes. Shade families are shot in consistent series so every variant page looks uniform across the range.',
      },
    ],
    images: [
      { src: 'work-03', alt: 'Cosmetic product photography — lipstick with white packaging on white background' },
      { src: 'work-19', alt: 'Matte lipsticks arranged on a red creative set' },
    ],
    related: ['creative-photography', 'ecommerce-photography', 'product-videoshoot'],
  },
  {
    slug: 'electronic-photography',
    type: P,
    name: 'Electronic Product Photography',
    lede: 'Devices and accessories rendered with clean detail — screens, ports and finishes.',
    intro:
      'Electronics live on detail: finishes, ports, buttons, screens. ReCreative photographs devices and accessories with controlled reflections and precise angles — power banks, audio, trimmers, cables and more — plus infographic images that explain features buyers care about.',
    offers: [
      'Reflection-controlled device photography',
      'Port, button and accessory detail shots',
      'Kit and in-the-box compositions',
      'Feature infographic images',
    ],
    uses: [
      'Amazon / Flipkart electronics listings',
      'Audio and wearable brands',
      'Grooming and personal devices',
      'Accessory bundles and kits',
    ],
    faqs: [
      {
        q: 'How do you handle reflective products?',
        a: 'With controlled studio lighting and diffusers — reflections are shaped, not erased, so devices look premium without distracting glare.',
      },
      {
        q: 'Can you show products powered on?',
        a: 'Yes — screens and LEDs can be captured live or composited cleanly in post, whichever produces the most honest, readable result.',
      },
      {
        q: 'Do you make infographic images for electronics?',
        a: 'Yes — feature callouts, size comparisons and in-the-box layouts are common requests for electronics listings.',
      },
    ],
    images: [
      { src: 'work-07', alt: 'Electronic product photography — power banks shot top-down on white' },
      { src: 'img-j', alt: 'True-wireless earbuds photographed on a blue set for an electronics listing' },
    ],
    related: ['flat-lay-photography', 'ecommerce-photography', 'commercial-product-photography'],
  },
  {
    slug: 'food-fmcg-photography',
    type: P,
    name: 'Food & FMCG Photography',
    lede: 'Appetite-first packaging and food imagery for FMCG brands.',
    intro:
      'FMCG packaging has half a second to spark appetite. ReCreative photographs food and FMCG products with the textures people respond to — pours, grains, freshness — alongside clean packshots that keep labels legible and marketplace-compliant.',
    offers: [
      'Packshot photography with label-accurate colour',
      'Ingredient and pour action shots',
      'Styled food sets and props',
      'Range photography for FMCG catalogues',
    ],
    uses: [
      'Packaged food brands',
      'Ghee, oils and staples',
      'Snacks and beverages',
      'Marketplace and quick-commerce listings',
    ],
    faqs: [
      {
        q: 'Do you style the food, or do we supply it ready?',
        a: 'We style on set — garnishes, pours and props are prepared in-studio. If your product has serving suggestions, we plan them into the shot list.',
      },
      {
        q: 'Can you keep our packaging label perfectly readable?',
        a: 'Yes. Label legibility and colour accuracy are treated as requirements, not nice-to-haves, on every FMCG packshot.',
      },
      {
        q: 'We have many SKUs. Can you keep the series uniform?',
        a: 'Yes — uniform lighting and a locked edit keep every SKU visually consistent across the catalogue.',
      },
    ],
    images: [
      { src: 'work-23', alt: 'Food photography — golden ghee pouring beside a packaged jar' },
      { src: 'work-12', alt: 'FMCG food photography styled with serving bowls for a dips campaign' },
    ],
    related: ['creative-photography', 'ecommerce-photography', 'product-videoshoot'],
  },
  {
    slug: 'footwear-photography',
    type: P,
    name: 'Footwear Photography',
    lede: 'Every angle buyers check — profile, top, heel, sole — shot to sell.',
    intro:
      'Footwear buyers inspect. ReCreative photographs shoes in the complete angle set buyers expect — three-quarter, profile, top, heel and sole — with true-to-material light on leather, canvas and sole textures, for listings that answer questions before they are asked.',
    offers: [
      'Full angle set per style',
      'Pair and single-shoe compositions',
      'Material close-ups — stitching, leather, soles',
      'On-white and lifestyle options',
    ],
    uses: [
      'Formal and casual shoe brands',
      'Kidswear footwear',
      'Marketplace catalogues',
      'Webstore collection pages',
    ],
    faqs: [
      {
        q: 'Which angles do you deliver per shoe?',
        a: 'The standard selling set: three-quarter hero, side profile, top, rear/heel and sole — plus detail close-ups where they help.',
      },
      {
        q: 'How do you photograph dark shoes without losing detail?',
        a: 'Graded lighting that separates material from background and reveals stitching and finish — black-on-black is a lighting exercise we do daily.',
      },
      {
        q: 'Can you shoot kids’ footwear ranges?',
        a: 'Yes — including sized series where every size-variant needs a matching composition.',
      },
    ],
    images: [
      { src: 'work-24', alt: 'Footwear photography — black formal shoes photographed for an online listing' },
      { src: 'work-26', alt: 'Kids footwear styled on a blue background by ReCreative' },
    ],
    related: ['apparel-photography', 'ecommerce-photography', 'bags-photography'],
  },
  {
    slug: 'handbag-photography',
    type: P,
    name: 'Handbag Photography',
    lede: 'Handbags shot like the hero products they are — structure, hardware, leather.',
    intro:
      'A handbag carries the whole look. ReCreative photographs handbags with attention to structure, hardware and material grain — clean white background frames for marketplaces, and styled sets with models or props for brand pages and campaigns.',
    offers: [
      'Shape-preserving packshots',
      'Hardware and material close-ups',
      'Interior and capacity shots',
      'Styled lifestyle compositions',
    ],
    uses: [
      'Handbag and purse labels',
      'Tote and office-bag ranges',
      'Marketplace brand stores',
      'Seasonal collection campaigns',
    ],
    faqs: [
      {
        q: 'How do you keep handbags looking full and structured?',
        a: 'Each bag is filled and shaped before the shot, then lit to show form — the difference between a flat photo and a product that feels real.',
      },
      {
        q: 'Do you offer handbag videos too?',
        a: 'Yes — including 360° product videos and handbag commercials. Video is one of the best converters for accessories.',
      },
      {
        q: 'Can you match a consistent look across our handbag range?',
        a: 'Yes. A locked lighting and framing recipe keeps every model in the range visually consistent.',
      },
    ],
    images: [
      { src: 'img-e', alt: 'Handbag photography — brown leather tote on white background' },
      { src: 'img-d', alt: 'Printed teal backpack photographed for an online catalogue' },
    ],
    related: ['bags-photography', 'ecommerce-photography', 'handbag-photography'],
  },
  {
    slug: 'industrial-photography',
    type: P,
    name: 'Industrial Photography',
    lede: 'Tools, equipment and hardware — photographed to look as capable as they are.',
    intro:
      'Industrial products are bought on confidence. ReCreative photographs tools, equipment, hardware and B2B goods with the clarity and scale cues industrial buyers need — robust packshots, detail frames and in-context images that make specifications visible.',
    offers: [
      'Equipment and tool packshots',
      'Scale and context presentations',
      'Material and build-quality close-ups',
      'Catalogue series for large product ranges',
    ],
    uses: [
      'Tools and hardware brands',
      'Equipment manufacturers',
      'B2B catalogues and trade listings',
      'Industrial component suppliers',
    ],
    faqs: [
      {
        q: 'Can you photograph heavy or oversized items?',
        a: 'Yes. Large items can be shot in-studio with prior planning, or photographed on-site — tell us the item dimensions when you enquire.',
      },
      {
        q: 'Do you shoot on our facility floor?',
        a: 'On-site industrial photography is available on request and quoted per project, including process and machinery imagery.',
      },
      {
        q: 'Can you keep a large industrial catalogue consistent?',
        a: 'Yes — series consistency is a core studio discipline, from lighting recipe to final crop.',
      },
    ],
    images: [
      { src: 'work-02', alt: 'Industrial product photography — aluminium ladder on white background' },
      { src: 'work-15', alt: 'Industrial product detail photography with feature callouts' },
    ],
    related: ['commercial-product-photography', 'ecommerce-photography', 'electronic-photography'],
  },
  {
    slug: 'jewellery-photography',
    type: P,
    name: 'Jewellery Photography',
    lede: 'Macro-precise jewellery imagery where every facet earns its sparkle.',
    intro:
      'Jewellery is the most demanding product to photograph — and the most rewarding when done right. ReCreative photographs necklaces, earrings, bracelets and rings with macro precision, controlled sparkle and colour-true metal rendering, on white for marketplaces or styled sets for campaigns.',
    offers: [
      'Macro-detail white background shots',
      'Sparkle-controlled metal and stone rendering',
      'Styled and model jewellery photography',
      'Consistent series for full collections',
    ],
    uses: [
      'Silver and fashion jewellery brands',
      'Imitation and artificial jewellery catalogues',
      'Bridal and festive collections',
      'Marketplace and brand store listings',
    ],
    faqs: [
      {
        q: 'How do you photograph jewellery without harsh reflections?',
        a: 'Jewellery is shot with diffused, angled lighting and careful positioning — sparkle is directed, not blown out, and metals keep their true colour.',
      },
      {
        q: 'Can you shoot on models as well as flat?',
        a: 'Yes — on-model jewellery photography is available for campaigns, and pairs well with macro packshots for listings.',
      },
      {
        q: 'Do you handle very small pieces like nose pins or studs?',
        a: 'Yes. Macro focusing and staging let even the smallest pieces be shown sharp, centred and true to scale.',
      },
    ],
    images: [
      { src: 'work-18', alt: 'Jewellery photography — silver necklace set styled on deep purple' },
      { src: 'work-31', alt: 'Silver necklace and earring set on white background for a marketplace listing' },
    ],
    related: ['fashion-photography', 'creative-photography', 'ecommerce-photography'],
  },
  {
    slug: 'toy-games-photography',
    type: P,
    name: 'Toy & Games Photography',
    lede: 'Playful, colour-true imagery that shows exactly what’s in the box.',
    intro:
      'Toys and games sell on joy and clarity in equal measure. ReCreative photographs toys, board games and kids’ products with bright, honest colour and compositions that show scale, pieces and play value — so parents see precisely what they are buying.',
    offers: [
      'Bright, colour-accurate packshots',
      'In-the-box and component layouts',
      'Scale compositions with age cues',
      'Play-in-action styled shots',
    ],
    uses: [
      'Toy brands and importers',
      'Board and card games',
      'Kids’ activity kits',
      'Marketplace listings and gifting pages',
    ],
    faqs: [
      {
        q: 'Can you show all the game components clearly?',
        a: 'Yes — component layouts are a standard deliverable, so buyers can count pieces and understand the game before purchase.',
      },
      {
        q: 'How do you keep kids’ colours accurate?',
        a: 'Colour-calibrated capture and editing keep bright plastics true — important both for trust and for marketplace compliance.',
      },
      {
        q: 'Do you shoot gift-season campaigns?',
        a: 'Yes — festive and gifting-themed sets are popular for toy brands in the Diwali and holiday window.',
      },
    ],
    images: [
      { src: 'work-30', alt: 'Toy and games photography — puzzle set infographic showing components' },
      { src: 'work-26', alt: 'Kids product photography with playful colour styling' },
    ],
    related: ['ecommerce-photography', 'creative-photography', 'flat-lay-photography'],
  },

  // ------------------------------------------------------- VIDEOGRAPHY
  {
    slug: 'product-videoshoot',
    type: V,
    name: 'Product Videoshoot',
    lede: 'Cinematic product films and 360° videos that turn viewers into buyers.',
    intro:
      'A product film shows what photos cannot: motion, use, scale and finish. ReCreative produces product videoshoots and commercials — from tight 360° spins for marketplaces to directed ad films for campaigns — shot in-studio with controlled lighting and edited to hold attention.',
    offers: [
      'Directed product films and ad commercials',
      '360° product videos for listings',
      'Macro detail and texture sequences',
      'Editing, grading, music and motion graphics',
      'Exports for marketplaces, social and ads',
    ],
    uses: [
      'Marketplace product videos',
      'Social ads and reels',
      'Brand films and launches',
      '360° listing videos',
    ],
    faqs: [
      {
        q: 'How long is a typical product video?',
        a: 'Listing and 360 videos typically run 15–45 seconds; ad films run 30–90 seconds. We will recommend a length based on where the video will run.',
      },
      {
        q: 'What does a product videoshoot cost?',
        a: 'Pricing depends on product count, concept and edit complexity. ReCreative’s videography is known for being affordable for the quality — send your brief for a clear quote.',
      },
      {
        q: 'Do you handle music and voiceover?',
        a: 'Yes — licensed music, motion graphics and voiceover can all be included in the edit.',
      },
    ],
    images: [
      { src: 'vid-harisons-1', alt: 'Frame from a ReCreative product film for Harisons' },
      { src: 'vid-xout-2', alt: 'Frame from the X-Out product film shot by ReCreative' },
    ],
    related: ['model-videoshoot', 'commercial-product-photography', 'real-estate-videography'],
  },
  {
    slug: 'model-videoshoot',
    type: V,
    name: 'Model Videoshoot',
    lede: 'Model-led films for fashion, beauty and lifestyle brands.',
    intro:
      'Model videoshoots bring wearability and emotion to film — how a garment moves, how a product lives in hand. ReCreative directs model-led shoots with casting coordination, styling and cinematic lighting, delivering films cut for campaign pages, reels and ads.',
    offers: [
      'Model casting coordination',
      'Directed performance and posing for film',
      'Studio lighting and cinematic grading',
      'Cutdowns for reels, shorts and ads',
    ],
    uses: [
      'Fashion and apparel campaigns',
      'Beauty and cosmetics films',
      'Jewellery and accessories',
      'Lifestyle brand films',
    ],
    faqs: [
      {
        q: 'Do you arrange the models?',
        a: 'Yes — we coordinate casting through trusted coordinators based on your brief, or shoot with talent you provide.',
      },
      {
        q: 'Can photos be captured on the same shoot?',
        a: 'Yes. Combining stills and film in one schedule is efficient and keeps the visual language consistent across both.',
      },
      {
        q: 'What deliverables do we get?',
        a: 'A master film plus agreed cutdowns — typically a 16:9 master, 9:16 reel cuts and 6–15 second ad cuts.',
      },
    ],
    images: [
      { src: 'vid-model-1', alt: 'Frame from a ReCreative model videoshoot' },
      { src: 'vid-xout-1', alt: 'Vertical film frame from a model-led commercial' },
    ],
    related: ['product-videoshoot', 'fashion-photography', 'cosmetic-product-photography'],
  },
  {
    slug: 'real-estate-videography',
    type: V,
    name: 'Real Estate Videography',
    lede: 'Property films that give buyers a sense of place before they visit.',
    intro:
      'Real estate videography turns floor plans into feeling. ReCreative produces property walkthrough films for developers, brokers and hospitality brands — smooth movement, honest light and an edit that guides the viewer through the space the way a good visit would.',
    offers: [
      'Directed property walkthrough films',
      'Smooth stabilised camera movement',
      'Detail and highlight sequences',
      'Edited films with licensed music',
    ],
    uses: [
      'Residential project marketing',
      'Commercial property listings',
      'Hospitality — hotels, restaurants, cafés',
      'Site progress films',
    ],
    faqs: [
      {
        q: 'How long is a property film?',
        a: 'Most property films run 60–120 seconds, with short 15–30 second cuts for reels and ads.',
      },
      {
        q: 'Do you shoot on-site or in-studio?',
        a: 'Real estate films are always shot on location at the property, planned around the best natural light.',
      },
      {
        q: 'Can you film an under-construction or staged property?',
        a: 'Yes — with staging and planning, walkthroughs can be shot for ready, staged and sample properties.',
      },
    ],
    images: [
      { src: 'work-16', alt: 'Interior styling frame from a ReCreative property film' },
      { src: 'work-11', alt: 'Production lighting equipment prepared on location' },
    ],
    related: ['product-videoshoot', 'model-videoshoot', 'creative-photography'],
  },
]

export const PHOTOGRAPHY_SERVICES = SERVICES.filter((s) => s.type === P)
export const VIDEOGRAPHY_SERVICES = SERVICES.filter((s) => s.type === V)

export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)

export const typeOf = (service) => (service.type === V ? 'videography' : 'photography')

export const serviceHref = (service) => `/${service.type}/${service.slug}/`
