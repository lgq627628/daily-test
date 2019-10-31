<template>
  <!-- 用来控制最大高度 -->
  <div class="table__wrapper" :style="`maxHeight: ${maxHeight}px`">
    <!-- 固定的头部,header部分-->
    <table class="table">
      <colgroup>
        <col v-for="(col,index) in columns" :key="index" :style="{width:`${col.width}px`}">
      </colgroup>
      <thead>
        <tr v-for="n in headerNum">
          <template v-if="n===1">
            <th
              v-for="(col, index) in columns"
              :key="`${index}-${n}`"
              :rowspan="col.child && col.child.length ? 1 : 2"
              :colspan="col.child && col.child.length || 1"
            >
              <div>{{col.title}}</div>
            </th>
          </template>
          <template v-else-if="n ===2">
            <template v-for="(col, index) in columns">
              <template v-if="col.child">
                <th v-for="(c, i) in col.child" :key="i" :rowspan="1" :colspan="1">
                  <div>{{c.title}}</div>
                </th>
              </template>
            </template>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in dataSource" :key="`row-${i}`">
          <template v-for="(col, j) in columns">
            <template v-if="col.child && col.child.length">
              <td v-for="(c, k) in col.child" :key="`col-${j}-${k}`">
                <!-- <xr-td :row="row" :col="c" :index="i">
                  <slot :row="row" :col="c" :index="i" :name="c.slot"></slot>
                </xr-td>-->
                <template v-if="'slot' in c">
                  <slot :row="row" :col="c" :index="i" :name="c.slot"></slot>
                </template>
                <template v-else>{{ row[c.key] }}</template>
              </td>
            </template>
            <template v-else>
              <td :key="`col-${j}`">
                <!-- <xr-td :row="row" :col="col" :index="i">
                  <slot :row="row" :col="col" :index="i" :name="col.slot"></slot>
                </xr-td>-->
                <template v-if="'slot' in col">
                  <slot :row="row" :col="col" :index="i" :name="col.slot"></slot>
                </template>
                <template v-else>{{ row[col.key] }}</template>
              </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import XrTd from './xr-td';
export default {
  name: 'XrTable',
  components: {
    XrTd
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: Number,
      default: -1
    },
    headerNum: {
      type: Number,
      default: 1
    }
  },
  mounted() {
    console.log(this.dataSource, this.columns, this.$slots);
  }
};
</script>

<style lang="scss">
.table__wrapper {
  overflow: auto;
  table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    empty-cells: show;
    border: 1px solid #e9e9e9;
  }
  table th {
    background: #f7f7f7;
    color: #5c6b77;
    font-weight: 600;
    white-space: nowrap;
  }
  table td,
  table th {
    padding: 8px 16px;
    border: 1px solid #e9e9e9;
    text-align: left;
  }
}
</style>
