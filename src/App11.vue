<template>
  <div id="app">
    <xr-table></xr-table>
    <!-- <xr-table :columns="columns" :dataSource="dataSource" :headerNum="2">
      <template v-slot:op="{row, col, index}">
        <button>编辑{{row.age}}</button>
        <button>删除{{index}}</button>
      </template>
    </xr-table>-->
  </div>
</template>

<script>
/* eslint-disable */
// import XrTable from './components/table/xr-table';
import XrTable from './components/xr-table';

export default {
  components: {
    XrTable
    // XrEle
  },
  data() {
    return {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌',
          first: '胡',
          last: '彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦',
          first: '胡',
          last: '彦',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '3',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '4',
          name: '胡彦祖',
          age: 42,
          first: '胡',
          last: '彦祖4',
          address: '西湖区湖底公园1号'
        },
        {
          key: '5',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖5',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '6',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖6',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '7',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖7',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '8',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖8',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '9',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖9',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '10',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖10',
          age: 42,
          address: '西湖区湖底公园1号'
        },
        {
          key: '11',
          name: '胡彦祖',
          first: '胡',
          last: '彦祖11',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ],
      columns: [
        {
          title: '姓名',
          key: 'name',
          width: 200,
          child: [
            {
              title: '姓',
              key: 'first'
            },
            {
              title: '名',
              key: 'last'
            }
          ]
        },
        {
          title: '年龄',
          key: 'age',
          width: 200
        },
        {
          title: '住址',
          key: 'address',
          width: 200
        },
        {
          title: '操作',
          key: 'op',
          slot: 'op',
          width: 200
        }
      ]
      // columns: [
      //   {
      //     title: '姓名',
      //     dataIndex: 'name',
      //     key: 'name',
      //     width: 200
      //   },
      //   {
      //     title: '年龄',
      //     dataIndex: 'age',
      //     key: 'age',
      //     width: 200
      //   },
      //   {
      //     title: '住址',
      //     dataIndex: 'address',
      //     key: 'address',
      //     width: 200
      //   },
      //   {
      //     title: '操作',
      //     dataIndex: 'op',
      //     key: 'op',
      //     width: 200,
      //     slot: 'op'
      //   }
      // ]
      // columns: [
      //   {
      //     title: '姓名',
      //     dataIndex: 'name',
      //     key: 'name',
      //     width: 200
      //   },
      //   {
      //     title: '年龄',
      //     dataIndex: 'age',
      //     key: 'age',
      //     width: 200,
      //     render: (h, { row, col, index }) => {
      //       return h('div', `${row.age}-${index}`);
      //     }
      //   },
      //   {
      //     title: '住址',
      //     dataIndex: 'address',
      //     key: 'address',
      //     width: 200
      //   }
      // ]
    };
  }
};
</script>

<style lang="scss">
#app {
  margin: 20px;
}
</style>
