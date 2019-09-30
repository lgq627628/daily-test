<template>
  <div id="app">
    <div>哈哈呵呵嘻嘻</div>
    <canvas id="hh" ref="hh"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null
    };
  },
  mounted() {
    let canvas = this.$refs.hh;
    let ctx = canvas.getContext('2d');
    window.vm = ctx;
    ctx.strokeStyle = 'blue';
    ctx.rect(10, 10, 100, 100); //绘制矩形
    ctx.stroke();
  }
};
</script>

<style lang="scss">
#hh {
  width: 600px;
  height: 800px;
  border: 1px solid red;
}
</style>

