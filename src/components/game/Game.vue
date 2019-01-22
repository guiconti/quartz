<template>
  <v-container fluid>
    <v-layout column>
      <v-flex xs12>
        <v-layout row>
          <v-flex
            v-for="player in game.players"
            :key="player._id"
            xs12 
            sm3
          >
            <app-player
              :name="player.user.username" 
              :crystals="player.crystals"
              :money="player.money"
              :cards="player.cards.length"
            />
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-layout row>
          <v-flex
            v-if="game.cave" 
            xs12 
            sm3
          >
            <app-cave 
              :crystals="game.cave.crystals"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Player from '../player/Player';
import Cave from '../cave/Cave';
import Chat from '../chat/Chat';

export default {
  name: 'Game',
  components: {
    appPlayer: Player,
    appCave: Cave,
    appChat: Chat
  },
  computed: {
    ...mapState('game', {
      game: state => state.currentGame
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  sockets: {
  },
  created() {
    this.gameInfo(this.$route.params.id);
    this.$socket.emit('joinGame', this.$route.params.id);
  },
  beforeDestroy() {
    this.sockets.unsubscribe('newUser');
    this.$socket.emit('leaveGame', this.game._id);
  },
  methods: {
    ...mapActions('game', [
      'gameInfo'
    ])
  }
}
</script>

