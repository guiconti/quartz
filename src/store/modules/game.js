import API from '../../utils/API';

const state = {
  currentGame: {}
};

const getters = {

};

const actions = {
  createGame({ commit }, gameData) {
    return new Promise((resolve, reject)  => {
      const path = '/games';
      API
        .post(
          path,
          gameData
        )
        .then(response => {
          commit('setCurrentGame', response.data.msg);
          return resolve(response);
        })
        .catch(err => {
          if (err.response) {
            return reject(err.response.data.msg);
          }
          return reject(err);
        });
    });
  },
  gameInfo({ commit }, gameId) {
    return new Promise ((resolve, reject) => {
      const path = `/games/${gameId}`;
      API
        .get(path)
        .then(response => {
          commit('setCurrentGame', response.data.msg);
          return resolve(response);
        })
        .catch(err => {
          if (err.response) {
            return reject(err.response.data.msg);
          }
          return reject(err);
        });
    });
  }
};

const mutations = {
  setCurrentGame(state, currentGame) {
    state.currentGame = currentGame;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
