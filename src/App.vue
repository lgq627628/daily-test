<template>
  <div id="app">
    <xr-table
      :columns="columns"
      :data="data"
      @on-selection-change="onSelectionChange"
      @on-sort="onSort"
    ></xr-table>
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
          sortable: true
        },
        {
          title: '职位',
          key: 'job'
        }
      ],
      data: [
        {
          id: 1,
          name: 'Jasmine',
          age: 18,
          job: '产品',
          date: '2016-10-03'
        },
        {
          id: 2,
          name: 'Mango',
          age: 18,
          job: '设计',
          date: '2016-10-03'
        },
        {
          id: 3,
          name: 'Aking',
          age: 24,
          job: '前端',
          date: '2016-10-01'
        },
        {
          id: 4,
          name: 'Dick',
          age: 30,
          job: '后端',
          date: '2016-10-02'
        },
        {
          id: 5,
          name: 'Lucy',
          age: 18,
          job: '测试',
          date: '2016-10-04'
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
