import Vue from 'vue'
import Vuex from 'vuex'
import crystal from './modules/crystal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    crystal
  }
});