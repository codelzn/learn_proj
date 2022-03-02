<template>
  <div class="root">
    <div class="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
// span样式基础
.spanbase() {
  position: absolute;
  display: block;
  border: 2px solid #fff;
  box-sizing: border-box;
  border-radius: 50%;
  animation: animate 3s ease-in-out infinite;
}
// 创建循环函数
.loop(@n, @i:1) when(@i <= @n) {
  span:nth-child(@{i}) {
    top: 10px * (@i - 1);
    left: 10px * (@i - 1);
    bottom: 10px * (@i - 1);
    right: 10px * (@i - 1);
    // 添加动画延迟
    // 负数可以让动画提前播放
    animation-delay: -(@n - @i) / 10s;
  }
  .loop(@n, @i + 1);
}
// 动画
@keyframes animate {
  0%,100% {
    transform: translateZ(-100px);
  }
  50% {
    transform: translateZ(100px);
  }
}
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #89179e;
  .loader {
    position: relative;
    width: 300px;
    height: 300px;
    // 开启3d空间
    transform-style: preserve-3d;
    transform: perspective(500px) rotateX(60deg);
    span {
      .spanbase();
    }
    .loop(15);
  }
}
</style>
