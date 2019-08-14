<template>
  <div>
    <canvas id="myCanvas" width="1000" height="500"></canvas>
  </div>
</template>
<script>
import p2 from 'p2';
// import createjs from 'createjs';
/* eslint-disable */
let canvas, stage, container;

let world,
  ball,
  ballBody,
  ballShape,
  floor,
  floorBody,
  floorShape,
  semiCircle,
  semiCircleBody;

let stageHeight = 500,
  stageWidth = 1000,
  factor = 50;

let xPos = 500;
let yPos = 150;

let circleCenterX = 500;
let circleCenterY = 400;
const CIRCLE_RADIUS = 100;
let pointArr = [];
let pointArr2 = [];
let path = [];

let isKeyDown = false;

export default {
  name: 'Phy',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let self = this;
      // 创建物理世界
      world = new p2.World({
        gravity: [0, -9.82]
      });

      // 初始化画布
      canvas = document.getElementById('myCanvas');
      stage = new createjs.Stage(canvas);
      container = new createjs.Container();
      stage.addChild(container);

      // 画布小球
      ball = this.createBall(xPos, yPos);
      // 刚体小球
      ballBody = this.createBallBody(xPos, yPos);
      // 关联小球
      ballBody.displays = [ball];

      // ball.addEventListener('mousedown', function(e) {
      //   stage.addEventListener('stagemousemove', function(e) {
      //     //  ball.x = stage.mouseX;
      //     //  ball.y = stage.mouseY;
      //     isKeyDown = true;
      //     ball.x = e.stageX;
      //     ball.y = e.stageY;
      //     stage.update();
      //   });
      //   stage.addEventListener('stagemouseup', function(e) {
      //     // stage.update();
      //     isKeyDown = false;
      //     // 清除旧的重力
      //     world.removeBody(ballBody);

      //     // 加入新的重力
      //     self.createBallBody(e.stageX, e.stageY);
      //     // addContactMaterial();
      //     e.target.removeAllEventListeners();
      //     stage.update();
      //   });
      // });

      // 画布地面
      floor = this.createFloor();
      // 刚体地面
      floorBody = this.createFloorBody();
      // 关联地面
      floorBody.display = floor;

      // 刚体半圆
      semiCircleBody = this.createSemiCircleBody();
      // 画布半圆
      semiCircle = this.createSemiCircle();
      // 关联半圆
      semiCircleBody.display = semiCircle;

      // 材料比较;
      // addContactMaterial();
      createjs.Ticker.framerate = 60;
      //console.log(ballBody.position[1]);
      createjs.Ticker.addEventListener('tick', this.tickHandler);
      new p2.p2DebugDraw(world, container);
    },
    tickHandler() {
      if (!isKeyDown) {
        world.step(1 / 20);
        ball.x = ballBody.position[0] * factor;
        ball.y = stageHeight - ballBody.position[1] * factor;
        stage.update();
      }
      // stage.update();
    },
    calcY(x) {
      let deta = Math.sqrt(
        CIRCLE_RADIUS * CIRCLE_RADIUS -
          (x - circleCenterX) * (x - circleCenterX)
      );
      let y1 = stageHeight - CIRCLE_RADIUS + deta;
      let y2 = stageHeight - CIRCLE_RADIUS - deta;
      return { y1, y2 };
    },
    createSemiCircle() {
      let sprite = container.addChild(new createjs.Shape());
      let graphics = sprite.graphics;
      graphics.beginFill('blue');
      path.forEach((item, index) => {
        if (index === 0) {
          graphics.moveTo(500, 500);
        } else {
          graphics.lineTo(item[0], item[1]);
        }
      });
      sprite.x = circleCenterX;
      sprite.y = circleCenterY;
      return sprite;
    },
    createSemiCircleBody() {
      for (let x = circleCenterX; x <= circleCenterX + CIRCLE_RADIUS; x++) {
        let { y1, y2 } = this.calcY(x);
        pointArr.push([x, y1]);
        pointArr2.push([x, y2]);
      }
      pointArr2.reverse();
      semiCircleBody = new p2.Body({
        mass: 0,
        position: [circleCenterX, stageHeight]
      });
      path = [...pointArr, ...pointArr2, [610, 300], [610, 500], [500, 500]];
      console.log(JSON.stringify(path));
      semiCircleBody.fromPolygon(path, {
        optimalDecomp: false
      });
      world.addBody(semiCircleBody);
      return semiCircleBody;
    },
    createBall(x, y) {
      let sprite = container.addChild(new createjs.Shape());
      sprite.graphics.beginFill('red').drawCircle(0, 0, 50);
      sprite.x = x;
      sprite.y = y;
      return sprite;
    },
    createBallBody(x, y) {
      let circlePosX = x; //把球摆放在距离屏幕左上角为100,100px位置
      let circlePosY = y;
      let circleR = 50;

      let circlePosXInP2 = circlePosX / factor;
      let circlePosYInP2 = (stageHeight - circlePosY) / factor;
      let circleRInP2 = circleR / factor;

      // convert p2.js coordinate to createjs
      // no need to let ballBody in P2.js
      ballBody = new p2.Body({
        mass: 3,
        position: [circlePosXInP2, circlePosYInP2]
      });

      ballBody.damping = 0;
      ballBody.angularDamping = 0;

      //半径也要转换
      ballShape = new p2.Circle({
        radius: circleRInP2
      });
      // material 材质;
      ballShape.material = new p2.Material();

      // 将circle 加入重力世界
      ballBody.addShape(ballShape);
      world.addBody(ballBody);
      return ballBody;
    },
    createFloor() {
      var sprite = container.addChild(new createjs.Shape());
      sprite.graphics
        .beginFill('black')
        .drawRect(0, stageHeight - 10, stageWidth / 2, 10);
      return sprite;
    },
    createFloorBody() {
      floorShape = new p2.Plane();
      // floorShape.material = new p2.Material();
      // floorShape = new p2.Box({ width: 500, height: 10 });
      floorBody = new p2.Body({ mass: 0 });
      floorBody.addShape(floorShape);
      world.addBody(floorBody);
      return floorBody;
    }
  }
};
</script>

<style>
#myCanvas {
  border: 1px solid black;
}
</style>
