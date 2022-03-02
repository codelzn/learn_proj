<template>
<div class="root">
 <div class="main">
   main
   <div class="main_son">
     son
   </div>
 </div>
</div>
</template>
<script lang="ts" setup>
</script>
<style lang="less" scoped>
.main {
  color: blue;
  &_son {
    color: pink;
  }
}
</style>
