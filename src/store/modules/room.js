import API from '../../utils/API';

const state = {
  currentRoom: {},
  rooms: []
};

const getters = {

};

const actions = {
  createRoom({ commit }, roomData) {
    return new Promise((resolve, reject)  => {
      const path = '/rooms';
      API
        .post(
          path,
          roomData
        )
        .then(response => {
          commit('setCurrentRoom', response.data.msg);
          return resolve(response.data.msg);
        })
        .catch(err => {
          if (err.response) {
            return reject(err.response.data.msg);
          }
          return reject(err);
        });
    });
  },
  listRooms({ commit }) {
    return new Promise ((resolve, reject) => {
      const path = '/rooms?active=true&limit=8';
      API
        .get(path)
        .then(response => {
          commit('setRoomsList', response.data.msg);
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
  roomInfo({ commit }, roomId) {
    return new Promise ((resolve, reject) => {
      const path = `/rooms/${roomId}`;
      API
        .get(path)
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
  },
  joinRoom({ commit }, roomId) {
    return new Promise((resolve, reject) => {
      const path = `/rooms/${roomId}`;
      API
        .patch(path)
        .then(response => {
          return resolve(response);
        })
        .catch(err => {
          if (err.response) {
            return reject(err.response.data.msg);
          }
          return reject(err);
        });
    })
  },
  pushUser({ commit }, user) {
    for (let i = 0; i < state.currentRoom.users.length; i++) {
      if (state.currentRoom.users[i]._id === user._id) {
        return;
      }
    }
    return commit('pushUser', user);
  }
};

const mutations = {
  setCurrentRoom(state, currentRoom) {
    state.currentRoom = currentRoom;
  },
  setRoomsList(state, rooms) {
    state.rooms = rooms;
  },
  pushUser(state, user) {
    state.currentRoom.users.push(user);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
