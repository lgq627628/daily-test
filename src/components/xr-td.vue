<template>
  <div>
    <template v-if="'slot' in col">
      <slot></slot>
    </template>
    <template v-else>{{ row[col.key] }}</template>
  </div>
</template>

<script>
export default {
  name: 'XrTd',
  props: {
    row: {
      type: Object,
      default: () => {}
    },
    col: {
      type: Object,
      default: () => {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    console.log(this.row, this.col, this.index, this.$slots);
  }
};
</script>
