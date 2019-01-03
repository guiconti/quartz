import API from '../../utils/API';

const state = {
  colors: {
    'Quartzo': '#5b8b97',
    'Rubelita': '#b2517c',
    'Esmeralda': '#386c45',
    'Safira': '#1b7bb5',
    'Rubi': '#b65041',
    'Âmbar': '#bf7f42',
    'Autunita': '#8c9f50'
  }
}

const getters = {
  getCrystalColor: state => crystal => state.colors[crystal]
}

const actions = {
  example({ commit }, payload) {
    return commit('setExample', payload + 'example');
  }
}

const mutations = {
  setExample (state, example) {
    state.example = example;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}