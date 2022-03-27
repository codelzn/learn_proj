<template>
  <h1 class="glowIn">Hello World</h1>
  <p
    class="glowIn"
  >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mattis pellentesque id nibh tortor. Suspendisse ultrices gravida dictum fusce ut placerat orci nulla. A lacus vestibulum sed arcu.</p>
</template>
<script lang="ts" setup>import { onMounted } from 'vue'
const init = ():void => {
  const glowInTexts: NodeList = document.querySelectorAll('.glowIn')
  glowInTexts.forEach(glowInText => {
    const letters = glowInText.textContent!.split('')
    glowInText.textContent = ''
    letters.forEach((letter, i) => {
      const span = document.createElement('span')
      span.textContent = letter
      span.style.animationDelay = `${i * 0.05}s`
      console.log(span)
      glowInText.appendChild(span)
    })
  })
}
onMounted(() => {
  init()
})
</script>
<style lang="less">
@import (css) url("https://fonts.googleapis.com/css?family=Lora:400,400i,700");
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(
      rgba(16, 16, 16, 0.8),
      rgba(16, 16, 16, 0.8)
    ),
    url(https://i.loli.net/2019/11/03/RtVq2wxQYySDb8L.jpg);
  background-size: cover;
}
p {
  margin: 0em 5em 4em 5em;
}

h1, p {
  text-align: left;
  line-height: 1.8;
  font-family: Lora, serif;
}

.glowIn {
  color: white;

  span {
    animation: glow-in 0.8s both;
  }
}

@keyframes glow-in {
  0% {
    opacity: 0;
  }
  65% {
    opacity: 1;
    text-shadow: 0 0 25px white;

  }
  75% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}
</style>
