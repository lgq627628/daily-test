/* eslint-disable */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import fabric from 'fabric';
import katex from 'katex';
import Toast from './components/toast/main.js';
// import Phy from './components/phy';
import Clickoutside from './components/clickoutside.js';
// var p2 = require('p2');
import 'katex/dist/katex.min.css';

window.katex = katex;
Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.prototype.$toast = Toast;
// Vue.component('phy', Phy);
Vue.directive('clickoutside', Clickoutside);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
