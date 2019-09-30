<template>
  <div id="app">
    <div class="mask" v-if="maskVisible"></div>
    <div class="text">呵呵🙃</div>
    <div class="bar">
      <div class="red" :style="`width: ${barPercent}`"></div>
    </div>
    <button class="btn">点我开始</button>
    <button class="btn" @click="pause">暂停</button>
    <button class="btn" @click="goon">继续</button>
    <div id="hh"></div>
  </div>
</template>

<script>
import * as spritejs from 'spritejs';
const { Scene, Sprite, Path, Group } = spritejs;

export default {
  data() {
    return {
      scene: null,
      layer: null,
      barPercent: '100%',
      maskVisible: false,
      isSuccess: false
      // loseSound: new Audio('/static/starFalse.mp3')
    };
  },
  mounted() {
    this.init();
    window.vm = this;
    setTimeout(() => {
      // this.loseSound.play();
    }, 2000);
    // window.addEventListener('beforeunload', e => {
    //   event.returnValue = '哈哈';
    //   // e.preventDefault();
    //   console.log('hh');
    //   // return false;
    // });
    // window.addEventListener('resize', () => {
    //   const [w, h] = this.scene.viewport;
    //   this.scene.resolution = [w, h];
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
        resolution: [1200, 650],
        viewport: ['auto', 'auto']
      });
      // const [WIDTH, HEIGHT] = this.scene.resolution;
      // console.log(WIDTH, HEIGHT);
      await this.scene.preload(
        {
          id: 'img1',
          src: 'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png'
        },
        {
          id: 'img2',
          src: 'https://p2.ssl.qhimg.com/t01c18f4e677c09a87e.jpg'
          // http://localhost:8080/static/man.jpg
        }
      );
      // 新建层级
      this.layer = this.scene.layer();
      this.layer.canvas.style.backgroundColor = '#9cd470';
      this.gotoOne();
      // this.gotoTwo();
    },
    gotoOne() {
      // 新建路径
      // let oneData = [
      //   [100, 100],
      //   [500, 500],
      //   [800, 200],
      //   [1000, 500],
      //   [1300, 300]
      // ];
      let oneData = [[100, 380], [250, 550], [650, 200], [900, 500]];
      oneData = oneData.map(item => [
        item[0] + this.makeRandomNum(),
        item[1] + this.makeRandomNum()
      ]);

      let h1 = Math.abs(oneData[1][1] - oneData[0][1]);
      let h2 = Math.abs(oneData[2][1] - oneData[1][1]);
      let failLenPer = h1 / h2;
      console.log('pointData：' + oneData, h1, h2, failLenPer);
      let yArr = oneData.map(item => item[1]);
      let minH = Math.min(...yArr);
      let maxH = Math.max(...yArr);
      let deltaH = maxH - minH;
      oneData.push([1200, oneData[oneData.length - 1][1]]);
      let pathData = this.createOnePath(oneData);
      console.log('pathData：' + pathData);

      // 新建路径背景
      let bgPathData =
        pathData +
        `L${oneData[oneData.length - 1][0]},
          ${oneData[oneData.length - 1][1] + 300}` +
        `L${oneData[0][0]}, ${oneData[oneData.length - 1][1] + 300}`;
      console.log(bgPathData);
      const group = new Group();
      group.attr({
        // pos: [oneData[0][0], oneData[0][1]],
        // anchor: [0.5, 0.5],
        clip: {
          d: bgPathData.replace(/,M\d+,\d+/g, '')
        }
        // clip: {
        //   d:
        //     'M23.6,0c-3.4,0-6.3,2.7-7.6,5.6C14.7,2.7,11.8,0,8.4,0C3.8,0,0,3.8,0,8.4c0,9.4,9.5,11.9,16,21.2 c6.1-9.3,16-12.1,16-21.2C32,3.8,28.2,0,23.6,0z',
        //   transform: { scale: 15 }
        // }
      });
      this.layer.append(group);

      const bg = new Sprite();
      bg.attr({
        // anchor: 0.5,
        // border: [6, 'black'],
        // pos: [100, 300],
        size: [2000, 2000],
        opacity: 0.6,
        bgimage: {
          id: 'img2',
          display: 'repeat'
        }
      });
      group.append(bg);

      let lineWidth = 10;
      pathData.unshift(
        `M${oneData[0][0]},100 L${oneData[0][0]},${oneData[0][1]}`
      );
      // pathData.push(
      //   this.drawLine(
      //     oneData[oneData.length - 1][0],
      //     oneData[oneData.length - 1][1],
      //     1200,
      //     oneData[oneData.length - 1][1]
      //   )
      // );
      pathData.forEach((d, idx) => {
        let path = new Path();
        path.attr({
          path: d,
          strokeColor: '#bbccfa',
          lineWidth: lineWidth,
          lineJoin: 'round'
        });
        console.log(
          `第${idx + 1}段路径长度：` + path.getPathLength(),
          '中点坐标：' + path.getPointAtLength(path.getPathLength() / 2)
        );
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
      robot.attr({
        anchor: [0.5, 1],
        scale: 0.1
      });
      this.layer.append(robot);

      const platform = new Sprite();
      platform.attr({
        anchor: [0.5, 0.5],
        pos: [50, 500],
        size: [100, 50],
        bgcolor: '#c37'
      });
      this.layer.append(platform);

      function draggable(sprite) {
        if (sprite.isDraggable) return;

        sprite.isDraggable = true;

        let x0, y0, startPos;

        function onMouseMove(evt) {
          const dx = evt.x - x0,
            dy = evt.y - y0;

          // sprite.attr('pos', [startPos[0] + dx, startPos[1] + dy]);
          sprite.attr('pos', [startPos[0], startPos[1] + dy]);
          evt.stopDispatch();
        }

        sprite.on('mouseenter', evt => {
          sprite.attr('border', { width: 6, color: 'blue' });
        });
        sprite.on('mouseleave', evt => {
          sprite.attr('border', { width: 0 });
        });

        sprite
          .on('mousedown', evt => {
            x0 = evt.x;
            y0 = evt.y;
            startPos = sprite.attr('pos');
            sprite.off('mousemove', onMouseMove);
            sprite.setMouseCapture();
            sprite.on('mousemove', onMouseMove);
            evt.stopDispatch();
          })
          .on('mouseup', evt => {
            sprite.off('mousemove', onMouseMove);
            sprite.releaseMouseCapture();
          });

        return sprite;
      }
      draggable(platform);
      this.layer.on('mousemove', evt => {
        if (evt.targetSprites.some(target => target.isDraggable)) {
          this.scene.container.style.cursor = 'move';
        } else {
          this.scene.container.style.cursor = 'default';
        }
      });
      // async function xx() {
      //   while (1) {
      //     /* eslint-disable no-await-in-loop */
      //     await robotMotion();
      //     /* eslint-enable no-await-in-loop */
      //   }
      // }
      // xx();
      if (this.isSuccess) {
        robotMotion();
        let hasHit = false;
        robot.on('update', () => {
          // 能量条
          // let nowH = deltaH - (e.target.attr('y') - minH);
          let nowH = deltaH - (robot.attr('y') - minH);
          this.barPercent = (nowH / deltaH) * 100 + '%';
          // 碰撞检测
          if (!hasHit && robot.OBBCollision(star)) {
            hasHit = true;
            star.animate([{ y: oneData[2][1] - 100, opacity: 0 }], {
              duration: 1000,
              fill: 'forwards',
              easing: 'ease-out'
            });
            // this.layer.timeline.playbackRate = -1;
            // robot.animate([{ offsetDistance: 0 }, { offsetDistance: 1 }], {
            //   // playbackRate: -1,
            //   duration: 1000
            //   // fill: 'forwards',
            //   // direction: 'reverse'
            // });
          }
        });
        async function robotMotion() {
          // for (let i = 0; i < 2; i++) {
          for (let i = 0; i < pathData.length; i++) {
            // if (hasHit) return;
            robot.attr({
              // anchor: [0.5, 1],
              offsetPath: pathData[i]
              // scale: 0.1
            });
            await robot.animate(
              [{ offsetDistance: 0 }, { offsetDistance: 1 }],
              {
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
              }
            ).finished;
          }
        }
      } else {
        robotMotionFail();
        robot.on('update', () => {
          // 能量条
          // let nowH = deltaH - (e.target.attr('y') - minH);
          let nowH = deltaH - (robot.attr('y') - minH);
          this.barPercent = (nowH / deltaH) * 100 + '%';
        });
        async function robotMotionFail() {
          for (let i = 0; i < pathData.length; i++) {
            console.log(i);
            if (i > 2) return;
            robot.attr({
              // anchor: [0.5, 1],
              offsetPath: pathData[i]
              // scale: 0.1
            });
            if (i === 2) {
              await robot.animate(
                [{ offsetDistance: 0 }, { offsetDistance: h1 / h2 }],
                {
                  duration: 1000,
                  fill: 'forwards',
                  easing: 'ease-out'
                }
              ).finished;
              await robot.animate(
                [{ offsetDistance: h1 / h2 }, { offsetDistance: 0 }],
                {
                  duration: 1000,
                  fill: 'forwards',
                  easing: 'ease-in'
                }
              ).finished;
              // this.$emit('todo')
            } else {
              await robot.animate(
                [{ offsetDistance: 0 }, { offsetDistance: 1 }],
                {
                  duration: 3000,
                  fill: 'forwards',
                  easing:
                    i % 2 === 0
                      ? 'cubic-bezier(.45,.14,.92,.76)'
                      : 'cubic-bezier(.09,.24,.58,.9)'
                }
              ).finished;
            }
          }
        }
      }
    },
    pause() {
      this.layer.timeline.playbackRate = 0;
    },
    goon() {
      this.layer.timeline.playbackRate = 1;
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
        let path =
          i === 0
            ? this.drawQuadraticBezier(...point)
            : i === pathArr.length - 1
              ? this.drawLine(...point)
              : this.drawCurve(...point);
        console.log(i, path);
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
    drawQuadraticBezier(x1, y1, x2, y2) {
      return `M${x1},${y1} Q${x1},${y2} ${x2},${y2}`;
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
.btn {
  margin-bottom: 20px;
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
  padding-bottom: 50%;
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

