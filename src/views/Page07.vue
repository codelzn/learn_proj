<template>
  <div class="root">
    <ul>
      <li style="--clr:#1877f2">
        <a href="javascript:void(0);">
          <i class="fa-brands fa-facebook-f"></i>
        </a>
      </li>
      <li style="--clr:#ff0000">
        <a href="javascript:void(0);">
          <i class="fa-brands fa-youtube"></i>
        </a>
      </li>
      <li style="--clr:#1da1f2">
        <a href="javascript:void(0);">
          <i class="fa-brands fa-twitter"></i>
        </a>
      </li>
      <li style="--clr:#c32aa3">
        <a href="javascript:void(0);">
          <i class="fa-brands fa-instagram"></i>
        </a>
      </li>
      <li style="--clr:#25d366">
        <a href="javascript:void(0);">
          <i class="fa-brands fa-whatsapp"></i>
        </a>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css");
@bg: #222;
* {
  box-sizing: border-box;
}
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: @bg;
  ul {
    position: relative;
    display: flex;
    gap: 50px;
    li {
      position: relative;
      list-style: none;
      width: 80px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: 0.5s;
      a {
        position: relative;
        text-decoration: none;
        color: var(--clr);
        z-index: 10;
        font-size: 2em;
        transition: 0.5s;
      }
      &:hover a {
        font-size: 3em;
        filter: drop-shadow(0 0 20px var(--clr))
          drop-shadow(0 0 40px var(--clr)) drop-shadow(0 0 60px var(--clr));
      }
      &:hover {
        z-index: 1000;
        transform: scale(0.75);
      }
      &::before {
        content: "";
        position: absolute;
        // 定位新写法
        // 等同于 `top: 0; right: 0; bottom: 0; left: 0;
        inset: 30px;
        box-shadow: 0 0 0 10px var(--clr), 0 0 0 20px @bg, 0 0 0 22px var(--clr);
        transition: 0.5s;
      }
      &:hover::before {
        inset: 0;
      }
      &::after {
        content: "";
        position: absolute;
        inset: 0px;
        background: @bg;
        transform: rotate(45deg);
      }
    }
  }
}
</style>
