<template>
  <div class="root">
    <ul>
      <li style="--clr:#00ade1">
        <a href="javascript:void(0);" data-text="&nbsp;Home">&nbsp;Home&nbsp;</a>
      </li>
      <li style="--clr:#ff6493">
        <a href="javascript:void(0);" data-text="&nbsp;About">&nbsp;About&nbsp;</a>
      </li>
      <li style="--clr:#ffdd1c">
        <a href="javascript:void(0);" data-text="&nbsp;Services">&nbsp;Services&nbsp;</a>
      </li>
      <li style="--clr:#00db82">
        <a href="javascript:void(0);" data-text="&nbsp;Team">&nbsp;Team&nbsp;</a>
      </li>
      <li style="--clr:#dc00d4">
        <a href="javascript:void(0);" data-text="&nbsp;Contact">&nbsp;Contact&nbsp;</a>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.root {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #252839;
  ul {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 30px; // gap 属性是用来设置网格行与列之间的间隙的
    li {
      position: relative;
      list-style: none;
      a {
        position: relative;
        font-size: 4em;
        text-decoration: none;
        line-height: 1em;
        letter-spacing: 2px;
        // 全部大写
        text-transform: uppercase;
        color: transparent;
        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        &::before {
          // 获取自定义属性
          content: attr(data-text);
          position: absolute;
          color: var(--clr);
          width: 0;
          overflow: hidden;
          transition: 1s;
          border-right: 3px solid var(--clr);
          -webkit-text-stroke: 1px var(--clr);
        }
        &:hover::before {
          width: 100%;
          // 投影
          filter: drop-shadow(0 0 25px var(--clr));
        }
      }
    }
  }
}
</style>
