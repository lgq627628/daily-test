<template>
  <!-- 用来控制最大高度 -->
  <div class="table__wrapper" :style="`maxHeight: ${maxHeight}px`">
    <!-- 固定的头部,header部分-->
    <table class="table">
      <colgroup>
        <col v-for="(column,index) in columns" :key="index" :style="{width:`${column.width}px`}">
      </colgroup>
      <thead>
        <tr>
          <th v-for="(column,index) in columns" :key="index">
            <div>{{column.title}}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in dataSource" :key="i">
          <td v-for="(col, k) in columns" :key="k">
            <template v-if="'render' in col">
              <table-render :row="row" :col="col" :index="i" :render="col.render"></table-render>
            </template>
            <template v-else>{{ row[col.dataIndex] }}</template>
            <!-- <div>{{data[column.dataIndex]}}</div> -->
          </td>
        </tr>
      </tbody>
    </table>
    <!-- body部分-->
    <!-- <table>
      <tbody></tbody>
    </table>-->
  </div>
</template>

<script>
import TableRender from './table-render.js';
export default {
  name: 'XrTable',
  components: {
    TableRender
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
    }
  },
  mounted() {
    console.log(this.dataSource, this.columns);
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
