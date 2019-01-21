<template>
  <div>
    <app-chat 
      :users="room.users"
      :messages="messages"
    />
    <v-btn 
      v-if="room.owner && room.owner._id === loggedUser._id"
      large
      color="info"
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
  created() {
    this.roomInfo(this.$route.params.id);
    this.retrieveMessages(this.$route.params.id);
    this.$socket.emit('joinRoom', this.$route.params.id);
  },
  methods: {
    ...mapActions('room', [
      'roomInfo'
    ]),
    ...mapActions('message', [
      'retrieveMessages'
    ]),
    ...mapActions('game', [
      'startGame'
    ])
  }
}
</script>

