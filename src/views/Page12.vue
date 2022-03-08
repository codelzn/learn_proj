<template>
  <div class="root">
    <div class="cursor">
      <div class="circle" v-for="i in 10" :key="i"></div>
    </div>
    <div class="container">
      <div v-for="i in blockNum" :key="i" class="block"></div>
      <h2>
        <span>A Video on</span>
        <br />AnimeJS
      </h2>
    </div>
  </div>
</template>
<script lang="ts" setup>
import anime from 'animejs'
import gsap from 'gsap'
import { onMounted, ref } from 'vue'
const blockNum = ref<number>(100)
const createAnime = ():void => {
  anime({
    targets: '.block',
    translateX: () => {
      return anime.random(-700, 700)
    },
    translateY: () => {
      return anime.random(-500, 500)
    },
    scale: () => {
      return anime.random(1, 5)
    },
    easing: 'linear',
    duration: 3000,
    delay: anime.stagger(10),
    complete: createAnime
  })
}
const moveMouse = ():void => {
  window.addEventListener('mousemove', e => {
    gsap.to('.circle', {
      x: e.clientX,
      y: e.clientY,
      stagger: -0.05
    })
  })
}
onMounted(() => {
  createAnime()
  moveMouse()
})
</script>
<style lang="less" scoped>
@import (css)
  url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap");
@block-color: skyblue;
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
}
.root {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: @block-color;
  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: #fff;
      text-align: center;
      font-size: 12vw;
      line-height: 0.6em;
      z-index: 1000;
      font-weight: 900;
      span {
        font-size: 0.2em;
        letter-spacing: 0.4em;
        font-weight: 400;
        text-transform: uppercase;
      }
    }
    .block {
      position: absolute;
      width: 50px;
      height: 100px;
      background: @block-color;
      box-shadow: 10px 10px 50px rgba(0,0,0,0.2);
    }
  }
  .cursor {
    position: absolute;
    top: 0;
    left: 0;
    width: 70px;
    height: 70px;
    .circle {
      position: absolute;
      z-index: 100000;
      top: -50%;
      left: -50%;
      width: 100%;
      height: 100%;
      background: linear-gradient(yellow, #ff005e);
      border-radius: 50%;
    }
  }
}
</style>
