<template>
  <div class="-text"></div>
  <div class="visual">
    <img src="/image/18.jpg" alt="" />
  </div>
  <div id="loader"></div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
class Main {
  public obj: HTMLElement
  public canvas: HTMLCanvasElement
  public ctx: CanvasRenderingContext2D
  public canvasSize: { width: number; height: number }
  public point: {currentY: number, curveY:number}
  constructor () {
    const str = 'Thankyou for visiting my website. I hope you enjoy it.'
    let text = ''
    str.split('').forEach(v => {
      text += `<span>${v}</span>`
    })
    document.querySelector('.-text')!.innerHTML = text

    gsap.set('span', {
      opacity: 0,
      y: 50
    })

    this.obj = document.querySelector('#loader') as HTMLElement
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.canvasSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    this.canvas.width = this.canvasSize.width * Math.min(2, window.devicePixelRatio)
    this.canvas.height = this.canvasSize.height * Math.min(2, window.devicePixelRatio)

    this.canvas.style.width = `${this.canvasSize.width}px`
    this.canvas.style.height = `${this.canvasSize.height}px`
    this.obj.appendChild(this.canvas)

    this.point = {
      currentY: this.canvas.height,
      curveY: this.canvas.height
    }
    this.init()
  }

  public init (): void {
    gsap.registerEffect({
      name: 'curve',
      defaults: {
        flag: true
      },
      effect: (target: gsap.TweenTarget, config: { flag: any }) => {
        const tl = gsap.timeline({
          onUpdate: () => {
            this.cureveUpdate(config.flag)
          }
        })
          .to(target, {
            duration: 0.8,
            curveY: 0,
            ease: 'power4.out'
          })
          .to(target, {
            currentY: 0,
            duration: 0.8
          }, '<')
        return tl
      }
    })
    const tl = gsap.timeline({
      delay: 1
    })
      .add(gsap.effects.curve(this.point))
      // eslint-disable-next-line @typescript-eslint/ban-types
      .add((this.textAnimation as Function).bind(this))
      .set(this.point, {
        currentY: this.canvas.height,
        curveY: this.canvas.height
      })
      .add(gsap.effects.curve(this.point, { flag: false }), '+=2')
      .from('.visual img', {
        autoAlpha: 0,
        y: 15,
        duration: 1
      }, '-=0.5')
  }

  public textAnimation () {
    const tl = gsap.timeline()
      .to('span', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'back.out(3)',
        stagger: {
          each: 0.02
        }
      })
      .to('span', {
        opacity: 0,
        y: -100,
        direction: 0.6,
        ease: 'back.in(2)',
        stagger: {
          each: 0.01,
          ease: 'power2'
        }
      }, '-=0.2')
    return tl
  }

  public cureveUpdate (flag?: any) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = '#01031D'
    if (flag) {
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
      this.ctx.fillStyle = '#FFF'
    }
    this.ctx.beginPath()
    this.ctx.moveTo(0, 0)
    this.ctx.lineTo(0, this.point.currentY)
    this.ctx.quadraticCurveTo(this.canvas.width / 2, this.point.curveY, this.canvas.width, this.point.currentY)
    this.ctx.lineTo(this.canvas.width, 0)
    this.ctx.closePath()
    this.ctx.fill()
  }
}
onMounted(() => {
  // eslint-disable-next-line no-new
  new Main()
})
</script>
<style lang="less">
@import (css) url("https://fonts.googleapis.com/css2?family=Lora&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100%;
  width: 100%;
  background-color: #fafafa;
  overflow: hidden;
}
.-text {
  display: flex;
  position: absolute;
  gap: 0;
  overflow: hidden;
  z-index: 1;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
}
.visual {
  padding: 2vw;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
span {
  color: #fff;
  font-family: "Lora";
  font-size: 32px;
  letter-spacing: 0.1em;
  white-space: break-spaces;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
