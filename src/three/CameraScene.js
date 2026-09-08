// CameraScene — Three.js renderer + rig + lighting for the procedural camera.
// Consumes a "pose": { p (explode 0..1), spin (radians), camZ, camY, lookY }
// and a pointer for parallax. Renders lazily and disposes cleanly.

import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { buildCamera } from './buildCamera'

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2)

export class CameraScene {
  constructor(canvas, { quality = 'high', modelUrl = null, onModelProgress, onModelReady } = {}) {
    this.canvas = canvas
    this.quality = quality
    this.onModelProgress = onModelProgress
    this.onModelReady = onModelReady
    this.disposed = false
    this.running = true

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: quality === 'high',
      alpha: true,
      powerPreference: 'high-performance',
    })
    this.renderer.setClearColor(0x000000, 0)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.12

    this.scene = new THREE.Scene()

    // environment reflections
    this.pmrem = new THREE.PMREMGenerator(this.renderer)
    this.envMap = this.pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.environment = this.envMap

    // studio lighting
    this.key = new THREE.DirectionalLight(0xfff4e6, 2.6)
    this.key.position.set(4, 6, 5)
    this.scene.add(this.key)

    this.rim = new THREE.DirectionalLight(0x96dcc3, 1.7)
    this.rim.position.set(-6, 3, -6)
    this.scene.add(this.rim)

    this.fill = new THREE.DirectionalLight(0xdfe8ff, 0.7)
    this.fill.position.set(-3, -2, 6)
    this.scene.add(this.fill)

    this.amb = new THREE.AmbientLight(0xffffff, 0.35)
    this.scene.add(this.amb)

    // The hero can use an authored asset; the craft section keeps the
    // procedural model because its scroll interaction depends on exploded parts.
    this.model = new THREE.Group()
    this.parts = []
    this.scene.add(this.model)
    if (modelUrl) this.loadModel(modelUrl)
    else {
      const { group, parts } = buildCamera({ detail: quality })
      this.model.add(group)
      this.parts = parts
      this.onModelProgress?.(100)
      this.onModelReady?.()
    }

    // rig
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100)
    this.camZ = 12.4
    this.camY = 0.6

    // pose + damped state
    this.pose = { p: 0, spin: 0, camZ: 12.4, camY: 0.6, lookY: 0 }
    this.current = { p: 0, spin: 0, camZ: 12.4, camY: 0.6, lookY: 0 }
    this.pointer = { x: 0, y: 0 }
    this.pointerCur = { x: 0, y: 0 }

    this.clock = new THREE.Clock()
    this.raf = null
    this.loop = this.loop.bind(this)
    this.loop()
  }

  loadModel(url) {
    const loader = new GLTFLoader()
    loader.load(
      url,
      (gltf) => {
        if (this.disposed) return
        const asset = gltf.scene
        const bounds = new THREE.Box3().setFromObject(asset)
        const size = bounds.getSize(new THREE.Vector3())
        const center = bounds.getCenter(new THREE.Vector3())
        const scale = 6 / Math.max(size.x, size.y, size.z)

        asset.position.set(-center.x, -center.y, -center.z)
        asset.scale.setScalar(scale)
        asset.traverse((object) => {
          if (object.isMesh) {
            object.castShadow = true
            object.receiveShadow = true
          }
        })

        this.model.clear()
        this.model.add(asset)
        this.onModelProgress?.(100)
        this.onModelReady?.()
      },
      (event) => {
        if (event.total) {
          this.onModelProgress?.(Math.min(99, Math.round((event.loaded / event.total) * 100)))
        }
      },
      (error) => {
        if (!this.disposed) console.error(`Unable to load camera model: ${url}`, error)
      }
    )
  }

  setPose(pose) {
    Object.assign(this.pose, pose)
  }

  setPointer(x, y) {
    this.pointer.x = x
    this.pointer.y = y
  }

  resize(w, h) {
    const dpr = Math.min(window.devicePixelRatio || 1, this.quality === 'high' ? 2 : 1.5)
    this.renderer.setPixelRatio(dpr)
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.fov = w < 700 ? 38 : 34
    this.camera.updateProjectionMatrix()
  }

  applyPart(o, p) {
    if (!o.userData?.rest || !o.userData?.exploded) return
    const t = easeInOut(clamp01((p - (o.userData.delay || 0)) / 0.6))
    o.position.lerpVectors(o.userData.rest, o.userData.exploded, t)
    if (o.userData.spin) {
      const s = o.userData.spin
      o.rotation[s.axis] = t * s.rate * 2
    }
  }

  loop() {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.loop)
    if (!this.running) return

    const dt = Math.min(this.clock.getDelta(), 0.05)
    const time = this.clock.elapsedTime
    const k = 1 - Math.pow(0.0015, dt) // damping factor

    // damp pose + pointer
    for (const key of ['p', 'spin', 'camZ', 'camY', 'lookY']) {
      this.current[key] += (this.pose[key] - this.current[key]) * k
    }
    this.pointerCur.x += (this.pointer.x - this.pointerCur.x) * k * 0.8
    this.pointerCur.y += (this.pointer.y - this.pointerCur.y) * k * 0.8

    const p = this.current.p

    // model: base pose + scroll spin + idle float + pointer parallax
    this.model.rotation.y = -0.18 + this.current.spin + Math.sin(time * 0.4) * 0.05 + this.pointerCur.x * 0.16
    this.model.rotation.x = 0.08 + this.pointerCur.y * 0.1
    this.model.rotation.z = Math.sin(time * 0.3) * 0.012
    this.model.position.y = Math.sin(time * 0.6) * 0.06 - p * 0.2

    // apply explode to parts
    for (const part of this.parts) this.applyPart(part, p)

    // rig
    this.camera.position.set(
      this.pointerCur.x * 0.7,
      this.current.camY + this.pointerCur.y * 0.4,
      this.current.camZ
    )
    this.camera.lookAt(0, this.current.lookY, 0)

    // light response — key light travels slightly with pointer/explode
    this.key.position.x = 4 + this.pointerCur.x * 2 + p * 2
    this.key.position.y = 6 + this.pointerCur.y * 1.5

    this.renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach((m) => m.dispose())
      }
    })
    this.envMap.dispose()
    this.pmrem.dispose()
    this.renderer.dispose()
  }
}
