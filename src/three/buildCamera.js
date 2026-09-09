// Procedural, hard-surface DSLR (Nikon-style) built from primitives.
// Returns a group plus part descriptors with rest/exploded transforms so the
// scene can interpolate a scroll-driven exploded view.
// Anatomy: body core (anchor), grip, top plate, prism hump, back panel, bottom
// plate, internal chassis/sensor/shutter, lens mount and a multi-section zoom
// lens that disassembles along its optical axis.

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

/* ---------------- materials ---------------- */

const M = {
  body: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2c3134'),
    metalness: 0.18,
    roughness: 0.5,
  }),
  bodyTop: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#343a3d'),
    metalness: 0.22,
    roughness: 0.42,
  }),
  bodyDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#202528'),
    metalness: 0.3,
    roughness: 0.58,
  }),
  rubber: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#161a1c'),
    metalness: 0.02,
    roughness: 0.93,
  }),
  rubberRib: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#101416'),
    metalness: 0.02,
    roughness: 0.97,
  }),
  metal: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b9bfc1'),
    metalness: 0.95,
    roughness: 0.3,
  }),
  metalDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#5a6265'),
    metalness: 0.85,
    roughness: 0.38,
  }),
  gold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#b9955c'),
    metalness: 1,
    roughness: 0.34,
  }),
  white: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e9e6dc'),
    metalness: 0.1,
    roughness: 0.5,
  }),
  accent: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7fc9ae'),
    metalness: 0.3,
    roughness: 0.4,
    emissive: new THREE.Color('#7fc9ae'),
    emissiveIntensity: 0.25,
  }),
  // front element: near-black optical glass with a subtle coating sheen
  glassDark: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0a1a15'),
    metalness: 0.6,
    roughness: 0.06,
    clearcoat: 1,
    clearcoatRoughness: 0.05,
    iridescence: 0.55,
    iridescenceIOR: 1.35,
  }),
  // deep interior element with a faint green optical tint
  glassDeep: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#12342a'),
    metalness: 0.5,
    roughness: 0.1,
    clearcoat: 1,
    emissive: new THREE.Color('#0d2a20'),
    emissiveIntensity: 0.35,
  }),
  // internal elements seen alone once disassembled
  glassEl: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#d9edf3'),
    metalness: 0,
    roughness: 0.05,
    transmission: 0.92,
    thickness: 0.4,
    ior: 1.55,
    clearcoat: 1,
  }),
  sensorGlass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0e2f26'),
    metalness: 0.9,
    roughness: 0.12,
    clearcoat: 1,
  }),
  screen: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0b1310'),
    metalness: 0.3,
    roughness: 0.07,
    clearcoat: 1,
  }),
  pcb: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#14493c'),
    metalness: 0.3,
    roughness: 0.5,
  }),
  innerDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#05080a'),
    metalness: 0.1,
    roughness: 0.95,
    side: THREE.BackSide,
  }),
}

/* ---------------- helpers ---------------- */

const rounded = (w, h, d, r = 0.12, seg = 3) =>
  new RoundedBoxGeometry(w, h, d, seg, Math.min(r, Math.min(w, h, d) / 2.1))

function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  return m
}

// cylinder with its axis baked onto world Z (the optical axis)
const zCyl = (r1, r2, h, seg = 64, open = false) => {
  const geo = new THREE.CylinderGeometry(r1, r2, h, seg, 1, open)
  geo.rotateX(Math.PI / 2)
  return geo
}

// knurled/ribbed ring: ribs orbit their own group-local axis, so the parent
// part must be built around (0,0) and positioned via its group transform.
function ribbedRing(parent, { r, len, count, z, mat, w = 0.05 }) {
  const holders = []
  const ribGeo = new THREE.BoxGeometry(w, len, w * 1.5)
  for (let i = 0; i < count; i++) {
    const holder = new THREE.Object3D()
    holder.rotation.z = (i / count) * Math.PI * 2
    const rib = new THREE.Mesh(ribGeo, mat)
    rib.position.x = r
    rib.rotation.x = Math.PI / 2
    holder.add(rib)
    holder.position.z = z
    parent.add(holder)
    holders.push(holder)
  }
  return holders
}

function labelTexture(text, { w = 512, h = 96, size = 42, spacing = 8 } = {}) {
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')
  ctx.clearRect(0, 0, w, h)
  ctx.font = `600 ${size}px "Manrope", "Helvetica Neue", Arial, sans-serif`
  if ('letterSpacing' in ctx) ctx.letterSpacing = `${spacing}px`
  ctx.fillStyle = 'rgba(224, 229, 230, 0.92)'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, w / 2, h / 2 + 2)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

function labelMesh(text, width, height, opts = {}) {
  const mat = new THREE.MeshBasicMaterial({
    map: labelTexture(text, opts),
    transparent: true,
    toneMapped: false,
  })
  return new THREE.Mesh(new THREE.PlaneGeometry(width, height), mat)
}

/* ---------------- camera build ---------------- */

export function buildCamera({ detail = 'high' } = {}) {
  const g = new THREE.Group()
  const parts = []
  const hi = detail !== 'low'

  const addPart = (object, { rest, exploded, delay = 0, spin = null } = {}) => {
    if (!rest) rest = object.position.clone()
    else if (Array.isArray(rest)) rest = new THREE.Vector3(...rest)
    if (!exploded) exploded = rest.clone()
    else if (Array.isArray(exploded)) exploded = new THREE.Vector3(...exploded)
    object.userData.rest = rest
    object.userData.exploded = exploded
    object.userData.delay = delay
    object.userData.spin = spin
    g.add(object)
    parts.push(object)
    return object
  }

  const W = 5.9 // main slab width — grip adds to the right
  const H = 4.6
  const D = 3.1
  const LENS_X = -0.6
  const LENS_Y = 0.1
  const Z0 = D / 2 // front face plane / start of the optical axis

  /* ---- body core (anchor of the exploded view) ---- */
  const core = new THREE.Group()
  core.add(mesh(rounded(W, H, D, 0.26), M.body))
  // recessed mount island on the front face
  core.add(mesh(zCyl(1.9, 1.9, 0.1), M.bodyDark, LENS_X, LENS_Y, Z0 - 0.02))
  // panel seams
  core.add(mesh(rounded(0.035, H - 0.9, 0.03, 0.01), M.bodyDark, -2.35, -0.1, Z0 + 0.01))
  core.add(mesh(rounded(0.035, H - 0.9, 0.03, 0.01), M.bodyDark, 1.95, -0.1, Z0 + 0.01))
  // side port doors (left flank)
  core.add(mesh(rounded(0.08, 1.4, 1.5, 0.04), M.rubber, -W / 2 - 0.01, -0.35, 0.2))
  core.add(mesh(rounded(0.06, 0.32, 0.5, 0.02), M.bodyDark, -W / 2 - 0.02, -0.1, 0.45))
  core.add(mesh(rounded(0.06, 0.32, 0.35, 0.02), M.bodyDark, -W / 2 - 0.02, -0.65, 0.45))
  addPart(core, { delay: 0, exploded: [0, 0, 0] })

  /* ---- ergonomic right-hand grip ---- */
  const grip = new THREE.Group()
  grip.add(mesh(rounded(1.8, H - 0.25, 3.55, 0.62), M.body, 3.0, -0.05, 0.25))
  const bulge = mesh(rounded(1.55, 2.5, 1.15, 0.55), M.body, 3.0, -1.05, 1.8)
  bulge.rotation.x = -0.06
  grip.add(bulge)
  // textured rubber surfaces
  grip.add(mesh(rounded(1.15, 2.1, 0.1, 0.05), M.rubberRib, 3.0, -1.05, 2.36))
  grip.add(mesh(rounded(0.12, 3.5, 2.7, 0.06), M.rubberRib, 3.92, -0.1, 0.4))
  grip.add(mesh(rounded(0.6, 1.15, 1.5, 0.28), M.rubber, 3.55, -2.0, -0.7))
  addPart(grip, { delay: 0.18, exploded: [2.1, -0.1, 0.4] })

  /* ---- top plate: dials, hot shoe, top LCD, shutter release ---- */
  const top = new THREE.Group()
  top.add(mesh(rounded(7.3, 0.6, 2.95, 0.16), M.bodyTop, 0.35, 2.6, -0.05))
  // top control (LCD) panel
  top.add(mesh(rounded(2.15, 0.06, 1.35, 0.03), M.bodyDark, 2.05, 2.9, -0.3))
  top.add(mesh(rounded(1.85, 0.03, 1.05, 0.015), M.screen, 2.05, 2.94, -0.3))
  // mode dial (left)
  top.add(mesh(zCyl(0.6, 0.6, 0.3, 48), M.metalDark, -2.45, 3.05, -0.2))
  top.add(mesh(zCyl(0.56, 0.56, 0.05, 48), M.bodyTop, -2.45, 3.21, -0.2))
  top.add(mesh(zCyl(0.06, 0.06, 0.04, 12), M.accent, -2.45, 3.24, -0.62))
  ribbedRing(top, { r: 0.62, len: 0.26, count: hi ? 32 : 18, z: -0.2, mat: M.bodyDark })
    .children.forEach((h) => {
      h.position.x = -2.45
      h.position.y = 3.05
    })
  // command dial (right, on grip shoulder)
  top.add(mesh(zCyl(0.46, 0.46, 0.24, 48), M.metal, 3.1, 2.98, 0.05))
  ribbedRing(top, { r: 0.47, len: 0.2, count: hi ? 28 : 16, z: 0.05, mat: M.metalDark })
    .children.forEach((h) => {
      h.position.x = 3.1
      h.position.y = 2.98
    })
  // shutter release on an angled block over the grip
  top.add(mesh(rounded(0.62, 0.32, 0.8, 0.1), M.bodyTop, 3.1, 2.78, 0.95))
  const shBtn = mesh(zCyl(0.19, 0.21, 0.12, 24), M.metal, 3.1, 2.96, 1.12)
  shBtn.rotation.x = -0.25
  top.add(shBtn)
  const shRing = mesh(new THREE.TorusGeometry(0.19, 0.02, 8, 24), M.accent, 3.1, 2.97, 1.12)
  shRing.rotation.x = -0.25
  top.add(shRing)
  // hot shoe (centre)
  top.add(mesh(rounded(1.05, 0.2, 1.25, 0.04), M.bodyDark, LENS_X, 2.95, -0.55))
  top.add(mesh(rounded(0.14, 0.1, 1.05, 0.03), M.metalDark, LENS_X - 0.38, 3.08, -0.55))
  top.add(mesh(rounded(0.14, 0.1, 1.05, 0.03), M.metalDark, LENS_X + 0.38, 3.08, -0.55))
  top.add(mesh(rounded(0.5, 0.05, 0.9, 0.02), M.metal, LENS_X, 3.11, -0.55))
  // rear control row on the top plate
  for (let i = 0; i < 4; i++) {
    top.add(mesh(zCyl(0.08, 0.08, 0.06, 12), M.bodyDark, 1.1 + i * 0.42, 2.92, -1.25))
  }
  top.add(mesh(zCyl(0.09, 0.09, 0.06, 12), M.accent, 2.75, 2.92, -1.25))
  addPart(top, { delay: 0.24, exploded: [0, 1.15, -0.5] })

  /* ---- pentaprism viewfinder hump ---- */
  const hump = new THREE.Group()
  const shape = new THREE.Shape()
  shape.moveTo(-1.0, 0)
  shape.lineTo(1.05, 0)
  shape.lineTo(0.5, 1.25)
  shape.lineTo(-0.72, 1.25)
  shape.closePath()
  const humpGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 2.3,
    bevelEnabled: true,
    bevelThickness: 0.07,
    bevelSize: 0.07,
    bevelSegments: 2,
  })
  const humpMesh = new THREE.Mesh(humpGeo, M.bodyTop)
  // shape X -> world Z, extrusion -> world X (centred over the mount)
  humpMesh.rotation.y = -Math.PI / 2
  humpMesh.position.set(0.62, 2.88, -0.35)
  hump.add(humpMesh)
  // eyepiece at the rear
  hump.add(mesh(rounded(1.2, 0.85, 0.18, 0.07), M.rubber, LENS_X, 3.55, -1.42))
  hump.add(mesh(rounded(0.85, 0.55, 0.08, 0.03), M.screen, LENS_X, 3.55, -1.52))
  // viewfinder window on the front slope
  const vfWin = mesh(rounded(0.95, 0.5, 0.08, 0.03), M.screen, LENS_X, 3.6, 0.42)
  vfWin.rotation.x = -0.41
  hump.add(vfWin)
  // nameplate below the window
  const plate = labelMesh('RECREATIVE', 1.3, 0.32)
  plate.position.set(LENS_X, 3.12, 0.6)
  plate.rotation.x = -0.41
  hump.add(plate)
  // microphone dots
  for (let i = 0; i < 3; i++) {
    hump.add(mesh(zCyl(0.035, 0.035, 0.05, 8), M.bodyDark, LENS_X - 0.72 + i * 0.14, 3.92, 0.26))
  }
  addPart(hump, { delay: 0.3, exploded: [0, 1.9, -0.9] })

  /* ---- back panel: LCD, d-pad, buttons ---- */
  const back = new THREE.Group()
  back.add(mesh(rounded(6.9, 4.15, 0.3, 0.2), M.body, 0.1, 0, -1.62))
  back.add(mesh(rounded(3.65, 2.75, 0.08, 0.04), M.bodyDark, -0.75, 0.15, -1.78))
  back.add(mesh(rounded(3.4, 2.5, 0.06, 0.03), M.screen, -0.75, 0.15, -1.82))
  // d-pad
  back.add(mesh(rounded(0.9, 0.3, 0.1, 0.05), M.bodyDark, 2.45, -0.75, -1.8))
  back.add(mesh(rounded(0.3, 0.9, 0.1, 0.05), M.bodyDark, 2.45, -0.75, -1.8))
  back.add(mesh(zCyl(0.1, 0.1, 0.06, 12), M.metal, 2.45, -0.75, -1.86))
  // button stack
  ;[[2.45, 0.35], [2.45, 0.85], [2.45, 1.35]].forEach(([x, y], i) => {
    back.add(mesh(zCyl(0.11, 0.11, 0.08, 12), i === 0 ? M.accent : M.bodyDark, x, y, -1.8))
  })
  back.add(mesh(rounded(0.3, 1.4, 0.1, 0.05), M.bodyDark, 1.25, 0.2, -1.8))
  addPart(back, { delay: 0.14, exploded: [0, 0.1, -2.2] })

  /* ---- bottom plate + battery ---- */
  const bottom = new THREE.Group()
  bottom.add(mesh(rounded(7.35, 0.5, 3.0, 0.16), M.bodyTop, 0.35, -2.55, -0.02))
  bottom.add(mesh(rounded(2.4, 0.06, 0.04, 0.02), M.bodyDark, 1.4, -2.81, 1.51))
  bottom.add(mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.08, 24), M.metalDark, 0.2, -2.82, 0.35))
  addPart(bottom, { delay: 0.28, exploded: [0, -1.5, -0.4] })

  const battery = new THREE.Group()
  battery.add(mesh(rounded(0.95, 1.75, 2.0, 0.1), M.rubber, 3.05, -1.5, 0.25))
  battery.add(mesh(rounded(0.6, 0.1, 1.4, 0.03), M.accent, 3.05, -0.72, 0.25))
  for (let i = 0; i < 3; i++) {
    battery.add(mesh(rounded(0.08, 0.16, 0.5, 0.02), M.gold, 2.66, -0.9 + i * 0.35, 0.9))
  }
  addPart(battery, { delay: 0.36, exploded: [1.9, -1.5, 0.7] })

  /* ---- internal chassis ---- */
  const chassis = new THREE.Group()
  chassis.add(mesh(rounded(5.5, 3.8, 2.4, 0.12), M.metalDark, 0, -0.05, -0.1))
  chassis.add(mesh(rounded(2.0, 1.5, 0.14, 0.04), M.pcb, 1.0, 0.7, -0.9))
  chassis.add(mesh(zCyl(0.16, 0.16, 0.3, 16), M.gold, -1.6, 1.2, -0.7))
  addPart(chassis, { delay: 0.4, exploded: [0, -0.3, -1.2] })

  /* ---- sensor unit ---- */
  const sensor = new THREE.Group()
  sensor.add(mesh(rounded(2.1, 1.7, 0.32, 0.06), M.metalDark, LENS_X, LENS_Y, -0.7))
  sensor.add(mesh(rounded(1.6, 1.25, 0.06, 0.02), M.sensorGlass, LENS_X, LENS_Y, -0.5))
  for (let i = 0; i < 5; i++) {
    sensor.add(mesh(rounded(0.1, 0.18, 0.06, 0.02), M.gold, LENS_X - 0.5 + i * 0.25, LENS_Y - 0.95, -0.52))
  }
  addPart(sensor, { delay: 0.4, exploded: [LENS_X, LENS_Y, -1.6] })

  /* ---- shutter unit ---- */
  const shutter = new THREE.Group()
  shutter.add(mesh(rounded(2.0, 1.6, 0.1, 0.04), M.bodyDark, LENS_X, LENS_Y, -0.35))
  const bladeA = mesh(rounded(1.7, 0.75, 0.05, 0.02), M.metalDark, LENS_X, LENS_Y + 0.25, -0.28)
  bladeA.rotation.z = 0.1
  const bladeB = mesh(rounded(1.7, 0.75, 0.05, 0.02), M.metalDark, LENS_X, LENS_Y - 0.25, -0.24)
  bladeB.rotation.z = -0.1
  shutter.add(bladeA, bladeB)
  addPart(shutter, { delay: 0.36, exploded: [LENS_X + 0.4, LENS_Y + 0.6, -1.1] })

  /* ---- lens mount ring ---- */
  const mount = new THREE.Group()
  mount.add(mesh(zCyl(1.55, 1.55, 0.3), M.metal, LENS_X, LENS_Y, Z0 - 0.15))
  mount.add(mesh(new THREE.TorusGeometry(1.35, 0.05, 12, 64), M.metalDark, LENS_X, LENS_Y, Z0 - 0.02))
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5
    const tab = mesh(rounded(0.5, 0.18, 0.1, 0.03), M.metal, LENS_X + Math.cos(a) * 1.2, LENS_Y + Math.sin(a) * 1.2, Z0 + 0.02)
    tab.rotation.z = a
    mount.add(tab)
  }
  mount.add(mesh(zCyl(0.05, 0.05, 0.06, 10), M.white, LENS_X, LENS_Y + 1.48, Z0 - 0.02))
  addPart(mount, { delay: 0.2, exploded: [LENS_X, LENS_Y, Z0 + 1.0] })

  /* ---- lens: multi-section zoom, disassembles along the optical axis ---- */

  // base barrel (rear element + contacts)
  const lensBase = new THREE.Group()
  lensBase.add(mesh(zCyl(1.34, 1.34, 1.15), M.body, 0, 0, 0.55))
  lensBase.add(mesh(zCyl(1.18, 1.18, 0.22), M.metalDark, 0, 0, 0.1))
  lensBase.add(mesh(zCyl(0.85, 0.72, 0.28, 48), M.glassDark, 0, 0, 0.32))
  lensBase.add(mesh(rounded(0.55, 0.16, 0.08, 0.03), M.gold, 0.5, 1.12, 0.08))
  lensBase.position.set(LENS_X, LENS_Y, Z0)
  addPart(lensBase, { rest: [LENS_X, LENS_Y, Z0], delay: 0.22, exploded: [LENS_X, LENS_Y, Z0 + 1.6] })

  // aperture + deep interior element
  const optics = new THREE.Group()
  optics.add(mesh(zCyl(0.85, 0.85, 0.06, 48), M.screen, 0, 0, 1.55))
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    const blade = mesh(rounded(0.62, 0.12, 0.04, 0.02), M.metalDark, Math.cos(a) * 0.3, Math.sin(a) * 0.3, 1.6)
    blade.rotation.z = a
    optics.add(blade)
  }
  optics.add(mesh(zCyl(0.55, 0.5, 0.2, 40), M.glassDeep, 0, 0, 1.28))
  optics.position.set(LENS_X, LENS_Y, Z0)
  addPart(optics, { rest: [LENS_X, LENS_Y, Z0], delay: 0.26, exploded: [LENS_X, LENS_Y, Z0 + 2.6] })

  // internal floating elements
  const lensElGeo = (r) => {
    const s = new THREE.SphereGeometry(r, hi ? 48 : 24, hi ? 32 : 16)
    s.scale(1, 1, 0.16)
    return s
  }
  const el1 = new THREE.Group()
  el1.add(new THREE.Mesh(lensElGeo(0.95), M.glassEl))
  el1.position.set(LENS_X, LENS_Y, Z0 + 1.1)
  addPart(el1, { rest: [LENS_X, LENS_Y, Z0 + 1.1], delay: 0.28, exploded: [LENS_X, LENS_Y, Z0 + 2.2] })

  const el2 = new THREE.Group()
  el2.add(new THREE.Mesh(lensElGeo(0.82), M.glassEl))
  el2.position.set(LENS_X, LENS_Y, Z0 + 2.25)
  addPart(el2, { rest: [LENS_X, LENS_Y, Z0 + 2.25], delay: 0.31, exploded: [LENS_X, LENS_Y, Z0 + 3.6] })

  // zoom ring (ribbed rubber, spins on its own axis)
  const zoomRing = new THREE.Group()
  zoomRing.add(mesh(zCyl(1.44, 1.44, 0.9), M.rubber))
  ribbedRing(zoomRing, { r: 1.45, len: 0.86, count: hi ? 46 : 24, z: 0, mat: M.rubberRib })
  zoomRing.add(mesh(zCyl(0.05, 0.05, 0.05, 10), M.white, 0, 1.45, -0.4))
  zoomRing.position.set(LENS_X, LENS_Y, Z0 + 1.45)
  addPart(zoomRing, {
    rest: [LENS_X, LENS_Y, Z0 + 1.45],
    delay: 0.19,
    exploded: [LENS_X, LENS_Y, Z0 + 3.85],
    spin: { axis: 'z', rate: 0.4 },
  })

  // mid barrel with gold ring + focal marking
  const midBarrel = new THREE.Group()
  midBarrel.add(mesh(zCyl(1.36, 1.33, 1.0), M.body, 0, 0, 2.2))
  midBarrel.add(mesh(new THREE.TorusGeometry(1.33, 0.035, 10, 64), M.gold, 0, 0, 2.66))
  const lensLabel = labelMesh('RE 24-70 · 1:2.8', 1.5, 0.3, { w: 512, h: 64, size: 30, spacing: 4 })
  lensLabel.position.set(0, 1.39, 2.2)
  lensLabel.rotation.x = -1.25
  midBarrel.add(lensLabel)
  midBarrel.position.set(LENS_X, LENS_Y, Z0)
  addPart(midBarrel, { rest: [LENS_X, LENS_Y, Z0], delay: 0.16, exploded: [LENS_X, LENS_Y, Z0 + 3.4] })

  // focus ring (ribbed rubber, spins on its own axis)
  const focusRing = new THREE.Group()
  focusRing.add(mesh(zCyl(1.4, 1.4, 0.8), M.rubber))
  ribbedRing(focusRing, { r: 1.41, len: 0.76, count: hi ? 40 : 20, z: 0, mat: M.rubberRib })
  focusRing.add(mesh(rounded(0.16, 0.1, 0.28, 0.03), M.bodyDark, 0, 1.41, 0))
  focusRing.position.set(LENS_X, LENS_Y, Z0 + 3.0)
  addPart(focusRing, {
    rest: [LENS_X, LENS_Y, Z0 + 3.0],
    delay: 0.12,
    exploded: [LENS_X, LENS_Y, Z0 + 4.0],
    spin: { axis: 'z', rate: 0.55 },
  })

  // front bezel with a deep, dark optical bore
  const bezel = new THREE.Group()
  bezel.add(mesh(zCyl(1.3, 1.2, 0.8), M.body, 0, 0, 3.8))
  bezel.add(mesh(zCyl(1.02, 1.02, 1.3, 48, true), M.innerDark, 0, 0, 3.5))
  bezel.add(mesh(new THREE.TorusGeometry(1.21, 0.09, 14, 64), M.bodyDark, 0, 0, 4.18))
  bezel.add(mesh(new THREE.TorusGeometry(1.12, 0.018, 8, 64), M.metalDark, 0, 0, 4.2))
  bezel.position.set(LENS_X, LENS_Y, Z0)
  addPart(bezel, { rest: [LENS_X, LENS_Y, Z0], delay: 0.08, exploded: [LENS_X, LENS_Y, Z0 + 4.6] })

  // deep-set front element with coated curvature
  const frontGlass = new THREE.Group()
  const fg = new THREE.Mesh(
    new THREE.SphereGeometry(1.02, hi ? 56 : 28, hi ? 36 : 18, 0, Math.PI * 2, 0, Math.PI / 2),
    M.glassDark
  )
  fg.rotation.x = Math.PI / 2
  fg.scale.y = 0.55
  frontGlass.add(fg)
  const fgInner = new THREE.Mesh(new THREE.SphereGeometry(0.58, 40, 24, 0, Math.PI * 2, 0, Math.PI / 2), M.glassDeep)
  fgInner.rotation.x = Math.PI / 2
  fgInner.scale.y = 0.6
  fgInner.position.z = -0.35
  frontGlass.add(fgInner)
  frontGlass.position.set(LENS_X, LENS_Y, Z0 + 3.5)
  addPart(frontGlass, { rest: [LENS_X, LENS_Y, Z0 + 3.5], delay: 0.02, exploded: [LENS_X, LENS_Y, Z0 + 5.4] })

  /* ---- strap lugs ---- */
  const lugs = new THREE.Group()
  const lugGeo = new THREE.TorusGeometry(0.22, 0.055, 10, 24)
  const lugL = new THREE.Mesh(lugGeo, M.metal)
  lugL.position.set(-W / 2 - 0.08, H / 2 - 0.3, -0.15)
  lugL.rotation.y = Math.PI / 2
  const lugR = new THREE.Mesh(lugGeo, M.metal)
  lugR.position.set(3.95, H / 2 - 0.25, -0.15)
  lugR.rotation.y = Math.PI / 2
  lugs.add(lugL, lugR)
  addPart(lugs, { delay: 0.2, exploded: [-0.8, 1.2, 0.3] })

  // slight overall scale keeps the fully exploded spread inside the frame
  g.scale.setScalar(0.88)

  g.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = !o.material?.transparent
      o.receiveShadow = true
    }
  })

  return { group: g, parts, lensAxisZ: Z0 }
}
