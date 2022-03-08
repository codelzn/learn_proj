<template>
<div class="root">
  <section>
    <svg>
      <filter id="gooey">
        <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        <feColorMatrix values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 20 -10"></feColorMatrix>
      </filter>
    </svg>
    <div class="loader">
      <span v-for="i in spanNum" :key="i" :style="`--i:${i}`"></span>
      <span class="rotate" v-for="i in spanNum - 3" :key="i" :style="`--j:${i-1}`"></span>
    </div>
  </section>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const spanNum = ref<number>(8)

</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
@keyframes animate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0c1b21;
  svg {
    width: 0;
    height: 0;
  }
  .loader {
    position: relative;
    width: 250px;
    height: 250px;
    filter: url(#gooey);
    animation: animate 16s linear infinite;
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      transform: rotate(calc(45deg * var(--i)));
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: calc(50% - 20px);
        width: 40px;
        height: 40px;
        background: linear-gradient(45deg, #c7eeff, #03a9f4);
        border-radius: 50%;
        box-shadow: 0 0 30px #00bcd4;
      }
    }
    .rotate {
      animation: animate 4s ease-in-out infinite;
      animation-delay: calc(-0.2s * var(--j));
    }
  }
}
</style>
