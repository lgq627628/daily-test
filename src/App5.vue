<template>
  <div id="app">
    <div>哈哈呵呵嘻嘻</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      okSound: new Audio('/static/starFalse.mp3')
    };
  },
  mounted() {
    window.vm = this;
    let self = this;
    this.okSound.load();
    setTimeout(() => {
      this.okSound.load();
      this.okSound.play();
    }, 2000);
    // document.documentElement.addEventListener(
    //   'click',
    //   function() {
    //     self.play();
    //     self.pause();
    //   },
    //   false
    // );
  },
  methods: {
    play() {
      this.loseSound.play();
    },
    pause() {
      this.loseSound.pause();
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

