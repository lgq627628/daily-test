export default {
  functional: true,
  props: {
    row: Object,
    col: Object,
    index: Number,
    render: Function
  },
  render: (h, ctx) => {
    // 如果你真正理解了， 应该知道 columns 里定义的 render 字段， 它仅仅是名字叫 render 的一个普通函数， 并非 Vue.js 实例的 render 选项， 只是我们恰巧把它叫做 render 而已， 如果愿意， 也可以改为其它名字， 比如 renderRow。 真正的 Render 函数只有一个地方， 那就是 render.js 中的 render 选项， 只是它代理了 column 中的 render。
    const params = {
      row: ctx.props.row,
      col: ctx.props.col,
      index: ctx.props.index
    };

    return ctx.props.render(h, params);
  }
};
