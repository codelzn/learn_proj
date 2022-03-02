<template>
<div class="root">
  <!-- 整个label范围都可以作为input的选择范围 -->
  <label>
    <input type="checkbox">
    <span></span>
  </label>
</div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
@main-width: 150px;
@main-height: 75px;
*{
  box-sizing: border-box;
}
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #333;
  min-height: 100vh;
  label {
    position: relative;
    width: @main-width;
    height: @main-height;
    background: #212121;
    border-radius: 10px;
    input {
      // 隐藏
      appearance: none;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: @main-width / 2;
      height: @main-height;
      background: #333;
      border: 6px solid #212121;
      border-radius: 14px;
      cursor: pointer;
      transition: .5s;
    }
    input:checked ~ span {
      left: @main-width / 2;
    }
  }
}
</style>
