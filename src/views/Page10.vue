<template>
  <div class="root">
    <section>
      <p class="text">
        If you find these concepts intimidating, don't worry! The tutorial and guide only require basic HTML and JavaScript knowledge, and you should be able to follow along without being an expert in any of these.
        If you are an experienced developer interested in how to best integrate Vue into your stack, or you are curious about what these terms mean, we discuss them in more details in Ways of Using Vue.
        Despite the flexibility, the core knowledge about how Vue works is shared across all these use cases. Even if you are just a beginner now, the knowledge gained along the way will stay useful as you grow to tackle more ambitious goals in the future. If you are a veteran, you can pick the optimal way to leverage Vue based on the problems you are trying to solve, while retaining the same productivity. This is why we call Vue "The Progressive Framework": it's a framework that can grow with you and adapt to your needs.
      </p>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import anime from 'animejs'
import gsap from 'gsap'
// 讲文章内容分开
const step01 = (): void => {
  const text = document.querySelector('.text') as HTMLElement
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  text.innerHTML = text.textContent!.replace(/\S/g, '<span class="span10">$&</span>')
}
// 动画
const createAnime = () => {
  const animation = anime.timeline({
    targets: '.text span',
    easing: 'easeInOutExpo',
    loop: true
  })
  animation.add(
    {
      rotate: () => {
        return anime.random(-360, 360)
      },
      translateX: () => {
        return anime.random(-500, 500)
      },
      translateY: () => {
        return anime.random(-500, 500)
      },
      duration: 5000,
      delay: anime.stagger(20)
    })
    .add(
      {
        rotate: 0,
        translateX: 0,
        translateY: 0,
        duration: 5000,
        delay: anime.stagger(20)
      })
}
// gsap动画 基础版无法实现 满血版需要购买Max版本
const createAnimeByGsap = () => {
  gsap.to('.text span', {
    ease: 'easeInOutExpo',
    rotate: () => {
      return gsap.utils.random(-360, 360)
    },
    translateX: () => {
      return gsap.utils.random(-500, 500)
    },
    translateY: () => {
      return gsap.utils.random(-500, 500)
    },
    duration: 5000,
    delay: () => {
      return gsap.utils.random(0, 5)
    }
  })
}
onMounted(() => {
  step01()
  createAnime()
  // createAnimeByGsap()
})
</script>
<style lang="less">
@import (css)
  url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700;900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
section {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  background-color: #130e23;
  .text {
    position: relative;
    text-align: center;
    color: #00cefe;
    margin: 40px;
    max-width: 650px;
    .span10 {
      position: relative;
      display: inline-block;
    }
  }
}
</style>
