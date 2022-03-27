<template>
  <div id="canvas"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import vert from '../shaders/page18/vertex.glsl'
import frag from '../shaders/page18/fragment.glsl'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import gsap from 'gsap'

class Main {
  public webgl: HTMLElement | null
  public scene: THREE.Scene
  public width: number
  public height: number
  public renderer: THREE.WebGLRenderer
  public clock: THREE.Clock
  public loader: THREE.TextureLoader
  public img: THREE.Texture
  public camera?: THREE.PerspectiveCamera
  public controls?: OrbitControls
  public geometry?: THREE.PlaneBufferGeometry
  public material?: THREE.ShaderMaterial
  public mesh?: THREE.Mesh
  public gui?: GUI
  constructor (webgl: HTMLElement | null) {
    this.webgl = webgl
    this.scene = new THREE.Scene()
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(new THREE.Color(0xffffff))
    this.renderer.setSize(this.width, this.height)
    this.clock = new THREE.Clock()
    this.loader = new THREE.TextureLoader()
    this.img = this.loader.load('/image/18.jpg', () => {
      this.init()
    })
    this.gui = new GUI()
  }

  public init ():void {
    this._setting()
    this.onRaf()
    gsap.to(this.material!.uniforms.uAnimation, {
      value: 1,
      duration: 10
    })
  }

  private _setting ():void {
    (this.webgl as HTMLElement).appendChild(this.renderer.domElement)
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000)
    this.camera.position.set(0, 0, 2)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this._setMesh()
    this._gui()
  }

  private _setMesh ():void {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
    this.material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      side: THREE.DoubleSide,
      transparent: true,
      uniforms: {
        uTexture: { value: this.img },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uAnimation: { value: 0 }
      }
    })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  private _gui ():void {
    this.gui!.add(this.material!.uniforms.uProgress, 'value', 0, 1, 0.01).name('progress')
  }

  public onResize ():void {
    this.camera!.aspect = window.innerWidth / window.innerHeight
    this.camera!.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  public onRaf ():void {
    this.material!.uniforms.uTime.value = this.clock.getElapsedTime()
    this.renderer.render(this.scene, this.camera as THREE.Camera)
    this.controls!.update()
    window.requestAnimationFrame(() => {
      this.onRaf()
    })
  }
}
onMounted(() => {
  const gl = new Main(document.querySelector('#canvas'))
  window.addEventListener('resize', () => {
    gl.onResize()
  })
})
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
