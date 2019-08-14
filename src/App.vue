<template>
  <div id="app">
    <div class="mask" v-if="maskVisible"></div>
    <div class="text">呵呵🙃</div>
    <div class="bar">
      <div class="red" :style="`width: ${barPercent}`"></div>
    </div>
    <div id="hh"></div>
  </div>
</template>

<script>
import * as spritejs from 'spritejs';
const { Scene, Sprite, Path } = spritejs;

export default {
  data() {
    return {
      scene: null,
      layer: null,
      barPercent: '100%',
      maskVisible: false
    };
  },
  mounted() {
    this.init();
    window.vm = this;
    // window.addEventListener('beforeunload', e => {
    //   event.returnValue = '哈哈';
    //   // e.preventDefault();
    //   console.log('hh');
    //   // return false;
    // });
  },
  methods: {
    makeRandomNum() {
      return Math.random() > 0.5
        ? parseInt(Math.random() * 40) * -1
        : parseInt(Math.random() * 40);
    },
    async init() {
      // 画布初始化
      this.scene = new Scene('#hh', {
        resolution: [1500, 500],
        stickMode: 'height',
        stickExtend: false
      });
      await this.scene.preload({
        id: 'img1',
        src: 'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png'
      });
      // 新建层级
      this.layer = this.scene.layer();
      this.layer.canvas.style.backgroundColor = '#9cd470';
      this.gotoOne();
      // this.gotoTwo();
    },
    gotoOne() {
      // 新建路径
      let oneData = [
        [100, 100],
        [300, 400],
        [450, 200],
        [600, 400],
        [800, 300]
      ];
      oneData = oneData.map(item => {
        return [item[0] + this.makeRandomNum(), item[1] + this.makeRandomNum()];
      });
      let yArr = oneData.map(item => item[1]);
      let minH = Math.min(...yArr);
      let maxH = Math.max(...yArr);
      let deltaH = maxH - minH;
      let pathData = this.createOnePath(oneData);

      let lineWidth = 10;
      pathData.forEach(d => {
        let path = new Path();
        path.attr({
          path: d,
          strokeColor: '#bbccfa',
          lineWidth: lineWidth,
          lineJoin: 'round',
          textures: 'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png'
        });
        let path2 = path.cloneNode();
        path2.attr({ translate: [0, lineWidth], strokeColor: '#6083e5' });
        let path3 = path.cloneNode();
        path3.attr({ translate: [0, lineWidth * 2], strokeColor: '#333f99' });
        this.layer.append(path);
        this.layer.append(path2);
        this.layer.append(path3);
      });

      // 新建星星
      let star = new Sprite();
      star.attr({
        pos: oneData[2],
        bgcolor: 'yellow',
        size: [50, 50],
        translate: [-25, -50]
      });
      this.layer.append(star);

      // 新建人物
      const robot = new Sprite('img1');
      this.layer.append(robot);

      robotMotion();
      let hasHit = false;
      robot.on('update', (a, b, c, d) => {
        console.log(a, b, c, d);
        // 能量条
        // let nowH = deltaH - (e.target.attr('y') - minH);
        let nowH = deltaH - (robot.attr('y') - minH);
        this.barPercent = (nowH / deltaH) * 100 + '%';
        // 碰撞检测
        if (!hasHit && robot.OBBCollision(star)) {
          hasHit = true;
          // this.layer.timeline.playbackRate = -1;
          // robot.animate([{ offsetDistance: 1 }, { offsetDistance: 0 }], {
          //   playbackRate: -1,
          //   duration: 3000,
          //   fill: 'forwards'
          // });
          star.animate([{ y: oneData[2][1] - 100, opacity: 0 }], {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease-out'
          });
        }
      });
      async function robotMotion() {
        for (let i = 0; i < pathData.length; i++) {
          // if (hasHit) return;
          robot.attr({
            anchor: [0.5, 1],
            offsetPath: pathData[i],
            scale: 0.1
          });
          await robot.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
            // playbackRate: 1,
            duration: 3000,
            fill: 'forwards',
            easing:
              i % 2 === 0
                ? 'cubic-bezier(.45,.14,.92,.76)'
                : 'cubic-bezier(.09,.24,.58,.9)'
            // easing:
            //   i % 2 === 0
            //     ? 'cubic-bezier(.4,.1,1,1)'
            //     : 'cubic-bezier(0,0,.55,.85)'
            // easing: i % 2 === 0 ? 'ease-in' : 'cubic-bezier(0,0,.22,.79)'
          }).finished;
        }
      }
    },
    createOnePath(pathArr) {
      let pathData = [];
      for (let i = 0; i < pathArr.length - 1; i++) {
        let point = [
          pathArr[i][0],
          pathArr[i][1],
          pathArr[i + 1][0],
          pathArr[i + 1][1]
        ];
        let path = this.drawCurve(...point);
        pathData.push(path);
      }
      return pathData;
    },
    gotoTwo() {
      let R = parseInt(Math.random() * 50) + 40;
      let twoData = [[100, 400], [200 + R, 400], [600, 400], [750, 200]];
      let pathData = [];
      for (let i = 0; i < twoData.length - 1; i++) {
        let data = [
          twoData[i][0],
          twoData[i][1],
          twoData[i + 1][0],
          twoData[i + 1][1]
        ];
        if (i === 0) {
          pathData.push(this.drawLine(...data));
          pathData.push(
            this.drawRightCircle(twoData[i + 1][0], twoData[i + 1][1], R)
          );
          pathData.push(
            this.drawLeftCircle(twoData[i + 1][0], twoData[i + 1][1] - 2 * R, R)
          );
        } else if (i === 1) {
          pathData.push(this.drawLine(...data));
        } else if (i === 2) {
          pathData.push(this.drawCurve(...data));
        }
      }
      pathData.forEach(d => {
        let path = new Path();
        path.attr({
          path: d,
          strokeColor: 'black',
          lineWidth: 5
        });
        this.layer.append(path);
      });

      // 新建人物
      const robot = new Sprite(
        'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png'
      );
      this.layer.append(robot);
      robotMotion();

      console.log(pathData);
      async function robotMotion() {
        for (let i = 0; i < pathData.length; i++) {
          robot.attr({
            anchor: [0.5, 1],
            scale: 0.1,
            offsetPath: pathData[i]
          });
          await robot.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
            duration: 3000,
            fill: 'forwards',
            easing:
              i === 2 ? 'ease-in' : i === 1 || i === 4 ? 'ease-out' : 'linear'
          }).finished;
        }
      }
    },
    drawCurve(x1, y1, x2, y2) {
      // 中间两个点（C后面的两个点）是首尾控制点
      let midX = (x1 + x2) / 2;
      return `M${x1},${y1} C${midX},${y1} ${midX},${y2} ${x2},${y2}`;
    },
    drawRightCircle(x1, y1, R) {
      return `M${x1},${y1} A${R} ${R}, 0, 0, 0, ${x1} ${y1 - 2 * R}`;
    },
    drawLeftCircle(x1, y1, R) {
      return `M${x1},${y1} A${R} ${R}, 0, 0, 0, ${x1} ${y1 + 2 * R}`;
    },
    drawLine(x1, y1, x2, y2) {
      return `M${x1},${y1} L${x2},${y2}`;
    }
  }
};
</script>

<style>
.text {
  font-size: 20px;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
#hh {
  width: 100%;
  padding-bottom: 26%;
  border: 2px solid #000;
}
.bar {
  position: relative;
  width: 300px;
  margin-bottom: 20px;
  height: 30px;
  border: 1px solid #000;
  background: blue;
}
.red {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  background: red;
}
</style>

