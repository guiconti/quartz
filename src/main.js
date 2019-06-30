import Vue from 'vue';
import VueResource from 'vue-resource';
import 'vuetify/dist/vuetify.min.css';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import AsyncComputed from 'vue-async-computed';
import VueSocketIO from 'vue-socket.io'
import Vuetify from 'vuetify';
import App from './App';
import routes from './routes';
import store from './store';

Vue.use(Vuetify, {
  theme: {
    primary: "#E5B045",
    secondary: "#6D58B1",
    accent: "#E8DCB9"
  }
});
Vue.use(new VueSocketIO({
  debug: true,
  connection: process.env.BACKEND_HOST
}));
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(AsyncComputed);

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