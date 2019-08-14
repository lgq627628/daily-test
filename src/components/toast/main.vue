<template>
  <div class="toast" :class="type ? `toast--${type}` : ''">
    <p>{{ content }}</p>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Toast',
  data() {
    return {
      type: '',
      content: '',
      duration: 1000
    };
  },
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.close();
      }, this.duration);
    }
  },
  methods: {
    close() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};
</script>

<style lang="scss" scoped>
.toast {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
  > p {
    padding: 12px 22px;
    font-size: 18px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
  }
  &--error p {
    background: rgba(255, 0, 0, 0.5);
  }
  &--success p {
    background: rgba(0, 255, 0, 0.5);
  }
}
</style>
