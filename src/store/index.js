import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import card from './modules/card';
import crystal from './modules/crystal';
import game from './modules/game';
import message from './modules/message';
import room from './modules/room';
import user from './modules/user';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    card,
    crystal,
    game,
    message,
    room,
    user
  }
});