import API from '../../utils/API';

const state = {
  currentGame: {},
};

const getters = {
  getCurrentPlayer: state => userId => {
    return state.currentGame.players.find(player => player.user._id === userId);
  }
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
  },
  pickCrystal({ commit }, gameId) {
    return new Promise((resolve, reject) => {
      const path = `/games/${gameId}/crystal`;
      API
        .get(path)
        .then(response => {
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
  updateGame({ commit }, game) {
    commit('setCurrentGame', game);
  },
  updatePlayer({ commit }, player) {
    commit('setCurrentPlayer', player);
  }
};

const mutations = {
  setCurrentGame(state, currentGame) {
    state.currentGame = currentGame;
  },
  setCurrentPlayer(state, currentPlayer) {
    state.currentPlayer = currentPlay;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
