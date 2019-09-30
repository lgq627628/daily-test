/* eslint-disable */
import Vue from 'vue';
import Router from 'vue-router';
import App from './App.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'App',
    component: App
  }]
});
