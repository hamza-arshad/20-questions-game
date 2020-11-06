import Vue from 'vue';
import VueRouter from 'vue-router';
import VueSocketIO from 'vue-socket.io'

import CONSTANTS from './constants';
import App from './App.vue';
import Router from './router';
import store from './store';
import './interceptor';
import './filters';

Vue.config.productionTip = false;
Vue.use(VueRouter);

Vue.use(new VueSocketIO({
  debug: true,
  connection: CONSTANTS.SOCKET_URL,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: '', autoConnect: false }
}));

new Vue({
  router: Router,
  store: store,
  render: h => h(App),
  el: '#app'
});