<template>
<div id="canvas"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import vertexShader from '../shaders/page22/vertex.glsl'
import fragmentShader from '../shaders/page22/fragment.glsl'
import gsap from 'gsap'
// import GUI from 'lil-gui'

class Main {
  public webgl: HTMLElement
  public width: number
  public height: number
  public scene: THREE.Scene
  public renderer: THREE.WebGLRenderer
  public loadManager: THREE.LoadingManager
  public loader: THREE.TextureLoader
  public img1: THREE.Texture
  public img2: THREE.Texture
  public disp: THREE.Texture
  public aspect: number
  public camera: THREE.PerspectiveCamera | null
  public geometry: THREE.PlaneBufferGeometry | null
  public material: THREE.ShaderMaterial | null
  public mesh : THREE.Mesh | null
  // public gui: GUI
  constructor (webgl: HTMLElement) {
    this.webgl = webgl
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.scene = new THREE.Scene()
    this.camera = null
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.geometry = null
    this.material = null
    this.mesh = null
    // this.gui = new GUI()

    this.loadManager = new THREE.LoadingManager()
    this.loader = new THREE.TextureLoader(this.loadManager)
    this.img1 = this.loader.load('/image/18.jpg')
    this.img2 = this.loader.load('/image/22.jpg')
    this.disp = this.loader.load('/image/disp.jpg')

    this.aspect = 1080 / 1920
    this.loadManager.onLoad = () => {
      this.setting()
      this.init()
    }
  }

  public setting () {
    this.webgl.appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(
      180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI,
      this.width / this.height,
      1,
      10000
    )
    this.camera.position.set(0, 0, 800)
    this.setMesh()
  }

  public init () {
    gsap.timeline()
      .to(this.material!.uniforms.uAnimation, {
        value: 1,
        duration: 2,
        delay: 1,
        ease: 'expo.in'
      })
      .to(this.material!.uniforms.uAnimation, {
        value: 0,
        duration: 2,
        delay: 1,
        ease: 'expo.in'
      }).repeat(-1)
  }

  public setMesh () {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uResolution: {
          value: this.setCover(this.aspect)
        },
        uTexture1: { value: this.img1 },
        uTexture2: { value: this.img2 },
        uDisp: { value: this.disp },
        uAnimation: { value: 0 }
      }
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
    this.mesh.scale.x = this.width
    this.mesh.scale.y = this.height

    requestAnimationFrame(this.onRaf.bind(this))
  }

  public setCover (aspect: number): THREE.Vector2 {
    let x, y
    if (this.height / this.width > aspect) {
      x = (this.width / this.height) * aspect
      y = 1
    } else {
      x = 1
      y = (this.height / this.width) / aspect
    }
    return new THREE.Vector2(x, y)
  }

  public onResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.material!.uniforms.uResolution.value = this.setCover(this.aspect)
    this.mesh!.scale.x = this.width
    this.mesh!.scale.y = this.height
    this.camera!.aspect = this.width / this.height
    this.camera!.fov = 180 * (2 * Math.atan(this.height / 2 / 800)) / Math.PI
    this.camera!.updateProjectionMatrix()
    this.renderer.setSize(this.width, this.height)
  }

  public onRaf () {
    this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera)
    requestAnimationFrame(this.onRaf.bind(this))
  }
}
onMounted(() => {
  const gl = new Main(document.querySelector('#canvas') as HTMLElement)
  window.addEventListener('resize', gl.onResize.bind(gl))
})
</script>
<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  overflow: hidden;
}
</style>
