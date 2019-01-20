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
  listRooms({ commit }) {
    return new Promise ((resolve, reject) => {
      const path = '/rooms?active=true';
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
  }
};

const mutations = {
  setCurrentRoom(state, currentRoom) {
    state.currentRoom = currentRoom;
  },
  setRoomsList(state, rooms) {
    state.rooms = rooms;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
