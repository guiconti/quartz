import API from '../../utils/API';

const state = {
  messages: []
};

const getters = {

};

const actions = {
  retrieveMessages({ commit }, parentId) {
    return new Promise((resolve, reject)  => {
      const path = `/messages/${parentId}`;
      API
        .get(
          path
        )
        .then(response => {
          commit('setMessages', response.data.msg);
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
  setMessages(state, messages) {
    state.messages = messages;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
