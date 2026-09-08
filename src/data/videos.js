// Real ReCreative films — YouTube IDs from the live site, with their real titles.
// Posters are YouTube-provided thumbnails of the same videos.

const yt = (id, title, tag) => ({
  id,
  title,
  tag,
  poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  href: `https://www.youtube.com/watch?v=${id}`,
})

export const FILMS = [
  yt('45y7qP-cM2A', 'Serum Product Videography for Dermalist', 'Cosmetics'),
  yt('5H0TxkLxTbw', 'Desi Ghee Ad Commercial', 'Food & FMCG'),
  yt('7R0AOpNDY6A', 'Handbag Commercial', 'Bags'),
  yt('FaJWHh-b06U', 'Speaker Commercial Shoot', 'Electronics'),
  yt('b7iZVwSCU0Q', 'Fanny Bag Commercial', 'Bags'),
  yt('jmi7BqJE0-A', 'Hair Dryer Commercial for HomeBasic', 'Electronics'),
  yt('-gl4Se_5ojc', 'Mouse Glue Trap Ad', 'Product'),
]

// Stills from ReCreative's own film productions (used as cinematic imagery).
export const FILM_STILLS = {
  harisons: [
    '/images/vid-harisons-1.webp',
    '/images/vid-harisons-2.webp',
    '/images/vid-harisons-3.webp',
  ],
  xout: ['/images/vid-xout-1.webp', '/images/vid-xout-2.webp', '/images/vid-xout-3.webp'],
  model: ['/images/vid-model-1.webp'],
}
