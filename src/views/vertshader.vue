<template>
<div class="container">
</div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import vertexShader from '../shaders/vertshader/vertex.vert'
import fragmentShader from '../shaders/vertshader/fragment.frag'

class Main {
  container: HTMLElement
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  clock: THREE.Clock

  cube: THREE.Mesh | null
  geometry: THREE.BoxGeometry | null
  material: THREE.ShaderMaterial | null
  material1: THREE.MeshBasicMaterial | null

  constructor (container: HTMLElement) {
    this.container = container
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.set(0, 0, 100)

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    this.clock = new THREE.Clock()

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true

    this.cube = null
    this.geometry = null
    this.material = null
    this.material1 = null
  }

  public init () {
    this._render()
    this._initCube()
    this._addListeners()
    this.setLoop()
  }

  private _render () {
    this.container.appendChild(this.renderer.domElement)
  }

  private _initCube () {
    this.geometry = new THREE.BoxGeometry(30, 30, 30, 10, 10, 10)
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      wireframe: true,
      uniforms: {
        u_time: { value: 0 },
        u_mouse: { value: { x: 0, y: 0 } },
        u_resolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        u_radius: { value: 20.0 }
      }
    })
    this.material1 = new THREE.MeshBasicMaterial({
      color: 0xb7ff00,
      wireframe: true
    })
    this.cube = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.cube)
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
    })
  }
}

onMounted(() => {
  const gl = new Main(document.querySelector<HTMLElement>('.container')!)
  gl.init()
  gl.material!.wireframe = false
})
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
</style>
