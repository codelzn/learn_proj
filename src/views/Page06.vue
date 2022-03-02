<template>
  <div class="root06" ref="root">
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const root = ref<HTMLElement | null>(null)
onMounted(() => {
  window.addEventListener('mousemove', e => {
    if (!root.value) return
    const heart: HTMLElement = document.createElement('span')
    const x:number = e.offsetX
    const y:number = e.offsetY
    heart.style.left = x + 'px'
    heart.style.top = y + 'px'
    const size:number = Math.random() * 80
    heart.style.width = 20 + size + 'px'
    heart.style.height = 20 + size + 'px'
    const transformValue:number = Math.random() * 360
    heart.style.transform = `rotate(${transformValue}deg)`
    heart.classList.add('heart06')
    root.value.appendChild(heart)
    setTimeout(() => {
      heart.remove()
    }, 1000)
  })
})
</script>
<style lang="less">
// 新创建的元素在添加scope属性时样式会失效
.root06 {
  box-sizing: border-box;
  min-height: 100vh;
  background: #111;
  overflow: hidden;
  .heart06 {
    position: absolute;
    pointer-events: none;
    filter: drop-shadow(0 0 15px  rgba(0,0,0,0.5));
    animation: fadeInOut 1s linear infinite;
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: url('../../public/image/heart.png');
      background-size: cover;
      animation: moveShape 1s linear infinite;
    }
  }
}
@keyframes moveShape {
  0% {
    transform: translate(0) rotate(0deg);
  }
  100% {
    transform: translate(300px) rotate(360deg);
  }
}

@keyframes fadeInOut {
  0%, 100% {
    opacity: 0;
  }
  20%, 80% {
    opacity: 1;
  }
}
</style>
