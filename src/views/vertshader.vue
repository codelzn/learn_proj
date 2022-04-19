<template>
<div class="container">
</div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import Stats from 'stats.js'
import vertexShader from '../shaders/vertshader/vertex.vert'
import fragmentShader from '../shaders/vertshader/fragment.frag'
import '../utils/MyShaderChunks'

class Main {
  public container: HTMLElement
  public scene: THREE.Scene
  public camera: THREE.PerspectiveCamera
  public renderer: THREE.WebGLRenderer
  public controls: OrbitControls
  public clock: THREE.Clock
  public GUI: GUI
  public stats: Stats
  public ambient: THREE.HemisphereLight
  public light: THREE.DirectionalLight

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public uniforms: any

  public cube: THREE.Mesh | null
  public geometry: THREE.IcosahedronGeometry | null
  public material: THREE.ShaderMaterial | null
  public material1: THREE.MeshBasicMaterial | null

  constructor (container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.set(0, 0, 100)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.clock = new THREE.Clock()

    this.GUI = new GUI()

    this.stats = new Stats()
    this.stats.showPanel(0)

    this.ambient = new THREE.HemisphereLight(0x444444, 0x111111, 1)
    this.light = new THREE.DirectionalLight(0xcccccc, 0.8)
    this.light.position.set(0, 6, 2)
    this.scene.add(this.ambient)
    this.scene.add(this.light)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib.common,
      THREE.UniformsLib.lights
    ])
    this.uniforms.u_time = { value: 0.0 }
    this.uniforms.u_mouse = { value: { x: 0.0, y: 0.0 } }
    this.uniforms.u_resolution = { value: { x: 0, y: 0 } }
    this.uniforms.u_radius = { value: 20.0 }
    this.uniforms.u_color = { value: new THREE.Color(0xb7ff00) }

    this.cube = null
    this.geometry = null
    this.material = null
    this.material1 = null
  }

  public init () {
    this._render()
    this._initCube()
    this.initGUI()
    this._addListeners()
    this.setLoop()
  }

  private _render () {
    this.container.appendChild(this.renderer.domElement)
    this.container.appendChild(this.stats.dom)
  }

  private _initCube () {
    this.geometry = new THREE.IcosahedronGeometry(20, 4)
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      lights: true,
      uniforms: this.uniforms
    })
    this.material1 = new THREE.MeshBasicMaterial({
      color: 0xb7ff00,
      wireframe: false
    })
    this.cube = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.cube)
  }

  public initGUI () {
    console.log('gui init')
  }

  private _addListeners () {
    window.addEventListener('resize', this._onWindowResize.bind(this))
    window.addEventListener('mousemove', e => this._onMouseMove(e), false)
    window.addEventListener('touchmove', e => this._onMouseMove(e), false)
  }

  private _onWindowResize () {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    if (this.material) {
      this.material.uniforms.u_resolution.value.x = window.innerWidth
      this.material.uniforms.u_resolution.value.y = window.innerHeight
    }
  }

  private _onMouseMove (evt: MouseEvent | TouchEvent) {
    if (evt instanceof TouchEvent) {
      if (this.material) {
        this.material!.uniforms.u_mouse.value.x = evt.touches[0].clientX
        this.material!.uniforms.u_mouse.value.y = evt.touches[0].clientY
      }
    } else if (evt instanceof MouseEvent) {
      if (this.material) {
        this.material!.uniforms.u_mouse.value.x = evt.clientX
        this.material!.uniforms.u_mouse.value.y = evt.clientY
      }
    }
  }

  public setLoop () {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera)
      this.controls.update()
      if (this.material) {
        this.material.uniforms.u_time.value = this.clock.getElapsedTime()
      }
      this.cube!.rotation.x += 0.01
      this.cube!.rotation.z += 0.01
      this.stats.update()
    })
  }
}

onMounted(() => {
  const gl = new Main(document.querySelector<HTMLElement>('.container')!)
  gl.init()
})
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
</style>
