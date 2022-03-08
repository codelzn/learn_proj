<template>
<div class="root">
  <section>
    <h2 class="text">AnimeJS Text Animation Effects</h2>
  </section>
</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import anime from 'animejs'
const splitText = ():void => {
  const text = document.querySelector('.text') as HTMLElement
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  text.innerHTML = text.textContent!.replace(/\S/g, '<span class="span11">$&</span>')
}
const createAnime = () => {
  anime.timeline({
    loop: true
  })
    .add({
      targets: '.text span',
      translateY: [-600, 0],
      scale: [10, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1500,
      delay: anime.stagger(20)
    })
    .add({
      targets: '.text span',
      translateX: [0, -1000],
      scale: [1, 1],
      opacity: [1, 0],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: anime.stagger(20)
    })
    .add({
      targets: '.text span',
      translateX: [1000, 0],
      scale: [1, 1],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: anime.stagger(20)
    })
    .add({
      targets: '.text span',
      translateX: [0, 0],
      scale: [1, 50],
      opacity: [1, 0],
      easing: 'easeOutExpo',
      duration: 2000,
      delay: anime.stagger(20)
    })
}
onMounted(() => {
  splitText()
  createAnime()
})
</script>
<style lang="less" scoped>
@import (css)
  url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap");
* {
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}
section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0e1623;
  overflow: hidden;
  .text {
    position: relative;
    font-size: 5em;
    text-align: center;
    color: #00fe77;
    // 倒影
    -webkit-box-reflect: below -0.46em linear-gradient(transparent, #0004);
  }
}
</style>
<style>
.span11 {
  position: relative;
  display: inline-block;
}
</style>
