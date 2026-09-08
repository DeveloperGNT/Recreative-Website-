// Procedural, physically-believable mirrorless camera built from primitives.
// Returns a group plus part descriptors with rest/exploded transforms so the
// scene can interpolate a scroll-driven exploded view.

import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

const M = {
  body: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#262d2f'),
    metalness: 0.55,
    roughness: 0.44,
  }),
  bodyTop: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#2e3639'),
    metalness: 0.72,
    roughness: 0.3,
  }),
  rubber: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#121617'),
    metalness: 0.05,
    roughness: 0.94,
  }),
  metal: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#aab3b6'),
    metalness: 0.95,
    roughness: 0.28,
  }),
  metalDark: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#565f61'),
    metalness: 0.9,
    roughness: 0.36,
  }),
  mint: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#96dcc3'),
    metalness: 0.4,
    roughness: 0.32,
    emissive: new THREE.Color('#96dcc3'),
    emissiveIntensity: 0.12,
  }),
  glass: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#cfe9f2'),
    metalness: 0,
    roughness: 0.04,
    transmission: 0.96,
    thickness: 0.5,
    ior: 1.52,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    attenuationColor: new THREE.Color('#9adcc6'),
    attenuationDistance: 2.2,
  }),
  glassCoated: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#7fb4c9'),
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.7,
    thickness: 0.35,
    ior: 1.55,
    clearcoat: 1,
  }),
  pcb: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1f5c4c'),
    metalness: 0.3,
    roughness: 0.5,
  }),
  gold: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#c9a45a'),
    metalness: 1,
    roughness: 0.35,
  }),
  blade: new THREE.MeshStandardMaterial({
    color: new THREE.Color('#3a4245'),
    metalness: 0.9,
    roughness: 0.25,
  }),
  screen: new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0e1b18'),
    metalness: 0.2,
    roughness: 0.08,
    clearcoat: 1,
  }),
}

const rounded = (w, h, d, r = 0.12, seg = 3) =>
  new RoundedBoxGeometry(w, h, d, seg, Math.min(r, Math.min(w, h, d) / 2.1))

function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat)
  m.position.set(x, y, z)
  return m
}

export function buildCamera({ detail = 'high' } = {}) {
  const g = new THREE.Group()
  const parts = []

  const addPart = (object, { rest, exploded, delay = 0, spin = null } = {}) => {
    if (!rest) rest = object.position.clone()
    else rest = new THREE.Vector3(...rest)
    exploded = exploded || rest.clone()
    object.userData.rest = rest
    object.userData.exploded = exploded
    object.userData.delay = delay
    object.userData.spin = spin
    g.add(object)
    parts.push(object)
    return object
  }

  const W = 7.4, H = 4.9, D = 3.5 // body dims
  const LENS_X = -0.55

  // ---- main chassis (internal frame) ----
  const chassis = new THREE.Group()
  chassis.add(mesh(rounded(W - 0.9, H - 1.1, D - 0.9, 0.2), M.metalDark, 0, -0.1, 0))
  chassis.add(mesh(rounded(1.9, 1.4, 0.5, 0.1), M.pcb, -1.4, -0.7, 0.2)) // main board
  chassis.add(mesh(rounded(1.2, 0.7, 0.35, 0.08), M.gold, 1.3, -1.1, 0.2))
  addPart(chassis, { delay: 0.42, exploded: [0, -0.4, -1.6] })

  // ---- body shell front ----
  const shell = new THREE.Group()
  shell.add(mesh(rounded(W, H, D, 0.42), M.body))
  // front cosmetic seam
  shell.add(mesh(rounded(W - 1.2, 2.6, 0.1, 0.05), M.metalDark, LENS_X, 0.1, D / 2 - 0.02))
  addPart(shell, { delay: 0.1, exploded: [0, 0.3, -2.4] })

  // ---- top plate ----
  const top = new THREE.Group()
  top.add(mesh(rounded(W - 0.25, 0.85, D - 0.7, 0.2), M.bodyTop, 0, H / 2 + 0.38, -0.05))
  // mode dial (left), shutter dial (right), hot shoe (centre)
  const dialL = mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.34, 40), M.metalDark, -2.35, H / 2 + 0.95, -0.2)
  const dialR = mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.32, 40), M.metal, 2.45, H / 2 + 0.92, -0.2)
  top.add(dialL, dialR)
  top.add(mesh(rounded(1.1, 0.3, 1.3, 0.05), M.metalDark, 0, H / 2 + 0.78, -0.35)) // hot shoe base
  top.add(mesh(rounded(0.9, 0.18, 1.05, 0.04), M.metal, 0, H / 2 + 0.98, -0.35)) // hot shoe foot
  // shutter button
  const shBtn = mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.16, 24), M.mint, 2.45, H / 2 + 1.18, -0.2)
  top.add(shBtn)
  addPart(top, { delay: 0.22, exploded: [0, 2.4, -0.6], spin: { axis: 'y', rate: 0.25 } })

  // ---- viewfinder hump ----
  const vf = new THREE.Group()
  vf.add(mesh(rounded(2.0, 1.15, 1.25, 0.16), M.bodyTop, 0, H / 2 + 1.35, -0.15))
  vf.add(mesh(rounded(1.3, 0.5, 0.12, 0.04), M.glassCoated, 0, H / 2 + 1.42, 0.5)) // front window
  addPart(vf, { delay: 0.3, exploded: [0, 3.4, 0.6] })

  // ---- grip (right side) ----
  const grip = new THREE.Group()
  grip.add(mesh(rounded(1.9, H - 0.2, 2.9, 0.55), M.rubber, W / 2 - 0.72, -0.05, 0.18))
  grip.add(mesh(rounded(0.5, 2.2, 1.6, 0.2), M.rubber, W / 2 - 1.75, -0.6, 0.35)) // thumb rest zone
  addPart(grip, { delay: 0.16, exploded: [2.9, 0.1, -1.2] })

  // ---- rear screen + back panel ----
  const back = new THREE.Group()
  back.add(mesh(rounded(W - 0.3, H - 0.4, 0.35, 0.2), M.body, 0, 0.05, -D / 2 + 0.16))
  const scr = mesh(rounded(3.6, 2.9, 0.12, 0.05), M.screen, -0.7, 0.1, -D / 2 - 0.02)
  back.add(scr)
  back.add(mesh(rounded(0.9, 2.2, 0.1, 0.05), M.rubber, 2.5, 0.05, -D / 2 - 0.01)) // button bank
  addPart(back, { delay: 0.06, exploded: [0, 0.2, -4.6] })

  // ---- bottom plate + battery ----
  const bottom = new THREE.Group()
  bottom.add(mesh(rounded(W - 0.5, 0.5, D - 0.6, 0.16), M.bodyTop, 0, -H / 2 - 0.2, 0))
  addPart(bottom, { delay: 0.26, exploded: [0, -2.6, -0.8] })

  const battery = new THREE.Group()
  battery.add(mesh(rounded(1.7, 1.0, 0.7, 0.1), M.rubber, 1.6, -1.6, 0.1))
  battery.add(mesh(rounded(1.5, 0.18, 0.5, 0.05), M.mint, 1.6, -1.6, 0.48))
  addPart(battery, { delay: 0.34, exploded: [2.2, -2.4, 0.6] })

  // ---- sensor + shutter (behind mount, inside body) ----
  const sensor = new THREE.Group()
  sensor.add(mesh(rounded(1.85, 1.4, 0.16, 0.03), M.pcb, LENS_X, 0.05, -0.55))
  const sensorFace = mesh(new THREE.PlaneGeometry(1.55, 1.15), new THREE.MeshStandardMaterial({ color: '#0d2c24', metalness: 0.85, roughness: 0.18 }), LENS_X, 0.05, -0.46)
  sensorFace.rotation.y = Math.PI // face forward (-z toward lens is +z; keep facing +z)
  sensorFace.rotation.set(0, 0, 0)
  sensor.add(sensorFace)
  sensor.add(mesh(rounded(1.6, 0.12, 0.3, 0.02), M.gold, LENS_X, -0.75, -0.6))
  addPart(sensor, { delay: 0.5, exploded: [LENS_X - 1.6, 0, -1.4] })

  const shutter = new THREE.Group()
  shutter.add(mesh(rounded(1.7, 0.5, 0.06, 0.02), M.blade, LENS_X, 0.15, -0.28))
  shutter.add(mesh(rounded(1.7, 0.5, 0.06, 0.02), M.blade, LENS_X, -0.2, -0.34))
  addPart(shutter, { delay: 0.46, exploded: [LENS_X + 1.9, 0.2, -1.1] })

  // ---- lens mount ring ----
  const mount = new THREE.Group()
  mount.add(mesh(new THREE.CylinderGeometry(1.52, 1.52, 0.28, 56), M.metal, LENS_X, 0.05, D / 2 - 0.32))
  mount.children[0].rotation.x = Math.PI / 2
  mount.add(mesh(new THREE.TorusGeometry(1.38, 0.05, 12, 56), M.metalDark, LENS_X, 0.05, D / 2 - 0.17))
  addPart(mount, { delay: 0.12, exploded: [LENS_X * 1.4, 0.05, D / 2 + 0.5] })

  // ---- lens assembly ----
  const LZ = D / 2 // lens axis starts at front face
  const lensBarrel = new THREE.Group()
  lensBarrel.add(mesh(new THREE.CylinderGeometry(1.3, 1.3, 1.5, 56), M.body, LENS_X, 0.05, LZ + 0.75))
  lensBarrel.children[0].rotation.x = Math.PI / 2
  addPart(lensBarrel, { delay: 0.18, exploded: [LENS_X, 0.05, LZ + 2.4] })

  const focusRing = new THREE.Group()
  const fr = mesh(new THREE.CylinderGeometry(1.38, 1.38, 0.72, 56), M.rubber, LENS_X, 0.05, LZ + 0.9)
  fr.rotation.x = Math.PI / 2
  focusRing.add(fr)
  // knurl strips
  for (let i = 0; i < (detail === 'high' ? 14 : 8); i++) {
    const a = (i / 14) * Math.PI * 2
    const s = mesh(
      new THREE.BoxGeometry(0.05, 0.72, 0.06),
      M.metalDark,
      LENS_X + Math.cos(a) * 1.4,
      0.05 + Math.sin(a) * 1.4,
      LZ + 0.9
    )
    s.rotation.x = Math.PI / 2
    s.rotation.z = -a
    focusRing.add(s)
  }
  addPart(focusRing, { delay: 0.24, exploded: [LENS_X, 0.05, LZ + 3.6], spin: { axis: 'z', rate: 0.6 } })

  const accentRing = new THREE.Group()
  const ar = mesh(new THREE.TorusGeometry(1.31, 0.045, 10, 60), M.mint, LENS_X, 0.05, LZ + 1.32)
  accentRing.add(ar)
  addPart(accentRing, { delay: 0.2, exploded: [LENS_X, 0.05, LZ + 3.0] })

  const frontRing = new THREE.Group()
  const frnt = mesh(new THREE.CylinderGeometry(1.24, 1.26, 0.7, 56), M.metal, LENS_X, 0.05, LZ + 1.62)
  frnt.rotation.x = Math.PI / 2
  frontRing.add(frnt)
  addPart(frontRing, { delay: 0.28, exploded: [LENS_X, 0.05, LZ + 4.8] })

  // glass element chain (front → rear)
  const glassSpecs = [
    { r: 1.1, z: LZ + 1.66, bulge: 0.5, delay: 0.52, ex: 1.2 },
    { r: 0.95, z: LZ + 1.35, bulge: 0.3, delay: 0.56, ex: 2.1 },
    { r: 0.85, z: LZ + 1.0, bulge: -0.25, delay: 0.6, ex: 2.9 },
  ]
  glassSpecs.forEach((gs, i) => {
    const grp = new THREE.Group()
    const geo = detail === 'high'
      ? new THREE.SphereGeometry(gs.r, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2)
      : new THREE.CylinderGeometry(gs.r, gs.r, 0.22, 32)
    const lensEl = new THREE.Mesh(geo, i === 0 ? M.glass : M.glassCoated)
    lensEl.rotation.x = Math.PI / 2
    if (gs.bulge < 0) lensEl.rotation.x = -Math.PI / 2
    lensEl.scale.z = 0.55
    lensEl.position.z = -gs.bulge * 0.5
    grp.add(lensEl)
    grp.position.set(LENS_X, 0.05, gs.z)
    addPart(grp, { delay: gs.delay, exploded: [LENS_X, 0.05, gs.z + gs.ex + 2.2] })
  })

  // aperture assembly
  const aperture = new THREE.Group()
  const apPlate = mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.1, 40), M.metalDark, LENS_X, 0.05, LZ + 0.55)
  apPlate.rotation.x = Math.PI / 2
  aperture.add(apPlate)
  for (let i = 0; i < 6; i++) {
    const b = mesh(new THREE.BoxGeometry(0.8, 0.14, 0.04), M.blade, LENS_X, 0.05, LZ + 0.52)
    b.rotation.z = (i / 6) * Math.PI * 2
    b.position.x = LENS_X + Math.cos((i / 6) * Math.PI * 2) * 0.32
    b.position.y = 0.05 + Math.sin((i / 6) * Math.PI * 2) * 0.32
    aperture.add(b)
  }
  addPart(aperture, { delay: 0.44, exploded: [LENS_X, 0.05, LZ + 4.0] })

  const rearEl = new THREE.Group()
  const re = mesh(new THREE.CylinderGeometry(0.8, 0.95, 0.3, 40), M.glassCoated, LENS_X, 0.05, LZ + 0.28)
  re.rotation.x = Math.PI / 2
  rearEl.add(re)
  addPart(rearEl, { delay: 0.48, exploded: [LENS_X, 0.05, LZ + 3.3] })

  // strap lugs
  const lugs = new THREE.Group()
  const lugL = mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.18, 16), M.metal, -W / 2 + 0.25, H / 2 - 0.35, D / 2 - 0.4)
  lugL.rotation.z = Math.PI / 2
  const lugR = lugL.clone()
  lugR.position.x = W / 2 - 0.25
  lugs.add(lugL, lugR)
  addPart(lugs, { delay: 0.2, exploded: [-1.5, 1.6, 1.4] })

  return { group: g, parts, lensAxisZ: LZ }
}
