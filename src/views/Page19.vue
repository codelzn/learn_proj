<template>
<div class="wrap">
  <span class="cursor" id="cursor"></span>
</div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
interface mouseInterface {
  x: number
  y: number
  currentX: number
  currentY: number
}
class Main {
  public mouse: mouseInterface
  constructor () {
    this.mouse = {
      x: 0,
      y: 0,
      currentX: 0,
      currentY: 0
    }
    addEventListener('mousemove', this.onMouse.bind(this))
    requestAnimationFrame(this.onRaf.bind(this))
  }

  public lerp (start:number, end: number, ease = 0.05): number {
    return start * (1 - ease) + end * ease
  }

  public onMouse (e:MouseEvent):void {
    this.mouse.currentX = e.clientX
    this.mouse.currentY = e.clientY
  }

  public onRaf ():void {
    // this.mouse.x = this.lerp(this.mouse.x, this.mouse.currentX, 0.05)
    // this.mouse.y = this.lerp(this.mouse.y, this.mouse.currentY, 0.05)

    this.mouse.x = gsap.utils.interpolate(this.mouse.x, this.mouse.currentX, 0.05)
    this.mouse.y = gsap.utils.interpolate(this.mouse.y, this.mouse.currentY, 0.05)

    gsap.set('#cursor', {
      x: this.mouse.x - 20,
      y: this.mouse.y - 20
    })
    requestAnimationFrame(this.onRaf.bind(this))
  }
}
onMounted(() => {
  // eslint-disable-next-line no-new
  new Main()
})
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
.wrap {
  width: 100%;
  height: 100vh;
  background-color: #111;
  position: relative;
  .cursor {
    position: absolute;
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 50%;
    opacity: 0.8;
  }
}
</style>
