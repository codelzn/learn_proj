<template>
<div class="container">
</div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import vertexShader from '../shaders/shaderlearn/vertex.vert'
import fragmentShader from '../shaders/shaderlearn/fragment.frag'

class Main {
  public gl: HTMLElement
  public scene: THREE.Scene
  public camera: THREE.OrthographicCamera
  public renderer: THREE.WebGLRenderer
  public clock: THREE.Clock

  public geometry: THREE.PlaneGeometry | null
  public material: THREE.ShaderMaterial | null
  public plane: THREE.Mesh | null
  constructor (gl: HTMLElement) {
    this.gl = gl
    this.scene = new THREE.Scene()
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10)
    this.camera.position.z = 1
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.gl.appendChild(this.renderer.domElement)
    this.clock = new THREE.Clock()

    this.geometry = null
    this.material = null
    this.plane = null
    this.init()
  }

  public init () {
    this._initMesh()
    if (this.material!.uniforms.u_resolution !== undefined) {
      this.material!.uniforms.u_resolution.value.x = window.innerWidth
      this.material!.uniforms.u_resolution.value.y = window.innerHeight
    }
    this._animate()
  }

  private _initMesh () {
    this.geometry = new THREE.PlaneGeometry(2, 2)!
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_color: { value: new THREE.Color(0x00FF00) },
        u_time: { value: 0.0 },
        u_mouse: { value: { x: 0.0, y: 0.0 } },
        u_resolution: { value: { x: 0.0, y: 0.0 } }
      }
    })!
    this.plane = new THREE.Mesh(this.geometry, this.material)!
    this.scene.add(this.plane)
  }

  private _animate () {
    requestAnimationFrame(this._animate.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.material!.uniforms.u_time.value = this.clock.getElapsedTime()
  }

  public onWindowResize () {
    const aspectRatio = window.innerWidth / window.innerHeight
    let width, height
    if (aspectRatio >= 1) {
      width = 1
      height = (window.innerHeight / window.innerWidth) * width
    } else {
      width = aspectRatio
      height = 1
    }
    this.camera.left = -width
    this.camera.right = width
    this.camera.top = height
    this.camera.bottom = -height
    this.camera.updateProjectionMatrix()
    this.material!.uniforms.u_resolution.value.x = window.innerWidth
    this.material!.uniforms.u_resolution.value.y = window.innerHeight
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public move (evt: MouseEvent | TouchEvent) {
    if (evt instanceof TouchEvent) {
      this.material!.uniforms.u_mouse.value.x = evt.touches[0].clientX
      this.material!.uniforms.u_mouse.value.y = evt.touches[0].clientY
    } else if (evt instanceof MouseEvent) {
      this.material!.uniforms.u_mouse.value.x = evt.clientX
      this.material!.uniforms.u_mouse.value.y = evt.clientY
    }
    const resX = this.material!.uniforms.u_mouse.value.x / this.material!.uniforms.u_resolution.value.x
    const resY = this.material!.uniforms.u_mouse.value.y / this.material!.uniforms.u_resolution.value.y
    console.log(resX, resY)
  }
}

onMounted(() => {
  const gl = new Main(document.querySelector<HTMLElement>('.container')!)
  window.addEventListener('resize', () => gl.onWindowResize())
  window.addEventListener('mousemove', e => gl.move(e))
  window.addEventListener('touchstart', e => gl.move(e))
})
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
canvas {
  width: 100%;
  height: 100%;
}
</style>
