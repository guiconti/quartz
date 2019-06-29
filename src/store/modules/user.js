import API from '../../utils/API';

const state = {
  loggedUser: {},
  currentUser: {},
  notificationSettings: {},
  navmenu: true
};

const getters = {
  loggedUserContainsSubscription: state => subscription => {
    if (!this.loggedUser || !this.loggedUser.notificationSettings || !this.loggedUser.notificationSettings[0]) {
      return false;
    }
    for (let i = 0; i < this.loggedUser.notificationSettings.length; i++) {
      if (this.loggedUser.notificationSettings[i].keys.auth === subscription.keys.auth) {
        return true;
      }
    }
    return false;
  },
};

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
  },
  registerNotification({ commit }, notificationSettings) {
    return new Promise((resolve, reject) => {
      API.post(
        `/user/notification`,
        notificationSettings
      )
      .then(response => {
        commit('setNotificationSettings', notificationSettings);
        return resolve(response);
      })
      .catch(err => {
        return reject(err)
      });
    })
  },
  setNotificationSettings({ commit }, notificationSettings) {
    commit('setCurrentNotificationSettings', notificationSettings);
  }
};

const mutations = {
  setNavmenu(state, navmenu) {
    state.navmenu = navmenu;
  },
  setLoggedUser(state, user) {
    state.loggedUser = user;
  },
  setNotificationSettings(state, notificationSettings) {
    if (!state.loggedUser.notificationSettings) {
      state.loggedUser.notificationSettings = [];
    }
    state.loggedUser.notificationSettings.push(notificationSettings);
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  setCurrentNotificationSettings(state, notificationSettings) {
    state.notificationSettings = notificationSettings;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
