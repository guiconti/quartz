import API from '../../utils/API';

const state = {
  loggedUser: {},
  currentUser: {},
  navmenu: true
};

const getters = {};

const actions = {
  toggleNavmenu({ commit }, payload) {
    commit('changeNavmenu', payload);
  },
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
  setNavmenu(state, navmenu) {
    state.navmenu = navmenu;
  },
  setLoggedUser(state, user) {
    state.loggedUser = user;
  },
  setCurrentUser(state, user) {
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
