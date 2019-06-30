<template>
  <v-dialog
    v-model="dialog"
    full-width
  >
    <v-card>
      <v-card-title
        class="headline grey lighten-2"
        primary-title
      >
        Keep one crystal safe until the end of the day
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
                Keep
              </h3>
            </v-flex>
            <v-radio-group
              v-if="player"
              v-model="pickedCrystalIndex"
              row
            >
              <div 
                v-for="(crystal, index) in player.crystals"
                :key="index"
              >
                <div v-if="crystal.amount > 0 && crystal.name !== 'Autunita'">
                  <v-radio
                    :value="index"
                    color="orange"
                  />
                  <app-crystal
                    :name="crystal.name"
                    :only-image="true"
                  />
                </div>
              </div>
            </v-radio-group>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn
          v-if="pickedCrystalIndex > -1"
          :loading="loading" 
          color="secondary"
          @click="keepCrystal()"
        >
          Keep crystal
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          :loading="loading" 
          @click="dialog = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Crystal from '../crystal/Crystal';

export default {
  name: 'CrystalWhatCrystalChoose',
  components: {
    appCrystal: Crystal
  },
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      player: null,
      pickedCrystalIndex: -1
    }
  },
  computed: {
    ...mapState('user', {
      loggedUser: state => state.loggedUser
    })
  },
  watch: {
    dialog (val) {
      if (!val) {
        this.player = null;
        this.pickedCrystalIndex = -1;
        this.loading = false;
        this.$emit('close');
      } else {
        this.player = this.getCurrentPlayer()(this.loggedUser._id);
      }
    }
  },
  methods: {
    ...mapGetters('game', [
      'getCurrentPlayer',
    ]),
    ...mapActions('game', [
      'useCard'
    ]),
    keepCrystal() {
      this.loading = true;
      const data ={
        param: this.$route.params.id,
        body: {
          action: 'crystalWhatCrystal',
          info: {
            crystal: this.player.crystals[this.pickedCrystalIndex].name
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