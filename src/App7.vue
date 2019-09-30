<template>
  <div id="app">
    <!-- <canvas id="canvas" width="700" height="500"></canvas> -->
  </div>
</template>

<script>
/* eslint-disable */
import { fabric } from 'fabric';
import { Engine, World, Render, Bodies } from 'matter-js';
export default {
  mounted() {
    this.init();
    this.createWorld();
  },
  methods: {
    init() {
      let canvas = new fabric.Canvas('canvas');

      let rect = new fabric.Rect({
        top: 100,
        left: 100,
        width: 60,
        height: 70,
        fill: 'red'
      });

      canvas.add(rect);
    },
    createWorld() {
      let engine = Engine.create();
      let world = engine.world;

      let render = Render.create({
        engine: engine,
        element: document.body
      });

      Engine.run(engine);
      Render.run(render);

      let boxA = Bodies.rectangle(500, 170, 40, 260);

      let ground = Bodies.rectangle(400, 600, 600, 100, { isStatic: true });
      World.add(world, [boxA, ground]);
    }
  }
};
</script>

<style lang="scss">
#canvas {
  border: 1px solid #000;
}
</style>
