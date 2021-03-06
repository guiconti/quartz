<template>
  <v-dialog
    v-model="dialog"
    :persistent="isCurrentPlayerOnCardAnswer(loggedUser._id)"
    full-width
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        {{ username }} used Eureka, received 7 crystals and can pick one
      </v-card-title>
      <v-card-text>
        <v-container 
          fluid
          class="pt-0"
        >
          <div v-if="isCurrentPlayerOnCardAnswer(loggedUser._id)">
            <v-layout
              row
              wrap
            >
              <v-flex xs12>
                <h3 class="title">
                  Take
                </h3>
              </v-flex>
              <v-radio-group v-model="pickedCrystalIndex" row>
                <div 
                  v-for="(crystal, index) in crystals"
                  :key="index"
                >
                  <v-radio
                    color="orange" 
                    :value="index"
                  />
                  <app-crystal
                    :name="crystal"
                    :only-image="true"
                  />
                </div>
              </v-radio-group>
              <v-flex xs12>
                <h3 class="title">
                  Give
                </h3>
              </v-flex>
              <v-radio-group v-model="givenCrystalIndex" row>
                <div 
                  v-for="(crystal, index) in player.crystals"
                  :key="index"
                >
                  <div v-if="crystal.amount > 0 && crystal.name !== 'Autunita'">
                    <v-radio
                      color="orange" 
                      :value="index"
                    />
                    <app-crystal
                      :name="crystal.name"
                      :only-image="true"
                    />
                  </div>
                </div>
              </v-radio-group>
            </v-layout>
          </div>
          <div v-else>
            <v-layout
              row
              wrap
            >
              <v-flex
                v-for="(crystal, index) in crystals"
                :key="index"
                xs2
                md1
              >
                <app-crystal
                  :name="crystal"
                  :only-image="true"
                />
              </v-flex>
            </v-layout>
          </div>
          <div v-if="!finished">
            <div v-if="isCurrentPlayerOnCardAnswer(loggedUser._id)">
              <v-btn
                v-if="pickedCrystalIndex !== -1 && givenCrystalIndex !== -1"
                :loading="loading" 
                color="secondary"
                @click="trade()"
              >
                Trade
              </v-btn>
            </div>
            <div v-else>
              <h3> Waiting for {{ username }} to pick his/her crystal </h3>
            </div>
          </div>
          <div v-else>
            <h3> {{ username }} gave {{ givenCrystal }} and took {{ pickedCrystal }} </h3>
            <v-btn
              @click="dialog = false"
            >
              Close
            </v-btn>
          </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'Eureka',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      loading: false,
      username: '',
      player: {},
      crystals: ['', '', '', '', '', '', ''],
      realCrystals: ['', '', '', '', '', '', ''],
      givenCrystal: '',
      givenCrystalIndex: -1,
      pickedCrystal: '',
      pickedCrystalIndex: -1,
      animationFinished: false,
      finished: false
    }
  },
  sockets: {
    eureka: function(data) {
      this.dialog = true;
      this.player = this.getCurrentPlayer()(this.loggedUser._id);
      this.username = data.player.username;
      this.realCrystals = data.crystals;
      this.crystals = this.realCrystals;
    },
    eurekaAnswer: function(data) {
      this.dialog = true;
      this.player = this.getCurrentPlayer()(this.loggedUser._id);
      this.username = data.player.username;
      this.givenCrystal = data.given;
      this.pickedCrystal = data.taken;
      this.finished = true;
    }
  },
  computed: {
    ...mapState('crystal', {
      colors: state => state.colors
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    }),
    ...mapGetters('game', [
      'isCurrentPlayerOnCardAnswer'
    ])
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.player = {};
        this.username = '';
        this.crystals = ['', '', '', '', '', '', ''];
        this.realCrystals = ['', '', '', '', '', '', ''];
        this.givenCrystal = '';
        this.givenCrystalIndex = -1;
        this.pickedCrystal = '';
        this.pickedCrystalIndex = -1;
        this.animationFinished = true;
        this.finished = false;
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getCurrentPlayer'
    ]),
    ...mapActions('card', [
      'answerEureka'
    ]),
    trade() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          given: this.player.crystals[this.givenCrystalIndex].name,
          taken: this.crystals[this.pickedCrystalIndex]
        }
      };
      this.answerEureka(data);
    }   
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>