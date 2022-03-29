<template>
  <div class="wrap">
    <h1 class="text">
      <span>H</span>
      <span>E</span>
      <span>L</span>
      <span>L</span>
      <span>O</span>
    </h1>
  </div>
  <div id="canvas"></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import vertexShader from '../shaders/page21/vertex.glsl'
import fragmentShader from '../shaders/page21/fragment.glsl'
import gsap from 'gsap'

import { onMounted } from 'vue'
class Main {
  public webgl: HTMLElement
  public scene: THREE.Scene
  public width: number
  public height: number
  public renderer: THREE.WebGLRenderer
  public geometry: THREE.PlaneBufferGeometry | null
  public material: THREE.ShaderMaterial | null
  public mesh: THREE.Mesh | null
  public camera: THREE.PerspectiveCamera | null
  public tl: gsap.core.Timeline | null
  constructor (webgl: HTMLElement) {
    this.webgl = webgl
    this.scene = new THREE.Scene()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(new THREE.Color(0xCCCCCC))
    this.renderer.setSize(this.width, this.height)
    this.geometry = null
    this.material = null
    this.mesh = null
    this.camera = null
    this.tl = null
    this.init()
  }

  public init () {
    this.setting()
    this.onRaf()
    this.tl = gsap.timeline()
      .to(this.material!.uniforms.progress, {
        value: 1,
        duration: 1,
        delay: 1,
        ease: 'circ.inOut'
      })
      .to('.text span', {
        y: '0%',
        duration: 0.9,
        stagger: 0.05,
        ease: 'circ.inOut'
      }, '-=0.4')
  }

  public setting () {
    this.webgl.appendChild(this.renderer.domElement)
    console.log(2 * Math.atan((this.height / 2) / 100) * 180 / Math.PI)
    this.camera = new THREE.PerspectiveCamera(
      2 * Math.atan((this.height / 2) / 100) * 180 / Math.PI,
      this.width / this.height,
      1,
      1000)
    this.camera.position.set(0, 0, 100)
    this.camera.updateProjectionMatrix()
    this._setMesh()
  }

  private _setMesh () {
    this.geometry = new THREE.PlaneBufferGeometry(this.width, this.height, 100, 100)
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        progress: { value: 0 }
      }
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  public onResize () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.mesh!.scale.x = this.width
    this.mesh!.scale.y = this.height
    this.camera!.aspect = this.width / this.height
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.width, this.height)
    this.camera!.updateProjectionMatrix()
  }

  public onRaf () {
    this.renderer.render(this.scene, this.camera as THREE.PerspectiveCamera)
    window.requestAnimationFrame(() => {
      this.onRaf()
    })
  }
}
onMounted(() => {
  const gl = new Main(document.querySelector('#canvas') as HTMLElement)
  window.addEventListener('resize', () => {
    gl.onResize()
  })
})
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  width: 100vw;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
h1 {
  display: flex;
  overflow: hidden;
  line-height: 1;
  span {
    font-size: 40vh;
    font-weight: 500;
    transform: translateY(100%);
    color: #fff;
  }
}
#canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
