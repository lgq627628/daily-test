<template>
  <div id="app">
    <canvas id="can" width="400" height="400" style="background-color: black">对不起，您的浏览器不支持canvas</canvas>
  </div>
</template>

<script>
/* eslint-disable */
// 贪吃蛇
// 蛇、食物
// 在蛇向前爬行的过程中，会遇到三种不同的情况，需要进行不同的判断检测。
// 第一种情况是吃到了食物，这时候就需要向蛇的数组中添加食物的坐标点；
// 第二种情况是碰到了自己的身体；
// 第三种是碰到了边界，这两种情况都导致游戏结束；
// 如果不是上面的三种情况，蛇就可以正常的移动。
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let food = this.feed();
    },
    // 伪代码
    feed() {
      // 未被占用的空格数
      let len = zone.length - snake.length;
      // 无法投食
      if (len === 0) return;
      // zone的索引
      let index = 0,
        // 空格计数器
        count = 0,
        // 第 rnd 个空格子是最终要投食的位置
        rnd = (Math.random() * count) >> (0 + 1);
      // 累计空格数
      while (count !== rnd) {
        // 当前格子为空，count总数增一
        zone[index++] === 0 && ++count;
      }
      return index - 1;
    }
  }
};
</script>

<style lang="scss">
</style>
