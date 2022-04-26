<template>
  <main>
    <div data-scroll>
      <div class="page">
        <header>
          <h1>Oceans</h1>
          <img src="../assets/img24/header.jpg" alt="">
        </header>
        <!-- BEGIN grid -->
        <div class="grid">
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_v">
            <div class="item__image">
              <img src="../assets/img24/1.jpg" alt="">
              <div class="item__meta">December 23, 2020</div>
            </div>

            <h2 class="item__title">Octopus punches fish in the head (just because it can)</h2>
            <p>Octopuses sometimes partner with fish to hunt, but the partnership comes with risks (for the fish, that
              is).</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_h">
            <div class="item__image">
              <img src="../assets/img24/2.jpg" alt="">
              <div class="item__meta">December 01, 2020</div>
            </div>

            <h2 class="item__title">Newfound marine blob looks like 'party balloon' with two strings, scientists say
            </h2>
            <p>This is the first species NOAA scientists have ever discovered from video footage alone.</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_h">
            <div class="item__image">
              <img src="../assets/img24/4.jpg" alt="">
              <div class="item__meta">November 26, 2020</div>
            </div>

            <h2 class="item__title">Swarm of eels breaks record</h2>
            <p>Before we start mining for precious metals in the darkness of the deep sea, we might try switching on the
              light first and observing our surroundings.</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_v">
            <div class="item__image">
              <img src="../assets/img24/3.jpg" alt="">
              <div class="item__meta">November 03, 2020</div>
            </div>

            <h2 class="item__title">Mantis shrimp punch down</h2>
            <p>Home-stealers fought the hardest for smaller-than-ideal dens.</p>
          </a>
          <!-- END item -->

          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_v">
            <div class="item__image">
              <img src="../assets/img24/1.jpg" alt="">
              <div class="item__meta">October 05, 2020</div>
            </div>

            <h2 class="item__title">Megalodon's hugeness</h2>
            <p>Even among its extinct relatives, Megalodon was unequalled in length and mass.</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_h">
            <div class="item__image">
              <img src="../assets/img24/2.jpg" alt="">
              <div class="item__meta">July 27, 2020</div>
            </div>

            <h2 class="item__title">Adorable sunfish</h2>
            <p>Sunfish in the Molidae family are among the biggest fish in the world.</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_h">
            <div class="item__image">
              <img src="../assets/img24/4.jpg" alt="">
              <div class="item__meta">August 18, 2020</div>
            </div>

            <h2 class="item__title">Massive 'Darth Vader' sea bug</h2>
            <p>The newly described species is one of the biggest isopods known to science.</p>
          </a>
          <!-- END item -->
          <!-- BEGIN item -->
          <a href="javascript:;" class="item item_v">
            <div class="item__image">
              <img src="../assets/img24/3.jpg" alt="">
              <div class="item__meta">June 01, 2020</div>
            </div>

            <h2 class="item__title">Scientists capture the world's deepest octopus</h2>
            <p>The octopus was found miles beneath the ocean surface.</p>
          </a>
          <!-- END item -->
        </div>
        <!-- END grid -->

        <!-- BEGIN footer -->
        <footer class="footer">
          <p>&copy; all news from <a href="javascript:;">LiveScience</a></p>
          <p>
            This page was made for <a href="javascript:;">Merging WebGL and HTML course
              on Awwwards.com</a>
            <br>Wish you a good day! =)
          </p>
        </footer>
        <!-- END footer -->
      </div>
      <!-- end page -->

    </div>
    <!-- end scroll -->
  </main>
  <div id="container"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentShader from '../shaders/page25/fragment.frag'
import vertexShader from '../shaders/page25/vertex.vert'
import noise from '../shaders/page25/noise.glsl'
import ocean from '../assets/img24/ocean.jpg'
import Stats from 'stats.js'
import GUI from 'lil-gui'
import FontFaceObserver from 'fontfaceobserver'
import imagesLoaded from 'imagesloaded'
import { onMounted } from 'vue'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

interface optionInterface {
  dom: HTMLElement
}

interface imageStoreInterface {
  img: HTMLImageElement
  mesh: THREE.Mesh
  top: number
  left: number
  width: number
  height: number
}

interface DOMInterface {
  main: HTMLElement
  scrollable?: HTMLElement
}

const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b

class Scroll {
  public DOM: DOMInterface
  public docScroll: number
  public scrollToRender: number
  public current: number
  public ease: number
  public speed: number
  public speedTarget: number
  public shouldRender = false
  constructor () {
    this.DOM = { main: document.querySelector('main')! }
    this.DOM.scrollable = this.DOM.main.querySelector('div[data-scroll]')!
    this.docScroll = 0
    this.scrollToRender = 0
    this.current = 0
    this.ease = 0.1
    this.speed = 0
    this.speedTarget = 0

    this.setSize()
    // set the initial values
    this.getScroll()
    this.init()
    // the <main> element's style needs to be modified
    this.style()
    // init/bind events
    this.initEvents()
    // start the render loop
    requestAnimationFrame(() => this.render())
  }

  init () {
    // translate the scrollable element
    this.setPosition()
    this.shouldRender = true
  }

  style () {
    this.DOM.main.style.position = 'fixed'
    this.DOM.main.style.width = this.DOM.main.style.height = '100%'
    this.DOM.main.style.top = this.DOM.main.style.left = 0 + 'px'
    this.DOM.main.style.overflow = 'hidden'
  }

  getScroll () {
    this.docScroll = window.pageYOffset || document.documentElement.scrollTop
    return this.docScroll
  }

  initEvents () {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0)
    }
    // on resize reset the body's height
    window.addEventListener('resize', () => this.setSize())
    window.addEventListener('scroll', this.getScroll.bind(this))
  }

  setSize () {
    // set the heigh of the body in order to keep the scrollbar on the page
    document.body.style.height = `${this.DOM.scrollable!.scrollHeight}px`
  }

  setPosition () {
    // translates the scrollable element
    if (
      Math.round(this.scrollToRender) !==
      Math.round(this.current) ||
      this.scrollToRender < 10
    ) {
      this.DOM.scrollable!.style.transform = `translate3d(0,${-1 *
        this.scrollToRender}px,0)`
    }
  }

  render () {
    this.speed = Math.min(Math.abs(this.current - this.scrollToRender), 200) / 200
    this.speedTarget += (this.speed - this.speedTarget) * 0.2

    this.current = this.getScroll()
    this.scrollToRender = lerp(
      this.scrollToRender,
      this.current,
      this.ease
    )

    // and translate the scrollable element
    this.setPosition()
  }
}

class Sketch {
  public time: number
  public scene: THREE.Scene
  public renderer: THREE.WebGLRenderer
  public camera: THREE.PerspectiveCamera
  public dom: HTMLElement
  public geometry: THREE.PlaneBufferGeometry | THREE.SphereBufferGeometry | null
  public material: THREE.ShaderMaterial | null
  public mesh: THREE.Mesh | null
  public controls: OrbitControls
  public stats: Stats
  public gui: GUI
  public scroll?: Scroll
  public raycaster: THREE.Raycaster
  public mouse: THREE.Vector2
  public materials?: THREE.ShaderMaterial[]

  public width: number
  public height: number

  public images: HTMLImageElement[]
  public imageStore: imageStoreInterface[]

  public currentScroll: number
  public previousScroll: number

  public composer?: EffectComposer
  public renderPass?: RenderPass
  public myEffect?: { uniforms: { [propName: string]: { value: any } }, vertexShader: string, fragmentShader: string }
  public customPass?: ShaderPass
  constructor (options: optionInterface) {
    this.time = 0
    this.dom = options.dom
    this.width = this.dom.offsetWidth
    this.height = this.dom.offsetHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 100, 2000)
    this.camera.position.z = 600
    this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * (180 / Math.PI)

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    this.renderer.setSize(this.width, this.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.dom.appendChild(this.renderer.domElement)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.stats = new Stats()
    this.stats.showPanel(0)
    this.dom.appendChild(this.stats.dom)
    this.gui = new GUI()
    this.geometry = null
    this.material = null
    this.mesh = null
    this.imageStore = []

    this.images = [...document.querySelectorAll('img')!]

    const fontOpen = new Promise<void>(resolve => {
      new FontFaceObserver('Open Sans').load().then(() => {
        resolve()
      })
    })

    const fontPlayfair = new Promise<void>(resolve => {
      new FontFaceObserver('Playfair Display').load().then(() => {
        resolve()
      })
    })

    const preloadImages = new Promise((resolve) => {
      imagesLoaded(document.querySelectorAll('img'), {
        background: true
      }, resolve)
    })

    const allDone = [fontOpen, fontPlayfair, preloadImages]

    this.currentScroll = 0
    this.previousScroll = 0
    this.raycaster = new THREE.Raycaster()
    this.mouse = new THREE.Vector2()

    Promise.all(allDone).then(() => {
      this.scroll = new Scroll()
      this.addImages()
      this.setPosition()

      this.mouseMovement()
      this.resize()
      this.setupResize()
      // this.addObjects()
      this.composerPass()
      this.render()
      // window.addEventListener('scroll', () => {
      //   this.currentScroll = window.scrollY
      //   this.setPosition()
      // })
    })
  }

  public composerPass () {
    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    const conter = 0.0
    this.myEffect = {
      uniforms: {
        tDiffuse: { value: null },
        scrollSpeed: { value: null },
        time: { value: null }
      },
      vertexShader: `
        varying vec2 vUv;
        void main () {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
      fragmentShader: `
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        uniform float scrollSpeed;
        uniform float time;
        ${noise}
        void main() {
          vec2 newUv = vUv;
          float area = smoothstep(1.0, 0.8, vUv.y) * 2.0 -1.0;
          // area = pow(area, 4.0);
          float noise = 0.5 * (cnoise(vec3(vUv * 10.0, time /5.0)) + 1.0);
          float n = smoothstep(0.5, 0.51, noise + area);
          newUv.x -= (vUv.x - 0.5) * 0.1 * area * scrollSpeed;
          gl_FragColor = texture2D(tDiffuse, newUv);
          // gl_FragColor = vec4(n, 0.0, 0.0, 1.0);
          gl_FragColor = mix(vec4(1.0), texture2D(tDiffuse, newUv), n);
        }
      `
    }
    this.customPass = new ShaderPass(this.myEffect)
    this.customPass.renderToScreen = true
    this.composer.addPass(this.customPass)
  }

  public mouseMovement () {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / this.width) * 2 - 1
      this.mouse.y = -(e.clientY / this.height) * 2 + 1

      this.raycaster.setFromCamera(this.mouse, this.camera)

      const intersects = this.raycaster.intersectObjects(this.scene.children)

      if (intersects.length > 0) {
        const obj = intersects[0].object as THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
        obj.material.uniforms.hover.value = intersects[0].uv
      }
    }, false)
  }

  public setupResize () {
    window.addEventListener('resize', this.resize.bind(this))
  }

  public addObjects () {
    this.geometry = new THREE.PlaneBufferGeometry(200, 400, 10, 10)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader,
      vertexShader,
      wireframe: true,
      uniforms: {
        time: { value: 0 },
        customA: { value: 0.0 },
        oceanTexture: { value: new THREE.TextureLoader().load(ocean) }
      }
    })
    this.gui.add(this.material!.uniforms.customA, 'value', 0.0, 1000.0, 1)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  public resize () {
    this.width = this.dom.offsetWidth
    this.height = this.dom.offsetHeight
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  public addImages () {
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader,
      vertexShader,
      uniforms: {
        time: { value: 0 },
        uImage: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: { value: 0.0 },
        oceanTexture: { value: new THREE.TextureLoader().load(ocean) }
      }
    })

    this.materials = []

    this.imageStore = this.images.map(img => {
      const bounds = img.getBoundingClientRect()
      const geometry = new THREE.PlaneBufferGeometry(bounds.width, bounds.height, 10, 10)
      const texture = new THREE.Texture(img)
      texture.needsUpdate = true
      // const material = new THREE.MeshBasicMaterial({
      //   map: texture
      // })
      const material = this.material!.clone()

      img.addEventListener('mouseenter', () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 1,
          ease: 'power2.inOut'
        })
      })
      img.addEventListener('mouseout', () => {
        gsap.to(material.uniforms.hoverState, {
          duration: 1,
          value: 0,
          ease: 'power2.inOut'
        })
      })

      this.materials!.push(material)
      material.uniforms.uImage.value = texture
      const mesh = new THREE.Mesh(geometry, material)
      this.scene.add(mesh)
      return {
        img: img,
        mesh: mesh,
        top: bounds.top,
        left: bounds.left,
        width: bounds.width,
        height: bounds.height
      }
    })
  }

  public setPosition () {
    this.imageStore.forEach(o => {
      o.mesh.position.y = this.currentScroll - o.top + this.height / 2 - o.height / 2
      o.mesh.position.x = o.left - this.width / 2 + o.width / 2
    })
  }

  public render () {
    this.time += 0.05

    this.scroll!.render()
    this.previousScroll = this.currentScroll
    this.currentScroll = this.scroll!.scrollToRender

    // if (Math.round(this.currentScroll) !== Math.round(this.previousScroll)) {
    this.setPosition()

    this.customPass!.uniforms.scrollSpeed.value = this.scroll!.speedTarget
    this.customPass!.uniforms.time.value = this.time

    this.materials!.forEach(m => {
      m.uniforms.time.value = this.time
    })

    this.controls.update()
    this.stats.update()
      // this.renderer.render(this.scene, this.camera)
      this.composer!.render()
      // }

      window.requestAnimationFrame(this.render.bind(this))
  }
}
onMounted(() => {
  const sketch = new Sketch({
    dom: document.getElementById('container')!
  })
})

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Playfair+Display&display=swap');

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
}

.page {
  width: min(90%, 1200px);
  margin: 0 auto;
  /* border: 1px solid #000; */
}

/* header */

header {
  margin-bottom: 5em;
  position: relative;
}

h1 {
  font-size: 260px;
  line-height: 1;
  padding: 0.5em 0;
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #047582;
  mix-blend-mode: color-burn;
  font-size: 18vw;

}

header img {
  max-width: 100%;
  display: block;
}

h1,
h2 {
  font-family: 'Playfair Display', serif;
  font-weight: normal;
}

/* grid */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2em 0
}

.item {
  /* border: 1px solid #000; */
  align-self: center;
  justify-self: center;
  text-decoration: none;
  color: #333;
}

.item:nth-child(odd) {
  justify-self: start;
}

.item:nth-child(even) {
  justify-self: end;
}

.item img {
  width: 100%;
  display: block;
  opacity: 0;
}

.item__image {
  position: relative;
  margin-bottom: 0.6em;
}

.item__meta {
  position: absolute;
  left: -0.4em;
  bottom: 0.4em;
  transform-origin: 0 100%;
  transform: rotate(-90deg);
  text-transform: uppercase;
  font-size: 80%;
}

.item__title {
  font-size: 40px;
  line-height: 1.2;
  margin-bottom: 0.4em;
}

.item_p {
  line-height: 1.4;
  font-size: 1em;
}

.item_h {
  width: 100%;
}

.item_v {
  width: 80%;
}

/* footer */
.footer {
  border-top: 1px solid #ccc;
  padding: 1em;
  font-size: 15px;
  display: flex;
  margin-top: 8em;
  line-height: 1.5;
  padding: 1em 0 4em 0;
}

.footer a {
  color: #333;
}

.footer p+p {
  margin-left: auto;
  text-align: right;
}

@media screen and (max-width: 600px) {
  .grid {
    display: block;
  }

  .item_v,
  .item_h {
    width: auto;
    margin-bottom: 3em;
  }

  .item img {
    width: 100%;
    max-width: none;
  }
}

#container {
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
}
</style>
