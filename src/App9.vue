<template>
  <div id="app">
    <div class="bg" ref="bg">
      <ul class="row" v-for="row in gridSize[0]">
        <li class="col" v-for="col in gridSize[1]"></li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      gridSize: [30, 30],
      snake: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createFood();
      this.createSnake();
      this.addKeyEvent();
    },
    createFood() {
      let x = Math.floor(Math.random() * this.gridSize[0]);
      let y = Math.floor(Math.random() * this.gridSize[1]);
      let bg = this.$refs['bg'];
      let food = bg.children[x].children[y];
      food.innerHTML = '<div class="food"></div>';
    },
    createSnake() {
      // 蛇头的横坐标
      var x = Math.floor(Math.random() * this.gridSize[0]);
      // 蛇头的纵坐标
      var y = Math.floor(Math.random() * this.gridSize[1]);
      // 贪吃蛇蛇元素数组
      let bg = this.$refs['bg'];
      let head = bg.children[x].children[y];
      this.snake = [{ x, y }];
      head.innerHTML = '<div class="snake snake__head"></div>';
      // 生成贪吃蛇
      // snake.forEach(function(item, index) {
      //   // 随机格子元素，表示蛇的位置，同上
      //   let body = bg.children[x].children[y];
      //   // 生成蛇
      //   if (index === 0) {
      //     body.innerHTML = '<div class="snake snake__head"></div>';
      //   } else {
      //     body.innerHTML = '<div class="snake snake__body"></div>';
      //   }
      // });
    },
    addKeyEvent() {
      // 监听键盘按下，打印按下的事件
      let self = this;
      document.addEventListener('keydown', e => {
        self.move(+e.keyCode);
      });
    },
    move(keyCode) {
      let bg = this.$refs['bg'];
      bg.querySelectorAll('.snake').forEach(function(item) {
        item.parentElement.removeChild(item);
      });
      this.snake.forEach((body, idx) => {
        if (idx === 0) {
          if (keyCode === 37) body.y -= 1;
          else if (keyCode === 38) body.x -= 1;
          else if (keyCode === 39) body.y += 1;
          else if (keyCode === 40) body.x += 1;
        }
        let { x, y } = body;
        let ele = bg.children[x].children[y];
        if (idx === 0) {
          ele.innerHTML = '<div class="snake snake__head"></div>';
        } else {
          ele.innerHTML = '<div class="snake snake__body"></div>';
        }
      });
    }
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  border: 0;
  margin: 0;
  outline: 0;
  box-sizing: border-box;
}
.bg {
  width: 900px; /* 宽度 */
  height: 900px; /* 高度 */
  background-color: #6dd164; /* 绿色的草地 */
}
.line {
  height: 30px;
}
.col {
  width: 30px; /* 宽度占10分之1 */
  height: 30px; /* 高度占100分之100的行元素高度 */
  float: left; /* 每个格子左浮动 */
  border-right: 1px solid rgba(19, 7, 7, 0.63); /* 格子边框 */
  border-bottom: 1px solid rgba(19, 7, 7, 0.63); /* 格子边框 */
  list-style: none;
}
.food {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
}
.snake {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  &__head {
    background: blue;
  }
  &__body {
    background: yellow;
  }
}
</style>
