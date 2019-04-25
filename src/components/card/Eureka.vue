<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title>
        <span class="headline">{{ username }} used Eureka, received 7 crystals and can pick one</span>
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
              <v-btn @click="dialog = false">
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
import { mapState, mapGetters } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'Eureka',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      username: '',
      player: {},
      crystals: ['', '', '', '', '', '', ''],
      realCrystals: ['', '', '', '', '', '', ''],
      givenCrystal: '',
      givenCrystalIndex: 0,
      pickedCrystal: '',
      pickedCrystalIndex: 0,
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
    eureka_answer: function(data) {
      this.dialog = true;
      this.username = data.player.username;
      this.givenCrystal = data.given;
      this.pickedCrystal = data.taken;
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
        this.username = '';
        this.crystals = ['', '', '', '', '', '', ''];
        this.realCrystals = ['', '', '', '', '', '', ''];
        this.givenCrystal = '';
        this.pickedCrystal = '';
        this.animationFinished = true;
        this.finished = false;
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getCurrentPlayer'
    ]),
    crystalAnimation(index) {
      this.finished = false;
      this.animationFinished = false;
      if (index > 25) {
        this.crystals = this.realCrystals;
        this.animationFinished = true;
      } else {
        index++;
        this.changeCrystalColor();
        let crystalAnimation = this.crystalAnimation;
        setTimeout(function() { crystalAnimation(index) }, 100);
      }
    },
    changeCrystalColor() {
      // for (let i = 0; i < this.crystals.length; i++) {
      //   this.crystals[i] = Object.keys(this.colors)[Math.floor(Math.random() * (Object.keys(this.colors).length - 1))];
      // }
    }          
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>