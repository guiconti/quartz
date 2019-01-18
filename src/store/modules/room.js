import API from '../../utils/API';

const state = {
  currentRoom: {}
};

const getters = {

};

const actions = {
  createRoom({ commit }, roomData) {
    return new Promise((resolve, reject)  => {
      const path = '/room';
      API
        .post(
          path,
          roomData
        )
        .then(response => {
          commit('setCurrentRoom', response.data.msg);
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
  setCurrentRoom(state, currentRoom) {
    state.currentRoom = currentRoom;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
