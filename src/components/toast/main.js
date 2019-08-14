/* eslint-disable */
import Vue from 'vue';
import Main from './main.vue';

let ToastConstructor = Vue.extend(Main);

const Toast = function (options = {}) {
  if (typeof options === 'string') {
    options = {
      content: options
    };
  }
  // 创建message实例,此时数据还没有挂载呢，$el 属性目前不可见，无法访问到数据和真实的dom
  let instance = new ToastConstructor({
    data: options
  });
  // 将instance挂载在instance.vm上，在实例挂载之后，元素可以用instance.vm.$el 访问
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
};

['success', 'error'].forEach(type => {
  Toast[type] = options => {
    if (typeof options === 'string') {
      options = {
        content: options
      };
    }
    options.type = type;
    return Toast(options);
  };
});

export default Toast;
