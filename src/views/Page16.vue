<template>
<div></div>
</template>
<script lang="ts" setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'
import { onMounted } from 'vue'
import vertex from '../shaders/page16/vertex.glsl'
import fragment from '../shaders/page16/fragment.glsl'
const init = () => {
  const gui = new GUI()
  const debugObj = {
    depthColor: '#186691',
    surfaceColor: '#9bd8ff'
  }
  const scene = new THREE.Scene()
  const waterGeometry = new THREE.PlaneBufferGeometry(2, 2, 256, 256)
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
      uBigWavesSpeed: { value: 0.75 },

      uDepthColor: { value: new THREE.Color(debugObj.depthColor) },
      uSurfaceColor: { value: new THREE.Color(debugObj.surfaceColor) },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5 },
      uSmallWavesElevation: { value: 0.15 },
      uSmallWavesFrequency: { value: 3 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallIterations: { value: 4.0 }

    }
  })
  gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.001).name('uBigWavesElevation')
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.001).name('uBigWavesFrequencyX')
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.001).name('uBigWavesFrequencyY')
  gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.001).name('uBigWavesSpeed')
  gui.addColor(debugObj, 'depthColor').name('uDepthColor').onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObj.depthColor)
  })
  gui.addColor(debugObj, 'surfaceColor').name('uSurfaceColor').onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObj.surfaceColor)
  })
  gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.001).name('uColorOffset')
  gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.001).name('uColorMultiplier')
  gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation')
  gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency')
  gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed')
  gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(8).step(0.001).name('uSmallIterations')
  const water = new THREE.Mesh(waterGeometry, waterMaterial)
  water.rotation.x = -Math.PI * 0.5
  scene.add(water)
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
  camera.position.set(1, 1, 1)
  scene.add(camera)

  const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  document.body.appendChild(renderer.domElement)
  const clock = new THREE.Clock()
  const tick = () => {
    const elaspedTime = clock.getElapsedTime()
    waterMaterial.uniforms.uTime.value = elaspedTime
    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
  }
  tick()
}
onMounted(() => {
  init()
})
</script>
