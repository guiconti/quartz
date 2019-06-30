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
                  :cards="player.cards"
                  :kept-crystal="player.keptCrystal"
                  :has-an-idiot-book="player.hasAnIdiotBook"
                  :current-turn="player.currentTurn"
                  :is-round-active="player.isRoundActive"
                  :waiting-player-for-defensive-response="game.waitingPlayerForDefensiveResponse"
                  @come-closer="comeCloserDialog = true"
                  @crystal-what-crystal="crystalWhatCrystalDialog = true"
                  @this-isnt-mine="thisIsntMineDialog = true"
                  @these-dont-belong-to-you="theseDontBelongToYouDialog = true"
                  @give-me-a-hand-here="giveMeAHandHereDialog = true"
                />
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex
                v-if="game.cave" 
                xs12
                sm12
                md3 
                lg3
              >
                <app-cave 
                  :crystals="game.cave.crystals"
                  :player="getCurrentPlayer(loggedUser._id)"
                  :cards="game.cardsBoard"
                  :waiting-player-for-defensive-response="game.waitingPlayerForDefensiveResponse"
                />
              </v-flex>
              <v-flex
                sm12
                md9
                lg9
              >
                <app-chat 
                  :users="game.players"
                  :messages="messages"
                  :show-users="false"
                  :size="57"
                />
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <app-crystal-picked />
    <app-here-we-go />
    <app-eureka />
    <app-come-closer-choose
      :dialog="comeCloserDialog"
      @close="comeCloserDialog = false"
    />
    <app-come-closer />
    <app-out-of-my-way />
    <app-crystal-what-crystal-choose
      :dialog="crystalWhatCrystalDialog"
      @close="crystalWhatCrystalDialog = false"
    />
    <app-crystal-what-crystal />
    <app-this-isnt-mine-choose 
      :dialog="thisIsntMineDialog"
      @close="thisIsntMineDialog = false" 
    />
    <app-this-isnt-mine />
    <app-this-isnt-mine-either />
    <app-these-dont-belong-to-you-choose 
      :dialog="theseDontBelongToYouDialog" 
      @close="theseDontBelongToYouDialog = false"
    />
    <app-these-dont-belong-to-you />
    <app-thievery-unacceptable />
    <app-give-me-a-hand-here-choose 
      :dialog="giveMeAHandHereDialog" 
      @close="giveMeAHandHereDialog = false"
    />
    <app-give-me-a-hand-here-answer />
    <app-give-me-a-hand-here />
    <app-nope-i-am-on-a-break />
    <app-sell-crystals
      v-if="game.isSelling && game.players"
      :player="getCurrentPlayer(loggedUser._id)"
      :is-selling="game.isSelling"
    />
    <app-game-over
      v-if="game.players"
      :players="game.players"
      :is-game-over="!game.active"
    />
    <app-informative />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Player from '../player/Player';
import Cave from '../cave/Cave';
import Chat from '../chat/Chat';
import CrystalPicked from '../crystal/CrystalPicked';
import HereWeGo from '../card/HereWeGo';
import Eureka from '../card/Eureka';
import ComeCloserChoose from '../card/ComeCloserChoose';
import ComeCloser from '../card/ComeCloser';
import OutOfMyWay from '../card/OutOfMyWay';
import CrystalWhatCrystalChoose from '../card/CrystalWhatCrystalChoose';
import CrystalWhatCrystal from '../card/CrystalWhatCrystal';
import ThisIsntMineChoose from '../card/ThisIsntMineChoose';
import ThisIsntMine from '../card/ThisIsntMine';
import ThisIsntMineEither from '../card/ThisIsntMineEither';
import TheseDontBelongToYouChoose from '../card/TheseDontBelongToYouChoose';
import TheseDontBelongToYou from '../card/TheseDontBelongToYou';
import ThieveryUnacceptable from '../card/ThieveryUnacceptable';
import GiveMeAHandHereChoose from '../card/GiveMeAHandHereChoose';
import GiveMeAHandHereAnswer from '../card/GiveMeAHandHereAnswer';
import GiveMeAHandHere from '../card/GiveMeAHandHere';
import NopeIAmOnABreak from '../card/NopeIAmOnABreak';
import SellCrystals from '../crystal/SellCrystals';
import GameOver from './GameOver';
import Informative from './Informative'

export default {
  name: 'Game',
  components: {
    appPlayer: Player,
    appCave: Cave,
    appChat: Chat,
    appCrystalPicked: CrystalPicked,
    appHereWeGo: HereWeGo,
    appEureka: Eureka,
    appComeCloserChoose: ComeCloserChoose,
    appComeCloser: ComeCloser,
    appOutOfMyWay: OutOfMyWay,
    appCrystalWhatCrystalChoose: CrystalWhatCrystalChoose,
    appCrystalWhatCrystal: CrystalWhatCrystal,
    appThisIsntMineChoose: ThisIsntMineChoose,
    appThisIsntMine: ThisIsntMine,
    appThisIsntMineEither: ThisIsntMineEither,
    appTheseDontBelongToYouChoose: TheseDontBelongToYouChoose,
    appTheseDontBelongToYou: TheseDontBelongToYou,
    appThieveryUnacceptable: ThieveryUnacceptable,
    appGiveMeAHandHereChoose: GiveMeAHandHereChoose,
    appGiveMeAHandHereAnswer: GiveMeAHandHereAnswer,
    appGiveMeAHandHere: GiveMeAHandHere,
    appNopeIAmOnABreak: NopeIAmOnABreak,
    appSellCrystals: SellCrystals,
    appGameOver: GameOver,
    appInformative: Informative,
  },
  data() {
    return {
      comeCloserDialog: false,
      crystalWhatCrystalDialog: false,
      thisIsntMineDialog: false,
      theseDontBelongToYouDialog: false,
      giveMeAHandHereDialog: false,
    };
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
    const vue = this;
    this.gameInfo(this.$route.params.id)
      .then(response => {
        vue.getSockets(vue.$route.params.id)
      });
    this.retrieveMessages(this.$route.params.id);
    this.$socket.emit('joinGame', this.$route.params.id);
    window.onfocus = () => {
      vue.gameInfo(vue.$route.params.id)
        .then(response => {
          vue.getSockets(vue.$route.params.id)
        });
    }
  },
  beforeDestroy() {
    this.sockets.unsubscribe('newUser');
    this.$socket.emit('leaveGame', this.game._id);
  },
  methods: {
    ...mapActions('game', [
      'gameInfo',
      'getSockets',
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