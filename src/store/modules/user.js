import API from '../../utils/API';

const state = {
  loggedUser: {},
  currentUser: {}
};

const getters = {};

const actions = {
  listUsers({ commit }) {
    API.get('/users')
      .then(response => {
        commit('setUsers', response.data.msg);
      })
      .catch(err => {
        //  TODO: Handle the error
      });
  },
  loggedInfo({ commit }) {
    API.get('/user')
      .then(response => {
        let userInfo = response.data.msg;
        if (userInfo && userInfo.projects) {
          const ownedProjects = [];
          userInfo.projects.forEach(project => {
            if (project.projects_users.role === 'owner') {
              ownedProjects.push(project);
            }
          });
          userInfo = { ...userInfo, ownedProjects };
        }
        commit('setLoggedUser', userInfo);
      })
      .catch(err => {
        //  TODO: Handle the error
      });
  },
  userInfo({ commit }, userId) {
    API.get(`/users/${userId}`)
      .then(response => {
        commit('setCurrentUser', response.data.msg);
      })
      .catch(error => {
        //  TODO: Handle the error
      });
  }
};

const mutations = {
  setLoggedUser(state, user) {
    user.avatar = process.env.BACKEND_HOST + user.avatar;
    state.loggedUser = user;
  },
  setCurrentUser(state, user) {
    user.avatar = process.env.BACKEND_HOST + user.avatar;
    state.currentUser = user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
