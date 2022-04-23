<template>
<div class="container">
  <img src="/image/18.jpg" alt="">
  <h1 :style="{ fontSize: size.fsize + 'px' }">おはようございます</h1>
  <h1 :style="{ fontSize: size.fsize + 'px' }">{{size.fsize}}</h1>
  <div class="dot">
    <span class="dot-item" style="--color: red"></span>
    <span class="dot-item" style="--color: green"></span>
    <span class="dot-item" style="--color: blue"></span>
    <span class="dot-item" style="--color: pink"></span>
    <span class="dot-item" style="--color: skyblue"></span>
  </div>
</div>
</template>
<script lang="ts" setup>
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, reactive } from 'vue'

const size = reactive({
  fsize: 10
})

class Main {
  constructor () {
    gsap.registerPlugin(ScrollTrigger)
  }

  public movePic () {
    gsap.to('.container img', {
      duration: 2,
      width: '100%',
      height: 'auto'
    })
  }

  public setPic () {
    gsap.set('.container img', {
      transformOrigin: 'right bottom'
    })
    gsap.to('.container img', {
      duration: 2,
      rotation: 360,
      ease: 'power3.out'
    })
  }

  public changeSize1 () {
    gsap.to(size, {
      duration: 2,
      fsize: 30
    })
  }

  public changeSize2 () {
    gsap.from(size, {
      duration: 2,
      fsize: 30
    })
  }

  public dotAnimate () {
    gsap.from('.dot .dot-item', {
      duration: 1,
      opacity: 0,
      // y: () => Math.random() * 400 - 200,
      y: 'random(-200, 200)',
      stagger: 0.25,
      delay: 1.5
    })
  }

  public tl1 (): gsap.core.Timeline {
    return gsap.timeline({ repeat: -1, yoyo: true })
  }

  public ut (): void {
    const msg = gsap.version
    console.log(msg)
  }
}

onMounted(() => {
  const main = new Main()
  // main.changeSize2()
  // main.dotAnimate()
  main.ut()
  const tl = main.tl1()
  tl.from(size, {
    duration: 2,
    fsize: 30
  }).to('h1', {
    duration: 2,
    rotation: 45
  })
    .addLabel('out', '+=0.5')
    .from('.dot .dot-item', {
      duration: 1,
      opacity: 0,
      y: 'random(-200, 200)',
      stagger: 0.25
    })
    .to('.dot .dot-item', {
      duration: 0.5,
      opacity: 0,
      x: 300
    }, 'out')
})
</script>
<style lang="less">
img {
  width: 500px;
}
.container h1 {
  display: inline-flex;
  color: green;
}
.dot {
  position: absolute;
  width: 100%;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  span {
    background-color: var(--color);
    border-radius: 50%;
    width: 20px;
    height: 20px;
  }
}
</style>
