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
              :_id="player.user._id"
              :name="player.user.username" 
              :crystals="player.crystals"
              :money="player.money"
              :cards="player.cards.length"
              :current-turn="player.currentTurn"
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
              :player="getCurrentPlayer(loggedUser._id)"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <app-crystal-picked/>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Player from '../player/Player';
import Cave from '../cave/Cave';
import Chat from '../chat/Chat';
import CrystalPicked from '../crystal/CrystalPicked';

export default {
  name: 'Game',
  components: {
    appPlayer: Player,
    appCave: Cave,
    appChat: Chat,
    appCrystalPicked: CrystalPicked
  },
  computed: {
    ...mapState('game', {
      game: state => state.currentGame
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    }),
    ...mapGetters('game', [
      'getCurrentPlayer'
    ])
  },
  sockets: {
    updateGame: function(updatedGame) {
      this.updateGame(updatedGame);
    }
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
      'gameInfo',
      'updateGame',
      'updatePlayer'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  >>> .container {
    padding-bottom: 0px;
  }
</style>