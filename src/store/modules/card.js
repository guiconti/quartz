import API from '../../utils/API';

const state = {};

const getters = {};

const actions = {
  answerEureka({ commit }, data) {
    return new Promise((resolve, reject) => {
      const path = `/games/${data.param}/cards/eureka_answer`;
      API
        .patch(
          path,
          data.body
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
};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
