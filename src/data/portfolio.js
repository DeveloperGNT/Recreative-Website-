// Selected work — real ReCreative imagery (downloaded from recreative.in).
// Images live in /public/images as <src>.webp

const img = (src, alt, cat, ratio) => ({ src: `/images/${src}.webp`, alt, cat, ratio })

export const WORK = [
  img('work-18', 'Silver statement necklace and earrings styled on deep purple — jewellery photography', 'Jewellery', '4/5'),
  img('work-23', 'Golden ghee pouring beside a packaged jar — food & FMCG photography', 'Food & FMCG', '1/1'),
  img('img-e', 'Brown leather handbag on white — handbag photography', 'Handbags', '1/1'),
  img('work-09', 'Fragrance set shot with deep red styling — creative photography', 'Creative', '1/1'),
  img('work-24', 'Black formal shoes photographed for an online catalogue — footwear', 'Footwear', '1/1'),
  img('work-07', 'Power banks shot top-down on white — electronic product photography', 'Electronics', '1/1'),
  img('img-k', 'Coordinated brand apparel on set — fashion photography', 'Fashion', '1/1'),
  img('work-10', 'Cosmetic jars arranged as a repeating pattern — ecommerce photography', 'Cosmetics', '1/1'),
  img('work-01', 'Navy backpack photographed on white — bags photography', 'Bags', '1/1'),
  img('work-21', 'Spray bottle staged on a dark tropical leaf — creative photography', 'Creative', '1/1'),
  img('work-16', 'Framed artwork on an easel — creative photography', 'Creative', '1/1'),
  img('work-05', 'Packaged ghee jar on white — FMCG packshot', 'Food & FMCG', '1/1'),
  img('img-j', 'True-wireless earbuds on a blue set — electronics lifestyle shot', 'Electronics', '1/1'),
  img('work-03', 'Lipstick photographed white-on-white — cosmetic product photography', 'Cosmetics', '1/1'),
  img('img-d', 'Printed teal backpack for an online catalogue — bags photography', 'Bags', '1/1'),
  img('work-26', 'Kids footwear styled on blue — footwear photography', 'Footwear', '1/1'),
  img('work-27', 'Rakhi styled on pleated red fabric — fashion detail photography', 'Fashion', '1/1'),
  img('img-a', 'Leather shoes photographed on grey — footwear photography', 'Footwear', '1/1'),
  img('work-14', 'Cables and accessories composed from above — flat lay photography', 'Flat Lay', '1600/583'),
  img('work-29', 'Amber perfume bottle on a dark set — creative cosmetics photography', 'Cosmetics', '1/1'),
  img('work-02', 'Aluminium ladder on white — industrial product photography', 'Industrial', '1/1'),
  img('work-31', 'Silver necklace set on white — jewellery packshot', 'Jewellery', '1/1'),
  img('img-b', 'Ghee jar with poured serving — food styling by ReCreative', 'Food & FMCG', '1/1'),
  img('work-08', 'Printed black t-shirt on white — apparel photography', 'Apparel', '1/1'),
]

export const workByCat = (cat) => (cat ? WORK.filter((w) => w.cat === cat) : WORK)
