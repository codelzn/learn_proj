<template>
<div class="container">
</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import * as THREE from 'three'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare'

class Main {
  public camera: THREE.PerspectiveCamera
  public scene: THREE.Scene
  public renderer: THREE.WebGLRenderer
  public geometry: THREE.BoxGeometry
  public material: THREE.MeshBasicMaterial
  public mesh?: THREE.Mesh
  public dirLight: THREE.DirectionalLight
  public pointLight?: THREE.PointLight
  public controls: FlyControls
  public clock: THREE.Clock
  public textureLoader: THREE.TextureLoader
  public lensflare: Lensflare

  public size:number
  constructor () {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 15000)
    this.camera.position.z = 250
    this.size = 250
    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size)
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 50
    })
    this.textureLoader = new THREE.TextureLoader()
    this.lensflare = new Lensflare()
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.controls = new FlyControls(this.camera, this.renderer.domElement)
    this.controls.movementSpeed = 2500
    this.controls.rollSpeed = Math.PI / 20
    this.clock = new THREE.Clock()
    this.dirLight = new THREE.DirectionalLight(0xffffff, 0.03)
    this.scene.add(this.dirLight)
    this.init()
  }

  public init () {
    const container = document.querySelector('.container') as HTMLElement
    container.appendChild(this.renderer.domElement)
    this._renderBox(2500)
    this._addLight(0.08, 0.3, 0.9, 0, 0, -1000)
    this.raf()
  }

  private _renderBox (num:number) {
    for (let i = 0; i <= num; i++) {
      const mesh = new THREE.Mesh(this.geometry, this.material)
      mesh.position.x = 8000 * (2.0 * Math.random() - 1.0)
      mesh.position.y = 8000 * (2.0 * Math.random() - 1.0)
      mesh.position.z = 8000 * (2.0 * Math.random() - 1.0)
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      mesh.rotation.z = Math.random() * Math.PI
      this.scene.add(mesh)
    }
  }

  private _addLight (h:number, s:number, l:number, x:number, y:number, z:number) {
    this.pointLight = new THREE.PointLight(0xffffff, 1.5, 2000)
    this.pointLight.color.setHSL(h, s, l)
    this.pointLight.position.set(x, y, z)
    this.scene.add(this.pointLight)

    this._addLensflare()
  }

  private _addLensflare () {
    const textureFlare = this.textureLoader.load('/image/lensFlare.png')
    this.lensflare.addElement(
      new LensflareElement(textureFlare, 700, 0, (this.pointLight as THREE.PointLight).color)
    )
    this.scene.add(this.lensflare)
  }

  public raf () {
    requestAnimationFrame(this.raf.bind(this))
    this.renderer.render(this.scene, this.camera)
    this.controls.update(this.clock.getDelta())
  }
}

onMounted(() => {
  // eslint-disable-next-line no-new
  new Main()
})
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
</style>
