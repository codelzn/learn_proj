<template>
  <div class="root">
    <section>
      <div>
        <h2>お前も自分の人生にそういう態度だったらいいね。もし人に「ああ〜何で彼女・彼氏いないの。」で聞かれたら、あはいはいはいはい、あはいはいはいはいはい、开摆すれば良いんだよ。人に「何で、あぁ、また貧乏だの。」で聞かれたら。あはいはいはいはい、あはいはいはいはい。はいって言えばいいんだよ。あぁ、分かったの</h2>
      </div>
      <div>
        <h2>お前も自分の人生にそういう態度だったらいいね。もし人に「ああ〜何で彼女・彼氏いないの。」で聞かれたら、あはいはいはいはい、あはいはいはいはいはい、开摆すれば良いんだよ。人に「何で、あぁ、また貧乏だの。」で聞かれたら。あはいはいはいはい、あはいはいはいはい。はいって言えばいいんだよ。あぁ、分かったの</h2>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  div {
    position: relative;
    width: 50%;
    background: #20506b;
    overflow: hidden;
    &:nth-child(1) {
      background: url(https://picsum.photos/1920/1080);
      background-size: cover;
      h2 {
        // 设置文字的宽和颜色
        -webkit-text-stroke: 2px #fff;
        -webkit-text-fill-color: transparent;
        left: 100%;
      }
    }
    h2 {
      position: absolute;
      white-space: nowrap;
      font-size: 12em;
      line-height: 100vh;
      color: #fff;
      animation: animate 60s linear infinite;
    }
  }
}
@keyframes animate {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
