<template>
  <div>
    <app-rooms-list
      :rooms="rooms"
      title="Join a room to play a game"
      no-rooms="There is no rooms created at the moment"
    />
    <app-games-list
      :games="games"
      title="Join one of your on going games"
      no-games="You are not participating on any games at the moment"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import RoomsList from './room/RoomsList';
import GamesList from './game/GamesList';

export default {
  name: 'Home',
  components: {
    appRoomsList: RoomsList,
    appGamesList: GamesList
  },
  computed: {
    ...mapState('room', {
      rooms: state => state.rooms
    }),
    ...mapState('game', {
      games: state => state.games
    })
  },
  created() {
    this.listRooms();
    this.listGames();
    this.$socket.emit('joinLobby', null);
  },
  sockets: {
    newRoom: function(data) {
      this.pushRoom(data);
    },
    newGame: function(data) {
      this.pushGame(data);
    }
  },
  beforeDestroy() {
    this.$socket.emit('leaveLobby', null);
  },
  methods: {
    ...mapActions('room', [
      'listRooms',
      'pushRoom',
    ]),
    ...mapActions('game', [
      'listGames',
      'pushGame',
    ])
  }
}
</script>
