<template>
  <div>
    <app-chat 
      :users="room.users"
      :messages="messages"
    />
    <v-btn 
      v-if="room.owner && room.owner._id === loggedUser._id && room.users.length >= 2"
      large
      color="secondary"
      block
      @click="startGame()"
    >
      Start
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Chat from '../chat/Chat';

export default {
  name: 'Room',
  components: {
    appChat: Chat
  },
  computed: {
    ...mapState('room', {
      room: state => state.currentRoom
    }),
    ...mapState('message', {
      messages: state => state.messages
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  sockets: {
    newUser: function(user) {
      this.pushUser(user);
    },
    startGame: function(game) {
      this.$router.push({ path: `/games/${game._id}` });
    }
  },
  created() {
    this.roomInfo(this.$route.params.id);
    this.retrieveMessages(this.$route.params.id);
    this.$socket.emit('joinRoom', this.$route.params.id);
  },
  beforeDestroy() {
    this.sockets.unsubscribe('newUser');
    this.$socket.emit('leaveRoom', this.room._id);
  },
  methods: {
    ...mapActions('room', [
      'roomInfo',
      'pushUser'
    ]),
    ...mapActions('message', [
      'retrieveMessages'
    ]),
    ...mapActions('game', [
      'createGame'
    ]),
    startGame() {
      const gameData = {
        roomId: this.room._id
      };
      this.createGame(gameData)
        .then(game => {
        })
        .catch(err => {
        });
    }
  }
}
</script>

