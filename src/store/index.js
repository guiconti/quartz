import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import crystal from './modules/crystal';
import room from './modules/room';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    crystal,
    room,
    user
  }
});