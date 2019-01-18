import API from '../../utils/API';

const state = {
  colors: {
    'Quartzo': {
      primary: '#729293',
      adjacent: '#addbd8'
    },
    'Rubelita': {
      primary:  '#d12f8b',
      adjacent:  '#f47acc'
    },
    'Esmeralda': {
      primary: '#006837',
      adjacent: '#00cc61'
    },
    'Safira': {
      primary: '#0071af',
      adjacent: '#00adea'
    },
    'Rubi': {
      primary: '#bc1d29',
      adjacent: '#ea545f'
    },
    'Âmbar': {
      primary: '#c6461e',
      adjacent: '#ef6a50'
    },
    'Autunita': {
      primary: '#5b873d',
      adjacent: '#8c9f4d',
    }
  }
}

const getters = {
  getCrystalColor: state => crystal => state.colors[crystal]
}

const actions = {
}

const mutations = {
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}