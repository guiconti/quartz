<template>
  <v-container fluid>
    <v-layout 
      row
      wrap
    >
      <v-flex
        sm12
        md10
        lg10
      >
        <v-layout column>
          <v-flex xs12>
            <v-layout 
              row
              wrap
            >
              <v-flex
                v-for="player in game.players"
                :key="player._id"
                xs12
                sm12
                md3 
                lg3
              >
                <app-player
                  :_id="player.user._id"
                  :name="player.user.username" 
                  :crystals="player.crystals"
                  :money="player.money"
                  :cards="player.cards.length"
                  :current-turn="player.currentTurn"
                  :is-round-active="player.isRoundActive"
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
      </v-flex>
      <v-flex
        sm12
        md2
        lg2
      >
        <app-chat 
          :users="game.players"
          :messages="messages"
          :show-users="false"
        />
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
    ...mapState('message', {
      messages: state => state.messages
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
    this.retrieveMessages(this.$route.params.id);
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
    ]),
    ...mapActions('message', [
      'retrieveMessages'
    ]),
  }
}
</script>

<style lang="stylus" scoped>
  >>> .container {
    padding-bottom: 0px;
  }
</style>