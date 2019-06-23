<template>
  <v-dialog
    v-model="dialog"
    full-width
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="headline">Pick a crystal. If booth of them are Obsidian you can just send both to the target.</span>
      </v-card-title>
      <v-card-text>
        <v-container 
          fluid
          class="pt-0"
        >
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
                <div v-if="crystal > 0">
                  <v-radio
                    v-if="index !== crystals.length - 1"
                    color="orange" 
                    :value="index"
                  />
                  <app-crystal
                    :name="player.crystals[index].name"
                    :only-image="true"
                  />
                </div>
              </div>
            </v-radio-group>
          </v-layout>
          <v-btn
            v-if="pickedCrystalIndex !== -1 || crystals[crystals.length - 1] === 2"
            :loading="loading" 
            @click="take()"
          >
            Take
          </v-btn>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'GiveMeAHandHereAnswer',
  components: {
    appCrystal: Crystal
  },
  data() {
    return {
      dialog: false,
      loading: false,
      player: null,
      crystals: [0, 0, 0, 0, 0, 0, 0],
      givenCrystals: [0, 0, 0, 0, 0, 0, 0],
      pickedCrystals: [0, 0, 0, 0, 0, 0, 0],
      pickedCrystalIndex: -1
    }
  },
  sockets: {
    giveMeAHandHereAnswer: function(data) {
      this.player = this.getCurrentPlayer()(this.loggedUser._id);
      this.dialog = true;
      this.crystals = data.crystals;
    }
  },
  computed: {
    ...mapState('crystal', {
      colors: state => state.colors
    }),
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    }),
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.player = null;
        this.crystals = [0, 0, 0, 0, 0, 0, 0];
        this.givenCrystals = [0, 0, 0, 0, 0, 0, 0];
        this.pickedCrystals = [0, 0, 0, 0, 0, 0, 0];
        this.pickedCrystalIndex = -1;
      }
    }
  },
  methods: {
    ...mapActions('game', [
      'useCard'
    ]),
    ...mapGetters('game', [
      'getCurrentPlayer'
    ]),
    take() {
      this.loading = true;
      if (this.pickedCrystalIndex !== -1) {
        this.pickedCrystals[this.pickedCrystalIndex]++;
        this.crystals[this.pickedCrystalIndex]--;
      }
      this.givenCrystals = this.crystals;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'giveMeAHandHereAnswer',
          info: {
            given: this.givenCrystals,
            taken: this.pickedCrystals,
          }
        }
      };
      this.useCard(data).then(() => this.dialog = false);
    }   
  }
}

</script>

<style>
  .v-overlay--active:before {
    opacity: 1 !important
  }
</style>