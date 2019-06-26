<template>
  <v-container 
    fluid
    class="noTopPadding"
  >
    <v-layout>
      <v-flex xs12>
        <v-card>
          <v-card-title primary-title>
            <v-layout
              row
              wrap
            >
              <v-flex xs10>
                <h3 class="headline mb-0">{{ name }}</h3>
                <h3 
                  v-if="!isRoundActive" 
                  class="headline mb-0 red--text" 
                >
                  Closed
                </h3>
              </v-flex>
              <v-flex xs2 v-if="currentTurn">
                <v-icon color="yellow lighten-1">stars</v-icon>
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-container fluid>
            <v-layout 
              row
              wrap
            >
              <v-flex
                v-for="crystal in crystals"
                :key="crystal.name" 
                xs2
              >
                <app-crystal
                  :name="crystal.name"
                  :amount="crystal.amount"
                />
              </v-flex>
            </v-layout>
          </v-container>

          <v-container 
            :class="{ bottomPadding: _id !== loggedUser._id }"
            fluid
          >
            <v-layout>
              <v-flex xs3>
                <v-icon color="yellow lighten-1">monetization_on</v-icon>{{ money }}
              </v-flex>
              <v-flex xs3>
                <v-icon color="indigo" @click="listCardDialog = true">class</v-icon>{{ cards.length }}
              </v-flex>
              <v-flex
                v-if="keptCrystal !== ''"
                xs3
              >
                <v-layout row>
                  <v-flex xs4>
                    <v-icon color="grey">lock</v-icon>
                  </v-flex>
                  <v-flex xs6>
                    <app-crystal
                      :name="keptCrystal"
                      :size="35"
                      :onlyImage="true"
                    />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex
                v-if="hasAnIdiotBook" 
                xs3
              >
                <v-icon color="red lighten-2">child_care</v-icon>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-actions v-if="_id === loggedUser._id">
            <app-pick-card
              :current-turn="currentTurn"
              :cards="cards"
              :list-card="listCardDialog"
              :waiting-player-for-defensive-response=waitingPlayerForDefensiveResponse
              @come-closer="$emit('come-closer')"
              @crystal-what-crystal="$emit('crystal-what-crystal')"
              @this-isnt-mine="$emit('this-isnt-mine')"
              @these-dont-belong-to-you="$emit('these-dont-belong-to-you')"
              @give-me-a-hand-here="$emit('give-me-a-hand-here')"
              @close="listCardDialog = false"
            />
            <v-spacer/>
            <v-btn 
              :disabled="!currentTurn || waitingPlayerForDefensiveResponse !== ''"
              flat 
              color="orange"
              @click="closeMine($route.params.id)"
            >
              Close mine
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';
import CoinIcon from '../icons/CoinIcon';
import PickCard from '../card/PickCard';

export default {
  name: 'Player',
  components: {
    appCrystal: Crystal,
    appCoinIcon: CoinIcon,
    appPickCard: PickCard
  },
  props: {
    _id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    crystals: {
      type: Array,
      required: false,
      default: () => []
    },
    money: {
      type: Number,
      required: true
    },
    cards: {
      type: Array,
      required: true
    },
    keptCrystal: {
      type: String,
      required: false,
      default: ''
    },
    hasAnIdiotBook: {
      type: Boolean,
      required: false,
      default: false
    },
    currentTurn: {
      type: Boolean,
      required: false,
      default: false
    },
    isRoundActive: {
      type: Boolean,
      required: false,
      default: true
    },
    waitingPlayerForDefensiveResponse: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      player: {},
      listCardDialog: false,
    };
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  created() {
    this.player = this.getCurrentPlayer()(this._id);
    if (this._id === this.loggedUser._id) {
      this.$socket.emit('joinPlayerRoom', this.player._id);
    }
  },
  beforeDestroy() {
    this.$socket.emit('leavePlayerRoom', this.player._id);
  },
  methods: {
    ...mapActions('game', [
      'closeMine'
    ]),
    ...mapGetters('game', [
      'getCurrentPlayer'
    ]),
  }
}
</script>

<style lang="stylus" scoped>
  >>> .container {
    padding-bottom: 0px;
  }
  .noTopPadding {
    padding-top: 0px;
  }
  .bottomPadding {
    padding-bottom: 12px;
  }
  >>> .v-card__title {
    padding-bottom: 0px;
  }
</style>

