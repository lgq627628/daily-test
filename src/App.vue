<template>
  <div id="app">
    <xr-table
      :columns="columns"
      :data="data"
      @on-selection-change="onSelectionChange"
      @on-sort="onSort"
    >
      <template #age="{row, col, index}">{{ row.age + '岁'}}</template>
      <template #action="{row, col, index}">
        <button>编辑{{index}}</button>
        <button>删除</button>
      </template>
    </xr-table>
  </div>
</template>

<script>
/* eslint-disable */
import XrTable from './components/xr-table';

export default {
  components: {
    XrTable
  },
  data() {
    return {
      columns: [
        {
          type: 'expand',
          width: 60
        },
        {
          type: 'selection',
          width: 60
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '年龄',
          key: 'age',
          slot: 'age',
          sortable: true
        },
        {
          title: '职位',
          key: 'job'
        },
        {
          title: '操作',
          key: 'action',
          slot: 'action'
        }
      ],
      data: [
        {
          id: 1,
          name: 'Jasmine',
          age: 18,
          job: '产品',
          desc: '这是展开的描述啊1'
        },
        {
          id: 2,
          name: 'Mango',
          age: 18,
          job: '设计',
          desc: '这是展开的描述啊2'
        },
        {
          id: 3,
          name: 'Aking',
          age: 24,
          job: '前端',
          desc: '这是展开的描述啊3'
        },
        {
          id: 4,
          name: 'Dick',
          age: 30,
          job: '后端',
          desc: '这是展开的描述啊4'
        },
        {
          id: 5,
          name: 'Lucy',
          age: 18,
          job: '测试',
          desc: '这是展开的描述啊5'
        }
      ]
    };
  },
  methods: {
    onSelectionChange(val) {
      console.log(val);
    },
    onSort(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss">
#app {
  margin: 20px;
}
</style>
