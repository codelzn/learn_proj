<template>
<div id="container">
</div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import fragmentShader from '../shaders/page24/fragment.frag'
import vertexShader from '../shaders/page24/vertex.vert'
import ocean from '../assets/img24/ocean.jpg'
import Stats from 'stats.js'
import GUI from 'lil-gui'
import { onMounted } from 'vue'

interface optionInterface {
  dom: HTMLElement
}

class Sketch {
  public time:number
  public scene:THREE.Scene
  public renderer:THREE.WebGLRenderer
  public camera:THREE.PerspectiveCamera
  public dom:HTMLElement
  public geometry:THREE.PlaneBufferGeometry|THREE.SphereBufferGeometry|null
  public material:THREE.ShaderMaterial|null
  public mesh:THREE.Mesh|null
  public controls: OrbitControls
  public stats: Stats
  public gui: GUI

  public width:number
  public height:number
  constructor (options: optionInterface) {
    this.time = 0
    this.dom = options.dom
    this.width = this.dom.offsetWidth
    this.height = this.dom.offsetHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10)
    this.camera.position.z = 1
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(this.width, this.height)
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

    this.resize()
    this.setupResize()
    this.addObjects()
    this.render()
  }

  public setupResize () {
    window.addEventListener('resize', this.resize.bind(this))
  }

  public addObjects () {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 40, 40)
    this.geometry = new THREE.SphereBufferGeometry(0.5, 32, 32)
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader,
      vertexShader,
      wireframe: true,
      uniforms: {
        time: { value: 0 },
        oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
        customA: { value: 0.0 }
      }
    })
    this.gui.add(this.material!.uniforms.customA, 'value', 0.0, 1.0, 0.001)
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

  public render () {
    this.time += 0.05
    this.mesh!.rotation.x = this.time / 2000
    this.mesh!.rotation.y = this.time / 1000

    this.material!.uniforms.time.value = this.time
    this.controls.update()
    this.stats.update()
    this.renderer.render(this.scene, this.camera)
    window.requestAnimationFrame(this.render.bind(this))
  }
}
onMounted(() => {
  const sketch = new Sketch({
    dom: document.getElementById('container')!
  })
  sketch.render()
})

</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
}
canvas {
  display: block;
}
#container {
  width: 100vw;
  height: 100vh;
}
</style>
