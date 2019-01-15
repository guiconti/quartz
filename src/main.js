import Vue from 'vue';
import VueResource from 'vue-resource';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import AsyncComputed from 'vue-async-computed';
import Vuetify from 'vuetify';
import VueSocketIO from 'vue-socket.io'
import App from './App.vue';
import routes from './routes';
import store from './store';

Vue.use(Vuetify, {
  theme: {
    primary: "#1E152A",
    secondary: "#5C6784",
    accent: "#E8DCB9"
  }
});
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(AsyncComputed);
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.BACKEND_HOST,
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}));

const router = new VueRouter({
  routes,
  mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});