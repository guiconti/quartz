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
  },
  sendMessage({ commit }, messageData) {
    return new Promise((resolve, reject)  => {
      const path = '/messages';
      API
        .post(
          path,
          messageData
        )
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
  pushMessage({ commit }, message) {
    return commit('pushMessage', message);
  }
};

const mutations = {
  setMessages(state, messages) {
    state.messages = messages;
  },
  pushMessage(state, message) {
    state.messages.push(message);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
