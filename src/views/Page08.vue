<template>
  <div class="root">
    <div class="input">
      <div class="input__overlay" id="input-overlay"></div>
      <i class="bx bx-lock-alt input__lock"></i>
      <input
        autocomplete="false"
        type="password"
        placeholder="Password..."
        class="input__password"
        id="input-pass"
      />
      <i class="bx bx-hide input__icon" id="input-icon"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  showHiddenInput('input-overlay', 'input-pass', 'input-icon')
})
const showHiddenInput = (inputOverlay: string, inputPass: string, inputIcon: string) => {
  const overlay = document.getElementById(inputOverlay) as HTMLElement
  const input = document.getElementById(inputPass) as HTMLInputElement
  const iconEye = document.getElementById(inputIcon) as HTMLElement
  iconEye.addEventListener('click', () => {
    if (input.type === 'password') {
      input.type = 'text'
      iconEye.classList.add('bx-show')
    } else {
      input.type = 'password'
      iconEye.classList.remove('bx-show')
    }
    overlay.classList.toggle('overlay-content')
  })
}
</script>
<style lang='less' scoped>
@import (css)
  url("https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css");
@import (css)
  url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

// hsl: 色相 饱和度 亮度
@first-color: hsl(232, 54%, 43%);
@text-color: hsl(232, 8%, 35%);
@white-color: hsl(232, 100%, 99%);
@body-color: hsl(232, 45%, 90%);
@container-color: hsl(232, 54%, 11%);
* {
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
.root {
  margin: 0;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: @body-color;
}
.input {
  position: relative;
  background-color: @container-color;
  padding: 1.35rem 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
}

.input__lock,
.input__icon {
  font-size: 1.25rem;
  z-index: 1;
}

.input__lock,
.input__password {
  color: @white-color;
}

.input__icon {
  color: @first-color;
  cursor: pointer;
}

.input__password {
  background: transparent;
  border: none;
  outline: none;
  font-size: 14px;
  z-index: 1;
}

.input__password::placeholder {
  color: @white-color;
}

.input__overlay {
  width: 32px;
  height: 32px;
  background-color: @white-color;
  position: absolute;
  right: 0.9rem;
  border-radius: 50%;
  z-index: 0;
  transition: 0.4s ease-in-out;
}
.overlay-content {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  right: 0;
  ~ .input__lock {
    color: @container-color;
  }
  ~ .input__password {
    color: @container-color;
  }
}
</style>
