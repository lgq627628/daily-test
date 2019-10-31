<template>
  <div id="app">
    <table border="1">
      <tr>
        <th>当前元素名称</th>
        <th>元素符号</th>
        <th>原子序数</th>
        <th>化合价</th>
        <th>离子</th>
      </tr>
      <!-- <tr>
        <td>{{nowEle[0]}}</td>
        <td>{{nowEle[1]}}</td>
        <td>{{nowEle[2]}}</td>
        <td>{{nowEle[3]}}</td>
        <td>{{nowEle[4]}}</td>
      </tr>-->
      <tr>
        <td>{{nowEle.name}}</td>
        <td>{{nowEle.symbol}}</td>
        <td>{{nowEle.number}}</td>
        <td>{{nowEle.valence}}</td>
        <td>{{nowEle.ion}}</td>
      </tr>
    </table>
    <div>绿色是正确答案；红色是错误答案</div>
    <button class="btn" @click="pause">暂停</button>
    <button class="btn" @click="goon">继续</button>
    <button class="btn" @mousedown="runFast">快点</button>
    <button class="btn" @mousedown="runNormal">正常</button>
    <button class="btn" @mousedown="runSlow">慢点</button>
    <div id="hh"></div>
    <div class="text" style="margin-top: 420px;">最高得分：{{maxScore}}</div>
    <div class="text">得分：{{score}}</div>
    <div class="text">机会：{{chance}}</div>
    <div class="btn" @click="restart" style="display: inline-block;">重新开始</div>
    <div
      v-if="resultVisible"
      style="font-size: 30px; color: red;"
    >{{failTxt[~~(Math.random() * 8)]}}</div>
  </div>
</template>

<script>
/* eslint-disable */
// import TOOL from './views/snake/tool.js';
import element from './views/snake/element.js';
import Map from './views/snake/Map.js';
import Food from './views/snake/Foods.js';
import Snake from './views/snake/Snake.js';
let map = null;
let food = null;
let snake = null;
export default {
  data() {
    return {
      nowEle: {},
      timeId: null,
      duration: 150,
      score: 0,
      chance: 5,
      resultVisible: false,
      failTxt: [
        '真菜啊你',
        '真是个渣渣',
        '水平低于海平面啦同学',
        '这也能被你玩死',
        '不忍直视',
        '手残党啊',
        '垃圾你该被分类啦',
        '哟吼，还真验收呐'
      ],
      maxScore: 0,
      gainSound: new Audio('@/../static/starTrue.mp3'),
      loseSound: new Audio('@/../static/starFalse.mp3'),
      failSound: new Audio('@/../static/fail.mp3')
    };
  },
  mounted() {
    window.vm = this;
    this.ready();
    this.init();
  },
  methods: {
    ready() {
      this.nowEle = element[~~(Math.random() * 10)];
    },
    restart() {
      this.pause();
      snake.removeAllBody();
      food.removeAllFood();
      this.nowEle = element[~~(Math.random() * 10)];
      this.resultVisible = false;
      this.score = 0;
      this.chance = 5;
      this.duration = 150;
      map = new Map();
      map.render();
      food = new Food({ map, nowEle: this.nowEle });
      food.render();
      snake = new Snake({ map, food });
      snake.render();
      this.goon();
    },
    init() {
      map = new Map();
      map.render();
      food = new Food({ map, nowEle: this.nowEle });
      food.render();
      snake = new Snake({ map, food });
      snake.render();
      this.goon();
      document.onkeydown = ({ keyCode }) => {
        switch (keyCode) {
          //左
          case 37:
            snake.setDirection('left');
            break;
          //上
          case 38:
            snake.setDirection('up');
            break;
          //右
          case 39:
            snake.setDirection('right');
            break;
          //下
          case 40:
            snake.setDirection('down');
            break;
          //空格
          case 32:
            snake.pause();
            break;
        }
      };
    },
    pause() {
      if (this.resultVisible) return;

      this.timeId && clearInterval(this.timeId);
    },
    goon() {
      if (this.resultVisible) return;

      this.timeId = setInterval(() => {
        snake.move(color => {
          if (color === 'green') {
            this.gainSound.load();
            this.gainSound.play();
            this.score++;
          } else {
            this.loseSound.load();
            this.loseSound.play();
            this.chance--;
            if (this.chance <= 0) this.over();
          }
        });
      }, this.duration);
    },
    runSlow() {
      if (this.resultVisible) return;

      this.duration += 50;
      if (this.duration > 3000) this.duration = 3000;
      this.pause();
      this.goon();
    },
    runFast() {
      if (this.resultVisible) return;

      this.duration -= 10;
      if (this.duration < 10) this.duration = 10;
      this.pause();
      this.goon();
    },
    runNormal() {
      if (this.resultVisible) return;
      this.duration = 150;
      this.pause();
      this.goon();
    },
    over() {
      this.failSound.play();
      this.maxScore = Math.max(this.maxScore, this.score);
      this.pause();
      this.resultVisible = true;
    }
  }
};
</script>

<style lang="scss">
#app {
  margin: 20px;
}
#hh {
  margin-top: 10px;
  user-select: none;
}
.btn {
  display: inline-block;
  padding: 10px;
  margin: 10px 0;
  margin-right: 10px;
  width: fit-content;
  border: 1px solid #ccc;
  cursor: pointer;
  outline: none;
  &:active {
    background: #eee;
  }
}
.text {
  display: inline-block;
  padding: 10px;
  margin: 10px 0;
  margin-right: 10px;
  width: fit-content;
  border: 1px solid #ccc;
  cursor: auto;
  user-select: none;
}
</style>
